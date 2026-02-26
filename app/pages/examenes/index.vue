<template>
  <div class="exams-page">
    <!-- Loading skeleton -->
    <template v-if="loading">
      <div class="page-header">
        <div class="skeleton skeleton-heading" style="width:180px;height:28px;"></div>
        <div class="skeleton skeleton-text" style="width:260px;height:14px;margin-top:8px;"></div>
      </div>
      <div class="active-license-bar skeleton-bar-wrap">
        <div class="skeleton skeleton-pill" style="width:100%;height:48px;"></div>
      </div>
      <div class="themes-grid">
        <div v-for="i in 6" :key="i" class="skeleton skeleton-card"></div>
      </div>
    </template>

    <!-- Loaded content -->
    <template v-else>
      <div class="page-header">
        <h1 class="page-title">Exámenes</h1>
        <p class="page-subtitle">Practica por tema o simula el examen real DGAC</p>
      </div>

      <!-- Active license hero -->
      <div v-if="activeLic" class="active-license-bar">
        <div class="active-license-info">
          <span class="active-emoji">{{ getLicenseEmoji(activeLic.slug) }}</span>
          <div class="active-details">
            <span class="active-name">{{ activeLic.name }}</span>
            <span class="active-meta">{{ activeLic.totalQuestions }} preguntas · {{ activeLic.themes.length }} temas</span>
          </div>
        </div>
        <button
          v-if="otherLicenses.length > 0"
          class="switch-license-btn"
          @click="showLicensePicker = !showLicensePicker"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 3h5v5"/><path d="M21 3l-7 7"/><path d="M8 21H3v-5"/><path d="M3 21l7-7"/></svg>
          Cambiar
        </button>
      </div>

      <!-- License picker dropdown -->
      <Transition name="dropdown">
        <div v-if="showLicensePicker" class="license-picker">
          <button
            v-for="lic in otherLicenses"
            :key="lic.slug"
            class="picker-option"
            @click="switchLicense(lic)"
          >
            <span class="picker-emoji">{{ getLicenseEmoji(lic.slug) }}</span>
            <div class="picker-info">
              <span class="picker-name">{{ lic.name }}</span>
              <span class="picker-meta">{{ lic.totalQuestions }} preguntas</span>
            </div>
            <svg class="picker-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>
      </Transition>

      <!-- Themes loading -->
      <div v-if="loadingThemes" class="themes-grid">
        <div v-for="i in 6" :key="i" class="skeleton skeleton-card"></div>
      </div>

      <!-- Themes grid -->
      <div v-else-if="activeLic" class="themes-grid">
        <!-- Full exam card -->
        <button
          class="theme-card full-exam-card"
          @click="openPresetModal(null)"
        >
          <div class="card-accent-line"></div>
          <div class="card-body">
            <div class="card-icon-wrap full-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
            </div>
            <span class="card-title">Todos los temas</span>
            <span class="card-desc">Examen completo de la licencia</span>
            <div class="card-footer">
              <span class="card-stat">{{ activeLic.totalQuestions }} preguntas</span>
              <span class="card-action">Practicar</span>
            </div>
          </div>
        </button>

        <!-- Individual theme cards -->
        <button
          v-for="(theme, index) in themes"
          :key="theme.slug"
          class="theme-card"
          :style="{ '--delay': (index + 1) * 40 + 'ms' }"
          @click="openPresetModal(theme.name)"
        >
          <div class="card-accent-line"></div>
          <div class="card-body">
            <div class="card-icon-wrap">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
            </div>
            <span class="card-title">{{ theme.name }}</span>
            <div class="card-footer">
              <span class="card-stat">{{ theme.questionCount }} preguntas</span>
              <span class="card-action">Practicar</span>
            </div>
          </div>
        </button>
      </div>

      <!-- No themes fallback -->
      <div v-else-if="!activeLic && licenses.length === 0" class="empty-state">
        <p>No se encontraron licencias disponibles.</p>
      </div>
    </template>

    <!-- Preset selection modal -->
    <Transition name="modal">
      <div v-if="showPresetModal" class="modal-backdrop" @click.self="showPresetModal = false">
        <div class="modal-content">
          <div class="modal-header">
            <div>
              <h3 class="modal-title">Tipo de examen</h3>
              <p class="modal-sub">
                {{ activeLic?.name }}
                <template v-if="modalTheme"> · {{ modalTheme }}</template>
              </p>
            </div>
            <button class="modal-close" @click="showPresetModal = false">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>

          <div class="preset-list">
            <button
              v-for="preset in EXAM_PRESETS"
              :key="preset.id"
              class="preset-card"
              :class="{ selected: selectedPreset?.id === preset.id }"
              @click="selectedPreset = preset"
            >
              <div class="preset-icon-wrap">
                <span class="preset-icon">{{ preset.icon }}</span>
              </div>
              <div class="preset-info">
                <span class="preset-name">{{ preset.name }}</span>
                <span class="preset-desc">{{ preset.description }}</span>
              </div>
              <div class="preset-badges">
                <span class="preset-badge">{{ preset.questionCount }}p</span>
                <span class="preset-badge">{{ preset.timeMinutes }}m</span>
              </div>
              <div class="preset-check-ring" :class="{ active: selectedPreset?.id === preset.id }">
                <svg v-if="selectedPreset?.id === preset.id" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
            </button>
          </div>

          <button
            class="start-btn"
            :disabled="!selectedPreset || examLoading"
            @click="handleStartExam"
          >
            <template v-if="examLoading">
              <span class="btn-spinner"></span>
              Generando examen...
            </template>
            <template v-else>
              Comenzar examen
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
            </template>
          </button>
          <p v-if="examError" class="error-text">{{ examError }}</p>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { EXAM_PRESETS } from "../../../types/exam";
