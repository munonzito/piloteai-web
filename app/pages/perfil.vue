<template>
  <div class="profile-page">
    <h1 class="page-title">Perfil</h1>

    <!-- Skeleton -->
    <template v-if="isLoading">
      <div class="profile-card">
        <div class="skeleton skeleton-avatar"></div>
        <div class="profile-info">
          <div class="skeleton skeleton-text" style="width:140px;height:18px;"></div>
          <div class="skeleton skeleton-text" style="width:180px;height:13px;"></div>
        </div>
      </div>

      <div class="stats-section">
        <h2 class="section-title">Estadísticas</h2>
        <div class="stats-grid">
          <div v-for="i in 4" :key="i" class="stat-card">
            <div class="skeleton skeleton-text" style="width:28px;height:22px;margin:0 auto;"></div>
            <div class="skeleton skeleton-text" style="width:48px;height:22px;margin:0 auto;"></div>
            <div class="skeleton skeleton-text" style="width:64px;height:11px;margin:0 auto;"></div>
          </div>
        </div>
      </div>

      <div class="license-section">
        <h2 class="section-title">Cambiar Licencia Activa</h2>
        <div class="license-options">
          <div v-for="i in 4" :key="i" class="skeleton skeleton-option"></div>
        </div>
      </div>
    </template>

    <!-- Real Content -->
    <template v-else>
      <div class="profile-card">
        <div class="avatar">{{ userInitial }}</div>
        <div class="profile-info">
          <span class="profile-name">{{ profile?.displayName || 'Piloto' }}</span>
          <span class="profile-email">{{ user?.email }}</span>
        </div>
      </div>

      <div class="stats-section">
        <h2 class="section-title">Estadísticas</h2>
        <div class="stats-grid">
          <div class="stat-card">
            <span class="stat-icon">⭐</span>
            <span class="stat-value">{{ profile?.totalXP || 0 }}</span>
            <span class="stat-label">XP Total</span>
          </div>
          <div class="stat-card">
            <span class="stat-icon">🔥</span>
            <span class="stat-value">{{ profile?.streak || 0 }}</span>
            <span class="stat-label">Racha Actual</span>
          </div>
          <div class="stat-card">
            <span class="stat-icon">📚</span>
            <span class="stat-value">{{ profile?.lessonsCompleted || 0 }}</span>
            <span class="stat-label">Lecciones</span>
          </div>
          <div class="stat-card">
            <span class="stat-icon">🎓</span>
            <span class="stat-value">{{ (profile?.activeLicense || 'ppl').toUpperCase() }}</span>
            <span class="stat-label">Licencia Activa</span>
          </div>
        </div>
      </div>

      <div class="license-section">
        <h2 class="section-title">Cambiar Licencia Activa</h2>
        <div class="license-options">
          <button
            v-for="lic in allLicenses"
            :key="lic.id"
            class="license-option"
            :class="{ active: profile?.activeLicense === lic.id }"
            @click="handleChangeLicense(lic.id)"
          >
            <span class="lo-icon">{{ lic.icon }}</span>
            <span class="lo-name">{{ lic.name }}</span>
            <span v-if="profile?.activeLicense === lic.id" class="lo-check">✓</span>
          </button>
        </div>
      </div>

      <div class="danger-section">
        <h2 class="danger-title">Zona de Peligro</h2>
        <button class="danger-btn delete" @click="handleDeleteAccount">
          Eliminar Cuenta
        </button>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { LicenseId } from "../../types/lesson";

definePageMeta({ layout: "dashboard", middleware: ["auth"] });

const user = useUser();
const { profile, loading, fetchProfile, updateActiveLicense, deleteAccount } = useUserProfile();
const { allLicenses } = useLessonData();
const router = useRouter();

const hasFetched = useState("perfilHasFetched", () => false);
const isLoading = computed(() => !hasFetched.value && loading.value);

const userInitial = computed(() => user.value?.email?.charAt(0).toUpperCase() || "P");

const handleChangeLicense = async (id: LicenseId) => {
  try {
    await updateActiveLicense(id);
  } catch {}
};

const handleDeleteAccount = async () => {
  if (!confirm("¿Estás seguro? Se eliminarán permanentemente tu cuenta, progreso y todos los datos asociados. Esta acción no se puede deshacer.")) return;
  try {
    await deleteAccount();
    user.value = null;
    router.push("/acceder");
  } catch {
    alert("No se pudo eliminar la cuenta. Intenta de nuevo.");
  }
};

onMounted(async () => {
  if (hasFetched.value) {
    fetchProfile();
    return;
  }
  await fetchProfile();
  hasFetched.value = true;
});
</script>

<style scoped>
.page-title { font-size: 26px; font-weight: 700; color: var(--text-primary); margin-bottom: 24px; }

.profile-card {
  display: flex;
  align-items: center;
  gap: 16px;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 22px;
  margin-bottom: 28px;
}

.avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--accent);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  font-weight: 700;
  flex-shrink: 0;
}

.profile-info { display: flex; flex-direction: column; gap: 2px; }
.profile-name { font-size: 18px; font-weight: 700; color: var(--text-primary); }
.profile-email { font-size: 13px; color: var(--text-secondary); }

.section-title { font-size: 16px; font-weight: 600; color: var(--text-primary); margin-bottom: 12px; }

.stats-section { margin-bottom: 28px; }

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.stat-card {
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  text-align: center;
}

.stat-icon { font-size: 22px; }
.stat-value { font-size: 22px; font-weight: 700; color: var(--text-primary); }
.stat-label { font-size: 11px; color: var(--text-muted); }

.license-section { margin-bottom: 28px; }

.license-options { display: flex; flex-direction: column; gap: 6px; }

.license-option {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  cursor: pointer;
  width: 100%;
  text-align: left;
  font-family: var(--font-body);
  transition: all 0.15s;
}

.license-option:hover { border-color: var(--border-hover); }
.license-option.active { border-color: var(--accent); background: rgba(62, 189, 79, 0.06); }

.lo-icon { font-size: 18px; }
.lo-name { flex: 1; font-size: 14px; font-weight: 500; color: var(--text-primary); }
.lo-check { color: var(--accent); font-weight: 700; }

.danger-section { margin-bottom: 28px; }
.danger-title { font-size: 13px; font-weight: 600; color: #ef4444; margin-bottom: 10px; }

.danger-btn {
  padding: 10px 18px;
  border-radius: var(--radius-sm);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  font-family: var(--font-body);
  transition: all 0.15s;
}

.danger-btn.delete {
  background: none;
  border: 1px solid #ef4444;
  color: #ef4444;
}

.danger-btn.delete:hover {
  background: rgba(239, 68, 68, 0.1);
}

/* Skeletons */

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

.skeleton-avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  flex-shrink: 0;
}

.skeleton-text {
  display: block;
}

.skeleton-option {
  height: 46px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
}

@media (max-width: 640px) {
  .stats-grid { grid-template-columns: repeat(2, 1fr); }
}
</style>
