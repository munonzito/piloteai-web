<template>
  <div class="acceder-page">
    <div class="acceder-container">
      <div class="acceder-card">
        <NuxtLink to="/" class="acceder-logo">Piloteai</NuxtLink>
        <h1 class="acceder-title">
          {{ emailSent ? 'Revisa tu correo' : passwordResetSent ? 'Link enviado' : showPasswordReset ? 'Recuperar Contraseña' : 'Accede a Piloteai' }}
        </h1>

        <!-- View: Sign-in link sent -->
        <div v-if="emailSent">
          <p class="acceder-text">
            Hemos enviado un link de acceso al correo <strong>{{ email }}</strong>.
          </p>
          <button class="acceder-btn secondary" @click="retry">Reintentar</button>
          <p class="acceder-hint">
            Revisa tu carpeta de spam si no ves el correo en unos minutos.
          </p>
        </div>

        <!-- View: Password reset link sent -->
        <div v-else-if="passwordResetSent">
          <p class="acceder-text">
            Hemos enviado un link para crear o recuperar tu contraseña al correo <strong>{{ email }}</strong>.
          </p>
          <button class="acceder-btn primary" @click="backToLogin">Volver al inicio de sesión</button>
          <p class="acceder-hint">Revisa tu carpeta de spam si no ves el correo.</p>
        </div>

        <!-- View: Password login form -->
        <div v-else-if="showPasswordForm">
          <p class="acceder-text">Ingresa tu correo y contraseña para acceder.</p>
          <form @submit.prevent="handlePasswordLogin">
            <input
              v-model="email"
              type="email"
              placeholder="tu.correo@email.com"
              class="acceder-input"
              required
              :disabled="loading"
            />
            <input
              v-model="password"
              type="password"
              placeholder="Tu contraseña"
              class="acceder-input"
              required
              :disabled="loading"
            />
            <button type="submit" :disabled="loading" class="acceder-btn primary">
              {{ loading ? 'Iniciando sesión...' : 'Iniciar sesión' }}
            </button>
          </form>

          <div class="acceder-info">
            <p>Si no tienes contraseña, créala presionando "Crear o recuperar contraseña".</p>
          </div>

          <button class="acceder-link" @click="showPasswordResetForm" :disabled="loading">
            Crear o recuperar contraseña
          </button>
          <button class="acceder-link-secondary" @click="backToEmailLink" :disabled="loading">
            ← Volver a login con link
          </button>

          <div v-if="message" class="acceder-error">{{ message }}</div>
        </div>

        <!-- View: Password reset form -->
        <div v-else-if="showPasswordReset">
          <p class="acceder-text">Ingresa tu correo para recibir un link y crear o recuperar tu contraseña.</p>
          <form @submit.prevent="handlePasswordReset">
            <input
              v-model="email"
              type="email"
              placeholder="tu.correo@email.com"
              class="acceder-input"
              required
              :disabled="loading"
            />
            <button type="submit" :disabled="loading" class="acceder-btn primary">
              {{ loading ? 'Enviando...' : 'Enviar link' }}
            </button>
          </form>
          <button class="acceder-link-secondary" @click="backToPasswordForm" :disabled="loading">
            ← Volver
          </button>
          <div v-if="message" class="acceder-error">{{ message }}</div>
        </div>

        <!-- View: Default (magic link) -->
        <div v-else>
          <p class="acceder-text">Ingresa el correo con el que te suscribiste para enviarte un link de acceso.</p>
          <form @submit.prevent="handleLogin">
            <input
              v-model="email"
              type="email"
              placeholder="tu.correo@email.com"
              class="acceder-input"
              required
              :disabled="loading"
            />
            <button type="submit" :disabled="loading" class="acceder-btn primary">
              {{ loading ? 'Verificando...' : 'Acceder' }}
            </button>
          </form>

          <button class="acceder-link" @click="switchToPasswordLogin" :disabled="loading">
            Iniciar sesión con correo y contraseña
          </button>

          <div v-if="message" class="acceder-error">{{ message }}</div>

          <p class="acceder-hint" style="margin-top: 2rem;">
            <a href="mailto:soporte@piloteai.cl" class="acceder-help-link">
              ¿Necesitas ayuda? Escríbenos
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { signInWithEmailAndPassword } from "firebase/auth";

