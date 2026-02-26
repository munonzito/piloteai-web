<template>
  <div class="dashboard-home">
    <!-- Skeleton: Profile Header -->
    <div v-if="isFirstLoad" class="profile-header loaded">
      <div class="header-glow"></div>
      <div class="header-grid-pattern"></div>
      <div class="header-content">
        <div class="profile-top">
          <div class="profile-greeting">
            <div class="skeleton skeleton-label"></div>
            <div class="skeleton skeleton-heading"></div>
          </div>
          <div class="skeleton skeleton-badge"></div>
        </div>
        <div class="progress-strip">
          <div class="skeleton skeleton-bar"></div>
          <div class="progress-meta">
            <div class="skeleton skeleton-text-sm"></div>
            <div class="skeleton skeleton-text-xs"></div>
          </div>
        </div>
        <div class="instruments" style="border-top: 1px solid var(--border); padding-top: 20px;">
          <div class="instrument" v-for="i in 3" :key="i" style="opacity:1;transform:none;animation:none;">
            <div class="skeleton skeleton-ring"></div>
            <div class="skeleton skeleton-text-xs" style="width:48px;"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Skeleton: Next Lesson -->
    <div v-if="isFirstLoad" class="section-block loaded" style="animation-delay:0ms">
      <div class="section-label"><span class="label-dot"></span><div class="skeleton skeleton-text-sm" style="width:120px;"></div></div>
      <div class="skeleton skeleton-continue"></div>
    </div>

    <!-- Skeleton: Subjects -->
    <div v-if="isFirstLoad" class="section-block loaded" style="animation-delay:0ms">
      <div class="section-label"><span class="label-dot"></span><div class="skeleton skeleton-text-sm" style="width:140px;"></div></div>
      <div class="subjects-grid">
        <div v-for="i in 4" :key="i" class="skeleton skeleton-tile" style="animation:none;opacity:1;transform:none;"></div>
      </div>
    </div>

    <!-- Real Content -->
    <template v-if="!isFirstLoad">
      <div class="profile-header loaded">
        <div class="header-glow"></div>
        <div class="header-grid-pattern"></div>

        <div class="header-content">
          <div class="profile-top">
            <div class="profile-greeting">
              <p class="greeting-label">Panel de vuelo</p>
              <h1 class="greeting">Hola, <em>{{ displayName }}</em></h1>
            </div>
            <NuxtLink v-if="activeLicense" :to="`/licencia/${activeLicense.id}`" class="license-badge" :style="{ '--lc': activeLicense.color }">
              <span class="badge-icon">{{ activeLicense.icon }}</span>
              <div class="badge-text">
                <span class="badge-name">{{ activeLicense.name }}</span>
                <span class="badge-full">{{ activeLicense.fullName }}</span>
              </div>
              <svg class="badge-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
            </NuxtLink>
          </div>

          <div v-if="activeLicense" class="progress-strip">
            <div class="progress-track">
              <div class="progress-fill" :style="{ width: activeLicenseCompletion + '%', '--lc': activeLicense.color }"></div>
              <div class="progress-glow" :style="{ left: activeLicenseCompletion + '%', '--lc': activeLicense.color }"></div>
            </div>
            <div class="progress-meta">
              <span class="progress-detail">{{ activeLicenseProgress.completedLessons }} de {{ activeLicenseProgress.totalLessons }} lecciones</span>
              <span class="progress-pct" :style="{ color: activeLicense.color }">{{ activeLicenseCompletion }}%</span>
            </div>
          </div>

          <div class="instruments">
            <div class="instrument" v-for="(inst, i) in instruments" :key="inst.label" style="opacity:1;transform:none;animation:none;">
              <div class="inst-ring" :style="{ '--ring-color': inst.color }">
                <svg class="inst-arc" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15.5" fill="none" stroke="currentColor" stroke-width="2" opacity="0.1" />
                  <circle cx="18" cy="18" r="15.5" fill="none" :stroke="inst.color" stroke-width="2.5"
                    stroke-linecap="round"
                    :stroke-dasharray="inst.dash"
                    stroke-dashoffset="0"
                    transform="rotate(-90 18 18)"
                    class="arc-fill"
                  />
                </svg>
                <span class="inst-value">{{ inst.value }}</span>
              </div>
              <span class="inst-label">{{ inst.label }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="section-block loaded" v-if="nextLesson">
        <div class="section-label">
          <span class="label-dot"></span>
          Siguiente lección
        </div>
        <NuxtLink :to="`/leccion/${nextLesson.id}`" class="continue-card">
          <div class="continue-play">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--accent)"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          </div>
          <div class="continue-body">
            <span class="continue-title">{{ nextLesson.title }}</span>
            <span class="continue-meta">
              <span class="meta-tag">{{ nextLesson.estimatedMinutes }} min</span>
              <span class="meta-sep">·</span>
              <span class="meta-tag accent">+{{ nextLesson.xpReward }} XP</span>
            </span>
          </div>
          <svg class="continue-chevron" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
        </NuxtLink>
      </div>

      <div class="section-block loaded" v-if="activeLicense">
        <div class="section-label">
          <span class="label-dot"></span>
          Materias · {{ activeLicense.name }}
        </div>
        <div class="subjects-grid">
          <NuxtLink
            v-for="subject in activeLicense.subjects"
            :key="subject.id"
            :to="`/licencia/${activeLicense.id}?materia=${subject.id}`"
            class="subject-tile"
            style="opacity:1;transform:none;animation:none;"
          >
            <div class="tile-top">
              <span class="tile-icon">{{ subject.icon }}</span>
              <span class="tile-pct" v-if="getSubjectCompletion(subject.id) > 0">{{ getSubjectCompletion(subject.id) }}%</span>
            </div>
            <span class="tile-name">{{ subject.name }}</span>
            <div class="tile-bar">
              <div class="tile-bar-fill" :style="{ width: getSubjectCompletion(subject.id) + '%' }"></div>
            </div>
            <span class="tile-lessons">{{ subject.lessons.length }} lecciones</span>
          </NuxtLink>
        </div>
      </div>

      <div class="section-block loaded" v-if="otherLicenses.length > 0">
        <div class="section-label">
          <span class="label-dot"></span>
          Otras licencias
        </div>
        <div class="other-grid">
          <div
            v-for="license in otherLicenses"
            :key="license.id"
            class="other-card"
            @click="navigateTo(`/licencia/${license.id}`)"
          >
            <div class="other-icon" :style="{ background: license.color + '18' }">
              <span>{{ license.icon }}</span>
            </div>
            <div class="other-info">
              <span class="other-name">{{ license.name }}</span>
              <span class="other-full">{{ license.fullName }}</span>
            </div>
            <svg class="other-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: "dashboard", middleware: ["auth"] });

