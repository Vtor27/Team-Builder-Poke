const fs = require("fs");

// Cargar pokedex completa
const pokedex = JSON.parse(fs.readFileSync("pokedex.json", "utf8"));

// Cargar lista de nombres o IDs desde el archivo
const lista = fs
  .readFileSync("nombrePokedex.txt", "utf8")
  .split("\n")
  .map((l) => l.trim())
  .filter((l) => l.length > 0);

// Buscar los Pokémon en el JSON
const seleccionados = [];

lista.forEach((valor) => {
  let poke = null;

  // Si es número, buscar por id
  if (!isNaN(valor)) {
    poke = pokedex.find((p) => p.id === parseInt(valor));
  } else {
    // Si es texto, buscar por nombre (ignorando mayúsculas)
    poke = pokedex.find(
      (p) => p.name?.english?.toLowerCase() === valor.toLowerCase()
    );
  }

  if (poke) {
    seleccionados.push(poke);
  } else {
    console.warn(`⚠️ No se encontró: ${valor}`);
  }
});

// Guardar nuevo JSON
fs.writeFileSync("alola.json", JSON.stringify(seleccionados, null, 4), "utf8");
console.log(
  `✅ Generado 'pokedex_johto.json' con ${seleccionados.length} Pokémon`
);