definePageMeta({ layout: false });

const router = useRouter();
const route = useRoute();
const { $auth } = useNuxtApp();

const email = ref("");
const password = ref("");
const message = ref("");
const loading = ref(false);
const emailSent = ref(false);
const showPasswordForm = ref(false);
const showPasswordReset = ref(false);
const passwordResetSent = ref(false);

onMounted(() => {
  if (route.query.mode === "password") {
    showPasswordForm.value = true;
  }
});

const handleLogin = async () => {
  if (!email.value || loading.value) return;
  loading.value = true;
  message.value = "";

  try {
    const { status } = await $fetch("/api/payments/status", {
      method: "POST",
      body: { email: email.value },
    });

    if (status !== "authorized") {
      router.push("/#planes");
      return;
    }

    window.localStorage.setItem("emailForSignIn", email.value);

    await $fetch("/api/acceder/sendSignInLink", {
      method: "POST",
      body: { email: email.value },
    });

    emailSent.value = true;
  } catch (error) {
    console.error("Error sending email link:", error);
    message.value = "Hubo un error al enviar el enlace. Verifica tu correo e inténtalo de nuevo.";
  } finally {
    loading.value = false;
  }
};

const handlePasswordLogin = async () => {
  if (!email.value || !password.value || loading.value) return;
  loading.value = true;
  message.value = "";

  try {
    const { status } = await $fetch("/api/payments/status", {
      method: "POST",
      body: { email: email.value },
    });

    if (status !== "authorized") {
      router.push("/#planes");
      return;
    }

    const userCredential = await signInWithEmailAndPassword($auth, email.value, password.value);
    const user = userCredential.user;

    try {
      const idToken = await user.getIdToken();
      await $fetch("/api/auth/sessionLogin", {
        method: "POST",
        body: { idToken },
      });
    } catch (e) {
      console.error("Error estableciendo cookie de sesión:", e);
    }

    await router.replace("/inicio");
  } catch (error: any) {
    if (error.code === "auth/invalid-credential" || error.code === "auth/wrong-password") {
      message.value = "Correo o contraseña incorrectos.";
    } else if (error.code === "auth/user-not-found") {
      message.value = "No existe una cuenta con este correo.";
    } else if (error.code === "auth/too-many-requests") {
      message.value = "Demasiados intentos fallidos. Intenta más tarde.";
    } else {
      message.value = "Error al iniciar sesión. Intenta de nuevo.";
    }
  } finally {
    loading.value = false;
  }
};

const handlePasswordReset = async () => {
  if (!email.value || loading.value) return;
  loading.value = true;
  message.value = "";

  try {
    const response = await $fetch("/api/acceder/sendPasswordRecovery", {
      method: "POST",
      body: { email: email.value },
    });

    if (response.success) {
      passwordResetSent.value = true;
    }
  } catch (error: any) {
    message.value = error.data?.statusMessage || "Error al enviar el link de recuperación.";
  } finally {
    loading.value = false;
  }
};

const switchToPasswordLogin = () => { showPasswordForm.value = true; message.value = ""; };
const showPasswordResetForm = () => { showPasswordReset.value = true; showPasswordForm.value = false; message.value = ""; };
const backToPasswordForm = () => { showPasswordReset.value = false; showPasswordForm.value = true; message.value = ""; };
const backToEmailLink = () => { showPasswordForm.value = false; showPasswordReset.value = false; message.value = ""; password.value = ""; };
const backToLogin = () => { passwordResetSent.value = false; showPasswordReset.value = false; showPasswordForm.value = true; message.value = ""; };
const retry = () => { emailSent.value = false; message.value = ""; };
</script>

