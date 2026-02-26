<template>
  <div class="callback-page">
    <div class="callback-card">
      <div v-if="!error">
        <div class="callback-spinner"></div>
        <h1 class="callback-title">{{ statusMessage }}</h1>
      </div>

      <div v-if="error">
        <h1 class="callback-title">{{ statusMessage }}</h1>
        <p class="callback-error-text">{{ errorMessage }}</p>

        <div class="callback-info">
          <p>
            Intenta pedir un link nuevo o inicia sesión con correo y contraseña.
          </p>
        </div>

        <NuxtLink to="/" class="callback-btn">Volver al inicio</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { signInWithEmailLink } from "firebase/auth";
import { navigateTo } from "#app";

definePageMeta({ layout: false });

const { $auth } = useNuxtApp();
const user$ = useUser();

const statusMessage = ref("Iniciando sesión...");
const errorMessage = ref("");
const error = ref(false);

onMounted(async () => {
  let email = window.localStorage.getItem("emailForSignIn");

  if (!email) {
    const urlParams = new URLSearchParams(window.location.search);
    const urlEmail = urlParams.get("email");

    if (urlEmail) {
      email = urlEmail;
      window.localStorage.setItem("emailForSignIn", email);
    } else {
      error.value = true;
      statusMessage.value = "Error de sesión";
      errorMessage.value =
        "No encontramos tu correo. Por seguridad, abre el enlace en el mismo navegador donde lo solicitaste.";
      return;
    }
  }

  try {
    const { user } = await signInWithEmailLink($auth, email, window.location.href);

    user$.value = { uid: user.uid, email: user.email ?? undefined };

    try {
      const idToken = await user.getIdToken();
      await $fetch("/api/auth/sessionLogin", { method: "POST", body: { idToken } });
    } catch (e) {
      console.error("Error estableciendo cookie de sesión:", e);
    }

    window.localStorage.removeItem("emailForSignIn");
    statusMessage.value = "Acceso verificado...";
    navigateTo("/inicio");
  } catch (err) {
    console.error("Error en sign in:", err);
    error.value = true;
    statusMessage.value = "Algo salió mal";
    errorMessage.value =
      "No pudimos verificar tu enlace. Puede que haya expirado o ya fue utilizado. Intenta de nuevo.";
  }
});
</script>

<style scoped>
.callback-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-dark);
  padding: 2rem;
}

.callback-card {
  text-align: center;
  max-width: 480px;
  width: 100%;
  padding: 48px 36px;
  background: var(--bg-surface);
  border: 1px solid var(--border-hover);
  border-radius: var(--radius-xl);
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.3);
}

.callback-spinner {
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

.callback-title {
  font-family: var(--font-body);
  font-size: 24px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 12px;
  letter-spacing: -0.02em;
}

.callback-error-text {
  color: #FCA5A5;
  font-size: 15px;
  margin-bottom: 20px;
  line-height: 1.6;
}

.callback-info {
  background: var(--accent-glow);
  border: 1px solid rgba(62, 189, 79, 0.12);
  border-radius: var(--radius-md);
  padding: 14px;
  margin-bottom: 20px;
}

.callback-info p {
  font-size: 14px;
  color: var(--text-secondary);
  margin: 0;
}

.callback-btn {
  display: inline-flex;
  align-items: center;
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

.callback-btn:hover {
  background: var(--accent-hover);
  color: #fff;
  transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(62, 189, 79, 0.3);
}

@media (max-width: 640px) {
  .callback-page { padding: 1rem; }
  .callback-card { padding: 32px 24px; }
  .callback-title { font-size: 20px; }
}
</style>
