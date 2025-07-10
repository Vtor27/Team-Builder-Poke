const fs = require("fs");
const { Pool } = require("pg");

// Configuración PostgreSQL
const pool = new Pool({
  user: "Vtor27",
  host: "localhost",
  database: "Team-Builder-Poke-DB",
  password: "Damgondev2727",
  port: 5432,
});

// Cargar pokedex
const pokedex = JSON.parse(
  fs.readFileSync("../poke-assets/data/pokedex.json", "utf8")
);

// Función principal
async function insertarPokemonRegion() {
  try {
    // Borrar datos anteriores
    await pool.query("DELETE FROM region_apparitions");

    for (const pokemon of pokedex) {
      const resPoke = await pool.query(
        "SELECT id FROM pokemon WHERE name = $1",
        [pokemon.name.english]
      );

      if (resPoke.rows.length === 0) {
        console.warn(`⚠️ Pokémon no encontrado en BD: ${pokemon.name.english}`);
        continue;
      }

      const pokemonId = resPoke.rows[0].id;

      if (
        pokemon.regiones_aparicion &&
        Array.isArray(pokemon.regiones_aparicion)
      ) {
        for (const nombreRegion of pokemon.regiones_aparicion) {
          const resRegion = await pool.query(
            "SELECT id FROM region WHERE name ILIKE $1",
            [nombreRegion.trim()]
          );

          if (resRegion.rows.length === 0) {
            console.warn(`⚠️ Región no encontrada: ${nombreRegion}`);
            continue;
          }

          const regionId = resRegion.rows[0].id;

          await pool.query(
            "INSERT INTO region_apparitions (pokemon_id, region_id) VALUES ($1, $2)",
            [pokemonId, regionId]
          );
        }
      }
    }

    console.log("✅ Relaciones region_apparitions insertadas correctamente.");
  } catch (err) {
    console.error("❌ Error al insertar en region_apparitions:", err);
  } finally {
    pool.end();
  }
}

insertarPokemonRegion();
