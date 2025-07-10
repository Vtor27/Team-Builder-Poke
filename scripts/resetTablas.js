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

// ==================== FUNCIONES =======================

// Inserta Pokémon
async function insertarPokemon() {
  let insertados = 0;
  let fallos = 0;

  console.log("🧹 Borrando relaciones...");
  await pool.query("DELETE FROM region_apparitions");
  await pool.query("DELETE FROM region_origin");

  console.log("🧹 Reiniciando Pokémon...");
  await pool.query("DELETE FROM pokemon");
  await pool.query("ALTER SEQUENCE pokemon_id_seq RESTART WITH 1");

  for (const pokemon of pokedex) {
    const nombre = pokemon.name.english;
    const regionNombre = pokemon.region_origen;

    const res = await pool.query("SELECT id FROM region WHERE name ILIKE $1", [
      regionNombre,
    ]);
    const region_id = res.rows.length > 0 ? res.rows[0].id : null;

    try {
      await pool.query(
        `INSERT INTO pokemon (
    id, name, type1, type2,
    hp, attack, defense, special_attack, special_defense, speed,
    image, icon_mini,
    region_origin, generation_id, region
  ) VALUES (
    $1, $2, $3, $4,
    $5, $6, $7, $8, $9, $10,
    $11, $12,
    $13, $14, $15
  )`,
        [
          pokemon.id,
          nombre,
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
          pokemon.regiones_aparicion,
        ]
      );

      console.log(`✅ Insertado: ${nombre}`);
      insertados++;
    } catch (insertError) {
      console.warn(`❌ Fallo al insertar ${nombre}: ${insertError.message}`);
      fallos++;
    }
  }

  console.log(`\n🎯 Pokémon insertados: ${insertados}, Fallos: ${fallos}`);
}

// Inserta region de origen (region_origin)
async function insertarRegionOrigen() {
  const ALIAS_REGIONES = {
    Teselia: "Teselia",
    Kanto: "Kanto",
    Johto: "Johto",
    Hoenn: "Hoenn",
    Sinnoh: "Sinnoh",
    Kalos: "Kalos",
    Alola: "Alola",
    Desconocida: "Desconocida",
  };

  let exitos = 0;
  for (const p of pokedex) {
    const id = p.id;
    const nombre = p.name.english;
    const regionNombre = ALIAS_REGIONES[p.region_origen];

    if (!regionNombre) continue;

    const res = await pool.query("SELECT id FROM region WHERE name ILIKE $1", [
      regionNombre,
    ]);
    if (res.rows.length === 0) continue;

    const regionId = res.rows[0].id;

    await pool.query(
      "INSERT INTO region_origin (pokemon_id, region_id) VALUES ($1, $2)",
      [id, regionId]
    );
    exitos++;
  }

  console.log(`🌍 Regiones de origen insertadas: ${exitos}`);
}

// Inserta regiones de aparición (region_apparitions)
async function insertarRegionApariciones() {
  let total = 0;

  for (const p of pokedex) {
    const id = p.id;
    const nombre = p.name.english;
    const regiones = p.regiones_aparicion;

    for (const nombreRegion of regiones) {
      const res = await pool.query(
        "SELECT id FROM region WHERE name ILIKE $1",
        [nombreRegion]
      );
      if (res.rows.length === 0) continue;

      const regionId = res.rows[0].id;
      await pool.query(
        "INSERT INTO region_apparitions (pokemon_id, region_id) VALUES ($1, $2)",
        [id, regionId]
      );
      total++;
    }
  }

  console.log(`📍 Regiones de aparición insertadas: ${total}`);
}

// ==================== EJECUCIÓN =======================
(async () => {
  try {
    await insertarPokemon();
    await insertarRegionOrigen();
    await insertarRegionApariciones();
    console.log("✅ Base de datos completamente reconstruida.");
  } catch (err) {
    console.error("❌ Error:", err.message);
  } finally {
    await pool.end();
  }
})();
