<script setup>
/**
 * ComboCard.vue
 * Card reutilizable para la vista Combos y Home destacados.
 * Emite 'add' cuando el usuario quiere agregar al carrito.
 */
const props = defineProps({
  combo: { type: Object, required: true }
})
const emit = defineEmits(['add'])
</script>

<template>
  <article class="combo-card glass-panel">
    <div class="combo-image-wrap">
      <img :src="combo.image" :alt="combo.title" class="combo-img" />
      <span class="combo-badge">{{ combo.badge }}</span>
      <span class="discount-pill">-{{ combo.discount }}%</span>
    </div>

    <div class="combo-body">
      <h2>{{ combo.title }}</h2>
      <p class="section-copy">{{ combo.description }}</p>

      <ul class="combo-items">
        <li v-for="item in combo.items" :key="item">
          <span class="check">✓</span>{{ item }}
        </li>
      </ul>

      <div class="combo-footer">
        <div class="price-block">
          <span class="original-price">${{ combo.originalPrice.toFixed(2) }}</span>
          <span class="price-highlight">${{ combo.price.toFixed(2) }}</span>
        </div>
        <button class="btn btn-primary" @click="emit('add', combo)">
          🛒 Agregar al carrito
        </button>
      </div>
    </div>
  </article>
</template>

<style scoped>
.combo-card {
  border-radius: 28px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.22s ease, box-shadow 0.22s ease;
}

.combo-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 28px 70px rgba(0, 0, 0, 0.42);
}

.combo-image-wrap {
  position: relative;
  height: 220px;
  overflow: hidden;
}

.combo-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.combo-card:hover .combo-img {
  transform: scale(1.04);
}

.combo-badge {
  position: absolute;
  top: 14px;
  left: 14px;
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(3, 16, 24, 0.82);
  color: var(--accent);
  font-size: 0.74rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  backdrop-filter: blur(8px);
}

.discount-pill {
  position: absolute;
  top: 14px;
  right: 14px;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(135deg, #ff6b35, #ff8c5a);
  color: #fff;
  font-size: 0.82rem;
  font-weight: 800;
}

.combo-body {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  flex: 1;
}

.combo-body h2 {
  margin: 0;
  font-size: 1.3rem;
  line-height: 1.3;
}

.combo-items {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.combo-items li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.93rem;
  color: var(--muted);
}

.check {
  color: var(--accent);
  font-weight: 700;
  flex-shrink: 0;
}

.combo-footer {
  margin-top: auto;
  padding-top: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
  flex-wrap: wrap;
}

.price-block {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.original-price {
  color: var(--muted);
  font-size: 0.9rem;
  text-decoration: line-through;
}

@media (max-width: 480px) {
  .combo-footer {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
