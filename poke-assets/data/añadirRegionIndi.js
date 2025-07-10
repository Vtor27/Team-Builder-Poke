const fs = require("fs");
const path = require("path");

// 🟡 Define el archivo a procesar (cambia el nombre según lo que quieras hacer)
const archivo = "kanto.json"; // puedes cambiar por "hoenn.json", "kalos.json", etc.

// 🧩 Detectar región y generación a partir del nombre del archivo
const regiones = {
  kanto: 1,
  johto: 2,
  hoenn: 3,
  sinnoh: 4,
  Teselia: 5,
  kalos: 6,
  alola: 7,
};

const regionNombre = path.parse(archivo).name.toLowerCase();
const generacion = regiones[regionNombre] || null;

if (!generacion) {
  console.error(
    "❌ No se pudo detectar generación a partir del nombre del archivo."
  );
  process.exit(1);
}

// 🔄 Leer archivo JSON regional
const pokedexRegion = JSON.parse(fs.readFileSync(archivo, "utf8"));

// 🔧 Añadir los campos nuevos
const pokedexEnriquecida = pokedexRegion.map((p) => ({
  ...p,
  region_origen: regionNombre.charAt(0).toUpperCase() + regionNombre.slice(1),
  generacion,
  regiones_aparicion: [
    regionNombre.charAt(0).toUpperCase() + regionNombre.slice(1),
  ],
}));

// 💾 Guardar archivo nuevo
const nuevoNombre = `${regionNombre}.json`;
fs.writeFileSync(
  nuevoNombre,
  JSON.stringify(pokedexEnriquecida, null, 4),
  "utf8"
);

console.log(
  `✅ ${nuevoNombre} generado con ${pokedexEnriquecida.length} Pokémon`
);
