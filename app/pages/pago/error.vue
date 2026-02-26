<template>
  <div class="pago-result">
    <div class="result-card error">
      <span class="result-icon">❌</span>
      <h1 class="result-title">Error en el pago</h1>
      <p class="result-description">
        Hubo un problema procesando tu pago. Por favor, intenta de nuevo.
      </p>
      <NuxtLink to="/" class="result-button">Volver al inicio</NuxtLink>
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

.result-card.error {
  border: 1px solid rgba(239, 68, 68, 0.3);
  background: linear-gradient(160deg, var(--bg-surface) 0%, rgba(239, 68, 68, 0.04) 100%);
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
  background: var(--bg-elevated);
  border: 1px solid var(--border-hover);
  color: var(--text-primary);
  font-weight: 600;
  font-size: 15px;
  text-decoration: none;
  border-radius: var(--radius-md);
  transition: all 0.2s ease;
}

.result-button:hover {
  background: rgba(255,255,255,0.06);
  color: var(--text-primary);
}

@media (max-width: 640px) {
  .pago-result { padding: 1rem; }
  .result-card { padding: 32px 24px; }
  .result-title { font-size: 22px; }
}
</style>