const { profile, fetchProfile } = useUserProfile();
const { progress, fetchProgress } = useProgressState();
const { allLicenses, activeLicense, activeLicenseId, getLicenseProgressData, getSubjectProgressData, getNextLesson } = useLessonData();

const hasFetched = useState("dashboardHasFetched", () => false);

const isFirstLoad = computed(() => !hasFetched.value);

const displayName = computed(() => {
  const name = profile.value?.displayName || "Piloto";
  return name.split(" ")[0];
});

const activeLicenseProgress = computed(() => getLicenseProgressData(activeLicenseId.value));
const activeLicenseCompletion = computed(() => {
  const p = activeLicenseProgress.value;
  return p.totalLessons > 0 ? Math.round((p.completedLessons / p.totalLessons) * 100) : 0;
});

const nextLesson = computed(() => getNextLesson(activeLicenseId.value));
const otherLicenses = computed(() => allLicenses.filter((l) => l.id !== activeLicenseId.value));

const instruments = computed(() => {
  const p = profile.value;
  const totalXP = p?.totalXP || 0;
  const streak = p?.streak || 0;
  const lessonsCompleted = p?.lessonsCompleted || 0;
  const maxXP = 5000;
  const xpPct = Math.min(100, Math.round((totalXP / maxXP) * 100));
  const streakPct = Math.min(100, streak * 10);
  const lessonPct = Math.min(100, lessonsCompleted * 8);
  const circ = 2 * Math.PI * 15.5;
  return [
    { label: "XP Total", value: totalXP, color: "#fbbf24", dash: `${(xpPct / 100) * circ} ${circ}` },
    { label: "Racha", value: streak, color: "#f97316", dash: `${(streakPct / 100) * circ} ${circ}` },
    { label: "Lecciones", value: lessonsCompleted, color: "var(--accent)", dash: `${(lessonPct / 100) * circ} ${circ}` },
  ];
});

const getSubjectCompletion = (subjectId: string) => {
  const p = getSubjectProgressData(subjectId);
  return p.totalLessons > 0 ? Math.round((p.completedLessons / p.totalLessons) * 100) : 0;
};

onMounted(async () => {
  if (hasFetched.value) {
    if (!profile.value?.onboardingCompleted) {
      return navigateTo("/bienvenida");
    }
    // Background refresh without blocking UI
    Promise.all([fetchProfile(), fetchProgress()]);
    return;
  }

  await Promise.all([fetchProfile(), fetchProgress()]);

  if (!profile.value?.onboardingCompleted) {
    return navigateTo("/bienvenida");
  }

  hasFetched.value = true;
});
</script>

<style scoped>
.dashboard-home {
  max-width: 100%;
}

/* ──────────────────── Profile Header ──────────────────── */

