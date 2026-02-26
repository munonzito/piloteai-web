<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
:root {
  --bg-dark: #060E1A;
  --bg-surface: #0C1A2E;
  --bg-surface-light: #152238;
  --bg-elevated: #1A2B45;
  --accent: #3EBD4F;
  --accent-hover: #35A845;
  --accent-glow: rgba(62, 189, 79, 0.15);
  --accent-glow-strong: rgba(62, 189, 79, 0.25);
  --text-primary: #F0F4F8;
  --text-secondary: #94A7BE;
  --text-muted: #5A6F87;
  --border: rgba(255, 255, 255, 0.06);
  --border-hover: rgba(255, 255, 255, 0.12);
  --font-display: 'Instrument Serif', Georgia, serif;
  --font-body: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  --radius-sm: 8px;
  --radius-md: 14px;
  --radius-lg: 20px;
  --radius-xl: 28px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-body);
  background-color: var(--bg-dark);
  color: var(--text-primary);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}

a {
  color: var(--accent);
  text-decoration: none;
  transition: color 0.2s ease;
}

a:hover {
  color: var(--accent-hover);
}

::selection {
  background: var(--accent-glow-strong);
  color: var(--text-primary);
}
</style>
