<template>
  <div class="dashboard-layout">
    <aside class="sidebar" :class="{ open: sidebarOpen }">
      <div class="sidebar-header">
        <NuxtLink to="/inicio" class="sidebar-logo">
          <img src="/icon.png" alt="Piloteai" class="sidebar-logo-img" />
          <span class="sidebar-logo-text">Piloteai</span>
        </NuxtLink>
        <button class="sidebar-close" @click="sidebarOpen = false">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
      </div>

      <nav class="sidebar-nav">
        <NuxtLink to="/inicio" class="sidebar-link" :class="{ active: route.path === '/inicio' }" @click="sidebarOpen = false">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          <span>Aprender</span>
        </NuxtLink>
        <NuxtLink to="/examenes" class="sidebar-link" :class="{ active: route.path.startsWith('/examen') }" @click="sidebarOpen = false">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
          <span>Exámenes</span>
        </NuxtLink>
        <NuxtLink to="/tutor" class="sidebar-link" :class="{ active: route.path === '/tutor' }" @click="sidebarOpen = false">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
          <span>Tutor IA</span>
        </NuxtLink>
        <NuxtLink to="/perfil" class="sidebar-link" :class="{ active: route.path === '/perfil' }" @click="sidebarOpen = false">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          <span>Perfil</span>
        </NuxtLink>
      </nav>

      <div class="sidebar-footer">
        <button class="sidebar-link logout-link" @click="handleLogout">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          <span>Cerrar sesión</span>
        </button>
      </div>
    </aside>

    <div class="sidebar-backdrop" :class="{ visible: sidebarOpen }" @click="sidebarOpen = false" />

    <div class="dashboard-main">
      <header class="dashboard-topbar">
        <button class="topbar-menu" @click="sidebarOpen = true">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
        <div class="topbar-spacer" />
        <NuxtLink to="/perfil" class="topbar-avatar">
          {{ userInitial }}
        </NuxtLink>
      </header>

      <div class="dashboard-content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { signOut } from "firebase/auth";

const route = useRoute();
const router = useRouter();
const user = useUser();
const { $auth } = useNuxtApp();
const sidebarOpen = ref(false);

const userInitial = computed(() => {
  return user.value?.email?.charAt(0).toUpperCase() || "P";
});

const handleLogout = async () => {
  try {
    await signOut($auth);
    await $fetch("/api/auth/sessionLogout", { method: "POST" });
  } catch (e) {
    console.error("Error signing out:", e);
  }
  user.value = null;
  sidebarOpen.value = false;
  router.push("/acceder");
};
</script>

<style scoped>
.dashboard-layout {
  display: flex;
  min-height: 100vh;
  background: var(--bg-dark);
}

.sidebar {
  width: 240px;
  background: var(--bg-surface);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 200;
  transition: transform 0.25s ease;
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 20px 16px;
  border-bottom: 1px solid var(--border);
}

.sidebar-close {
  display: none;
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  padding: 4px;
}

.sidebar-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: var(--text-primary);
}

.sidebar-logo-img {
  width: 30px;
  height: 30px;
  border-radius: 6px;
}

.sidebar-logo-text {
  font-family: var(--font-display);
  font-size: 20px;
}

.sidebar-nav {
  flex: 1;
  padding: 12px 10px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.sidebar-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  border-radius: var(--radius-sm);
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.15s ease;
  border: none;
  background: none;
  cursor: pointer;
  width: 100%;
  text-align: left;
  font-family: var(--font-body);
}

.sidebar-link:hover {
  background: rgba(255, 255, 255, 0.04);
  color: var(--text-primary);
}

.sidebar-link.active {
  background: var(--accent-glow);
  color: var(--accent);
}

.sidebar-link.active svg {
  stroke: var(--accent);
}

.sidebar-footer {
  padding: 12px 10px;
  border-top: 1px solid var(--border);
}

.logout-link {
  color: var(--text-muted);
}

.logout-link:hover {
  color: #f87171;
  background: rgba(248, 113, 113, 0.08);
}

.sidebar-backdrop {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 190;
  opacity: 0;
  transition: opacity 0.25s ease;
}

.dashboard-main {
  flex: 1;
  margin-left: 240px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.dashboard-topbar {
  display: none;
  align-items: center;
  padding: 12px 20px;
  border-bottom: 1px solid var(--border);
  background: rgba(6, 14, 26, 0.85);
  backdrop-filter: blur(16px);
  position: sticky;
  top: 0;
  z-index: 50;
}

.topbar-menu {
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 6px;
  border-radius: 6px;
  transition: color 0.15s;
}

.topbar-menu:hover {
  color: var(--text-primary);
}

.topbar-spacer {
  flex: 1;
}

.topbar-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--accent);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
}

.dashboard-content {
  flex: 1;
  padding: 32px;
  max-width: 960px;
  width: 100%;
}

@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
  }

  .sidebar.open {
    transform: translateX(0);
  }

  .sidebar-close {
    display: block;
  }

  .sidebar-backdrop.visible {
    display: block;
    opacity: 1;
  }

  .dashboard-main {
    margin-left: 0;
  }

  .dashboard-topbar {
    display: flex;
  }

  .dashboard-content {
    padding: 20px;
  }
}
</style>
