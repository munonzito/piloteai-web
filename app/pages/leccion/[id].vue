<template>
  <div class="lesson-viewer" v-if="lesson">
    <div class="lesson-header">
      <button class="header-btn" :disabled="currentStepIndex === 0" @click="prevStep">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <div class="header-progress">
        <div class="progress-track">
          <div class="progress-fill" :style="{ width: progressPct + '%' }"></div>
        </div>
        <span class="progress-text">{{ currentStepIndex + 1 }} / {{ lesson.steps.length }}</span>
      </div>
      <button class="header-btn" @click="handleClose">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
      </button>
    </div>

    <div class="lesson-content">
      <template v-if="currentStep.type === 'lesson'">
        <div class="content-step">
          <h2 class="step-title">{{ currentStep.title }}</h2>
          <div class="markdown-body" v-html="renderedMarkdown"></div>
        </div>
      </template>

      <template v-else-if="currentStep.type === 'quiz'">
        <div class="quiz-step">
          <h2 class="quiz-question">{{ currentStep.question }}</h2>
          <div class="quiz-divider"></div>
          <div class="quiz-options">
            <button
              v-for="(option, idx) in shuffledOptions"
              :key="option.id"
              class="quiz-option"
              :class="getOptionClass(option.id)"
              :disabled="quizAnswered"
              @click="handleQuizAnswer(option.id)"
            >
              <span class="option-letter">{{ String.fromCharCode(65 + idx) }}</span>
              <span class="option-text">{{ option.text }}</span>
              <span v-if="quizAnswered && option.id === currentStep.correctOptionId" class="option-icon correct">✓</span>
              <span v-if="quizAnswered && selectedOptionId === option.id && option.id !== currentStep.correctOptionId" class="option-icon incorrect">✕</span>
            </button>
          </div>
          <div v-if="quizAnswered" class="quiz-explanation" :class="{ correct: selectedOptionId === currentStep.correctOptionId }">
            <strong>{{ selectedOptionId === currentStep.correctOptionId ? '¡Correcto!' : 'Explicación' }}</strong>
            <p>{{ currentStep.explanation }}</p>
          </div>
        </div>
      </template>
    </div>

    <div class="lesson-footer">
      <button v-if="isLastStep" class="footer-btn primary" @click="handleComplete">
        Completar Lección
      </button>
      <button v-else class="footer-btn primary" @click="nextStep">
        Continuar →
      </button>
    </div>
  </div>

  <div v-else class="lesson-loading">
    <p>Cargando lección...</p>
  </div>
</template>

<script setup lang="ts">
import type { QuizStep, QuizOption } from "../../../types/lesson";

definePageMeta({ layout: false, middleware: ["auth"] });

const route = useRoute();
const router = useRouter();
const { getLessonById, getSubjectById } = useLessonData();
const { completeLesson } = useProgressState();

const lessonId = computed(() => route.params.id as string);
const lesson = computed(() => getLessonById(lessonId.value));

const currentStepIndex = ref(0);
const quizAnswered = ref(false);
const selectedOptionId = ref<string | null>(null);
const quizResults = ref({ correct: 0, total: 0 });

const currentStep = computed(() => lesson.value!.steps[currentStepIndex.value]);
const isLastStep = computed(() => currentStepIndex.value === lesson.value!.steps.length - 1);
const progressPct = computed(() => ((currentStepIndex.value + 1) / lesson.value!.steps.length) * 100);

const renderedMarkdown = computed(() => {
  if (currentStep.value?.type !== "lesson") return "";
  return simpleMarkdown(currentStep.value.content);
});

const shuffledOptions = computed(() => {
  if (currentStep.value?.type !== "quiz") return [];
  const opts = [...(currentStep.value as QuizStep).options];
  for (let i = opts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [opts[i], opts[j]] = [opts[j], opts[i]];
  }
  return opts;
});

function simpleMarkdown(text: string): string {
  return text
    .replace(/^### (.+)$/gm, '<h4>$1</h4>')
    .replace(/^## (.+)$/gm, '<h3>$1</h3>')
    .replace(/^# (.+)$/gm, '<h2>$1</h2>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.+<\/li>\n?)+/g, '<ul>$&</ul>')
    .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[hublop])/gm, '')
    .replace(/\n/g, '<br>');
}

function getOptionClass(optionId: string) {
  if (!quizAnswered.value) return selectedOptionId.value === optionId ? "selected" : "";
  const quiz = currentStep.value as QuizStep;
  if (optionId === quiz.correctOptionId) return "correct";
  if (optionId === selectedOptionId.value) return "incorrect";
  return "dimmed";
}

function handleQuizAnswer(optionId: string) {
  if (quizAnswered.value) return;
  selectedOptionId.value = optionId;
  quizAnswered.value = true;
  const quiz = currentStep.value as QuizStep;
  const isCorrect = optionId === quiz.correctOptionId;
  quizResults.value = {
    correct: quizResults.value.correct + (isCorrect ? 1 : 0),
    total: quizResults.value.total + 1,
  };
}

function nextStep() {
  if (!isLastStep.value) {
    currentStepIndex.value++;
    quizAnswered.value = false;
    selectedOptionId.value = null;
    window.scrollTo(0, 0);
  }
}

function prevStep() {
  if (currentStepIndex.value > 0) {
    currentStepIndex.value--;
    quizAnswered.value = false;
    selectedOptionId.value = null;
    window.scrollTo(0, 0);
  }
}

function handleClose() {
  router.back();
}

async function handleComplete() {
  if (!lesson.value) return;
  const totalQuizzes = lesson.value.steps.filter((s) => s.type === "quiz").length;
  const score = totalQuizzes > 0 ? Math.round((quizResults.value.correct / totalQuizzes) * 100) : 100;
  const subject = getSubjectById(lesson.value.subjectId);

  try {
    const result = await completeLesson({
      lessonId: lesson.value.id,
      subjectId: lesson.value.subjectId,
      licenseId: subject?.licenseId || "ppl",
      score,
      completed: true,
      quizResults: [],
    });

    alert(`¡Lección completada!\nPuntuación: ${score}%\n+${result.xpEarned} XP ganados`);
  } catch {
    alert(`¡Lección completada!\nPuntuación: ${score}%`);
  }

  router.back();
}
</script>

<style scoped>
.lesson-viewer {
  min-height: 100vh;
  background: var(--bg-dark);
  display: flex;
  flex-direction: column;
}

.lesson-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  border-bottom: 1px solid var(--border);
  background: var(--bg-dark);
  position: sticky;
  top: 0;
  z-index: 10;
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
  transition: all 0.15s;
  flex-shrink: 0;
}

