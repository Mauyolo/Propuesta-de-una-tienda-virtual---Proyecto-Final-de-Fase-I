<script setup>
import { ref } from 'vue'
import { useCartStore } from '../store/cart'
import { games } from '../data/games'
import { gameCoinsCatalog } from '../data/gameCoins'
import { combos } from '../data/combos'
import ComboCard from '../components/ComboCard.vue'

const cart = useCartStore()

// Destacados: primeros 4 juegos
const featuredGames = games.slice(0, 4)

// Monedas populares: Genshin, Valorant, LoL
const popularCoins = gameCoinsCatalog.filter(g =>
  ['gc-genshin', 'gc-valorant', 'gc-lol'].includes(g.id)
)

// Combos destacados: primeros 3
const featuredCombos = combos.slice(0, 3)

const addCombo = (combo) => cart.addToCart({ ...combo })

// Categorías de la tienda
const sections = [
  {
    key: 'games',
    label: 'Juegos',
    emoji: '🎮',
    desc: 'Títulos AAA, indie y clásicos',
    to: '/products',
    color: '#63f5d2'
  },
  {
    key: 'coins',
    label: 'Monedas',
    emoji: '🪙',
    desc: 'Genesis Crystals, VP, RP y más',
    to: '/monedas',
    color: '#ffd04a'
  },
  {
    key: 'combos',
    label: 'Combos',
    emoji: '🔥',
    desc: 'Bundles con descuentos exclusivos',
    to: '/combos',
    color: '#ff8c5a'
  }
]
</script>

