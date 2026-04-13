<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({ product: Object })
const router = useRouter()

const goToDetail = () => {
  router.push(`/product/${props.product.id}`)
}
</script>

<template>
  <article class="card glass-panel" @click="goToDetail">
    <div class="cover">
      <span class="category">{{ product.category }}</span>
      <img :src="product.image" :alt="product.title" />
    </div>

    <div class="content">
      <h3>{{ product.title }}</h3>
      <p>{{ product.description }}</p>
    </div>

    <div class="footer">
      <span class="price">${{ product.price }}</span>
      <button class="card-btn">Ver juego</button>
    </div>
  </article>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 100%;
  padding: 18px;
  border-radius: 24px;
  cursor: pointer;
  transition: transform 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease;
}

.card:hover {
  transform: translateY(-8px);
  border-color: rgba(99, 245, 210, 0.28);
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.38);
}

.cover {
  position: relative;
  display: grid;
  place-items: center;
  min-height: 320px;
  padding: 18px;
  border-radius: 18px;
  overflow: hidden;
  background:
    radial-gradient(circle at top, rgba(99, 245, 210, 0.16), transparent 45%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.02));
}

.cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 14px;
  box-shadow: 0 18px 44px rgba(0, 0, 0, 0.28);
}

.category {
  position: absolute;
  top: 12px;
  left: 12px;
  max-width: calc(100% - 24px);
  padding: 7px 11px;
  border-radius: 999px;
  background: rgba(3, 16, 24, 0.72);
  color: var(--accent);
  font-size: 0.74rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.content {
  padding-top: 18px;
}

.content h3 {
  margin: 0 0 10px;
  font-size: 1.12rem;
  line-height: 1.35;
  word-break: break-word;
}

.content p {
  margin: 0;
  color: var(--muted);
  font-size: 0.95rem;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.footer {
  margin-top: auto;
  padding-top: 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.price {
  font-family: var(--font-display);
  color: var(--accent);
  font-size: 1.7rem;
  letter-spacing: -0.04em;
}

.card-btn {
  min-height: 42px;
  padding: 0 18px;
  border-radius: 999px;
  color: #031018;
  background: linear-gradient(135deg, var(--accent) 0%, #8cf7de 100%);
  font-weight: 700;
}

@media (max-width: 520px) {
  .card {
    padding: 14px;
    border-radius: 20px;
  }

  .cover {
    min-height: 250px;
    padding: 14px;
  }

  .footer {
    flex-direction: column;
    align-items: stretch;
  }

  .card-btn {
    width: 100%;
  }
}
</style>
