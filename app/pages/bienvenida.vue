<template>
  <div class="onboarding-page">
    <div class="onboarding-bg">
      <div class="bg-grid"></div>
      <div class="bg-glow"></div>
    </div>

    <div class="onboarding-container">
      <div class="onboarding-header">
        <img src="/logo.svg" alt="PiloteAI" class="onboarding-logo" />
        <div class="step-indicator">
          <div class="step-dot" :class="{ active: step >= 1, done: step > 1 }"></div>
          <div class="step-line" :class="{ active: step > 1 }"></div>
          <div class="step-dot" :class="{ active: step >= 2 }"></div>
        </div>
      </div>

      <!-- Step 1: Name -->
      <Transition name="slide" mode="out-in">
        <div v-if="step === 1" key="step1" class="onboarding-card">
          <p class="card-label">Paso 1 de 2</p>
          <h1 class="card-title">¿Cómo te llamas?</h1>
          <p class="card-subtitle">Tu nombre aparecerá en tu panel de vuelo y tu perfil.</p>

          <form @submit.prevent="goToStep2" class="card-form">
            <div class="input-group">
              <input
                ref="nameInput"
                v-model="displayName"
                type="text"
                placeholder="Ej: Martín Muñoz"
                class="onboarding-input"
                maxlength="80"
                autocomplete="name"
              />
              <span class="input-count">{{ displayName.length }}/80</span>
            </div>
            <p v-if="nameError" class="field-error">{{ nameError }}</p>

            <button type="submit" class="onboarding-btn" :disabled="!isNameValid">
              Continuar
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </form>
        </div>

        <!-- Step 2: License -->
        <div v-else-if="step === 2" key="step2" class="onboarding-card wide">
          <button class="back-btn" @click="step = 1">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
            Volver
          </button>

          <p class="card-label">Paso 2 de 2</p>
          <h1 class="card-title">¿Qué licencia quieres preparar?</h1>
          <p class="card-subtitle">Podrás cambiarla después en cualquier momento.</p>

          <div class="license-grid">
            <button
              v-for="license in allLicenses"
              :key="license.id"
              class="license-card"
              :class="{ selected: selectedLicense === license.id }"
              :style="{ '--lc': license.color }"
              @click="selectedLicense = license.id"
            >
              <div class="lc-header">
                <span class="lc-icon">{{ license.icon }}</span>
                <span class="lc-badge">{{ license.name }}</span>
              </div>
              <span class="lc-fullname">{{ license.fullName }}</span>
              <p class="lc-description">{{ license.description }}</p>
              <div class="lc-meta">
                <span class="lc-stat">{{ license.subjects.length }} materias</span>
                <span class="lc-sep">·</span>
                <span class="lc-stat">{{ getLessonCount(license) }} lecciones</span>
              </div>
              <div class="lc-check" v-if="selectedLicense === license.id">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
            </button>
          </div>

          <div v-if="errorMessage" class="onboarding-error">{{ errorMessage }}</div>

          <button
            class="onboarding-btn"
            :disabled="!selectedLicense || submitting"
            @click="handleSubmit"
          >
            {{ submitting ? 'Configurando...' : 'Comenzar a estudiar' }}
            <svg v-if="!submitting" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { licenses } from "../../data";
import type { License, LicenseId } from "../../types/lesson";

definePageMeta({ layout: false, middleware: ["auth"] });

const router = useRouter();
const { profile, fetchProfile } = useUserProfile();

const step = ref(1);
const displayName = ref("");
const nameError = ref("");
const selectedLicense = ref<LicenseId | null>(null);
const submitting = ref(false);
const errorMessage = ref("");
const nameInput = ref<HTMLInputElement | null>(null);

const allLicenses = licenses;

const isNameValid = computed(() => displayName.value.trim().length >= 2);

const getLessonCount = (license: License) => {
  return license.subjects.reduce((sum, s) => sum + s.lessons.length, 0);
};

const goToStep2 = () => {
  nameError.value = "";
  if (!isNameValid.value) {
    nameError.value = "El nombre debe tener al menos 2 caracteres";
    return;
  }
  step.value = 2;
};

const handleSubmit = async () => {
  if (!selectedLicense.value || submitting.value) return;
  submitting.value = true;
  errorMessage.value = "";

  try {
    await $fetch("/api/user/onboarding", {
      method: "POST",
      body: {
        displayName: displayName.value.trim(),
        activeLicense: selectedLicense.value,
      },
    });
    await fetchProfile();
    router.push("/inicio");
  } catch (error: any) {
    errorMessage.value = error.data?.statusMessage || "Error al guardar. Intenta de nuevo.";
    submitting.value = false;
  }
};

onMounted(async () => {
  await fetchProfile();
  if (profile.value?.onboardingCompleted) {
    router.push("/inicio");
    return;
  }
  nextTick(() => nameInput.value?.focus());
});
</script>

<style scoped>
.onboarding-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-dark);
  padding: 2rem;
  position: relative;
  overflow: hidden;
}

.onboarding-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.bg-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px);
  background-size: 40px 40px;
  mask-image: radial-gradient(ellipse 60% 60% at 50% 50%, black 20%, transparent 70%);
  -webkit-mask-image: radial-gradient(ellipse 60% 60% at 50% 50%, black 20%, transparent 70%);
}

