<template>
  <div class="crear-page">
    <div class="crear-container">
      <div class="crear-card">
        <h1 class="crear-title">Configura tu contraseña</h1>

        <div v-if="userHasPassword" class="text-center">
          <div class="crear-warning-box">
            <p>Ya tienes una contraseña configurada. Usa "Recuperar contraseña" para cambiarla.</p>
          </div>
          <NuxtLink to="/acceder" class="crear-btn">Ir a iniciar sesión</NuxtLink>
        </div>

        <form v-else @submit.prevent="handleCreatePassword">
          <div class="crear-field">
            <label class="crear-label">Correo electrónico</label>
            <input :value="email" type="email" disabled class="crear-input disabled" />
          </div>

          <div class="crear-field">
            <label class="crear-label">Contraseña</label>
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Mínimo 6 caracteres"
              class="crear-input"
              :disabled="loading"
              required
            />
            <p v-if="password && password.length < 6" class="crear-hint error">
              La contraseña debe tener al menos 6 caracteres
            </p>
          </div>

          <div class="crear-field">
            <label class="crear-label">Confirmar contraseña</label>
            <input
              v-model="confirmPassword"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Repite tu contraseña"
              class="crear-input"
              :disabled="loading"
              required
            />
            <p v-if="confirmPassword && password !== confirmPassword" class="crear-hint error">
              Las contraseñas no coinciden
            </p>
          </div>

          <label class="crear-show-password">
            <input type="checkbox" v-model="showPassword" />
            <span>Mostrar contraseña</span>
          </label>

          <div v-if="errorMessage" class="crear-error">{{ errorMessage }}</div>

          <button type="submit" :disabled="loading || !isFormValid" class="crear-btn">
            {{ loading ? 'Configurando...' : 'Configurar contraseña' }}
          </button>
        </form>

        <div v-if="!userHasPassword" class="crear-info">
          <p>También puedes acceder usando el link que enviamos a tu correo.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { signInWithEmailAndPassword } from "firebase/auth";

definePageMeta({ layout: false });

const route = useRoute();
const router = useRouter();
const { $auth } = useNuxtApp();

const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const showPassword = ref(false);
const loading = ref(false);
const errorMessage = ref("");
const userHasPassword = ref(false);

onMounted(() => {
  const emailParam = route.query.email as string;
  if (!emailParam) {
    router.push("/acceder");
    return;
  }
  email.value = emailParam;
});

const isFormValid = computed(() => {
  return (
    email.value &&
    password.value &&
    password.value.length >= 6 &&
    confirmPassword.value &&
    password.value === confirmPassword.value
  );
});

const handleCreatePassword = async () => {
  if (!isFormValid.value || loading.value) return;
  loading.value = true;
  errorMessage.value = "";

  try {
    const response = await $fetch("/api/auth/createUserWithPassword", {
      method: "POST",
      body: { email: email.value, password: password.value },
    });

    if (response.exists && response.hasPassword) {
      userHasPassword.value = true;
      loading.value = false;
      return;
    }

    if (response.success) {
      try {
        const userCredential = await signInWithEmailAndPassword($auth, email.value, password.value);
        const user = userCredential.user;

        try {
          const idToken = await user.getIdToken();
          await $fetch("/api/auth/sessionLogin", { method: "POST", body: { idToken } });
        } catch (e) {
          console.error("Error setting session cookie:", e);
        }

        router.push("/inicio");
      } catch (signInError) {
        console.error("Error signing in after password setup:", signInError);
        errorMessage.value =
          "Contraseña configurada pero hubo un error al iniciar sesión. Intenta iniciar sesión manualmente.";
        loading.value = false;
      }
    }
  } catch (error: any) {
    if (error.statusCode === 400) {
      errorMessage.value = error.data?.statusMessage || "Datos inválidos.";
    } else {
      errorMessage.value = "Error al crear la cuenta. Intenta de nuevo.";
    }
    loading.value = false;
  }
};
</script>

<style scoped>
.crear-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-dark);
  padding: 2rem;
}

.crear-container {
  width: 100%;
  max-width: 440px;
}

.crear-card {
  background: var(--bg-surface);
  border: 1px solid var(--border-hover);
  border-radius: var(--radius-xl);
  padding: 40px 32px;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.3);
}

.crear-title {
  font-family: var(--font-body);
  font-size: 24px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 28px;
  text-align: center;
  letter-spacing: -0.02em;
}

.text-center {
  text-align: center;
}

.crear-field {
  margin-bottom: 16px;
}

.crear-label {
  display: block;
  font-size: 13px;
  color: var(--text-secondary);
  margin-bottom: 6px;
  font-weight: 500;
}

.crear-input {
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

.crear-input::placeholder {
  color: var(--text-muted);
}

.crear-input:focus {
  border-color: var(--accent);
}

.crear-input.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.crear-hint {
  font-size: 12px;
  margin-top: 4px;
}

.crear-hint.error {
  color: #EF4444;
}

.crear-show-password {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-secondary);
  font-size: 13px;
  margin-bottom: 24px;
  cursor: pointer;
}

.crear-show-password input {
  accent-color: var(--accent);
}

.crear-btn {
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

.crear-btn:hover:not(:disabled) {
  background: var(--accent-hover);
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(62, 189, 79, 0.3);
}

.crear-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.crear-error {
  margin-bottom: 16px;
  padding: 12px 16px;
  border: 1px solid rgba(239, 68, 68, 0.3);
  background: rgba(239, 68, 68, 0.08);
  border-radius: var(--radius-sm);
  color: #FCA5A5;
  font-size: 14px;
}

.crear-warning-box {
  background: rgba(245, 158, 11, 0.08);
  border: 1px solid rgba(245, 158, 11, 0.3);
  border-radius: var(--radius-md);
  padding: 16px;
  margin-bottom: 20px;
}

.crear-warning-box p {
  color: #FDE68A;
  font-size: 14px;
  margin: 0;
}

.crear-info {
  background: var(--accent-glow);
  border: 1px solid rgba(62, 189, 79, 0.12);
  border-radius: var(--radius-md);
  padding: 14px;
  margin-top: 20px;
  text-align: center;
}

.crear-info p {
  font-size: 13px;
  color: var(--text-muted);
  margin: 0;
}

@media (max-width: 640px) {
  .crear-page { padding: 1rem; }
  .crear-card { padding: 28px 20px; }
  .crear-title { font-size: 20px; }
}
</style>
