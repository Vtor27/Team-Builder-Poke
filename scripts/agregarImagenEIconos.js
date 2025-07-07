const fs = require('fs');
const path = require('path');

const POKEDEX_PATH = '../poke-assets/data/pokedex.json';
const IMAGES_DIR = '../poke-assets/images';
const ICONS_DIR = '../poke-assets/sprites-mini';

const BASE_IMG_URL = 'https://raw.githubusercontent.com/Vtor27/poke-assets/main/images/';
const BASE_ICON_URL = 'https://raw.githubusercontent.com/Vtor27/poke-assets/main/sprites-mini/';

const pokedex = JSON.parse(fs.readFileSync(POKEDEX_PATH, 'utf8'));
const imageFiles = fs.readdirSync(IMAGES_DIR);
const iconFiles = fs.existsSync(ICONS_DIR) ? fs.readdirSync(ICONS_DIR) : [];

// Mapas rápidos para imágenes
const imageMap = {};
imageFiles.forEach(file => {
  const key = file.replace('.png', '').toLowerCase();
  imageMap[key] = file;
});

const iconMap = {};
iconFiles.forEach(file => {
  const key = file.replace('.png', '').toLowerCase();
  iconMap[key] = file;
});

const updated = pokedex.map(poke => {
  const idStr = poke.id.toString().padStart(3, '0');
  const nombre = poke.name?.english?.toLowerCase() || poke.name?.toLowerCase();

  const imagen = imageMap[idStr] || imageMap[nombre] || null;
  const icono = iconMap[`${idStr.toLowerCase()}ms`] || null;

  return {
    ...poke,
    imagenHD: imagen ? BASE_IMG_URL + imagen : null,
    iconoMini: icono ? BASE_ICON_URL + icono : null
  };
});

fs.writeFileSync('../poke-assets/data/pokedex.json', JSON.stringify(updated, null, 2));
console.log('✅ Archivo pokedex_final.json generado correctamente.');