<style scoped>
.acceder-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-dark);
  padding: 2rem;
}

.acceder-container {
  width: 100%;
  max-width: 440px;
}

.acceder-card {
  background: var(--bg-surface);
  border: 1px solid var(--border-hover);
  border-radius: var(--radius-xl);
  padding: 40px 32px;
  text-align: center;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.3);
}

.acceder-logo {
  display: inline-block;
  font-family: var(--font-body);
  font-size: 20px;
  font-weight: 700;
  color: var(--accent);
  text-decoration: none;
  margin-bottom: 24px;
  letter-spacing: -0.02em;
}

.acceder-title {
  font-family: var(--font-body);
  font-size: 24px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 20px;
  letter-spacing: -0.02em;
}

.acceder-text {
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 24px;
  line-height: 1.6;
}

.acceder-text strong {
  color: var(--text-primary);
}

.acceder-input {
  width: 100%;
  padding: 13px 16px;
  font-size: 15px;
  border: 1px solid var(--border-hover);
  background: var(--bg-dark);
  color: var(--text-primary);
  border-radius: var(--radius-md);
  margin-bottom: 12px;
  font-family: var(--font-body);
  outline: none;
  transition: border-color 0.2s;
  box-sizing: border-box;
}

.acceder-input::placeholder {
  color: var(--text-muted);
}

.acceder-input:focus {
  border-color: var(--accent);
}

.acceder-input:disabled {
  opacity: 0.5;
}

.acceder-btn {
  width: 100%;
  padding: 14px;
  font-size: 15px;
  font-weight: 600;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.25s ease;
  font-family: var(--font-body);
  margin-bottom: 8px;
}

.acceder-btn.primary {
  background: var(--accent);
  color: #fff;
  box-shadow: 0 2px 8px rgba(62, 189, 79, 0.2);
}

.acceder-btn.primary:hover:not(:disabled) {
  background: var(--accent-hover);
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(62, 189, 79, 0.3);
}

.acceder-btn.secondary {
  background: var(--bg-elevated);
  color: var(--text-primary);
  border: 1px solid var(--border-hover);
}

.acceder-btn.secondary:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.06);
}

.acceder-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.acceder-link {
  display: block;
  background: none;
  border: none;
  color: var(--accent);
  font-size: 14px;
  cursor: pointer;
  margin-top: 16px;
  font-family: var(--font-body);
  font-weight: 500;
  transition: color 0.2s;
}

.acceder-link:hover { color: var(--accent-hover); }
.acceder-link:disabled { opacity: 0.5; cursor: not-allowed; }

.acceder-link-secondary {
  display: block;
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: 13px;
  cursor: pointer;
  margin-top: 12px;
  font-family: var(--font-body);
  width: 100%;
  transition: color 0.2s;
}

.acceder-link-secondary:hover { color: var(--text-secondary); }
.acceder-link-secondary:disabled { opacity: 0.5; cursor: not-allowed; }

.acceder-info {
  background: var(--accent-glow);
  border: 1px solid rgba(62, 189, 79, 0.12);
  border-radius: var(--radius-md);
  padding: 14px;
  margin-top: 16px;
}

.acceder-info p {
  font-size: 13px;
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.5;
}

.acceder-error {
  margin-top: 16px;
  padding: 12px 16px;
  border: 1px solid rgba(239, 68, 68, 0.3);
  background: rgba(239, 68, 68, 0.08);
  border-radius: var(--radius-sm);
  color: #FCA5A5;
  font-size: 14px;
}

.acceder-hint {
  font-size: 13px;
  color: var(--text-muted);
  margin-top: 16px;
}

.acceder-help-link {
  color: var(--text-muted);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.acceder-help-link:hover { color: var(--text-secondary); }

@media (max-width: 640px) {
  .acceder-page { padding: 1rem; }
  .acceder-card { padding: 28px 20px; }
  .acceder-title { font-size: 20px; }
}
</style>
