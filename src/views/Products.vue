<script setup>
import { ref, computed } from 'vue'
import ProductCard from '../components/ProductCard.vue'
import { games } from '../data/games'

const products = ref(games)
const category = ref('all')

const categories = computed(() => ['all', ...new Set(products.value.map((p) => p.category))])

const filtered = computed(() => {
  if (category.value === 'all') return products.value
  return products.value.filter((p) => p.category === category.value)
})
</script>

<template>
  <section class="page-shell page-section products-page">
    <div class="products-hero glass-panel">
      <div>
        <span class="eyebrow">Catalogo gamer</span>
        <h1 class="section-title">Encuentra tu proxima aventura</h1>
        <p class="section-copy">
          Filtra el catalogo y navega por una cuadrícula más limpia, amplia y enfocada
          en destacar cada producto.
        </p>
      </div>

      <label class="filter-panel">
        <span>Categoria</span>
        <select v-model="category">
          <option v-for="c in categories" :key="c" :value="c">
            {{ c }}
          </option>
        </select>
      </label>
    </div>

    <div class="results-bar">
      <span class="tag">{{ filtered.length }} juegos visibles</span>
      <span class="results-copy">
        {{ category === 'all' ? 'Mostrando todo el catalogo' : `Filtro activo: ${category}` }}
      </span>
    </div>

    <div class="grid">
      <ProductCard v-for="p in filtered" :key="p.id" :product="p" />
    </div>
  </section>
</template>

<style scoped>
.products-page {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.products-hero {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  align-items: end;
  padding: 28px;
  border-radius: 28px;
}

.products-hero .section-copy {
  margin-top: 16px;
  max-width: 42rem;
}

.filter-panel {
  min-width: 240px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: var(--muted);
  font-size: 0.92rem;
}

.filter-panel span {
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.76rem;
}

.filter-panel select {
  min-height: 52px;
  padding: 0 16px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(5, 10, 18, 0.96);
  color: var(--text);
  outline: none;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}

.filter-panel select option {
  background: #000;
  color: var(--text);
}

.results-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.results-copy {
  color: var(--muted);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 22px;
}

@media (max-width: 860px) {
  .products-hero {
    flex-direction: column;
    align-items: stretch;
    padding: 22px;
  }

  .filter-panel {
    min-width: 100%;
  }
}

@media (max-width: 560px) {
  .products-page {
    gap: 18px;
  }

  .products-hero {
    gap: 18px;
    padding: 18px;
    border-radius: 22px;
  }

  .filter-panel select {
    width: 100%;
  }

  .results-bar {
    align-items: stretch;
  }

  .results-copy {
    font-size: 0.94rem;
  }

  .grid {
    grid-template-columns: 1fr;
    gap: 18px;
  }
}
</style>
