<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../store/cart'
import { processCheckout } from '../services/api'

const router = useRouter()
const cart = useCartStore()

// ─── Form state ──────────────────────────────────────────────────────────────
const form = ref({
  name: '',
  email: '',
  cardNumber: '',
  expiry: '',
  cvv: ''
})

const errors = ref({})
const loading = ref(false)
const step = ref(1) // 1 = form, 2 = processing, 3 = done

// ─── Computed ─────────────────────────────────────────────────────────────────
const itemCount = computed(() =>
  cart.cart.reduce((sum, p) => sum + p.quantity, 0)
)

// ─── Card formatting ──────────────────────────────────────────────────────────
const formatCard = (e) => {
  let val = e.target.value.replace(/\D/g, '').slice(0, 16)
  form.value.cardNumber = val.replace(/(.{4})/g, '$1 ').trim()
}

const formatExpiry = (e) => {
  let val = e.target.value.replace(/\D/g, '').slice(0, 4)
  if (val.length >= 3) val = val.slice(0, 2) + '/' + val.slice(2)
  form.value.expiry = val
}

// ─── Validation ───────────────────────────────────────────────────────────────
const validate = () => {
  const e = {}
  if (!form.value.name.trim()) e.name = 'El nombre es requerido'
  if (!form.value.email.includes('@')) e.email = 'Correo inválido'
  const digits = form.value.cardNumber.replace(/\s/g, '')
  if (digits.length !== 16) e.cardNumber = 'Número de tarjeta inválido'
  if (!/^\d{2}\/\d{2}$/.test(form.value.expiry)) e.expiry = 'Fecha inválida (MM/AA)'
  if (form.value.cvv.length < 3) e.cvv = 'CVV inválido'
  errors.value = e
  return Object.keys(e).length === 0
}

// ─── Submit ───────────────────────────────────────────────────────────────────
const submit = async () => {
  if (!validate()) return
  loading.value = true
  step.value = 2
  try {
    const result = await processCheckout(cart.cart, cart.total)
    if (result.success) {
      cart.clearCart()
      step.value = 3
      setTimeout(() => router.push({ name: 'OrderConfirmed', query: { orderId: result.orderId } }), 1800)
    }
  } catch {
    step.value = 1
    loading.value = false
  }
}
</script>

<template>
  <section class="page-shell page-section checkout-page">

    <!-- Empty cart guard -->
    <div v-if="cart.cart.length === 0 && step !== 3" class="empty-state glass-panel">
      <span style="font-size:3rem">🛒</span>
      <h2>Carrito vacío</h2>
      <p class="section-copy">Agrega productos antes de proceder al pago.</p>
      <router-link to="/products" class="btn btn-primary">Ver catálogo</router-link>
    </div>

    <!-- Processing overlay -->
    <div v-else-if="step === 2" class="processing-state glass-panel">
      <div class="spinner" aria-label="Procesando pago…"></div>
      <h2>Procesando tu pago…</h2>
      <p class="section-copy">Por favor espera un momento.</p>
    </div>

    <!-- Checkout form -->
    <div v-else-if="step === 1" class="checkout-layout">

      <!-- Form column -->
      <div class="form-col">
        <div class="glass-panel form-card">
          <span class="eyebrow">🔒 Pago seguro</span>
          <h1 class="section-title">Finalizar compra</h1>

          <form @submit.prevent="submit" novalidate>

            <!-- Personal info -->
            <fieldset>
              <legend>Datos personales</legend>
              <div class="field">
                <label for="checkout-name">Nombre completo</label>
                <input
                  id="checkout-name"
                  v-model="form.name"
                  type="text"
                  placeholder="Tu nombre"
                  :class="{ invalid: errors.name }"
                />
                <span v-if="errors.name" class="field-error">{{ errors.name }}</span>
              </div>
              <div class="field">
                <label for="checkout-email">Correo electrónico</label>
                <input
                  id="checkout-email"
                  v-model="form.email"
                  type="email"
                  placeholder="correo@ejemplo.com"
                  :class="{ invalid: errors.email }"
                />
                <span v-if="errors.email" class="field-error">{{ errors.email }}</span>
              </div>
            </fieldset>

            <!-- Payment info -->
            <fieldset>
              <legend>Información de pago</legend>
              <div class="field">
                <label for="checkout-card">Número de tarjeta</label>
                <input
                  id="checkout-card"
                  :value="form.cardNumber"
                  @input="formatCard"
                  type="text"
                  inputmode="numeric"
                  placeholder="1234 5678 9012 3456"
                  maxlength="19"
                  :class="{ invalid: errors.cardNumber }"
                />
                <span v-if="errors.cardNumber" class="field-error">{{ errors.cardNumber }}</span>
              </div>
              <div class="field-row">
                <div class="field">
                  <label for="checkout-expiry">Vencimiento</label>
                  <input
                    id="checkout-expiry"
                    :value="form.expiry"
                    @input="formatExpiry"
                    type="text"
                    inputmode="numeric"
                    placeholder="MM/AA"
                    maxlength="5"
                    :class="{ invalid: errors.expiry }"
                  />
                  <span v-if="errors.expiry" class="field-error">{{ errors.expiry }}</span>
                </div>
                <div class="field">
                  <label for="checkout-cvv">CVV</label>
                  <input
                    id="checkout-cvv"
                    v-model="form.cvv"
                    type="text"
                    inputmode="numeric"
                    placeholder="123"
                    maxlength="4"
                    :class="{ invalid: errors.cvv }"
                  />
                  <span v-if="errors.cvv" class="field-error">{{ errors.cvv }}</span>
                </div>
              </div>
            </fieldset>

            <div class="secure-notice">
              <span>🔒</span>
              <span>Pago simulado — tus datos no se envían a ningún servidor real</span>
            </div>

            <button type="submit" class="btn btn-primary submit-btn">
              Pagar ${{ cart.total.toFixed(2) }}
            </button>
          </form>
        </div>
      </div>

      <!-- Summary column -->
      <aside class="summary-col">
        <div class="glass-panel summary-card">
          <h2>Resumen</h2>
          <ul class="summary-items">
            <li v-for="item in cart.cart" :key="item.id" class="summary-item">
              <img :src="item.image" :alt="item.title" class="summary-img" />
              <div class="summary-item-info">
                <span class="summary-item-title">{{ item.title }}</span>
                <span class="summary-item-qty">x{{ item.quantity }}</span>
              </div>
              <strong class="summary-item-price">${{ (item.price * item.quantity).toFixed(2) }}</strong>
            </li>
          </ul>
          <div class="summary-divider"></div>
          <div class="summary-row">
            <span>Productos</span>
            <strong>{{ itemCount }}</strong>
          </div>
          <div class="summary-row total-row">
            <span>Total</span>
            <strong class="total-amount">${{ cart.total.toFixed(2) }}</strong>
          </div>
        </div>
      </aside>

    </div>

  </section>
