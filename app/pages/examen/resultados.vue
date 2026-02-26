<template>
  <div class="results-page" v-if="currentExam && results">
    <div class="results-header">
      <div class="score-circle" :class="scoreClass">
        <span class="score-value">{{ results.score }}%</span>
        <span class="score-label">Puntuación</span>
      </div>
      <h1 class="results-title">{{ isPassed ? '¡Felicidades!' : 'Examen Completado' }}</h1>
      <span class="pass-badge" :class="scoreClass">{{ isPassed ? 'APROBADO' : 'NO APROBADO' }}</span>
      <p class="results-sub">{{ currentExam.config.license }}{{ currentExam.config.theme ? ` - ${currentExam.config.theme}` : '' }}</p>
    </div>

    <div class="stats-row">
      <div class="result-stat correct">
        <span class="stat-icon">✓</span>
        <span class="stat-value">{{ results.correctAnswers }}</span>
        <span class="stat-label">Correctas</span>
      </div>
      <div class="result-stat incorrect">
        <span class="stat-icon">✕</span>
        <span class="stat-value">{{ results.incorrectAnswers }}</span>
        <span class="stat-label">Incorrectas</span>
      </div>
      <div class="result-stat omitted">
        <span class="stat-icon">—</span>
        <span class="stat-value">{{ results.omittedAnswers }}</span>
        <span class="stat-label">Omitidas</span>
      </div>
    </div>

    <div class="time-card">
      ⏱ Tiempo: {{ formattedTime }} de {{ currentExam.config.preset.timeMinutes }} min
    </div>

    <div class="filter-row">
      <button
        v-for="f in filters"
        :key="f.key"
        class="filter-btn"
        :class="{ active: activeFilter === f.key }"
        @click="activeFilter = f.key"
      >
        {{ f.label }}
      </button>
    </div>

    <div class="review-section">
      <div class="review-header">
        <h2 class="review-title">Revisión de respuestas</h2>
        <button class="expand-btn" @click="toggleAll">
          {{ allExpanded ? 'Colapsar todo' : 'Expandir todo' }}
        </button>
      </div>

      <div v-if="filteredQuestions.length === 0" class="empty-state">
        No hay preguntas en esta categoría
      </div>

      <div v-for="(q, i) in filteredQuestions" :key="q.id" class="review-item">
        <button class="review-item-header" @click="toggleQuestion(q.id)">
          <span class="q-num" :class="getQuestionStatus(q).class">{{ getOriginalIndex(q) + 1 }}</span>
          <div class="q-content">
            <p class="q-text">{{ q.question }}</p>
            <span class="q-status" :class="getQuestionStatus(q).class">{{ getQuestionStatus(q).label }}</span>
          </div>
          <span class="q-toggle">{{ expandedSet.has(q.id) ? '▲' : '▼' }}</span>
        </button>

        <div v-if="expandedSet.has(q.id)" class="review-item-body">
          <div class="review-options">
            <div
              v-for="key in Object.keys(q.options).sort()"
              :key="key"
              class="review-option"
              :class="getReviewOptionClass(q, key)"
            >
              <span class="ro-key">{{ key }}</span>
              <span class="ro-text">{{ q.options[key] }}</span>
              <span v-if="key === q.correctAnswer" class="ro-icon correct">✓</span>
              <span v-else-if="key === getUserAnswer(q.id) && key !== q.correctAnswer" class="ro-icon incorrect">✕</span>
            </div>
          </div>
          <div v-if="q.explanation" class="review-explanation">
            <strong>Explicación</strong>
            <p>{{ q.explanation }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="results-footer">
      <button class="footer-btn secondary" @click="handleRetry">🔄 Nuevo examen</button>
      <button class="footer-btn primary" @click="handleBack">Volver al inicio →</button>
    </div>
  </div>

  <div v-else class="results-loading">
    <p>Redirigiendo...</p>
  </div>
</template>

<script setup lang="ts">
import type { ExamQuestion } from "../../../types/exam";

definePageMeta({ layout: false, middleware: ["auth"] });

const router = useRouter();
const { currentExam, clearExam, getExamResults } = useExamState();

const results = computed(() => getExamResults());
const isPassed = computed(() => (results.value?.score ?? 0) >= 70);
const scoreClass = computed(() => {
  const s = results.value?.score ?? 0;
  if (s >= 70) return "pass";
  if (s >= 50) return "warn";
  return "fail";
});

const activeFilter = ref<"all" | "correct" | "incorrect" | "omitted">("all");
const expandedSet = ref(new Set<string>());

const filters = computed(() => [
  { key: "all" as const, label: `Todas (${results.value?.total ?? 0})` },
  { key: "correct" as const, label: `Correctas (${results.value?.correctAnswers ?? 0})` },
  { key: "incorrect" as const, label: `Incorrectas (${results.value?.incorrectAnswers ?? 0})` },
  { key: "omitted" as const, label: `Omitidas (${results.value?.omittedAnswers ?? 0})` },
]);

const filteredQuestions = computed(() => {
  if (!currentExam.value) return [];
  return currentExam.value.questions.filter((q) => {
    const answer = currentExam.value!.answers.find((a) => a.questionId === q.id);
    const isCorrect = answer && q.correctAnswer && answer.selectedOption === q.correctAnswer;
    const isIncorrect = answer && q.correctAnswer && answer.selectedOption !== q.correctAnswer;
    switch (activeFilter.value) {
      case "correct": return isCorrect;
      case "incorrect": return isIncorrect;
      case "omitted": return !answer;
      default: return true;
    }
  });
});

const allExpanded = computed(() => expandedSet.value.size === filteredQuestions.value.length);

const formattedTime = computed(() => {
  if (!currentExam.value) return "0m";
  const t = currentExam.value.config.preset.timeMinutes * 60 - currentExam.value.timeRemainingSeconds;
  const m = Math.floor(t / 60);
  const s = t % 60;
  return m > 0 ? `${m}m ${s}s` : `${s}s`;
});

function getOriginalIndex(q: ExamQuestion) {
  return currentExam.value?.questions.findIndex((x) => x.id === q.id) ?? 0;
}

function getUserAnswer(qId: string) {
  return currentExam.value?.answers.find((a) => a.questionId === qId)?.selectedOption || null;
}

function getQuestionStatus(q: ExamQuestion) {
  const answer = currentExam.value?.answers.find((a) => a.questionId === q.id);
  if (!answer) return { label: "Omitida", class: "omitted" };
  if (q.correctAnswer && answer.selectedOption === q.correctAnswer) return { label: "Correcta", class: "correct" };
  return { label: "Incorrecta", class: "incorrect" };
}

function getReviewOptionClass(q: ExamQuestion, key: string) {
  const userAnswer = getUserAnswer(q.id);
  if (key === q.correctAnswer) return "correct";
  if (key === userAnswer && key !== q.correctAnswer) return "incorrect";
  return "";
}

function toggleQuestion(id: string) {
  const s = new Set(expandedSet.value);
  s.has(id) ? s.delete(id) : s.add(id);
  expandedSet.value = s;
}

function toggleAll() {
  if (allExpanded.value) {
    expandedSet.value = new Set();
  } else {
    expandedSet.value = new Set(filteredQuestions.value.map((q) => q.id));
  }
}

function handleRetry() { clearExam(); router.replace("/examenes"); }
function handleBack() { clearExam(); router.replace("/inicio"); }

onMounted(() => {
  if (!currentExam.value) router.replace("/examenes");
});
</script>

<style scoped>
.results-page {
  min-height: 100vh;
  background: var(--bg-dark);
  padding: 28px 20px 40px;
  max-width: 720px;
  margin: 0 auto;
}

.results-header { text-align: center; margin-bottom: 24px; }

.score-circle {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-bottom: 16px;
}

.score-circle.pass { background: rgba(62, 189, 79, 0.12); }
.score-circle.warn { background: rgba(251, 191, 36, 0.12); }
.score-circle.fail { background: rgba(239, 68, 68, 0.12); }

.score-value { font-size: 36px; font-weight: 700; }
.score-circle.pass .score-value { color: var(--accent); }
.score-circle.warn .score-value { color: #fbbf24; }
.score-circle.fail .score-value { color: #ef4444; }

.score-label { font-size: 12px; color: var(--text-muted); margin-top: -2px; }

.results-title { font-size: 24px; font-weight: 700; color: var(--text-primary); margin-bottom: 8px; }

.pass-badge {
  display: inline-block;
  padding: 4px 14px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.1em;
  margin-bottom: 8px;
}

.pass-badge.pass { background: rgba(62, 189, 79, 0.15); color: var(--accent); }
.pass-badge.warn { background: rgba(251, 191, 36, 0.15); color: #fbbf24; }
.pass-badge.fail { background: rgba(239, 68, 68, 0.15); color: #ef4444; }

.results-sub { font-size: 13px; color: var(--text-secondary); }

.stats-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 12px; }

.result-stat {
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 14px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.result-stat.correct { border-left: 3px solid var(--accent); }
.result-stat.incorrect { border-left: 3px solid #ef4444; }
.result-stat.omitted { border-left: 3px solid #fbbf24; }

.stat-icon { font-size: 18px; font-weight: 700; }
.result-stat.correct .stat-icon { color: var(--accent); }
.result-stat.incorrect .stat-icon { color: #ef4444; }
.result-stat.omitted .stat-icon { color: #fbbf24; }

.stat-value { font-size: 22px; font-weight: 700; color: var(--text-primary); }
.stat-label { font-size: 11px; color: var(--text-muted); }

.time-card {
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 10px;
  text-align: center;
  font-size: 13px;
  color: var(--text-secondary);
  margin-bottom: 20px;
}

.filter-row { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 16px; }

.filter-btn {
  padding: 6px 12px;
  border-radius: 16px;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  color: var(--text-secondary);
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  font-family: var(--font-body);
  transition: all 0.15s;
}

.filter-btn.active { background: var(--accent); color: #fff; border-color: var(--accent); }

.review-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.review-title { font-size: 16px; font-weight: 600; color: var(--text-primary); }

.expand-btn {
  background: none;
  border: none;
  color: var(--accent);
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  font-family: var(--font-body);
}

.empty-state {
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 32px;
  text-align: center;
  color: var(--text-muted);
  font-size: 13px;
}

.review-item {
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  margin-bottom: 8px;
  overflow: hidden;
}

.review-item-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  cursor: pointer;
  background: none;
  border: none;
  width: 100%;
  text-align: left;
  font-family: var(--font-body);
}

.q-num {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  flex-shrink: 0;
}

.q-num.correct { background: rgba(62, 189, 79, 0.15); color: var(--accent); }
.q-num.incorrect { background: rgba(239, 68, 68, 0.15); color: #ef4444; }
.q-num.omitted { background: rgba(251, 191, 36, 0.15); color: #fbbf24; }

.q-content { flex: 1; }
.q-text { font-size: 13px; color: var(--text-primary); line-height: 1.4; margin-bottom: 2px; }
.q-status { font-size: 11px; font-weight: 500; }
.q-status.correct { color: var(--accent); }
.q-status.incorrect { color: #ef4444; }
.q-status.omitted { color: #fbbf24; }
.q-toggle { color: var(--text-muted); font-size: 11px; }

.review-item-body { padding: 0 14px 14px; }

.review-options { display: flex; flex-direction: column; gap: 6px; margin-bottom: 10px; }

.review-option {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  background: var(--bg-elevated);
  border-radius: 6px;
  border: 1px solid transparent;
}

.review-option.correct { background: rgba(62, 189, 79, 0.1); border-color: rgba(62, 189, 79, 0.3); }
.review-option.incorrect { background: rgba(239, 68, 68, 0.1); border-color: rgba(239, 68, 68, 0.3); }

.ro-key {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--bg-dark);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 600;
  color: var(--text-muted);
  flex-shrink: 0;
}

.review-option.correct .ro-key { background: var(--accent); color: #fff; }
.review-option.incorrect .ro-key { background: #ef4444; color: #fff; }

.ro-text { flex: 1; font-size: 13px; color: var(--text-secondary); }
.ro-icon { font-weight: 700; font-size: 13px; }
.ro-icon.correct { color: var(--accent); }
.ro-icon.incorrect { color: #ef4444; }

.review-explanation {
  background: rgba(62, 189, 79, 0.06);
  border-left: 3px solid var(--accent);
  border-radius: 0 6px 6px 0;
  padding: 12px;
}

.review-explanation strong { color: var(--text-primary); font-size: 13px; display: block; margin-bottom: 4px; }
.review-explanation p { color: var(--text-secondary); font-size: 13px; line-height: 1.5; margin: 0; }

.results-footer {
  display: flex;
  gap: 10px;
  margin-top: 24px;
  position: sticky;
  bottom: 0;
  padding: 16px 0;
  background: var(--bg-dark);
}

.footer-btn {
  flex: 1;
  padding: 12px;
  border-radius: var(--radius-sm);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  font-family: var(--font-body);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: all 0.15s;
}

.footer-btn.primary { background: var(--accent); color: #fff; }
.footer-btn.primary:hover { background: var(--accent-hover); }
.footer-btn.secondary { background: var(--bg-surface); color: var(--text-primary); border: 1px solid var(--border); }
.footer-btn.secondary:hover { border-color: var(--border-hover); }

.results-loading {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-dark);
  color: var(--text-muted);
}
</style>
