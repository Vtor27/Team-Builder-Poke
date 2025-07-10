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

// Cargar la pokedex enriquecida
const pokedex = JSON.parse(
  fs.readFileSync("../poke-assets/data/pokedex.json", "utf8")
);

// Función principal
async function insertar() {
  try {
    // Borrar todos los datos existentes
    await pool.query("DELETE FROM pokemon");

    // Reiniciar el contador del ID autoincremental
    await pool.query("ALTER SEQUENCE pokemon_id_seq RESTART WITH 1");

    for (const pokemon of pokedex) {
      // Obtener ID de la región
      const res = await pool.query("SELECT id FROM region WHERE name = $1", [
        pokemon.region_origen,
      ]);
      const region_id = res.rows.length > 0 ? res.rows[0].id : null;

      // Insertar Pokémon (sin el campo 'id', lo autogenera PostgreSQL)
      await pool.query(
        `INSERT INTO pokemon (
          name, type1, type2,
          hp, attack, defense, special_attack, special_defense, speed,
          image, icon_mini,
          region_origin, generation_id
        ) VALUES (
          $1, $2, $3,
          $4, $5, $6, $7, $8, $9,
          $10, $11,
          $12, $13
        )`,
        [
          pokemon.name.english,
          pokemon.type[0],
          pokemon.type[1] || null,
          pokemon.base.HP,
          pokemon.base.Attack,
          pokemon.base.Defense,
          pokemon.base["Sp. Attack"],
          pokemon.base["Sp. Defense"],
          pokemon.base.Speed,
          pokemon.imagenHD,
          pokemon.iconoMini,
          region_id,
          pokemon.generacion,
        ]
      );
    }

    console.log("✅ Datos insertados correctamente.");
  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    pool.end();
  }
}

insertar();