.profile-header {
  position: relative;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  padding: 0;
  margin-bottom: 32px;
  overflow: hidden;
  opacity: 0;
  transform: translateY(12px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.profile-header.loaded {
  opacity: 1;
  transform: translateY(0);
}

.header-glow {
  position: absolute;
  top: -80px;
  right: -40px;
  width: 280px;
  height: 280px;
  background: radial-gradient(circle, rgba(62, 189, 79, 0.08) 0%, transparent 70%);
  pointer-events: none;
}

.header-grid-pattern {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px);
  background-size: 32px 32px;
  pointer-events: none;
  mask-image: linear-gradient(180deg, rgba(0,0,0,0.5) 0%, transparent 80%);
  -webkit-mask-image: linear-gradient(180deg, rgba(0,0,0,0.5) 0%, transparent 80%);
}

.header-content {
  position: relative;
  padding: 28px 28px 24px;
}

.profile-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 22px;
}

.greeting-label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--accent);
  margin-bottom: 4px;
}

.greeting {
  font-family: var(--font-body);
  font-size: 28px;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.03em;
  line-height: 1.15;
}

.greeting em {
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 400;
  color: var(--text-primary);
}

/* License Badge */

.license-badge {
  display: flex;
  align-items: center;
  gap: 10px;
  background: linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%);
  border: 1px solid var(--border-hover);
  padding: 10px 14px 10px 12px;
  border-radius: 14px;
  text-decoration: none;
  transition: all 0.25s ease;
  flex-shrink: 0;
  backdrop-filter: blur(8px);
}

.license-badge:hover {
  background: rgba(255,255,255,0.06);
  border-color: color-mix(in srgb, var(--lc) 40%, transparent);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.2);
}

.badge-icon { font-size: 22px; }

.badge-text { display: flex; flex-direction: column; }

.badge-name {
  font-size: 14px;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.1;
}

.badge-full {
  font-size: 11px;
  color: var(--text-muted);
  line-height: 1.2;
}

.badge-arrow {
  color: var(--text-muted);
  transition: transform 0.2s;
}

.license-badge:hover .badge-arrow {
  transform: translateX(2px);
  color: var(--text-secondary);
}

/* Progress Strip */

.progress-strip {
  margin-bottom: 24px;
}

.progress-track {
  height: 5px;
  background: rgba(255,255,255,0.04);
  border-radius: 3px;
  overflow: visible;
  position: relative;
}

.progress-fill {
  height: 100%;
  border-radius: 3px;
  background: var(--lc);
  transition: width 0.8s cubic-bezier(0.22, 1, 0.36, 1);
  position: relative;
}

.progress-glow {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--lc);
  box-shadow: 0 0 12px var(--lc), 0 0 4px var(--lc);
  opacity: 0.8;
  transition: left 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}

.progress-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
}

.progress-detail { font-size: 12px; color: var(--text-muted); }
.progress-pct { font-size: 14px; font-weight: 700; }

/* Instrument Gauges */

.instruments {
  display: flex;
  justify-content: center;
  gap: 40px;
  padding-top: 8px;
  border-top: 1px solid var(--border);
  margin-top: 0;
  padding-top: 20px;
}

.instrument {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  opacity: 0;
  transform: scale(0.85);
  animation: instrumentIn 0.5s ease forwards;
}

@keyframes instrumentIn {
  to { opacity: 1; transform: scale(1); }
}

.inst-ring {
  position: relative;
  width: 72px;
  height: 72px;
}

.inst-arc {
  width: 100%;
  height: 100%;
  color: var(--text-muted);
}

.arc-fill {
  transition: stroke-dasharray 1s cubic-bezier(0.22, 1, 0.36, 1) 0.3s;
}

.inst-value {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 700;
  color: var(--text-primary);
  font-variant-numeric: tabular-nums;
}

.inst-label {
  font-size: 11px;
  font-weight: 500;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

/* ──────────────────── Section Blocks ──────────────────── */

.section-block {
  margin-bottom: 28px;
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.section-block.loaded {
  opacity: 1;
  transform: translateY(0);
}

.section-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-muted);
  margin-bottom: 14px;
}

.label-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
  flex-shrink: 0;
}

/* Continue Card */

.continue-card {
  display: flex;
  align-items: center;
  gap: 16px;
  background: linear-gradient(135deg, rgba(62, 189, 79, 0.06) 0%, var(--bg-surface) 100%);
  border: 1px solid rgba(62, 189, 79, 0.15);
  border-radius: var(--radius-md);
  padding: 18px 20px;
  text-decoration: none;
  transition: all 0.25s ease;
  position: relative;
  overflow: hidden;
}

.continue-card::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: var(--accent);
  border-radius: 0 2px 2px 0;
}

