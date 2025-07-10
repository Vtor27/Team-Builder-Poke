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
    // Limpiar tabla primero si deseas evitar duplicados
    await pool.query("DELETE FROM pokemon_type");

    for (const pokemon of pokedex) {
      const id = pokemon.id;
      const tipos = pokemon.type;

      for (const tipoNombre of tipos) {
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

        // Insertar relación
        await pool.query(
          "INSERT INTO pokemon_type (pokemon_id, type_id) VALUES ($1, $2)",
          [id, typeId]
        );

        console.log(`✅ ${pokemon.name.english} → ${tipoNombre}`);
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
