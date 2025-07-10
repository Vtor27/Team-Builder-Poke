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

// Alias aceptados
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

async function insertarOrigenRegion() {
  let exitos = 0;
  let fallos = 0;
  let duplicados = 0;

  try {
    // Borrar datos anteriores
    console.log("🧹 Borrando datos existentes en region_origin...");
    await pool.query("DELETE FROM region_origin");

    for (const pokemon of pokedex) {
      const id = pokemon.id;
      const nombre = pokemon.name.english;
      const regionOriginal = pokemon.region_origen;
      const regionNombre = ALIAS_REGIONES[regionOriginal];

      console.log(
        `\n🔎 Procesando ${nombre} (ID ${id}) - region_origen: "${regionOriginal}"`
      );

      if (!regionNombre) {
        console.warn(
          `⚠️ Región no válida o sin alias para ${nombre}: ${regionOriginal}`
        );
        fallos++;
        continue;
      }

      const res = await pool.query(
        "SELECT id FROM region WHERE name ILIKE $1",
        [regionNombre]
      );

      if (res.rows.length === 0) {
        console.warn(`❌ Región no encontrada en BD: ${regionNombre}`);
        fallos++;
        continue;
      }

      const regionId = res.rows[0].id;
      console.log(`📌 Región encontrada: "${regionNombre}" con ID ${regionId}`);

      // Verificar duplicado (opcional aquí ya que se borró antes)
      const check = await pool.query(
        "SELECT 1 FROM region_origin WHERE pokemon_id = $1 AND region_id = $2",
        [id, regionId]
      );

      if (check.rows.length > 0) {
        console.log(`↩️ Ya existía: ${nombre} con origen ${regionNombre}`);
        duplicados++;
        continue;
      }

      try {
        await pool.query(
          "INSERT INTO region_origin (pokemon_id, region_id) VALUES ($1, $2)",
          [id, regionId]
        );
        console.log(`✅ Insertado: ${nombre} => Región origen ${regionNombre}`);
        exitos++;
      } catch (insertError) {
        console.error(
          `❌ Error al insertar ${nombre} (ID ${id}) con región ${regionNombre}:`,
          insertError.message
        );
        fallos++;
      }
    }

    console.log(
      `\n🎯 Inserción finalizada. Éxitos: ${exitos}, Duplicados: ${duplicados}, Fallos: ${fallos}`
    );
  } catch (err) {
    console.error("❌ Error general en el script:", err.message);
  } finally {
    await pool.end();
  }
}

insertarOrigenRegion();
