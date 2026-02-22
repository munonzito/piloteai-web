<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
:root {
  --bg-dark: #0A1929;
  --bg-surface: #1A2B42;
  --bg-surface-light: #243B55;
  --accent: #4CAF50;
  --accent-light: #81C784;
  --text-primary: #FFFFFF;
  --text-secondary: #B0C4DE;
  --text-muted: #6B7C93;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  background-color: var(--bg-dark);
  color: var(--text-primary);
  -webkit-font-smoothing: antialiased;
}

a {
  color: var(--accent);
  text-decoration: none;
}

a:hover {
  color: var(--accent-light);
}
</style>
