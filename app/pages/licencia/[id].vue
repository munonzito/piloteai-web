<template>
  <div class="license-detail" v-if="license">
    <div class="page-header">
      <button class="back-btn" @click="router.push('/inicio')">← Volver</button>
      <h1 class="page-title">{{ license.name }}</h1>
    </div>

    <div class="license-card">
      <div class="license-top">
        <div class="license-icon" :style="{ background: license.color + '20' }">
          <span>{{ license.icon }}</span>
        </div>
        <div class="license-info">
          <h2 class="license-fullname">{{ license.fullName }}</h2>
          <p class="license-desc">{{ license.description }}</p>
        </div>
      </div>
      <div class="progress-section">
        <div class="progress-header">
          <span class="progress-label">Progreso General</span>
          <span class="progress-pct" :style="{ color: license.color }">{{ completionPct }}%</span>
        </div>
        <div class="progress-bar-track">
          <div class="progress-bar-fill" :style="{ width: completionPct + '%', background: license.color }"></div>
        </div>
        <div class="progress-stats">
          <span>{{ licenseProgress.completedLessons }}/{{ licenseProgress.totalLessons }} lecciones</span>
          <span>{{ licenseProgress.earnedXP }}/{{ licenseProgress.totalXP }} XP</span>
        </div>
      </div>
    </div>

    <div class="subjects-tabs">
      <h3 class="section-title">Materias</h3>
      <div class="tabs-scroll">
        <button
          v-for="subject in license.subjects"
          :key="subject.id"
          class="tab-btn"
          :class="{ active: selectedSubjectId === subject.id }"
          @click="selectedSubjectId = subject.id"
        >
          <span class="tab-icon">{{ subject.icon }}</span>
          {{ subject.name }}
        </button>
      </div>
    </div>

    <div class="lessons-section" v-if="selectedSubject">
      <div class="lessons-header">
        <h3 class="section-title">{{ selectedSubject.name }}</h3>
        <span class="lesson-count">{{ selectedSubject.lessons.length }} lecciones</span>
      </div>

      <div v-if="selectedSubject.lessons.length === 0" class="empty-state">
        <span class="empty-icon">📚</span>
        <p>Próximamente: lecciones para {{ selectedSubject.name }}</p>
      </div>

      <div v-else class="lessons-list">
        <NuxtLink
          v-for="(lesson, idx) in selectedSubject.lessons"
          :key="lesson.id"
          :to="isLocked(lesson, idx) ? undefined : `/leccion/${lesson.id}`"
          class="lesson-card"
          :class="{ locked: isLocked(lesson, idx), completed: isCompleted(lesson.id) }"
          @click.prevent="isLocked(lesson, idx) && undefined"
        >
          <div class="lesson-status">
            <span v-if="isCompleted(lesson.id)" class="status-check">✓</span>
            <span v-else-if="isLocked(lesson, idx)" class="status-lock">🔒</span>
            <span v-else class="status-num">{{ idx + 1 }}</span>
          </div>
          <div class="lesson-info">
            <span class="lesson-title">{{ lesson.title }}</span>
            <span class="lesson-meta">{{ lesson.estimatedMinutes }} min · +{{ lesson.xpReward }} XP · {{ lesson.steps.length }} pasos</span>
          </div>
          <span class="lesson-arrow" v-if="!isLocked(lesson, idx)">→</span>
        </NuxtLink>
      </div>
    </div>
  </div>

  <div v-else class="license-error">
    <p>Licencia no encontrada</p>
    <button @click="router.push('/inicio')">Volver</button>
  </div>
</template>

<script setup lang="ts">
import type { Lesson } from "../../../types/lesson";

definePageMeta({ layout: "dashboard", middleware: ["auth"] });

const route = useRoute();
const router = useRouter();
const { getLicenseById, getLicenseProgressData, getSubjectProgressData, isLessonCompleted } = useLessonData();
const { fetchProgress } = useProgressState();

const licenseId = computed(() => route.params.id as string);
const license = computed(() => getLicenseById(licenseId.value as any));
const licenseProgress = computed(() => getLicenseProgressData(licenseId.value as any));

const completionPct = computed(() => {
  const p = licenseProgress.value;
  return p.totalLessons > 0 ? Math.round((p.completedLessons / p.totalLessons) * 100) : 0;
});

