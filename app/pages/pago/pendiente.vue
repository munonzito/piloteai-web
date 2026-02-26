<template>
  <div class="pago-result">
    <div class="result-card pending">
      <span class="result-icon">⏳</span>
      <h1 class="result-title">Pago pendiente</h1>
      <p class="result-description">
        Tu pago está siendo procesado. Te notificaremos cuando se confirme.
      </p>
      <NuxtLink to="/" class="result-button">Ir al inicio</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false });
</script>

<style scoped>
.pago-result {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-dark);
  padding: 2rem;
}

.result-card {
  text-align: center;
  max-width: 480px;
  width: 100%;
  padding: 48px 36px;
  border-radius: var(--radius-xl);
}

.result-card.pending {
  border: 1px solid rgba(245, 158, 11, 0.3);
  background: linear-gradient(160deg, var(--bg-surface) 0%, rgba(245, 158, 11, 0.04) 100%);
}

.result-icon {
  font-size: 48px;
  display: block;
  margin-bottom: 16px;
}

.result-title {
  font-family: var(--font-body);
  font-size: 28px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 12px;
  letter-spacing: -0.02em;
}

.result-description {
  font-size: 15px;
  color: var(--text-secondary);
  margin-bottom: 28px;
  line-height: 1.6;
}

.result-button {
  display: inline-flex;
  align-items: center;
  padding: 14px 28px;
  background: rgba(245, 158, 11, 0.15);
  border: 1px solid rgba(245, 158, 11, 0.3);
  color: #F59E0B;
  font-weight: 600;
  font-size: 15px;
  text-decoration: none;
  border-radius: var(--radius-md);
  transition: all 0.2s ease;
}

.result-button:hover {
  background: rgba(245, 158, 11, 0.2);
  color: #F59E0B;
}

@media (max-width: 640px) {
  .pago-result { padding: 1rem; }
  .result-card { padding: 32px 24px; }
  .result-title { font-size: 22px; }
}
</style>
