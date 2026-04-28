/**
 * src/data/coins.js
 * Ofertas de monedas virtuales (NitroCoins) — datos locales de fallback.
 */

export const coins = [
  {
    id: 101,
    title: '500 NitroCoins',
    amount: 500,
    price: 4.99,
    bonus: null,
    type: 'coin',
    description: 'Paquete de entrada. Ideal para probar el sistema de monedas.',
    image: '/images/currencies/nitro-coin.png'
  },
  {
    id: 102,
    title: '1,200 NitroCoins',
    amount: 1200,
    price: 9.99,
    bonus: '200 de bonus',
    type: 'coin',
    description: 'El más popular. Recibe 200 monedas extra sin costo adicional.',
    image: '/images/currencies/nitro-coin.png'
  },
  {
    id: 103,
    title: '2,800 NitroCoins',
    amount: 2800,
    price: 19.99,
    bonus: '300 de bonus',
    type: 'coin',
    description: 'Gran valor. Perfecto para jugadores frecuentes.',
    image: '/images/currencies/nitro-coin.png'
  },
  {
    id: 104,
    title: '6,500 NitroCoins',
    amount: 6500,
    price: 39.99,
    bonus: '500 de bonus',
    type: 'coin',
    description: 'Paquete premium con el mejor ratio de valor por moneda.',
    image: '/images/currencies/nitro-coin.png'
  },
  {
    id: 105,
    title: '15,000 NitroCoins',
    amount: 15000,
    price: 79.99,
    bonus: '1,500 de bonus',
    type: 'coin',
    description: 'Para jugadores serios. El mayor paquete disponible.',
    image: '/images/currencies/nitro-coin.png'
  }
]

export const getCoinById = (id) => coins.find(c => c.id === Number(id))