<template>
  <div class="home-page">

    <!-- ══ HERO ══════════════════════════════════════════════ -->
    <section class="page-shell hero-section">
      <div class="hero-content">
        <span class="eyebrow">🚀 Colección premium 2025</span>
        <h1 class="hero-title">
          La tienda gamer que
          <span class="accent-text">lo tiene todo</span>
        </h1>
        <p class="section-copy hero-copy-text">
          Juegos, monedas virtuales y bundles exclusivos — todo en un solo lugar.
          Entregas digitales instantáneas al mejor precio.
        </p>
        <div class="hero-actions">
          <router-link to="/products" class="btn btn-primary">🎮 Explorar catálogo</router-link>
          <router-link to="/monedas" class="btn btn-secondary">🪙 Ver monedas</router-link>
        </div>
        <div class="hero-stats">
          <div class="stat glass-panel">
            <strong>+13</strong>
            <span>Títulos AAA</span>
          </div>
          <div class="stat glass-panel">
            <strong>7</strong>
            <span>Juegos con monedas</span>
          </div>
          <div class="stat glass-panel">
            <strong>5</strong>
            <span>Bundles activos</span>
          </div>
        </div>
      </div>

      <div class="hero-visual glass-panel" aria-hidden="true">
        <div class="spotlight s1"></div>
        <div class="spotlight s2"></div>
        <div class="visual-grid">
          <div class="vg-card vg-main">
            <span class="vg-tag">🔥 Trending</span>
            <strong>Clair Obscur</strong>
            <p>RPG del momento</p>
          </div>
          <div class="vg-card vg-sm vg-coins">
            <span class="vg-emoji">💎</span>
            <span>Genesis Crystals</span>
            <small>Genshin Impact</small>
          </div>
          <div class="vg-card vg-sm vg-combo">
            <span class="vg-emoji">🔺</span>
            <span>Valorant Points</span>
            <small>Valorant</small>
          </div>
          <div class="vg-card vg-sm vg-bundle">
            <span class="vg-emoji">🔥</span>
            <span>Pack Supervivencia</span>
            <small>-17% descuento</small>
          </div>
        </div>
      </div>
    </section>

    <!-- ══ CATEGORÍAS ════════════════════════════════════════ -->
    <section class="page-shell categories-section">
      <div class="section-header">
        <h2 class="section-heading">Explora por sección</h2>
        <p class="section-copy">Todo lo que necesitas en tres categorías claras</p>
      </div>
      <div class="categories-grid">
        <router-link
          v-for="s in sections"
          :key="s.key"
          :to="s.to"
          class="cat-card glass-panel"
          :style="{ '--cat-color': s.color }"
        >
          <div class="cat-emoji">{{ s.emoji }}</div>
          <div class="cat-body">
            <strong class="cat-label">{{ s.label }}</strong>
            <span class="cat-desc">{{ s.desc }}</span>
          </div>
          <span class="cat-arrow">→</span>
        </router-link>
      </div>
    </section>

    <!-- ══ JUEGOS DESTACADOS ══════════════════════════════════ -->
    <section class="page-shell featured-section">
      <div class="section-header">
        <div>
          <h2 class="section-heading">🎮 Juegos destacados</h2>
          <p class="section-copy">Los títulos más populares de nuestra tienda</p>
        </div>
        <router-link to="/products" class="btn btn-secondary see-all">Ver todos →</router-link>
      </div>

      <div class="games-scroll">
        <article
          v-for="game in featuredGames"
          :key="game.id"
          class="game-mini-card glass-panel"
        >
          <div class="game-mini-cover">
            <img :src="game.image" :alt="game.title" />
            <span class="game-mini-cat">{{ game.category }}</span>
          </div>
          <div class="game-mini-body">
            <h3>{{ game.title }}</h3>
            <div class="game-mini-footer">
              <span class="price-sm">${{ game.price }}</span>
              <router-link :to="`/product/${game.id}`" class="btn btn-primary mini-btn">
                Ver
              </router-link>
            </div>
          </div>
        </article>
      </div>
    </section>

    <!-- ══ MONEDAS POPULARES ═════════════════════════════════ -->
    <section class="page-shell coins-section">
      <div class="section-header">
        <div>
          <h2 class="section-heading">🪙 Monedas populares</h2>
          <p class="section-copy">Recarga tus juegos favoritos al instante</p>
        </div>
        <router-link to="/monedas" class="btn btn-secondary see-all">Ver todas →</router-link>
      </div>

      <div class="popular-coins-grid">
        <router-link
          v-for="gc in popularCoins"
          :key="gc.id"
          to="/monedas"
          class="pop-coin-card glass-panel"
          :style="{ '--gc-color': gc.color }"
        >
          <div class="pop-coin-glow"></div>
          <div class="pop-coin-icon">{{ gc.currencySymbol }}</div>
          <div class="pop-coin-body">
            <span class="pop-coin-game">{{ gc.game }}</span>
            <span class="pop-coin-currency">{{ gc.currency }}</span>
            <span class="pop-coin-from">
              Desde <strong>${{ Math.min(...gc.packs.map(p => p.price)).toFixed(2) }}</strong>
            </span>
          </div>
          <span class="pop-coin-company" :style="{ color: gc.color }">{{ gc.company }}</span>
        </router-link>
      </div>
    </section>

    <!-- ══ COMBOS DESTACADOS ══════════════════════════════════ -->
    <section class="page-shell combos-section">
      <div class="section-header">
        <div>
          <h2 class="section-heading">🔥 Combos destacados</h2>
          <p class="section-copy">Bundles con los mejores descuentos</p>
        </div>
        <router-link to="/combos" class="btn btn-secondary see-all">Ver todos →</router-link>
      </div>

      <div class="combos-grid">
        <ComboCard
          v-for="combo in featuredCombos"
          :key="combo.id"
          :combo="combo"
          @add="addCombo"
        />
      </div>
    </section>

    <!-- ══ CTA BOTTOM ═════════════════════════════════════════ -->
    <section class="page-shell cta-section">
      <div class="cta-card glass-panel">
        <div class="cta-text">
          <h2>¿Listo para jugar?</h2>
          <p class="section-copy">Descubre más de 13 títulos y recarga tus juegos favoritos hoy.</p>
        </div>
        <div class="cta-actions">
          <router-link to="/products" class="btn btn-primary">Explorar catálogo</router-link>
          <router-link to="/combos" class="btn btn-secondary">Ver combos</router-link>
        </div>
      </div>
    </section>

  </div>
