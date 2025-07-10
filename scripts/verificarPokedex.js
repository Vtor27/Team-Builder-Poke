const fs = require('fs');
const fetch = require('node-fetch'); // npm install node-fetch@2

const POKEDEX_PATH = '../poke-assets/data/pokedex.json';
const pokedex = JSON.parse(fs.readFileSync(POKEDEX_PATH, 'utf8'));

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function verificarImagen(url) {
  try {
    const res = await fetch(url);
    if (res.status !== 200) {
      console.log(`⛔ Estado: ${res.status} → ${url}`);
    }
    return res.status === 200;
  } catch (err) {
    console.log(`🚫 Error de red → ${url}`);
    return false;
  }
}


(async () => {
  let errores = [];

  for (let i = 0; i < pokedex.length; i++) {
    const poke = pokedex[i];
    const { name, imagenHD, iconoMini } = poke;

    process.stdout.write(`🔍 Comprobando ${name?.english || name}... `);

    let errorFlag = false;

    if (imagenHD) {
      const ok = await verificarImagen(imagenHD);
      if (!ok) {
        errores.push(`[❌] imagenHD no encontrada: ${name?.english || name} (${imagenHD})`);
        errorFlag = true;
      }
    }

    if (iconoMini) {
      const ok = await verificarImagen(iconoMini);
      if (!ok) {
        errores.push(`[❌] iconoMini no encontrado: ${name?.english || name} (${iconoMini})`);
        errorFlag = true;
      }
    }

    console.log(errorFlag ? '❌' : '✅');

    // Esperar 200 ms antes del siguiente para evitar limitaciones de GitHub
    await sleep(200);
  }

  if (errores.length === 0) {
    console.log('\n✅ Todas las imágenes y sprites son accesibles.');
  } else {
    console.log('\n❌ Problemas encontrados:\n');
    errores.forEach(e => console.log(e));
  }
})();