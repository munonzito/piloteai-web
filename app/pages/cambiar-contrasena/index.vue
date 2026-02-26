<template>
  <div class="cambiar-page">
    <div class="cambiar-container">
      <div class="cambiar-card">
        <NuxtLink to="/" class="cambiar-logo">Piloteai</NuxtLink>

        <!-- Success -->
        <div v-if="success" class="text-center">
          <span class="cambiar-icon">✅</span>
          <h1 class="cambiar-title">Contraseña actualizada</h1>
          <p class="cambiar-text">Tu contraseña ha sido configurada correctamente. Iniciando sesión...</p>
          <div class="cambiar-spinner-wrap">
            <div class="cambiar-spinner"></div>
          </div>
        </div>

        <!-- Error: invalid/expired code -->
        <div v-else-if="codeError" class="text-center">
          <span class="cambiar-icon">⚠️</span>
          <h1 class="cambiar-title">Enlace inválido</h1>
          <p class="cambiar-text">Este enlace ha expirado o ya fue utilizado. Solicita uno nuevo.</p>
          <NuxtLink to="/acceder?mode=password" class="cambiar-btn">Volver a iniciar sesión</NuxtLink>
        </div>

        <!-- Form -->
        <div v-else>
          <h1 class="cambiar-title">Nueva contraseña</h1>
          <p class="cambiar-text">Ingresa tu nueva contraseña para acceder a Piloteai.</p>

          <form @submit.prevent="handleReset">
            <div class="cambiar-field">
              <label class="cambiar-label">Nueva contraseña</label>
              <input
                v-model="newPassword"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Mínimo 6 caracteres"
                class="cambiar-input"
                :disabled="loading"
                required
              />
              <p v-if="newPassword && newPassword.length < 6" class="cambiar-hint error">
                La contraseña debe tener al menos 6 caracteres
              </p>
            </div>

            <div class="cambiar-field">
              <label class="cambiar-label">Confirmar contraseña</label>
              <input
                v-model="confirmPassword"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Repite tu contraseña"
                class="cambiar-input"
                :disabled="loading"
                required
              />
              <p v-if="confirmPassword && newPassword !== confirmPassword" class="cambiar-hint error">
                Las contraseñas no coinciden
              </p>
            </div>

            <label class="cambiar-show-password">
              <input type="checkbox" v-model="showPassword" />
              <span>Mostrar contraseña</span>
            </label>

            <div v-if="errorMessage" class="cambiar-error">{{ errorMessage }}</div>

            <button type="submit" :disabled="loading || !isFormValid" class="cambiar-btn">
              {{ loading ? 'Guardando...' : 'Guardar contraseña' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { confirmPasswordReset, signInWithEmailAndPassword, verifyPasswordResetCode } from "firebase/auth";

definePageMeta({ layout: false });

const route = useRoute();
const router = useRouter();
const { $auth } = useNuxtApp();

const newPassword = ref("");
const confirmPassword = ref("");
const showPassword = ref(false);
const loading = ref(false);
const errorMessage = ref("");
const success = ref(false);
const codeError = ref(false);
const userEmail = ref("");

const oobCode = route.query.oobCode as string;

onMounted(async () => {
  if (!oobCode) {
    codeError.value = true;
    return;
  }

  try {
    const email = await verifyPasswordResetCode($auth, oobCode);
    userEmail.value = email;
  } catch {
    codeError.value = true;
  }
});

const isFormValid = computed(() => {
  return (
    newPassword.value &&
    newPassword.value.length >= 6 &&
    confirmPassword.value &&
    newPassword.value === confirmPassword.value
  );
});

const handleReset = async () => {
  if (!isFormValid.value || loading.value) return;
  loading.value = true;
  errorMessage.value = "";

  try {
    await confirmPasswordReset($auth, oobCode, newPassword.value);
    success.value = true;

    if (userEmail.value) {
      try {
        const userCredential = await signInWithEmailAndPassword($auth, userEmail.value, newPassword.value);
        const idToken = await userCredential.user.getIdToken();
        await $fetch("/api/auth/sessionLogin", { method: "POST", body: { idToken } });
      } catch (e) {
        console.error("Error auto-signing in:", e);
      }
    }

    setTimeout(() => {
      router.push("/inicio");
    }, 2000);
  } catch (error: any) {
    if (error.code === "auth/expired-action-code" || error.code === "auth/invalid-action-code") {
      codeError.value = true;
    } else if (error.code === "auth/weak-password") {
      errorMessage.value = "La contraseña es muy débil. Usa al menos 6 caracteres.";
    } else {
      errorMessage.value = "Error al cambiar la contraseña. Intenta de nuevo.";
    }
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.cambiar-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-dark);
  padding: 2rem;
}

.cambiar-container {
  width: 100%;
  max-width: 440px;
}

.cambiar-card {
  background: var(--bg-surface);
  border: 1px solid var(--border-hover);
  border-radius: var(--radius-xl);
  padding: 40px 32px;
  text-align: center;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.3);
}

.cambiar-logo {
  display: inline-block;
  font-family: var(--font-body);
  font-size: 20px;
  font-weight: 700;
  color: var(--accent);
  text-decoration: none;
  margin-bottom: 24px;
  letter-spacing: -0.02em;
}

.cambiar-icon {
  font-size: 48px;
  display: block;
  margin-bottom: 16px;
}

.cambiar-title {
  font-family: var(--font-body);
  font-size: 24px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 12px;
  letter-spacing: -0.02em;
}

.cambiar-text {
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 24px;
  line-height: 1.6;
}

.text-center { text-align: center; }

.cambiar-field {
  margin-bottom: 16px;
  text-align: left;
}

.cambiar-label {
  display: block;
  font-size: 13px;
  color: var(--text-secondary);
  margin-bottom: 6px;
  font-weight: 500;
}

.cambiar-input {
  width: 100%;
  padding: 13px 16px;
  font-size: 15px;
  border: 1px solid var(--border-hover);
  background: var(--bg-dark);
  color: var(--text-primary);
  border-radius: var(--radius-md);
  font-family: var(--font-body);
  outline: none;
  transition: border-color 0.2s;
  box-sizing: border-box;
}

.cambiar-input::placeholder { color: var(--text-muted); }
.cambiar-input:focus { border-color: var(--accent); }
.cambiar-input:disabled { opacity: 0.5; }

.cambiar-hint {
  font-size: 12px;
  margin-top: 4px;
}

.cambiar-hint.error { color: #EF4444; }

.cambiar-show-password {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-secondary);
  font-size: 13px;
  margin-bottom: 24px;
  cursor: pointer;
}

.cambiar-show-password input { accent-color: var(--accent); }

.cambiar-btn {
  display: block;
  width: 100%;
  padding: 14px;
  font-size: 15px;
  font-weight: 600;
  background: var(--accent);
  color: #fff;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.25s ease;
  font-family: var(--font-body);
  text-align: center;
  text-decoration: none;
  box-shadow: 0 2px 8px rgba(62, 189, 79, 0.2);
}

.cambiar-btn:hover:not(:disabled) {
  background: var(--accent-hover);
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(62, 189, 79, 0.3);
}

.cambiar-btn:disabled { opacity: 0.5; cursor: not-allowed; }

.cambiar-error {
  margin-bottom: 16px;
  padding: 12px 16px;
  border: 1px solid rgba(239, 68, 68, 0.3);
  background: rgba(239, 68, 68, 0.08);
  border-radius: var(--radius-sm);
  color: #FCA5A5;
  font-size: 14px;
  text-align: left;
}

.cambiar-spinner-wrap {
  display: flex;
  justify-content: center;
  margin-top: 16px;
}

.cambiar-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid var(--border-hover);
  border-top-color: var(--accent);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (max-width: 640px) {
  .cambiar-page { padding: 1rem; }
  .cambiar-card { padding: 28px 20px; }
  .cambiar-title { font-size: 20px; }
}
</style>