import type { ExamPreset } from "../../../types/exam";

definePageMeta({ layout: "dashboard", middleware: ["auth"] });

interface ExamLicense {
  name: string;
  slug: string;
  totalQuestions: number;
  themes: string[];
}

interface ExamTheme {
  name: string;
  slug: string;
  questionCount: number;
}

const router = useRouter();
const { profile } = useUserProfile();
const { generateAndStartExam, examLoading, examError } = useExamState();

const hasFetched = useState("examsHasFetched", () => false);
const licenses = useState<ExamLicense[]>("examsLicenses", () => []);
const themes = useState<ExamTheme[]>("examsThemes", () => []);
const loading = useState("examsLoading", () => true);
const loadingThemes = useState("examsLoadingThemes", () => false);
const activeLic = useState<ExamLicense | null>("examsActiveLic", () => null);
const showLicensePicker = ref(false);

const showPresetModal = ref(false);
const modalTheme = ref<string | null>(null);
const selectedPreset = ref<ExamPreset | null>(null);

const LICENSE_EMOJIS: Record<string, string> = {
  "piloto-comercial-avion": "✈️",
  "piloto-comercial-helicoptero": "🚁",
  "piloto-privado-helicoptero": "🚁",
  "ptla-piloto-transporte-linea-aerea-avion": "🛫",
  "piloto-planeador": "🪂",
  "piloto-lsaulm": "🛩️",
  "instructor-de-vuelo": "👨‍✈️",
  "mecanico-de-mantenimiento": "🔧",
  "rpa-operador-de-drones": "🤖",
};

const ACTIVE_LICENSE_MAP: Record<string, string[]> = {
  ppl: ["piloto-privado", "piloto-comercial-avion"],
  cpl: ["piloto-comercial-avion", "piloto-comercial"],
  ifr: ["piloto-comercial-avion", "ptla"],
  atpl: ["ptla-piloto-transporte-linea-aerea-avion", "ptla"],
};

const getLicenseEmoji = (slug: string) => LICENSE_EMOJIS[slug] || "📝";

const otherLicenses = computed(() => {
  if (!activeLic.value) return licenses.value;
  return licenses.value.filter((l) => l.slug !== activeLic.value!.slug);
});

const findBestMatch = (allLicenses: ExamLicense[]): ExamLicense | null => {
  const userLicense = profile.value?.activeLicense;
  if (userLicense && ACTIVE_LICENSE_MAP[userLicense]) {
    const keywords = ACTIVE_LICENSE_MAP[userLicense];
    for (const keyword of keywords) {
      const match = allLicenses.find((l) => l.slug.includes(keyword));
      if (match) return match;
    }
  }
  return allLicenses[0] || null;
};

const fetchThemes = async (licenseName: string) => {
  loadingThemes.value = true;
  try {
    const data = await $fetch(`/api/licenses/${encodeURIComponent(licenseName)}/themes`);
    themes.value = data.themes;
  } catch {
    themes.value = [];
  } finally {
    loadingThemes.value = false;
  }
};

