<template>
  <div class="pago-result">
    <div v-if="isLoading" class="result-card loading">
      <div class="result-spinner"></div>
      <h1 class="result-title">Verificando tu suscripción...</h1>
    </div>

    <div v-else-if="subscriptionStatus === 'authorized'" class="result-card success">
      <span class="result-icon">✅</span>
      <h1 class="result-title">¡Todo listo!</h1>
      <p class="result-description">
        Tu suscripción está activa. ¡A preparar tu examen DGAC!
      </p>
      <div class="result-countdown">
        <p>Redirigiendo en {{ redirectCountdown }} segundo{{ redirectCountdown !== 1 ? 's' : '' }}...</p>
      </div>
      <NuxtLink
        v-if="userEmail"
        :to="`/crear-contrasena?email=${encodeURIComponent(userEmail)}`"
        class="result-button"
      >
        Crear contraseña ahora
      </NuxtLink>
    </div>

    <div v-else class="result-card error">
      <span class="result-icon">⚠️</span>
      <h1 class="result-title">Hubo un problema</h1>
      <p class="result-description">
        No se pudo confirmar tu suscripción. Si el pago fue exitoso, revisa tu correo.
        El proceso puede tardar unos minutos.
      </p>
      <NuxtLink to="/#planes" class="result-button">Ver planes</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

definePageMeta({ layout: false });

const route = useRoute();
const router = useRouter();
const subscriptionStatus = ref("");
const isLoading = ref(true);
const userEmail = ref("");
const redirectCountdown = ref(5);

let redirectTimer: ReturnType<typeof setTimeout> | null = null;
let countdownInterval: ReturnType<typeof setInterval> | null = null;

onMounted(async () => {
  const preapprovalId = route.query.preapproval_id as string;
  const preferenceId = route.query.preference_id as string;
  const externalReference = route.query.external_reference as string;
  const collectionStatus = route.query.collection_status as string;

  if (preapprovalId || preferenceId) {
    try {
      const data = await $fetch("/api/payments/confirm", {
        method: "POST",
        body: { preapprovalId, preferenceId, collectionStatus, externalReference },
      });

      subscriptionStatus.value = data.status === "authorized" || data.status === "approved" ? "authorized" : data.status;
      userEmail.value = data.email || "";

      if (subscriptionStatus.value === "authorized" && userEmail.value) {
        startRedirectCountdown();
      }
    } catch (error) {
      console.error("Error fetching subscription status:", error);
      subscriptionStatus.value = "error";
    }
  } else {
    subscriptionStatus.value = "missing_id";
  }

  isLoading.value = false;
});

const startRedirectCountdown = () => {
  countdownInterval = setInterval(() => {
    redirectCountdown.value--;
    if (redirectCountdown.value <= 0 && countdownInterval) {
      clearInterval(countdownInterval);
    }
  }, 1000);

  redirectTimer = setTimeout(() => {
    if (userEmail.value) {
      router.push(`/crear-contrasena?email=${encodeURIComponent(userEmail.value)}`);
    }
  }, 5000);
};

onUnmounted(() => {
  if (redirectTimer) clearTimeout(redirectTimer);
  if (countdownInterval) clearInterval(countdownInterval);
});
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
  border: 1px solid;
  border-radius: var(--radius-xl);
}

.result-card.loading {
  border-color: var(--border-hover);
  background: var(--bg-surface);
}

.result-card.success {
  border-color: rgba(62, 189, 79, 0.3);
  background: linear-gradient(160deg, var(--bg-surface) 0%, rgba(62, 189, 79, 0.04) 100%);
  box-shadow: 0 0 60px rgba(62, 189, 79, 0.08);
}

.result-card.error {
  border-color: rgba(239, 68, 68, 0.3);
  background: linear-gradient(160deg, var(--bg-surface) 0%, rgba(239, 68, 68, 0.04) 100%);
}

.result-spinner {
  width: 48px;
  height: 48px;
  border: 3px solid var(--border-hover);
  border-top-color: var(--accent);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin: 0 auto 24px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
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

.result-countdown {
  background: var(--accent-glow);
  border: 1px solid rgba(62, 189, 79, 0.2);
  border-radius: var(--radius-md);
  padding: 12px 16px;
  margin-bottom: 20px;
}

.result-countdown p {
  font-size: 14px;
  color: var(--text-secondary);
  margin: 0;
}

.result-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 28px;
  background: var(--accent);
  color: #fff;
  font-weight: 600;
  font-size: 15px;
  text-decoration: none;
  border-radius: var(--radius-md);
  transition: all 0.25s ease;
  box-shadow: 0 2px 8px rgba(62, 189, 79, 0.2);
}

.result-button:hover {
  background: var(--accent-hover);
  color: #fff;
  transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(62, 189, 79, 0.3);
}

@media (max-width: 640px) {
  .pago-result { padding: 1rem; }
  .result-card { padding: 32px 24px; }
  .result-title { font-size: 22px; }
}
</style>
