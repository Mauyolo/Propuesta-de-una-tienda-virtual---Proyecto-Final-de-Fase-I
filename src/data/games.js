const steamImage = (appId) =>
  `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${appId}/library_600x900_2x.jpg`

export const games = [
  {
    id: 1,
    title: 'Minecraft: Java & Bedrock Edition',
    price: 29.99,
    category: 'Sandbox',
    description:
      'Explora, construye y sobrevive con acceso a Java y Bedrock Edition en una experiencia creativa enorme y siempre rejugable.',
    image:
      'https://store-images.s-microsoft.com/image/apps.58378.14492077886571533.338a563a-86e7-47b1-b9dc-41cf411f5dcd.dc840f22-6e8f-4a59-b7bc-57958a0740fd?h=270&q=90&w=480'
  },
  {
    id: 2,
    title: 'Grand Theft Auto V',
    price: 39.99,
    category: 'Mundo abierto',
    description:
      'Vive golpes espectaculares, persecuciones intensas y una ciudad enorme con accion constante en Los Santos.',
    image: steamImage(3240220)
  },
  {
    id: 3,
    title: 'EA Sports FC 25',
    price: 49.99,
    category: 'Deportes',
    description:
      'Compite con tus clubes favoritos, domina cada partido y arma tu plantilla ideal en una experiencia futbolera moderna.',
    image: steamImage(2669320)
  },
  {
    id: 4,
    title: 'Plants vs. Zombies',
    price: 14.99,
    category: 'Estrategia',
    description:
      'Defiende tu jardin con plantas iconicas, estrategia ligera y oleadas de zombis en un clasico muy divertido.',
    image: steamImage(3590)
  },
  {
    id: 5,
    title: 'Forza Horizon 5',
    price: 44.99,
    category: 'Carreras',
    description:
      'Recorre Mexico en un festival de velocidad con autos espectaculares, clima dinamico y eventos por todas partes.',
    image: steamImage(1551360)
  },
  {
    id: 6,
    title: 'The Legend of Zelda: Tears of the Kingdom',
    price: 59.99,
    category: 'Aventura',
    description:
      'Descubre cielos, islas y secretos en una aventura epica con exploracion libre, puzzles y combate creativo.',
    image:
      'https://assets.nintendo.com/image/upload/ar_16%3A9%2Cb_auto%3Aborder%2Cc_lpad/b_white/f_auto/q_auto/dpr_1.5/store/software/switch/70010000063714/fb30eab428df3fc993b41c76e20f72e4d76d49734d17d31996b5ab61c414b117'
  },
  {
    id: 7,
    title: 'ARC Raiders',
    price: 39.99,
    category: 'Shooter',
    description:
      'Forma escuadrones, sobrevive en zonas hostiles y enfrentalte a amenazas mecanicas en una experiencia cooperativa futurista.',
    image: steamImage(1808500)
  },
  {
    id: 8,
    title: 'The Elder Scrolls V: Skyrim',
    price: 34.99,
    category: 'RPG',
    description:
      'Explora una tierra helada llena de dragones, magia, mazmorras y decisiones en uno de los RPG mas conocidos.',
    image: steamImage(489830)
  },
  {
    id: 9,
    title: 'Metro 2033 Redux',
    price: 24.99,
    category: 'Survival horror',
    description:
      'Sobrevive bajo las ruinas de Moscu en una aventura tensa, oscura y cargada de atmosfera postapocaliptica.',
    image: steamImage(286690)
  },
  {
    id: 10,
    title: 'Clair Obscur: Expedition 33',
    price: 54.99,
    category: 'RPG',
    description:
      'Sumate a una expedicion desesperada con combates por turnos estilizados y un mundo fantastico de gran impacto visual.',
    image: steamImage(1903340)
  },
  {
    id: 11,
    title: 'Final Fantasy VII Remake',
    price: 49.99,
    category: 'JRPG',
    description:
      'Revive Midgar con accion, narrativa cinematica y personajes iconicos en una reinterpretacion moderna del clasico.',
    image: steamImage(1462040)
  },
  {
    id: 12,
    title: 'The Last of Us Part I',
    price: 59.99,
    category: 'Accion y aventura',
    description:
      'Acompana a Joel y Ellie en un viaje brutal, emotivo y lleno de tension en un mundo devastado.',
    image: steamImage(1888930)
  },
  {
    id: 13,
    title: 'The Last of Us Part II Remastered',
    price: 59.99,
    category: 'Accion y aventura',
    description:
      'Continua la historia con una aventura intensa, mas cruda y centrada en el sigilo, la supervivencia y el drama.',
    image: steamImage(2531310)
  }
]

export const getGameById = (id) => games.find((game) => game.id === Number(id))
