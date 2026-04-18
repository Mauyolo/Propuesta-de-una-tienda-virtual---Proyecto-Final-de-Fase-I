/**
 * src/data/combos.js
 * Combos y bundles de compra — datos locales de fallback.
 */

const steamImage = (appId) =>
  `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${appId}/library_600x900_2x.jpg`

export const combos = [
  {
    id: 201,
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
    id: 202,
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
    id: 203,
    type: 'combo',
    title: 'RPG Legends Pack',
    price: 79.99,
    originalPrice: 99.97,
    discount: 20,
    description: 'Skyrim + Final Fantasy VII Remake + Clair Obscur. Tres mundos épicos, un precio imbatible.',
    image: steamImage(489830),
    items: ['The Elder Scrolls V: Skyrim', 'Final Fantasy VII Remake', 'Clair Obscur: Expedition 33'],
    badge: 'Bundle RPG'
  },
  {
    id: 204,
    type: 'combo',
    title: 'Shooter Pro Bundle',
    price: 34.99,
    originalPrice: 39.99,
    discount: 13,
    description: 'ARC Raiders + 2,800 NitroCoins. Domina los campos de batalla con monedas para personalización.',
    image: steamImage(1808500),
    items: ['ARC Raiders', '2,800 NitroCoins'],
    badge: 'Shooter + Monedas'
  },
  {
    id: 205,
    type: 'combo',
    title: 'Mundo Abierto Starter',
    price: 69.99,
    originalPrice: 84.98,
    discount: 18,
    description: 'GTA V + Forza Horizon 5. Explora Los Santos y México en el mejor combo de mundo abierto.',
    image: steamImage(3240220),
    items: ['Grand Theft Auto V', 'Forza Horizon 5'],
    badge: 'Pack acción'
  }
]

export const getComboById = (id) => combos.find(c => c.id === Number(id))