const switchLicense = async (lic: ExamLicense) => {
  activeLic.value = lic;
  showLicensePicker.value = false;
  await fetchThemes(lic.name);
};

const openPresetModal = (themeName: string | null) => {
  modalTheme.value = themeName;
  selectedPreset.value = null;
  examError.value = null;
  showPresetModal.value = true;
};

const handleStartExam = async () => {
  if (!activeLic.value || !selectedPreset.value) return;
  const success = await generateAndStartExam({
    preset: selectedPreset.value,
    license: activeLic.value.name,
    theme: modalTheme.value,
  });
  if (success) {
    showPresetModal.value = false;
    router.push("/examen/realizar");
  }
};

onMounted(async () => {
  if (hasFetched.value) return;
  try {
    const data = await $fetch("/api/licenses");
    licenses.value = data.licenses;
    const best = findBestMatch(data.licenses);
    if (best) {
      activeLic.value = best;
      await fetchThemes(best.name);
    }
  } catch {
    // silent
  } finally {
    loading.value = false;
    hasFetched.value = true;
  }
});
</script>

<style scoped>
.exams-page {
  animation: pageIn 0.4s ease-out;
}

@keyframes pageIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

/* ---- Header ---- */
.page-header { margin-bottom: 24px; }
.page-title {
  font-family: var(--font-display);
  font-size: 30px;
  font-weight: 400;
  color: var(--text-primary);
  letter-spacing: -0.01em;
}
.page-subtitle {
  font-size: 14px;
  color: var(--text-secondary);
  margin-top: 4px;
}

/* ---- Active license bar ---- */
.active-license-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 14px 18px;
  margin-bottom: 24px;
}

.active-license-info {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
}

.active-emoji {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: var(--bg-elevated);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
}

.active-details {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.active-name {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.active-meta {
  font-size: 12px;
  color: var(--text-muted);
}

.switch-license-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 7px 14px;
  color: var(--text-secondary);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  font-family: var(--font-body);
  white-space: nowrap;
  transition: all 0.15s ease;
  flex-shrink: 0;
}

.switch-license-btn:hover {
  background: var(--bg-surface-light);
  color: var(--text-primary);
  border-color: var(--border-hover);
}

/* ---- License picker dropdown ---- */
.license-picker {
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 6px;
  margin-bottom: 20px;
  margin-top: -16px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.picker-option {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border: none;
  background: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-family: var(--font-body);
  text-align: left;
  width: 100%;
  transition: background 0.12s ease;
}

.picker-option:hover {
  background: var(--bg-elevated);
}

.picker-emoji {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: var(--bg-elevated);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  flex-shrink: 0;
}

.picker-option:hover .picker-emoji {
  background: var(--bg-surface-light);
}

.picker-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1px;
  min-width: 0;
}

.picker-name {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.picker-meta {
  font-size: 11px;
  color: var(--text-muted);
}

.picker-arrow {
  color: var(--text-muted);
  flex-shrink: 0;
}

/* ---- Themes grid ---- */
.themes-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.theme-card {
  position: relative;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 0;
  cursor: pointer;
  font-family: var(--font-body);
  text-align: left;
  overflow: hidden;
  transition: all 0.2s ease;
  animation: cardIn 0.35s ease-out both;
  animation-delay: var(--delay, 0ms);
}

@keyframes cardIn {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}

.theme-card:hover {
  border-color: var(--accent);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(62, 189, 79, 0.1);
}

.card-accent-line {
  height: 3px;
  background: linear-gradient(90deg, var(--accent) 0%, transparent 100%);
  opacity: 0;
  transition: opacity 0.2s ease;
}

.theme-card:hover .card-accent-line {
  opacity: 1;
}

.full-exam-card .card-accent-line {
  background: linear-gradient(90deg, var(--accent), #2dd4bf);
}

.card-body {
  padding: 20px 18px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.card-icon-wrap {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: var(--bg-elevated);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  margin-bottom: 4px;
  transition: all 0.2s ease;
}

.theme-card:hover .card-icon-wrap {
  background: var(--accent-glow);
  color: var(--accent);
}

.full-icon {
  background: var(--accent-glow);
  color: var(--accent);
}

.card-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-desc {
  font-size: 12px;
  color: var(--text-muted);
  line-height: 1.4;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 8px;
}

.card-stat {
  font-size: 11px;
  color: var(--text-muted);
  font-weight: 500;
}

.card-action {
  font-size: 12px;
  font-weight: 600;
  color: var(--accent);
  opacity: 0;
  transform: translateX(-4px);
  transition: all 0.2s ease;
}

.theme-card:hover .card-action {
  opacity: 1;
  transform: translateX(0);
}

/* ---- Empty state ---- */
.empty-state {
  text-align: center;
  padding: 48px 20px;
  color: var(--text-muted);
  font-size: 14px;
}

/* ---- Modal ---- */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 500;
  padding: 20px;
}

.modal-content {
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 28px;
  width: 100%;
  max-width: 440px;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.4);
}

.modal-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 20px;
}

.modal-title {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 400;
  color: var(--text-primary);
}

.modal-sub {
  font-size: 13px;
  color: var(--text-muted);
  margin-top: 2px;
}

.modal-close {
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  padding: 4px;
  border-radius: 6px;
  transition: color 0.15s;
}

.modal-close:hover {
  color: var(--text-primary);
}

/* ---- Presets ---- */
.preset-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
}

