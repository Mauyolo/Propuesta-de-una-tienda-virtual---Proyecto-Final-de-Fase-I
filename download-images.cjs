const axios = require('axios');
const fs = require('fs');
const path = require('path');

const images = [
  // Currencies (icons)
  { url: 'https://static.wikia.nocookie.net/gensin-impact/images/1/1a/Item_Genesis_Crystal.png', dest: 'public/images/icons/genshin-crystals.png' },
  { url: 'https://static.wikia.nocookie.net/houkai-star-rail/images/c/c5/Item_Oneiric_Shard.png', dest: 'public/images/icons/honkai-shards.png' },
  { url: 'https://static.wikia.nocookie.net/zenless-zone-zero/images/b/ba/Item_Monochrome.png', dest: 'public/images/icons/zenless-monochrome.png' },
  { url: 'https://static.wikia.nocookie.net/leagueoflegends/images/c/ce/Riot_Points.png', dest: 'public/images/icons/lol-rp.png' },
  { url: 'https://static.wikia.nocookie.net/valorant/images/f/f7/Valorant_Points.png', dest: 'public/images/icons/valorant-vp.png' },
  { url: 'https://static.wikia.nocookie.net/fortnite/images/2/22/V-Bucks_Icon_-_Backpack_-_Fortnite.png', dest: 'public/images/icons/fortnite-vbucks.png' },
  { url: 'https://static.wikia.nocookie.net/minecraft/images/8/87/Minecoin.png', dest: 'public/images/icons/minecraft-minecoins.png' },
  // Logos (currencies)
  { url: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5e/Genshin_Impact_logo_%282%29.png/220px-Genshin_Impact_logo_%282%29.png', dest: 'public/images/currencies/genshin-logo.png' },
  { url: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/55/Honkai_Star_Rail_game_logo.png/220px-Honkai_Star_Rail_game_logo.png', dest: 'public/images/currencies/honkai-logo.png' },
  { url: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/8f/Zenless_Zone_Zero_logo.png/220px-Zenless_Zone_Zero_logo.png', dest: 'public/images/currencies/zenless-logo.png' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/LoL_icon.svg/220px-LoL_icon.svg.png', dest: 'public/images/currencies/lol-logo.png' },
  { url: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/14/Valorant_logo.png/220px-Valorant_logo.png', dest: 'public/images/currencies/valorant-logo.png' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Fortnite_-_Logo.svg/220px-Fortnite_-_Logo.svg.png', dest: 'public/images/currencies/fortnite-logo.png' },
  { url: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b2/Minecraft_2024_cover_art.png/220px-Minecraft_2024_cover_art.png', dest: 'public/images/currencies/minecraft-logo.png' },
  // Generic NitroCoin
  { url: 'https://cdn-icons-png.flaticon.com/512/2910/2910791.png', dest: 'public/images/currencies/nitro-coin.png' }
];

async function downloadImage(img) {
  try {
    const response = await axios({
      method: 'GET',
      url: img.url,
      responseType: 'stream',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
      }
    });
    const writer = fs.createWriteStream(path.resolve(__dirname, img.dest));
    response.data.pipe(writer);
    return new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
  } catch (error) {
    console.error(`Failed to download ${img.url}:`, error.message);
  }
}

async function run() {
  for (const img of images) {
    console.log(`Downloading ${img.dest}...`);
    await downloadImage(img);
  }
  console.log('Done!');
}

run();
