/**
 * backend/seed.js
 * Script para poblar la base de datos con todos los productos de NitroGames.
 * Ejecutar: node seed.js  (desde /backend)
 *
 * Datos sincronizados con src/data/ del frontend.
 */

require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const steamImage = (appId) =>
  `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${appId}/library_600x900_2x.jpg`;

// ── JUEGOS ────────────────────────────────────────────────────────────────────
const gamesData = [
  {
    type: 'game',
    title: 'Minecraft: Java & Bedrock Edition',
    price: 29.99,
    category: 'Sandbox',
    description: 'Explora, construye y sobrevive con acceso a Java y Bedrock Edition en una experiencia creativa enorme y siempre rejugable.',
    image: 'https://store-images.s-microsoft.com/image/apps.58378.14492077886571533.338a563a-86e7-47b1-b9dc-41cf411f5dcd.dc840f22-6e8f-4a59-b7bc-57958a0740fd?h=270&q=90&w=480'
  },
  {
    type: 'game',
    title: 'Grand Theft Auto V',
    price: 39.99,
    category: 'Mundo abierto',
    description: 'Vive golpes espectaculares, persecuciones intensas y una ciudad enorme con accion constante en Los Santos.',
    image: steamImage(3240220)
  },
  {
    type: 'game',
    title: 'EA Sports FC 25',
    price: 49.99,
    category: 'Deportes',
    description: 'Compite con tus clubes favoritos, domina cada partido y arma tu plantilla ideal en una experiencia futbolera moderna.',
    image: steamImage(2669320)
  },
  {
    type: 'game',
    title: 'Plants vs. Zombies',
    price: 14.99,
    category: 'Estrategia',
    description: 'Defiende tu jardin con plantas iconicas, estrategia ligera y oleadas de zombis en un clasico muy divertido.',
    image: steamImage(3590)
  },
  {
    type: 'game',
    title: 'Forza Horizon 5',
    price: 44.99,
    category: 'Carreras',
    description: 'Recorre Mexico en un festival de velocidad con autos espectaculares, clima dinamico y eventos por todas partes.',
    image: steamImage(1551360)
  },
  {
    type: 'game',
    title: 'The Legend of Zelda: Tears of the Kingdom',
    price: 59.99,
    category: 'Aventura',
    description: 'Descubre cielos, islas y secretos en una aventura epica con exploracion libre, puzzles y combate creativo.',
    image: 'https://assets.nintendo.com/image/upload/ar_16%3A9%2Cb_auto%3Aborder%2Cc_lpad/b_white/f_auto/q_auto/dpr_1.5/store/software/switch/70010000063714/fb30eab428df3fc993b41c76e20f72e4d76d49734d17d31996b5ab61c414b117'
  },
  {
    type: 'game',
    title: 'ARC Raiders',
    price: 39.99,
    category: 'Shooter',
    description: 'Forma escuadrones, sobrevive en zonas hostiles y enfrentalte a amenazas mecanicas en una experiencia cooperativa futurista.',
    image: steamImage(1808500)
  },
  {
    type: 'game',
    title: 'The Elder Scrolls V: Skyrim',
    price: 34.99,
    category: 'RPG',
    description: 'Explora una tierra helada llena de dragones, magia, mazmorras y decisiones en uno de los RPG mas conocidos.',
    image: steamImage(489830)
  },
  {
    type: 'game',
    title: 'Metro 2033 Redux',
    price: 24.99,
    category: 'Survival horror',
    description: 'Sobrevive bajo las ruinas de Moscu en una aventura tensa, oscura y cargada de atmosfera postapocaliptica.',
    image: steamImage(286690)
  },
  {
    type: 'game',
    title: 'Clair Obscur: Expedition 33',
    price: 54.99,
    category: 'RPG',
    description: 'Sumate a una expedicion desesperada con combates por turnos estilizados y un mundo fantastico de gran impacto visual.',
    image: steamImage(1903340)
  },
  {
    type: 'game',
    title: 'Final Fantasy VII Remake',
    price: 49.99,
    category: 'JRPG',
    description: 'Revive Midgar con accion, narrativa cinematica y personajes iconicos en una reinterpretacion moderna del clasico.',
    image: steamImage(1462040)
  },
  {
    type: 'game',
    title: 'The Last of Us Part I',
    price: 59.99,
    category: 'Accion y aventura',
    description: 'Acompana a Joel y Ellie en un viaje brutal, emotivo y lleno de tension en un mundo devastado.',
    image: steamImage(1888930)
  },
  {
    type: 'game',
    title: 'The Last of Us Part II Remastered',
    price: 59.99,
    category: 'Accion y aventura',
    description: 'Continua la historia con una aventura intensa, mas cruda y centrada en el sigilo, la supervivencia y el drama.',
    image: steamImage(2531310)
  }
];

