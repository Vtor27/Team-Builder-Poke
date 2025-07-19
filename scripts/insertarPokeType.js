const fs = require("fs");
const { Pool } = require("pg");

// Conexión PostgreSQL
const pool = new Pool({
  user: "Vtor27",
  host: "localhost",
  database: "Team-Builder-Poke-DB",
  password: "Damgondev2727",
  port: 5432,
});

// Cargar JSON
const pokedex = JSON.parse(
  fs.readFileSync("../poke-assets/data/pokedex.json", "utf8")
);

async function insertarTiposPorPokemon() {
  let total = 0;
  let fallos = 0;

  try {
    // Limpiar tabla para evitar duplicados
    await pool.query("DELETE FROM pokemon_type");

    for (const pokemon of pokedex) {
      const id = pokemon.id;
      const tipos = pokemon.type;

      for (let i = 0; i < tipos.length; i++) {
        const tipoNombre = tipos[i];
        const slot = i + 1; // 1 = principal, 2 = secundario

        // Buscar ID del tipo
        const res = await pool.query(
          "SELECT id FROM types WHERE nombre ILIKE $1",
          [tipoNombre]
        );

        if (res.rows.length === 0) {
          console.warn(`⚠️ Tipo no encontrado: ${tipoNombre}`);
          fallos++;
          continue;
        }

        const typeId = res.rows[0].id;

        // Insertar relación con slot
        await pool.query(
          "INSERT INTO pokemon_type (pokemon_id, type_id, slot) VALUES ($1, $2, $3)",
          [id, typeId, slot]
        );

        console.log(
          `✅ ${pokemon.name.english} → ${tipoNombre} (slot ${slot})`
        );
        total++;
      }
    }

    console.log(`🎯 Tipos asignados: ${total}, Fallos: ${fallos}`);
  } catch (err) {
    console.error("❌ Error en la ejecución:", err.message);
  } finally {
    await pool.end();
  }
}

insertarTiposPorPokemon();