.header-btn:hover { color: var(--text-primary); border-color: var(--border-hover); }
.header-btn:disabled { opacity: 0.4; cursor: default; }

.header-progress { flex: 1; display: flex; flex-direction: column; gap: 4px; }

.progress-track { height: 5px; background: var(--bg-elevated); border-radius: 3px; overflow: hidden; }
.progress-fill { height: 100%; background: var(--accent); border-radius: 3px; transition: width 0.3s; }
.progress-text { font-size: 11px; color: var(--text-muted); text-align: center; }

.lesson-content {
  flex: 1;
  padding: 28px 24px;
  max-width: 680px;
  margin: 0 auto;
  width: 100%;
}

.step-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 20px;
}

.markdown-body { color: var(--text-secondary); font-size: 15px; line-height: 1.7; }
.markdown-body :deep(h2) { font-size: 20px; font-weight: 700; color: var(--text-primary); margin: 28px 0 12px; }
.markdown-body :deep(h3) { font-size: 17px; font-weight: 600; color: var(--text-primary); margin: 22px 0 10px; }
.markdown-body :deep(h4) { font-size: 15px; font-weight: 600; color: var(--text-primary); margin: 18px 0 8px; }
.markdown-body :deep(strong) { color: var(--text-primary); font-weight: 600; }
.markdown-body :deep(ul) { padding-left: 20px; margin: 10px 0; list-style: none; }
.markdown-body :deep(li) { position: relative; padding-left: 6px; margin-bottom: 6px; }
.markdown-body :deep(li)::before { content: "•"; position: absolute; left: -14px; color: var(--accent); }
.markdown-body :deep(blockquote) { border-left: 3px solid var(--accent); padding: 10px 16px; margin: 16px 0; background: rgba(62, 189, 79, 0.06); border-radius: 0 var(--radius-sm) var(--radius-sm) 0; color: var(--text-secondary); font-style: italic; }

.quiz-step { text-align: center; }

.quiz-question {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.4;
  margin-bottom: 16px;
}

.quiz-divider {
  width: 50px;
  height: 3px;
  background: var(--accent);
  margin: 0 auto 24px;
  border-radius: 2px;
}

.quiz-options { display: flex; flex-direction: column; gap: 10px; text-align: left; }

.quiz-option {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  background: var(--bg-surface);
  border: 2px solid var(--border);
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-family: var(--font-body);
  font-size: 15px;
  color: var(--text-primary);
  transition: all 0.15s;
  width: 100%;
  text-align: left;
}

.quiz-option:hover:not(:disabled) { border-color: var(--border-hover); }
.quiz-option.selected { border-color: var(--accent); background: rgba(62, 189, 79, 0.06); }
.quiz-option.correct { border-color: var(--accent); background: rgba(62, 189, 79, 0.1); }
.quiz-option.incorrect { border-color: #ef4444; background: rgba(239, 68, 68, 0.1); }
.quiz-option.dimmed { opacity: 0.5; }
.quiz-option:disabled { cursor: default; }

.option-letter {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: var(--bg-elevated);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-muted);
  flex-shrink: 0;
}

.quiz-option.correct .option-letter { background: var(--accent); color: #fff; }
.quiz-option.incorrect .option-letter { background: #ef4444; color: #fff; }

.option-text { flex: 1; line-height: 1.4; }
.option-icon { font-weight: 700; flex-shrink: 0; }
.option-icon.correct { color: var(--accent); }
.option-icon.incorrect { color: #ef4444; }

.quiz-explanation {
  margin-top: 20px;
  padding: 16px;
  background: var(--bg-surface);
  border-left: 3px solid #fbbf24;
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  text-align: left;
}

.quiz-explanation.correct { border-left-color: var(--accent); }
.quiz-explanation strong { color: var(--text-primary); font-size: 15px; display: block; margin-bottom: 6px; }
.quiz-explanation p { color: var(--text-secondary); font-size: 14px; line-height: 1.6; margin: 0; }

.lesson-footer {
  padding: 16px 24px 28px;
  border-top: 1px solid var(--border);
  background: var(--bg-dark);
  position: sticky;
  bottom: 0;
}

.footer-btn {
  width: 100%;
  max-width: 680px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px;
  border-radius: var(--radius-sm);
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  font-family: var(--font-body);
  transition: all 0.2s;
}

.footer-btn.primary {
  background: var(--accent);
  color: #fff;
}

.footer-btn.primary:hover {
  background: var(--accent-hover);
  transform: translateY(-1px);
}

.lesson-loading {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  background: var(--bg-dark);
}

@media (max-width: 640px) {
  .lesson-content { padding: 20px 16px; }
  .quiz-question { font-size: 17px; }
}
</style>
