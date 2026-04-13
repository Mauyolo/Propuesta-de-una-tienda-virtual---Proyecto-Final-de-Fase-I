<template>
  <section class="page-shell page-section home">
    <div class="hero-copy">
      <span class="eyebrow">Coleccion premium</span>
      <h1 class="hero-title">
        La Tienda ideal para tus <span class="accent-text">juegos favoritos</span>
      </h1>
      <p class="section-copy">
        Descubre lanzamientos, clásicos y ofertas con una presentación más clara,
        moderna y enfocada en convertir visitas en compras.
      </p>

      <div class="hero-actions">
        <router-link to="/products" class="btn btn-primary">Explorar catalogo</router-link>
        <router-link to="/cart" class="btn btn-secondary">Ver carrito</router-link>
      </div>

      <div class="hero-stats">
        <div class="stat glass-panel">
          <strong>+12</strong>
          <span>Titulos destacados</span>
        </div>
        <div class="stat glass-panel">
          <strong>24h</strong>
          <span>Ofertas relampago</span>
        </div>
        <div class="stat glass-panel">
          <strong>Top</strong>
          <span>Experiencia gamer</span>
        </div>
      </div>
    </div>

    <div class="hero-visual glass-panel">
      <div class="spotlight"></div>
      <div class="visual-card main-card categories-card">
        <span class="tag">Categorias</span>
        <h2>Explora por genero</h2>
        <div class="categories-grid">
          <span class="category-pill">Accion</span>
          <span class="category-pill">Aventura</span>
          <span class="category-pill">Indie</span>
          <span class="category-pill">Strategy</span>
          <span class="category-pill">RPG</span>
          <span class="category-pill">Shooter</span>
          <span class="category-pill">Sandbox</span>
          <span class="category-pill">Carreras</span>
        </div>
      </div>

      <div class="visual-card side-card">
        <span class="mini-label">Destacados</span>
        <strong>Accion, aventura e indie</strong>
        <p>
          Descubre categorias con mas movimiento dentro del catalogo y encuentra
          experiencias intensas, narrativas y propuestas creativas.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.home {
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 28px;
  align-items: stretch;
  min-height: calc(100vh - 120px);
}

.hero-copy,
.hero-visual {
  border-radius: var(--radius-xl);
}

.hero-copy {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;
  padding: 32px 0;
}

.hero-actions {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
}

.hero-stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
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
  color: var(--text);
}

.stat span {
  margin-top: 6px;
  color: var(--muted);
}

.hero-visual {
  position: relative;
  overflow: hidden;
  min-height: 540px;
  padding: 28px;
  background:
    radial-gradient(circle at 20% 20%, rgba(99, 245, 210, 0.2), transparent 30%),
    radial-gradient(circle at 80% 10%, rgba(255, 140, 90, 0.2), transparent 24%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.02));
}

.spotlight {
  position: absolute;
  inset: auto -120px -140px auto;
  width: 320px;
  height: 320px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(99, 245, 210, 0.28), transparent 70%);
}

.visual-card {
  position: absolute;
  border-radius: 28px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(5, 13, 23, 0.76);
  backdrop-filter: blur(14px);
}

.main-card {
  left: 34px;
  right: 90px;
  bottom: 34px;
  padding: 28px;
}

.main-card h2 {
  margin: 18px 0 10px;
  font-size: 2.3rem;
}

.main-card p {
  color: var(--muted);
  max-width: 24rem;
  line-height: 1.7;
}

.categories-card {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.categories-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 6px;
}

.category-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 16px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--text);
  font-weight: 700;
  letter-spacing: 0.02em;
}

.side-card {
  top: 52px;
  left: 50%;
  width: min(320px, calc(100% - 64px));
  padding: 24px;
  transform: translateX(-50%);
}

.mini-label {
  color: var(--accent-warm);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.72rem;
}

.side-card strong {
  display: block;
  margin-top: 12px;
  font-size: 1.55rem;
  line-height: 1.2;
}

.side-card p {
  margin: 12px 0 0;
  color: var(--muted);
  line-height: 1.65;
  font-size: 0.98rem;
}

@media (max-width: 900px) {
  .home {
    grid-template-columns: 1fr;
    min-height: auto;
  }

  .hero-visual {
    min-height: 420px;
  }

  .hero-stats {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .main-card {
    left: 18px;
    right: 18px;
    bottom: 18px;
  }

  .side-card {
    top: 18px;
    width: calc(100% - 36px);
  }
}
</style>