// ── NITROCOINS ────────────────────────────────────────────────────────────────
const coinsData = [
  {
    type: 'coin',
    title: '500 NitroCoins',
    amount: 500,
    price: 4.99,
    bonus: null,
    description: 'Paquete de entrada. Ideal para probar el sistema de monedas.',
    image: 'https://cdn-icons-png.flaticon.com/512/2910/2910791.png'
  },
  {
    type: 'coin',
    title: '1,200 NitroCoins',
    amount: 1200,
    price: 9.99,
    bonus: '200 de bonus',
    description: 'El mas popular. Recibe 200 monedas extra sin costo adicional.',
    image: 'https://cdn-icons-png.flaticon.com/512/2910/2910791.png'
  },
  {
    type: 'coin',
    title: '2,800 NitroCoins',
    amount: 2800,
    price: 19.99,
    bonus: '300 de bonus',
    description: 'Gran valor. Perfecto para jugadores frecuentes.',
    image: 'https://cdn-icons-png.flaticon.com/512/2910/2910791.png'
  },
  {
    type: 'coin',
    title: '6,500 NitroCoins',
    amount: 6500,
    price: 39.99,
    bonus: '500 de bonus',
    description: 'Paquete premium con el mejor ratio de valor por moneda.',
    image: 'https://cdn-icons-png.flaticon.com/512/2910/2910791.png'
  },
  {
    type: 'coin',
    title: '15,000 NitroCoins',
    amount: 15000,
    price: 79.99,
    bonus: '1,500 de bonus',
    description: 'Para jugadores serios. El mayor paquete disponible.',
    image: 'https://cdn-icons-png.flaticon.com/512/2910/2910791.png'
  }
];

// ── COMBOS ────────────────────────────────────────────────────────────────────
const combosData = [
  {
    type: 'combo',
    title: 'Pack Supervivencia',
    price: 99.99,
    originalPrice: 119.98,
    discount: 17,
    description: 'The Last of Us Part I + Part II Remastered. Vive la historia completa de Joel y Ellie con un descuento especial.',
    image: steamImage(1888930),
    items: ['The Last of Us Part I', 'The Last of Us Part II Remastered'],
    badge: 'Oferta saga'
  },
  {
    type: 'combo',
    title: 'Zelda + 1,200 NitroCoins',
    price: 64.99,
    originalPrice: 69.98,
    discount: 7,
    description: 'The Legend of Zelda: Tears of the Kingdom + 1,200 NitroCoins de bonus. La aventura perfecta con monedas incluidas.',
    image: 'https://assets.nintendo.com/image/upload/ar_16%3A9%2Cb_auto%3Aborder%2Cc_lpad/b_white/f_auto/q_auto/dpr_1.5/store/software/switch/70010000063714/fb30eab428df3fc993b41c76e20f72e4d76d49734d17d31996b5ab61c414b117',
    items: ['The Legend of Zelda: Tears of the Kingdom', '1,200 NitroCoins'],
    badge: 'Juego + Monedas'
  },
  {
    type: 'combo',
    title: 'RPG Legends Pack',
    price: 79.99,
    originalPrice: 99.97,
    discount: 20,
    description: 'Skyrim + Final Fantasy VII Remake + Clair Obscur. Tres mundos epicos, un precio imbatible.',
    image: steamImage(489830),
    items: ['The Elder Scrolls V: Skyrim', 'Final Fantasy VII Remake', 'Clair Obscur: Expedition 33'],
    badge: 'Bundle RPG'
  },
  {
    type: 'combo',
    title: 'Shooter Pro Bundle',
    price: 34.99,
    originalPrice: 39.99,
    discount: 13,
    description: 'ARC Raiders + 2,800 NitroCoins. Domina los campos de batalla con monedas para personalizacion.',
    image: steamImage(1808500),
    items: ['ARC Raiders', '2,800 NitroCoins'],
    badge: 'Shooter + Monedas'
  },
  {
    type: 'combo',
    title: 'Mundo Abierto Starter',
    price: 69.99,
    originalPrice: 84.98,
    discount: 18,
    description: 'GTA V + Forza Horizon 5. Explora Los Santos y Mexico en el mejor combo de mundo abierto.',
    image: steamImage(3240220),
    items: ['Grand Theft Auto V', 'Forza Horizon 5'],
    badge: 'Pack accion'
  }
];

// ── SEED ──────────────────────────────────────────────────────────────────────
const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado a MongoDB. Limpiando datos anteriores...');

    await Product.deleteMany({});
    console.log('🗑️  Colección limpiada.');

    const inserted = await Product.insertMany([
      ...gamesData,
      ...coinsData,
      ...combosData
    ]);

    console.log(`✅ Seed completado: ${inserted.length} productos insertados.`);
    console.log(`   - Juegos:  ${gamesData.length}`);
    console.log(`   - Coins:   ${coinsData.length}`);
    console.log(`   - Combos:  ${combosData.length}`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error en seed:', error.message);
    process.exit(1);
  }
};

seedDB();