</template>

<style scoped>
.home-page {
  display: flex;
  flex-direction: column;
  gap: 0;
}

/* ── HERO ──────────────────────────────────────────────── */
.hero-section {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 28px;
  align-items: center;
  padding: 40px 0 60px;
}

.hero-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.hero-copy-text {
  max-width: 34rem;
}

.hero-actions {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
}

.hero-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}

.stat {
  padding: 18px;
  border-radius: 20px;
}

.stat strong,
.stat span {
  display: block;
}

.stat strong {
  font-family: var(--font-display);
  font-size: 1.6rem;
  color: var(--accent);
}

.stat span {
  margin-top: 6px;
  color: var(--muted);
  font-size: 0.88rem;
}

/* Hero visual */
.hero-visual {
  position: relative;
  min-height: 500px;
  border-radius: 32px;
  overflow: hidden;
  padding: 28px;
}

.spotlight {
  position: absolute;
  border-radius: 50%;
}

.s1 {
  top: -80px;
  left: -80px;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(99, 245, 210, 0.2), transparent 70%);
}

.s2 {
  bottom: -60px;
  right: -60px;
  width: 260px;
  height: 260px;
  background: radial-gradient(circle, rgba(255, 140, 90, 0.18), transparent 70%);
}

.visual-grid {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto auto;
  gap: 14px;
  height: 100%;
}

.vg-card {
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(12px);
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  transition: transform 0.2s, border-color 0.2s;
}

.vg-card:hover {
  transform: translateY(-3px);
  border-color: rgba(99, 245, 210, 0.25);
}

.vg-main {
  grid-column: 1 / -1;
}

.vg-tag {
  display: inline-flex;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(255, 140, 90, 0.15);
  color: var(--accent-warm);
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  width: fit-content;
}

.vg-main strong {
  font-family: var(--font-display);
  font-size: 1.4rem;
  color: var(--text);
}

.vg-main p {
  color: var(--muted);
  font-size: 0.9rem;
  margin: 0;
}

.vg-sm {
  align-items: flex-start;
}

.vg-emoji {
  font-size: 1.5rem;
}

.vg-sm span {
  font-weight: 700;
  font-size: 0.9rem;
}

.vg-sm small {
  color: var(--muted);
  font-size: 0.78rem;
}

.vg-coins { border-color: rgba(99, 245, 210, 0.2); }
.vg-combo { border-color: rgba(255, 70, 85, 0.2); }
.vg-bundle { border-color: rgba(255, 140, 90, 0.2); }

/* ── SECCIONES GENÉRICAS ───────────────────────────────── */
.categories-section,
.featured-section,
.coins-section,
.combos-section,
.cta-section {
  padding-top: 0;
  padding-bottom: 56px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 18px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.section-heading {
  margin: 0 0 8px;
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 3.5vw, 2.2rem);
  letter-spacing: -0.03em;
}

.see-all {
  flex-shrink: 0;
  min-height: 42px;
  padding: 0 18px;
  font-size: 0.9rem;
}

/* ── CATEGORÍAS ────────────────────────────────────────── */
.categories-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}

.cat-card {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 22px 24px;
  border-radius: 22px;
  text-decoration: none;
  transition: transform 0.2s, border-color 0.2s, background 0.2s;
}

.cat-card:hover {
  transform: translateY(-6px);
  border-color: var(--cat-color);
  background: color-mix(in srgb, var(--cat-color) 8%, var(--panel));
}

.cat-emoji {
  font-size: 2rem;
  flex-shrink: 0;
}

.cat-body {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}

.cat-label {
  font-size: 1.1rem;
  font-family: var(--font-display);
  color: var(--text);
}