.preset-card {
  display: flex;
  align-items: center;
  gap: 14px;
  background: var(--bg-dark);
  border: 1.5px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 14px 16px;
  cursor: pointer;
  font-family: var(--font-body);
  text-align: left;
  width: 100%;
  transition: all 0.15s ease;
}

.preset-card:hover {
  border-color: var(--border-hover);
  background: var(--bg-elevated);
}

.preset-card.selected {
  border-color: var(--accent);
  background: rgba(62, 189, 79, 0.06);
}

.preset-icon-wrap {
  width: 42px;
  height: 42px;
  border-radius: 10px;
  background: var(--bg-surface);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
}

.preset-card.selected .preset-icon-wrap {
  background: var(--accent-glow);
}

.preset-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.preset-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
}

.preset-desc {
  font-size: 12px;
  color: var(--text-muted);
}

.preset-badges {
  display: flex;
  gap: 6px;
  flex-shrink: 0;
}

.preset-badge {
  font-size: 11px;
  font-weight: 600;
  color: var(--text-muted);
  background: var(--bg-surface);
  padding: 3px 8px;
  border-radius: 20px;
}

.preset-card.selected .preset-badge {
  background: var(--accent-glow);
  color: var(--accent);
}

.preset-check-ring {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 2px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.15s ease;
}

.preset-check-ring.active {
  border-color: var(--accent);
  background: var(--accent);
  color: #fff;
}

/* ---- Start button ---- */
.start-btn {
  width: 100%;
  padding: 14px;
  background: var(--accent);
  color: #fff;
  border: none;
  border-radius: var(--radius-sm);
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  font-family: var(--font-body);
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.start-btn:hover:not(:disabled) {
  background: var(--accent-hover);
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(62, 189, 79, 0.25);
}

.start-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error-text {
  color: #ef4444;
  font-size: 13px;
  text-align: center;
  margin-top: 12px;
}

/* ---- Transitions ---- */
.dropdown-enter-active {
  animation: dropIn 0.2s ease-out;
}
.dropdown-leave-active {
  animation: dropIn 0.15s ease-in reverse;
}
@keyframes dropIn {
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
}

.modal-enter-active { animation: modalIn 0.25s ease-out; }
.modal-leave-active { animation: modalIn 0.15s ease-in reverse; }
@keyframes modalIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
.modal-enter-active .modal-content { animation: modalSlide 0.25s ease-out; }
.modal-leave-active .modal-content { animation: modalSlide 0.15s ease-in reverse; }
@keyframes modalSlide {
  from { opacity: 0; transform: translateY(16px) scale(0.97); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

/* ---- Skeletons ---- */
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.skeleton {
  background: linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.8s ease-in-out infinite;
  border-radius: 6px;
}

.skeleton-heading { border-radius: 8px; }
.skeleton-text { border-radius: 4px; }
.skeleton-bar-wrap { margin-bottom: 24px; }
.skeleton-pill { border-radius: var(--radius-md); }
.skeleton-card {
  border-radius: var(--radius-md);
  height: 160px;
}

/* ---- Responsive ---- */
@media (max-width: 600px) {
  .themes-grid {
    grid-template-columns: 1fr;
  }

  .active-license-bar {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }

  .switch-license-btn {
    justify-content: center;
  }

  .modal-content {
    max-width: 100%;
  }

  .preset-badges {
    display: none;
  }
}
</style>
