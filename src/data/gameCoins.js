/**
 * src/data/gameCoins.js
 * Monedas de videojuegos organizadas por empresa.
 * Cada entrada tiene su imagen, empresa, y packs disponibles.
 */

export const gameCoinsCatalog = [
  // ─── HoYoverse ───────────────────────────────────────────────
  {
    id: 'gc-genshin',
    game: 'Genshin Impact',
    company: 'HoYoverse',
    currency: 'Genesis Crystals',
    currencySymbol: '💎',
    image: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5e/Genshin_Impact_logo_%282%29.png/220px-Genshin_Impact_logo_%282%29.png',
    coverImage: 'https://upload.wikimedia.org/wikipedia/en/a/a4/Genshin_Impact_Teyvat_map.jpg',
    color: '#a78bfa',
    packs: [
      { id: 'gc-genshin-60',   amount: 60,    bonus: 0,    price: 0.99,  label: '60 Cristales' },
      { id: 'gc-genshin-300',  amount: 300,   bonus: 30,   price: 4.99,  label: '300+30 Cristales', popular: false },
      { id: 'gc-genshin-980',  amount: 980,   bonus: 110,  price: 14.99, label: '980+110 Cristales', popular: true },
      { id: 'gc-genshin-1980', amount: 1980,  bonus: 260,  price: 29.99, label: '1980+260 Cristales' },
      { id: 'gc-genshin-3280', amount: 3280,  bonus: 600,  price: 49.99, label: '3280+600 Cristales' },
      { id: 'gc-genshin-6480', amount: 6480,  bonus: 1600, price: 99.99, label: '6480+1600 Cristales' }
    ]
  },
  {
    id: 'gc-hsr',
    game: 'Honkai: Star Rail',
    company: 'HoYoverse',
    currency: 'Oneiric Shards',
    currencySymbol: '🌀',
    image: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/55/Honkai_Star_Rail_game_logo.png/220px-Honkai_Star_Rail_game_logo.png',
    coverImage: 'https://images.squarespace-cdn.com/content/v1/63f35de0fdad1a4fa6b46671/1681399897989-EFGQQEQNQFHBAHXXKFEZ/Honkai+Star+Rail+PC.jpg',
    color: '#38bdf8',
    packs: [
      { id: 'gc-hsr-60',   amount: 60,   bonus: 0,   price: 0.99,  label: '60 Fragmentos' },
      { id: 'gc-hsr-300',  amount: 300,  bonus: 30,  price: 4.99,  label: '300+30 Fragmentos', popular: false },
      { id: 'gc-hsr-980',  amount: 980,  bonus: 110, price: 14.99, label: '980+110 Fragmentos', popular: true },
      { id: 'gc-hsr-1980', amount: 1980, bonus: 260, price: 29.99, label: '1980+260 Fragmentos' },
      { id: 'gc-hsr-3280', amount: 3280, bonus: 600, price: 49.99, label: '3280+600 Fragmentos' },
      { id: 'gc-hsr-6480', amount: 6480, bonus: 1600,price: 99.99, label: '6480+1600 Fragmentos' }
    ]
  },
  {
    id: 'gc-zzz',
    game: 'Zenless Zone Zero',
    company: 'HoYoverse',
    currency: 'Monochrome',
    currencySymbol: '⚡',
    image: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/8f/Zenless_Zone_Zero_logo.png/220px-Zenless_Zone_Zero_logo.png',
    coverImage: 'https://cdn.hoyo.com/upload/contentweb/2023/05/23/03c5d6c6b4e2ad6de8680a21e07e0fb8_3783082143671870148.png',
    color: '#f97316',
    packs: [
      { id: 'gc-zzz-60',   amount: 60,   bonus: 0,   price: 0.99,  label: '60 Monocromo' },
      { id: 'gc-zzz-300',  amount: 300,  bonus: 30,  price: 4.99,  label: '300+30 Monocromo' },
      { id: 'gc-zzz-980',  amount: 980,  bonus: 110, price: 14.99, label: '980+110 Monocromo', popular: true },
      { id: 'gc-zzz-1980', amount: 1980, bonus: 260, price: 29.99, label: '1980+260 Monocromo' },
      { id: 'gc-zzz-3280', amount: 3280, bonus: 600, price: 49.99, label: '3280+600 Monocromo' },
      { id: 'gc-zzz-6480', amount: 6480, bonus: 1600,price: 99.99, label: '6480+1600 Monocromo' }
    ]
  },

  // ─── Riot Games ──────────────────────────────────────────────
  {
    id: 'gc-lol',
    game: 'League of Legends',
    company: 'Riot Games',
    currency: 'Riot Points',
    currencySymbol: '⚔️',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/LoL_icon.svg/220px-LoL_icon.svg.png',
    coverImage: 'https://www.riotgames.com/darkroom/1440/8d5c497da1924c5e5064afbef04e5a7b:a09d9d0af8a7a0a8a4c5a6e2c7e1a9d8/league-of-legends-3840x2160-antimage-annie-4k-6.jpg',
    color: '#c89b3c',
    packs: [
      { id: 'gc-lol-650',   amount: 650,  bonus: 0,    price: 5.00,  label: '650 RP' },
      { id: 'gc-lol-1380',  amount: 1380, bonus: 0,    price: 10.00, label: '1380 RP', popular: false },
      { id: 'gc-lol-2800',  amount: 2800, bonus: 200,  price: 20.00, label: '2800+200 RP', popular: true },
      { id: 'gc-lol-5000',  amount: 5000, bonus: 750,  price: 35.00, label: '5000+750 RP' },
      { id: 'gc-lol-7200',  amount: 7200, bonus: 1300, price: 50.00, label: '7200+1300 RP' },
      { id: 'gc-lol-15000', amount: 15000,bonus: 3500, price: 100.00,label: '15000+3500 RP' }
    ]
  },
  {
    id: 'gc-valorant',
    game: 'Valorant',
    company: 'Riot Games',
    currency: 'Valorant Points',
    currencySymbol: '🔺',
    image: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/14/Valorant_logo.png/220px-Valorant_logo.png',
    coverImage: 'https://www.riotgames.com/darkroom/1440/d0807e131a84b2b16b6d9ee5a5e3efa0:8e44b9a6e0e71a748c4a6a0a7c5e6a1a/valorant-mia.jpg',
    color: '#ff4655',
    packs: [
      { id: 'gc-val-475',  amount: 475,  bonus: 0,   price: 4.99,  label: '475 VP' },
      { id: 'gc-val-1000', amount: 1000, bonus: 0,   price: 9.99,  label: '1000 VP' },
      { id: 'gc-val-2050', amount: 2050, bonus: 0,   price: 19.99, label: '2050 VP', popular: true },
      { id: 'gc-val-3650', amount: 3650, bonus: 350, price: 34.99, label: '3650+350 VP' },
      { id: 'gc-val-5350', amount: 5350, bonus: 700, price: 49.99, label: '5350+700 VP' },
      { id: 'gc-val-11000',amount: 11000,bonus: 1500,price: 99.99, label: '11000+1500 VP' }
    ]
  },

  // ─── Otros ───────────────────────────────────────────────────
  {
    id: 'gc-fortnite',
    game: 'Fortnite',
    company: 'Epic Games',
    currency: 'V-Bucks',
    currencySymbol: '🪙',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Fortnite_-_Logo.svg/220px-Fortnite_-_Logo.svg.png',
    coverImage: 'https://cdn2.unrealengine.com/fortnite-og-keyart-1920x1080-1920x1080-2bfe3dce9e62.jpg',
    color: '#60a5fa',
    packs: [
      { id: 'gc-fn-1000', amount: 1000, bonus: 0,   price: 7.99,  label: '1000 V-Bucks' },
      { id: 'gc-fn-2800', amount: 2800, bonus: 300, price: 19.99, label: '2800+300 V-Bucks', popular: true },
      { id: 'gc-fn-5000', amount: 5000, bonus: 800, price: 31.99, label: '5000+800 V-Bucks' },
      { id: 'gc-fn-13500',amount: 13500,bonus:2800, price: 79.99, label: '13500+2800 V-Bucks' }
    ]
  },
  {
    id: 'gc-minecraft',
    game: 'Minecraft (Minecoins)',
    company: 'Microsoft / Mojang',
    currency: 'Minecoins',
    currencySymbol: '💚',
    image: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b2/Minecraft_2024_cover_art.png/220px-Minecraft_2024_cover_art.png',
    coverImage: 'https://www.minecraft.net/content/dam/games/minecraft/key-art/MC-Vanilla_Media-Block-Image_PC-Gold-Key-Art_800x450.jpg',
    color: '#4ade80',
    packs: [
      { id: 'gc-mc-320',  amount: 320,  bonus: 0, price: 1.99,  label: '320 Minecoins' },
      { id: 'gc-mc-830',  amount: 830,  bonus: 0, price: 4.99,  label: '830 Minecoins', popular: true },
      { id: 'gc-mc-1710', amount: 1710, bonus: 0, price: 9.99,  label: '1710 Minecoins' },
      { id: 'gc-mc-3500', amount: 3500, bonus: 0, price: 19.99, label: '3500 Minecoins' }
    ]
  }
]

export const companies = [...new Set(gameCoinsCatalog.map(g => g.company))]

export const getGameCoinById = (id) => gameCoinsCatalog.find(g => g.id === id)
