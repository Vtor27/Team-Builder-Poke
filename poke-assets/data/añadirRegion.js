const fs = require("fs");

// Cargar pokédex original
const pokedex = JSON.parse(fs.readFileSync("pokedex.json", "utf8"));

// Definir regiones y generaciones
const regiones = [
  { nombre: "Kanto", gen: 1 },
  { nombre: "Johto", gen: 2 },
  { nombre: "Hoenn", gen: 3 },
  { nombre: "Sinnoh", gen: 4 },
  { nombre: "Teselia", gen: 5 },
  { nombre: "Kalos", gen: 6 },
  { nombre: "Alola", gen: 7 },
];

// Leer y mapear Pokémon de cada región
const mapaRegiones = {};

regiones.forEach(({ nombre }) => {
  const lista = fs
    .readFileSync(`${nombre.toLowerCase()}_dex.txt`, "utf8")
    .split("\n")
    .map((n) => n.trim().toLowerCase())
    .filter(Boolean);
  lista.forEach((n) => {
    if (!mapaRegiones[n]) mapaRegiones[n] = [];
    mapaRegiones[n].push(nombre);
  });
});

// Recorrer la pokédex y enriquecer con datos de región
const pokedexEnriquecida = pokedex.map((p) => {
  const nombre = p.name.english.toLowerCase();
  const aparicion = mapaRegiones[nombre] || [];

  const region_origen = aparicion[0] || "Desconocida";
  const generacion =
    regiones.find((r) => r.nombre === region_origen)?.gen || null;

  return {
    ...p,
    region_origen,
    generacion,
    regiones_aparicion: aparicion,
  };
});

// Guardar nuevo archivo
fs.writeFileSync(
  "pokedex.json",
  JSON.stringify(pokedexEnriquecida, null, 4),
  "utf8"
);
console.log("✅ pokedex_con_regiones.json generado con éxito.");