.bg-glow {
  position: absolute;
  top: -200px;
  left: 50%;
  transform: translateX(-50%);
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(62, 189, 79, 0.06) 0%, transparent 70%);
}

.onboarding-container {
  width: 100%;
  max-width: 480px;
  position: relative;
  z-index: 1;
}

.onboarding-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-bottom: 32px;
}

.onboarding-logo {
  height: 32px;
  opacity: 0.9;
}

.step-indicator {
  display: flex;
  align-items: center;
  gap: 0;
}

.step-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255,255,255,0.1);
  border: 2px solid rgba(255,255,255,0.15);
  transition: all 0.3s ease;
}

.step-dot.active {
  background: var(--accent);
  border-color: var(--accent);
  box-shadow: 0 0 12px rgba(62, 189, 79, 0.4);
}

.step-dot.done {
  background: var(--accent);
  border-color: var(--accent);
}

.step-line {
  width: 48px;
  height: 2px;
  background: rgba(255,255,255,0.1);
  transition: background 0.3s ease;
}

.step-line.active {
  background: var(--accent);
}

/* Card */

.onboarding-card {
  background: var(--bg-surface);
  border: 1px solid var(--border-hover);
  border-radius: var(--radius-xl);
  padding: 36px 32px;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.3);
  position: relative;
}

.onboarding-card.wide {
  max-width: 480px;
}

.card-label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--accent);
  margin-bottom: 8px;
}

.card-title {
  font-family: var(--font-body);
  font-size: 26px;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.03em;
  line-height: 1.2;
  margin-bottom: 8px;
}

.card-subtitle {
  font-size: 14px;
  color: var(--text-muted);
  line-height: 1.5;
  margin-bottom: 28px;
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  padding: 0;
  margin-bottom: 16px;
  font-family: var(--font-body);
  transition: color 0.2s;
}

.back-btn:hover {
  color: var(--text-secondary);
}

/* Input */

.card-form {
  display: flex;
  flex-direction: column;
}

.input-group {
  position: relative;
}

.onboarding-input {
  width: 100%;
  padding: 15px 16px;
  font-size: 16px;
  border: 1px solid var(--border-hover);
  background: var(--bg-dark);
  color: var(--text-primary);
  border-radius: var(--radius-md);
  font-family: var(--font-body);
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  box-sizing: border-box;
}

.onboarding-input::placeholder {
  color: var(--text-muted);
}

.onboarding-input:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(62, 189, 79, 0.1);
}

.input-count {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 11px;
  color: var(--text-muted);
  pointer-events: none;
}

.field-error {
  font-size: 12px;
  color: #EF4444;
  margin-top: 6px;
}

/* License Grid */

.license-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 24px;
}

.license-card {
  position: relative;
  background: var(--bg-dark);
  border: 1.5px solid var(--border);
  border-radius: 16px;
  padding: 20px 16px;
  text-align: left;
  cursor: pointer;
  transition: all 0.25s ease;
  font-family: var(--font-body);
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.license-card:hover {
  border-color: var(--border-hover);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.2);
}

.license-card.selected {
  border-color: var(--lc);
  background: color-mix(in srgb, var(--lc) 6%, var(--bg-dark));
  box-shadow: 0 0 24px color-mix(in srgb, var(--lc) 15%, transparent), 0 8px 24px rgba(0,0,0,0.15);
}

.lc-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}

.lc-icon {
  font-size: 24px;
}

.lc-badge {
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.04em;
  color: var(--lc);
}

.lc-fullname {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1.3;
}

.lc-description {
  font-size: 11px;
  color: var(--text-muted);
  line-height: 1.45;
  margin: 2px 0 6px;
}

.lc-meta {
  display: flex;
  align-items: center;
  gap: 5px;
}

.lc-stat {
  font-size: 11px;
  font-weight: 600;
  color: var(--text-secondary);
}

.lc-sep {
  font-size: 10px;
  color: var(--text-muted);
}

.lc-check {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: var(--lc);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  animation: checkPop 0.2s ease;
}

@keyframes checkPop {
  0% { transform: scale(0); }
  60% { transform: scale(1.15); }
  100% { transform: scale(1); }
}

/* Button */

.onboarding-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 15px;
  margin-top: 20px;
  font-size: 15px;
  font-weight: 600;
  background: var(--accent);
  color: #fff;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.25s ease;
  font-family: var(--font-body);
  box-shadow: 0 2px 8px rgba(62, 189, 79, 0.2);
}

.onboarding-btn:hover:not(:disabled) {
  background: var(--accent-hover);
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(62, 189, 79, 0.3);
}

.onboarding-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.onboarding-error {
  padding: 12px 16px;
  border: 1px solid rgba(239, 68, 68, 0.3);
  background: rgba(239, 68, 68, 0.08);
  border-radius: var(--radius-sm);
  color: #FCA5A5;
  font-size: 14px;
}

/* Transitions */

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(24px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-24px);
}

/* Responsive */

@media (max-width: 640px) {
  .onboarding-page { padding: 1rem; }
  .onboarding-card { padding: 28px 20px; }
  .card-title { font-size: 22px; }
  .license-grid { grid-template-columns: 1fr; gap: 10px; }
  .license-card { padding: 16px 14px; }
}
</style>