</template>

<style scoped>
.checkout-page {
  padding-top: 28px;
}

/* Empty / Processing states */
.empty-state,
.processing-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 18px;
  min-height: 420px;
  text-align: center;
  padding: 40px;
  border-radius: 32px;
}

.empty-state h2,
.processing-state h2 {
  margin: 0;
  font-size: 1.8rem;
}

/* Spinner */
.spinner {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: 4px solid rgba(99, 245, 210, 0.15);
  border-top-color: var(--accent);
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Layout */
.checkout-layout {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 24px;
  align-items: start;
}

/* Form card */
.form-card {
  padding: 32px;
  border-radius: 32px;
}

.form-card .section-title {
  margin: 14px 0 28px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

fieldset {
  border: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

legend {
  font-weight: 700;
  font-size: 1rem;
  color: var(--text);
  margin-bottom: 14px;
  padding: 0;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 7px;
  flex: 1;
}

.field label {
  font-size: 0.84rem;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.field input {
  height: 52px;
  padding: 0 16px;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.04);
  color: var(--text);
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;
}

.field input:focus {
  border-color: rgba(99, 245, 210, 0.4);
}

.field input.invalid {
  border-color: rgba(255, 80, 80, 0.5);
}

.field-error {
  font-size: 0.8rem;
  color: #ff6b6b;
}

.field-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

.secure-notice {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 18px;
  border-radius: 14px;
  background: rgba(99, 245, 210, 0.06);
  border: 1px solid rgba(99, 245, 210, 0.14);
  color: var(--muted);
  font-size: 0.88rem;
}

.submit-btn {
  width: 100%;
  font-size: 1.05rem;
  min-height: 56px;
}

/* Summary */
.summary-card {
  padding: 28px;
  border-radius: 28px;
  position: sticky;
  top: 100px;
}

.summary-card h2 {
  margin: 0 0 20px;
  font-size: 1.3rem;
}

.summary-items {
  list-style: none;
  margin: 0 0 18px;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.summary-item {
  display: grid;
  grid-template-columns: 50px 1fr auto;
  align-items: center;
  gap: 12px;
}

.summary-img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.05);
}

.summary-item-info {
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
}

.summary-item-title {
  font-size: 0.9rem;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.summary-item-qty {
  color: var(--muted);
  font-size: 0.82rem;
}

.summary-item-price {
  font-family: var(--font-display);
  color: var(--accent);
  font-size: 1rem;
  white-space: nowrap;
}

.summary-divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.08);
  margin-bottom: 16px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  gap: 14px;
  padding: 10px 0;
  font-size: 0.95rem;
  color: var(--muted);
}

.summary-row strong {
  color: var(--text);
}

.total-row {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  margin-top: 4px;
  padding-top: 14px;
  font-size: 1rem;
  font-weight: 700;
  color: var(--text);
}

.total-amount {
  font-family: var(--font-display);
  color: var(--accent) !important;
  font-size: 1.5rem;
  letter-spacing: -0.03em;
}

@media (max-width: 960px) {
  .checkout-layout {
    grid-template-columns: 1fr;
  }

  .summary-card {
    position: static;
    order: -1;
  }
}

@media (max-width: 560px) {
  .form-card {
    padding: 22px;
  }

  .field-row {
    grid-template-columns: 1fr;
  }
}
</style>
