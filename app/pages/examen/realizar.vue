<template>
  <div class="exam-take" v-if="currentExam && currentQuestion">
    <div class="exam-header">
      <button class="header-btn" @click="handleExit">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
      </button>
      <div class="timer" :class="timerClass">
        ⏱ {{ formattedTime }}
      </div>
      <button class="header-btn" @click="showNav = !showNav">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
      </button>
    </div>

    <div class="exam-progress-row">
      <div class="exam-progress-track">
        <div class="exam-progress-fill" :style="{ width: examProgress.percentage + '%' }"></div>
      </div>
      <span class="exam-progress-text">{{ currentExam.currentQuestionIndex + 1 }} / {{ currentExam.questions.length }}</span>
    </div>

    <div v-if="showNav" class="question-nav">
      <button
        v-for="(q, i) in currentExam.questions"
        :key="q.id"
        class="nav-dot"
        :class="{
          answered: currentExam.answers.some((a: any) => a.questionId === q.id),
          current: i === currentExam.currentQuestionIndex,
        }"
        @click="goToQuestion(i); showNav = false"
      >
        {{ i + 1 }}
      </button>
    </div>

    <div class="exam-content">
      <div class="question-card">
        <span class="question-theme">{{ currentQuestion.theme }}</span>
        <p class="question-text">{{ currentQuestion.question }}</p>
      </div>

      <div class="options-list">
        <button
          v-for="key in optionKeys"
          :key="key"
          class="option-btn"
          :class="{ selected: selectedOption === key }"
          @click="handleSelectOption(key)"
        >
          <span class="option-key" :class="{ selected: selectedOption === key }">{{ key }}</span>
          <span class="option-text">{{ currentQuestion.options[key] }}</span>
        </button>
      </div>
    </div>

    <div class="exam-footer">
      <button class="footer-nav-btn" :disabled="isFirstQuestion" @click="previousQuestion">
        ← Anterior
      </button>
      <button class="finish-btn" @click="handleFinish">Terminar</button>
      <button class="footer-nav-btn" @click="handleNext">
        {{ isLastQuestion ? 'Terminar' : 'Siguiente →' }}
      </button>
    </div>
  </div>

  <div v-else class="exam-loading">
    <p>Redirigiendo...</p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false, middleware: ["auth"] });

const router = useRouter();
const {
  currentExam,
  getCurrentQuestion,
  getAnswerForQuestion,
  answerQuestion,
  nextQuestion,
  previousQuestion,
  goToQuestion,
  updateTimeRemaining,
  finishExam,
  clearExam,
  getProgress,
} = useExamState();

const showNav = ref(false);
const selectedOption = ref<string | null>(null);
const questionStartTime = ref(Date.now());

const currentQuestion = computed(() => getCurrentQuestion());
const examProgress = computed(() => getProgress());
const isLastQuestion = computed(() => currentExam.value ? currentExam.value.currentQuestionIndex === currentExam.value.questions.length - 1 : false);
const isFirstQuestion = computed(() => currentExam.value ? currentExam.value.currentQuestionIndex === 0 : true);
const optionKeys = computed(() => currentQuestion.value ? Object.keys(currentQuestion.value.options).sort() : []);

const formattedTime = computed(() => {
  if (!currentExam.value) return "00:00";
  const s = currentExam.value.timeRemainingSeconds;
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
});

const timerClass = computed(() => {
  if (!currentExam.value) return "";
  const pct = (currentExam.value.timeRemainingSeconds / (currentExam.value.config.preset.timeMinutes * 60)) * 100;
  if (pct < 10) return "danger";
  if (pct < 25) return "warning";
  return "";
});

let timerInterval: ReturnType<typeof setInterval> | null = null;

watch(() => currentExam.value?.currentQuestionIndex, () => {
  if (currentQuestion.value) {
    const existing = getAnswerForQuestion(currentQuestion.value.id);
    selectedOption.value = existing?.selectedOption || null;
    questionStartTime.value = Date.now();
  }
});