.cat-desc {
  font-size: 0.82rem;
  color: var(--muted);
}

.cat-arrow {
  color: var(--cat-color);
  font-size: 1.2rem;
  opacity: 0;
  transform: translateX(-6px);
  transition: opacity 0.2s, transform 0.2s;
}

.cat-card:hover .cat-arrow {
  opacity: 1;
  transform: translateX(0);
}

/* ── JUEGOS DESTACADOS ─────────────────────────────────── */
.games-scroll {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
}

.game-mini-card {
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.22s, box-shadow 0.22s;
}

.game-mini-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 22px 60px rgba(0,0,0,0.4);
}

.game-mini-cover {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.game-mini-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.35s ease;
}

.game-mini-card:hover .game-mini-cover img {
  transform: scale(1.05);
}

.game-mini-cat {
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(3, 16, 24, 0.82);
  color: var(--accent);
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.07em;
}

.game-mini-body {
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
}

.game-mini-body h3 {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.35;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.game-mini-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  gap: 8px;
}

.price-sm {
  font-family: var(--font-display);
  color: var(--accent);
  font-size: 1.2rem;
  letter-spacing: -0.03em;
}

.mini-btn {
  min-height: 36px;
  padding: 0 14px;
  font-size: 0.85rem;
}

/* ── MONEDAS POPULARES ─────────────────────────────────── */
.popular-coins-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}

.pop-coin-card {
  position: relative;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 22px;
  border-radius: 22px;
  text-decoration: none;
  overflow: hidden;
  transition: transform 0.22s, border-color 0.22s;
}

.pop-coin-card:hover {
  transform: translateY(-5px);
  border-color: var(--gc-color);
}

.pop-coin-glow {
  position: absolute;
  top: -40px;
  right: -40px;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: radial-gradient(circle, color-mix(in srgb, var(--gc-color) 25%, transparent), transparent 70%);
  pointer-events: none;
}

.pop-coin-icon {
  font-size: 2.4rem;
  flex-shrink: 0;
}

.pop-coin-body {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}

.pop-coin-game {
  font-weight: 700;
  font-size: 0.95rem;
  color: var(--text);
}

.pop-coin-currency {
  font-size: 0.82rem;
  color: var(--muted);
}

.pop-coin-from {
  font-size: 0.85rem;
  color: var(--muted);
}

.pop-coin-from strong {
  color: var(--accent);
  font-family: var(--font-display);
}

.pop-coin-company {
  position: absolute;
  top: 14px;
  right: 16px;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

/* ── COMBOS ────────────────────────────────────────────── */
.combos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 22px;
}

/* ── CTA ───────────────────────────────────────────────── */
.cta-section {
  padding-bottom: 72px;
}

.cta-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 28px;
  padding: 36px 40px;
  border-radius: 28px;
  background:
    radial-gradient(circle at 80% 50%, rgba(99, 245, 210, 0.1), transparent 50%),
    var(--panel);
  flex-wrap: wrap;
}

.cta-text h2 {
  margin: 0 0 8px;
  font-family: var(--font-display);
  font-size: 1.9rem;
  letter-spacing: -0.04em;
}

.cta-actions {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
}

/* ── RESPONSIVE ────────────────────────────────────────── */
@media (max-width: 1100px) {
  .games-scroll {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 900px) {
  .hero-section {
    grid-template-columns: 1fr;
  }

  .hero-visual {
    min-height: 360px;
  }

  .categories-grid {
    grid-template-columns: 1fr;
  }

  .popular-coins-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 680px) {
  .hero-stats {
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
  }

  .hero-actions {
    flex-direction: column;
  }

  .games-scroll {
    grid-template-columns: 1fr;
  }

  .cta-card {
    flex-direction: column;
    text-align: center;
    padding: 28px 22px;
  }

  .cta-actions {
    width: 100%;
    flex-direction: column;
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 460px) {
  .hero-stats {
    grid-template-columns: 1fr;
  }
}
</style>