const initialSubjectId = computed(() => (route.query.materia as string) || license.value?.subjects[0]?.id || "");
const selectedSubjectId = ref(initialSubjectId.value);
const selectedSubject = computed(() => license.value?.subjects.find((s) => s.id === selectedSubjectId.value));

const isCompleted = (lessonId: string) => isLessonCompleted(lessonId);

const isLocked = (lesson: Lesson, idx: number) => {
  if (idx === 0 || !selectedSubject.value) return false;
  const prev = selectedSubject.value.lessons[idx - 1];
  return !isLessonCompleted(prev.id);
};

watch(license, (l) => {
  if (l && !selectedSubjectId.value) {
    selectedSubjectId.value = l.subjects[0]?.id || "";
  }
});

onMounted(() => fetchProgress());
</script>

<style scoped>
.page-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.back-btn {
  background: var(--bg-surface);
  border: 1px solid var(--border);
  color: var(--text-secondary);
  padding: 8px 14px;
  border-radius: var(--radius-sm);
  font-size: 13px;
  cursor: pointer;
  font-family: var(--font-body);
  transition: all 0.15s;
}

.back-btn:hover { color: var(--text-primary); border-color: var(--border-hover); }

.page-title {
  font-size: 22px;
  font-weight: 700;
  color: var(--text-primary);
}

.license-card {
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 22px;
  margin-bottom: 28px;
}

.license-top { display: flex; gap: 16px; margin-bottom: 20px; }

.license-icon {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  flex-shrink: 0;
}

.license-info { flex: 1; }
.license-fullname { font-size: 18px; font-weight: 700; color: var(--text-primary); margin-bottom: 4px; }
.license-desc { font-size: 13px; color: var(--text-secondary); line-height: 1.5; }

.progress-section { border-top: 1px solid var(--border); padding-top: 16px; }
.progress-header { display: flex; justify-content: space-between; margin-bottom: 8px; }
.progress-label { font-size: 13px; font-weight: 600; color: var(--text-primary); }
.progress-pct { font-size: 18px; font-weight: 700; }

.progress-bar-track { height: 6px; background: var(--bg-elevated); border-radius: 3px; overflow: hidden; }
.progress-bar-fill { height: 100%; border-radius: 3px; transition: width 0.4s; }

.progress-stats { display: flex; justify-content: space-between; margin-top: 8px; font-size: 12px; color: var(--text-muted); }

.subjects-tabs { margin-bottom: 24px; }
.section-title { font-size: 16px; font-weight: 600; color: var(--text-primary); margin-bottom: 12px; }

.tabs-scroll {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 4px;
  -webkit-overflow-scrolling: touch;
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 20px;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  color: var(--text-secondary);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  font-family: var(--font-body);
  transition: all 0.15s;
}

.tab-btn:hover { border-color: var(--border-hover); color: var(--text-primary); }
.tab-btn.active { background: var(--accent); color: #fff; border-color: var(--accent); }
.tab-icon { font-size: 15px; }

.lessons-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.lesson-count { font-size: 13px; color: var(--text-muted); }

.empty-state {
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 40px;
  text-align: center;
  color: var(--text-muted);
  font-size: 14px;
}

.empty-icon { font-size: 36px; display: block; margin-bottom: 12px; }

.lessons-list { display: flex; flex-direction: column; gap: 8px; }

.lesson-card {
  display: flex;
  align-items: center;
  gap: 14px;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 14px 16px;
  text-decoration: none;
  transition: all 0.15s;
}

.lesson-card:not(.locked):hover {
  border-color: var(--border-hover);
  transform: translateX(2px);
}

.lesson-card.locked { opacity: 0.5; cursor: not-allowed; }
.lesson-card.completed { border-left: 3px solid var(--accent); }

.lesson-status {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--bg-elevated);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 14px;
}

.status-check { color: var(--accent); font-weight: 700; }
.status-lock { font-size: 14px; }
.status-num { color: var(--text-muted); font-weight: 600; }

.lesson-info { flex: 1; display: flex; flex-direction: column; gap: 2px; }
.lesson-title { font-size: 14px; font-weight: 600; color: var(--text-primary); }
.lesson-meta { font-size: 12px; color: var(--text-muted); }
.lesson-arrow { color: var(--text-muted); font-size: 16px; }

.license-error {
  text-align: center;
  padding: 80px 20px;
  color: var(--text-muted);
}

@media (max-width: 640px) {
  .page-title { font-size: 18px; }
  .license-top { flex-direction: column; }
}
</style>