onMounted(() => {
  if (!currentExam.value) {
    router.replace("/examenes");
    return;
  }

  if (currentQuestion.value) {
    const existing = getAnswerForQuestion(currentQuestion.value.id);
    selectedOption.value = existing?.selectedOption || null;
  }

  timerInterval = setInterval(() => {
    if (currentExam.value && currentExam.value.timeRemainingSeconds > 0) {
      updateTimeRemaining(currentExam.value.timeRemainingSeconds - 1);
    }
  }, 1000);
});

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval);
});

watch(() => currentExam.value?.timeRemainingSeconds, (val) => {
  if (val === 0) {
    finishExam();
    router.replace("/examen/resultados");
  }
});

function handleSelectOption(key: string) {
  selectedOption.value = key;
  if (currentQuestion.value) {
    answerQuestion({
      questionId: currentQuestion.value.id,
      selectedOption: key,
      timeSpentMs: Date.now() - questionStartTime.value,
    });
  }
}

function handleNext() {
  if (isLastQuestion.value) {
    handleFinish();
  } else {
    nextQuestion();
  }
}

function handleFinish() {
  const p = examProgress.value;
  if (confirm(`Has respondido ${p.answered} de ${p.total} preguntas. ¿Deseas terminar el examen?`)) {
    finishExam();
    router.replace("/examen/resultados");
  }
}

function handleExit() {
  if (confirm("Si sales ahora perderás tu progreso. ¿Estás seguro?")) {
    clearExam();
    router.replace("/examenes");
  }
}
</script>

<style scoped>
.exam-take {
  min-height: 100vh;
  background: var(--bg-dark);
  display: flex;
  flex-direction: column;
}

.exam-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid var(--border);
}

.header-btn {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.timer {
  background: var(--bg-surface);
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
}

.timer.warning { color: #fbbf24; }
.timer.danger { color: #ef4444; }

.exam-progress-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 16px;
}

.exam-progress-track { flex: 1; height: 5px; background: var(--bg-elevated); border-radius: 3px; overflow: hidden; }
.exam-progress-fill { height: 100%; background: var(--accent); border-radius: 3px; transition: width 0.3s; }
.exam-progress-text { font-size: 12px; color: var(--text-muted); min-width: 45px; }

.question-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 10px 16px;
  background: var(--bg-surface);
  border-bottom: 1px solid var(--border);
}

.nav-dot {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: var(--bg-elevated);
  border: none;
  color: var(--text-muted);
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  font-family: var(--font-body);
  transition: all 0.1s;
}

.nav-dot.answered { background: rgba(62, 189, 79, 0.25); color: var(--text-primary); }
.nav-dot.current { background: var(--accent); color: #fff; }

.exam-content {
  flex: 1;
  padding: 20px 16px;
  max-width: 720px;
  margin: 0 auto;
  width: 100%;
}

.question-card {
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 20px;
  margin-bottom: 16px;
}

.question-theme {
  display: inline-block;
  font-size: 11px;
  color: var(--accent);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: 8px;
}

.question-text { font-size: 17px; color: var(--text-primary); line-height: 1.5; }

.options-list { display: flex; flex-direction: column; gap: 10px; }

.option-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  background: var(--bg-surface);
  border: 2px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 14px 16px;
  cursor: pointer;
  font-family: var(--font-body);
  width: 100%;
  text-align: left;
  transition: all 0.15s;
}

.option-btn:hover { border-color: var(--border-hover); }
.option-btn.selected { border-color: var(--accent); background: rgba(62, 189, 79, 0.06); }

.option-key {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--bg-elevated);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-muted);
  flex-shrink: 0;
  transition: all 0.15s;
}

.option-key.selected { background: var(--accent); color: #fff; }

.option-text { flex: 1; font-size: 15px; color: var(--text-primary); line-height: 1.4; }

.exam-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  border-top: 1px solid var(--border);
  background: var(--bg-surface);
}

.footer-nav-btn {
  background: none;
  border: none;
  color: var(--text-primary);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  padding: 8px 12px;
  font-family: var(--font-body);
}

.footer-nav-btn:disabled { color: var(--text-muted); cursor: default; }

.finish-btn {
  background: #fbbf24;
  color: var(--bg-dark);
  border: none;
  padding: 8px 18px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  font-family: var(--font-body);
}

.exam-loading {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-dark);
  color: var(--text-muted);
}
</style>