.continue-card:hover {
  border-color: rgba(62, 189, 79, 0.35);
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(62, 189, 79, 0.08);
}

.continue-play {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: rgba(62, 189, 79, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: background 0.2s;
}

.continue-card:hover .continue-play {
  background: rgba(62, 189, 79, 0.2);
}

.continue-body { flex: 1; display: flex; flex-direction: column; gap: 4px; }

.continue-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1.3;
}

.continue-meta { display: flex; align-items: center; gap: 6px; }
.meta-tag { font-size: 12px; color: var(--text-muted); font-weight: 500; }
.meta-tag.accent { color: var(--accent); }
.meta-sep { color: var(--text-muted); font-size: 10px; }

.continue-chevron {
  color: var(--text-muted);
  transition: transform 0.2s;
  flex-shrink: 0;
}

.continue-card:hover .continue-chevron {
  transform: translateX(3px);
  color: var(--accent);
}

/* ──────────────────── Subject Tiles ──────────────────── */

.subjects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(185px, 1fr));
  gap: 10px;
}

.subject-tile {
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  text-decoration: none;
  transition: all 0.2s ease;
  opacity: 0;
  transform: translateY(10px);
  animation: tileIn 0.4s ease forwards;
  position: relative;
  overflow: hidden;
}

@keyframes tileIn {
  to { opacity: 1; transform: translateY(0); }
}

.subject-tile::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.02) 0%, transparent 50%);
  pointer-events: none;
}

.subject-tile:hover {
  border-color: var(--border-hover);
  transform: translateY(-3px);
  box-shadow: 0 12px 32px rgba(0,0,0,0.15);
}

.tile-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tile-icon { font-size: 24px; }

.tile-pct {
  font-size: 11px;
  font-weight: 700;
  color: var(--accent);
  background: rgba(62, 189, 79, 0.1);
  padding: 2px 7px;
  border-radius: 6px;
}

.tile-name {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1.3;
}

.tile-bar {
  height: 3px;
  background: rgba(255,255,255,0.04);
  border-radius: 2px;
  overflow: hidden;
}

.tile-bar-fill {
  height: 100%;
  background: var(--accent);
  border-radius: 2px;
  transition: width 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

.tile-lessons {
  font-size: 11px;
  color: var(--text-muted);
}

/* ──────────────────── Other Licenses ──────────────────── */

.other-grid {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.other-card {
  display: flex;
  align-items: center;
  gap: 14px;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 14px 16px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.other-card:hover {
  border-color: var(--border-hover);
  transform: translateX(4px);
}

.other-icon {
  width: 44px;
  height: 44px;
  border-radius: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  flex-shrink: 0;
}

.other-info { flex: 1; display: flex; flex-direction: column; gap: 1px; }
.other-name { font-size: 15px; font-weight: 700; color: var(--text-primary); }
.other-full { font-size: 12px; color: var(--text-muted); }

.other-arrow {
  color: var(--text-muted);
  transition: transform 0.2s;
  flex-shrink: 0;
}

.other-card:hover .other-arrow {
  transform: translateX(3px);
  color: var(--text-secondary);
}

/* ──────────────────── Skeleton Loaders ──────────────────── */

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

.skeleton-label {
  width: 90px;
  height: 12px;
  margin-bottom: 8px;
}

.skeleton-heading {
  width: 180px;
  height: 28px;
}

.skeleton-badge {
  width: 160px;
  height: 48px;
  border-radius: 14px;
  flex-shrink: 0;
}

.skeleton-bar {
  width: 100%;
  height: 5px;
  border-radius: 3px;
}

.skeleton-text-sm {
  height: 12px;
  width: 100px;
}

.skeleton-text-xs {
  height: 10px;
  width: 40px;
}

.skeleton-ring {
  width: 72px;
  height: 72px;
  border-radius: 50%;
}

.skeleton-continue {
  width: 100%;
  height: 80px;
  border-radius: var(--radius-md);
}

.skeleton-tile {
  background: linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.8s ease-in-out infinite;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  height: 120px;
}

/* ──────────────────── Responsive ──────────────────── */

@media (max-width: 640px) {
  .header-content { padding: 22px 18px 20px; }
  .profile-top { flex-direction: column; gap: 14px; }
  .greeting { font-size: 24px; }
  .license-badge { align-self: flex-start; }
  .instruments { gap: 20px; }
  .inst-ring { width: 60px; height: 60px; }
  .inst-value { font-size: 15px; }
  .skeleton-ring { width: 60px; height: 60px; }
  .subjects-grid { grid-template-columns: repeat(2, 1fr); gap: 8px; }
  .subject-tile { padding: 14px; }
  .tile-icon { font-size: 20px; }
  .tile-name { font-size: 12px; }
}
</style>
