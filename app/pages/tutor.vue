<template>
  <div class="tutor-page">
    <div class="chat-container">
      <!-- Header -->
      <div class="chat-header">
        <div class="header-left">
          <div class="tutor-avatar">
            <div class="avatar-ring"></div>
            <svg class="avatar-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
              <path d="M2 17l10 5 10-5"/>
              <path d="M2 12l10 5 10-5"/>
            </svg>
          </div>
          <div class="header-info">
            <h1 class="header-title">Tutor IA</h1>
            <div class="header-status">
              <span class="status-dot"></span>
              <span class="status-text">Listo para ayudarte</span>
            </div>
          </div>
        </div>
        <button class="clear-btn" @click="clearChat" :disabled="messages.length === 0 && !isTyping">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
          <span class="clear-text">Limpiar</span>
        </button>
      </div>

      <!-- Messages area -->
      <div ref="messagesContainer" class="messages-area">
        <!-- Empty state -->
        <div v-if="messages.length === 0 && !isTyping" class="empty-state">
          <div class="empty-glow"></div>
          <div class="empty-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
              <path d="M2 17l10 5 10-5"/>
              <path d="M2 12l10 5 10-5"/>
            </svg>
          </div>
          <h2 class="empty-title">Tu instructor de vuelo personal</h2>
          <p class="empty-desc">Preguntame sobre regulaciones, meteorologia, navegacion, performance o cualquier tema de aviacion.</p>

          <div class="suggestions">
            <button
              v-for="(suggestion, i) in suggestions"
              :key="i"
              class="suggestion-chip"
              :style="{ '--i': i }"
              @click="sendSuggestion(suggestion)"
            >
              <span class="chip-icon">{{ suggestion.icon }}</span>
              <span class="chip-text">{{ suggestion.text }}</span>
            </button>
          </div>
        </div>

        <!-- Messages -->
        <template v-for="(msg, index) in messages" :key="index">
          <div class="message" :class="[msg.role, { 'entering': msg.entering }]">
            <div v-if="msg.role === 'assistant'" class="msg-avatar">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            <div class="msg-bubble">
              <p class="msg-text" v-html="msg.content"></p>
              <span class="msg-time">{{ msg.time }}</span>
            </div>
          </div>
        </template>

        <!-- Typing indicator -->
        <div v-if="isTyping" class="message assistant typing-msg">
          <div class="msg-avatar">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
              <path d="M2 17l10 5 10-5"/>
              <path d="M2 12l10 5 10-5"/>
            </svg>
          </div>
          <div class="msg-bubble typing-bubble">
            <div class="typing-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>

      <!-- Input area -->
      <div class="input-area">
        <div class="input-glow"></div>
        <div class="input-row">
          <div class="input-wrap">
            <textarea
              ref="inputRef"
              v-model="inputText"
              placeholder="Escribe tu pregunta..."
              class="chat-input"
              rows="1"
              :disabled="isTyping"
              @keydown.enter.exact.prevent="sendMessage"
              @input="autoResize"
            />
          </div>
          <button
            class="send-btn"
            :class="{ active: canSend }"
            :disabled="!canSend"
            @click="sendMessage"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>
        <p class="input-hint">El tutor IA puede cometer errores. Verifica la informacion importante.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: "dashboard", middleware: ["auth"] });

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  time: string;
  entering?: boolean;
}

const messages = ref<ChatMessage[]>([]);
const inputText = ref("");
const isTyping = ref(false);
const inputRef = ref<HTMLTextAreaElement | null>(null);
const messagesContainer = ref<HTMLDivElement | null>(null);

const canSend = computed(() => inputText.value.trim().length > 0 && !isTyping.value);

const suggestions = [
  { icon: "📐", text: "¿Como calculo el peso y balance de un Cessna 172?" },
  { icon: "🌤️", text: "Explicame los tipos de frentes meteorologicos" },
  { icon: "📡", text: "¿Que es una zona CTR y como opero en ella?" },
  { icon: "⚙️", text: "¿Como funciona el sistema de vacio en un avion?" },
];

const getTime = () => {
  const now = new Date();
  return now.getHours().toString().padStart(2, "0") + ":" + now.getMinutes().toString().padStart(2, "0");
};

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTo({
        top: messagesContainer.value.scrollHeight,
        behavior: "smooth",
      });
    }
  });
};

const autoResize = () => {
  if (!inputRef.value) return;
  inputRef.value.style.height = "auto";
  inputRef.value.style.height = Math.min(inputRef.value.scrollHeight, 120) + "px";
};

const addMessage = (role: "user" | "assistant", content: string) => {
  messages.value.push({ role, content, time: getTime(), entering: true });
  scrollToBottom();
  setTimeout(() => {
    const msg = messages.value[messages.value.length - 1];
    if (msg) msg.entering = false;
  }, 400);
};

const simulateResponse = () => {
  isTyping.value = true;
  scrollToBottom();

  // Placeholder: simulate a delayed response
  setTimeout(() => {
    isTyping.value = false;
    addMessage("assistant", "Esta es una respuesta de ejemplo del tutor IA. Aqui se integrara la respuesta real del modelo de lenguaje. Por ahora, este es solo el frontend del chat.");
  }, 1500 + Math.random() * 1000);
};

const sendMessage = () => {
  if (!canSend.value) return;
  const text = inputText.value.trim();
  inputText.value = "";
  if (inputRef.value) {
    inputRef.value.style.height = "auto";
  }
  addMessage("user", text);
  simulateResponse();
};

const sendSuggestion = (suggestion: { icon: string; text: string }) => {
  addMessage("user", suggestion.text);
  simulateResponse();
};

const clearChat = () => {
  messages.value = [];
  isTyping.value = false;
};

onMounted(() => {
  inputRef.value?.focus();
});
</script>

<style scoped>
.tutor-page {
  height: calc(100vh - 64px);
  margin: -32px;
  display: flex;
  flex-direction: column;
}

.chat-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  position: relative;
}

/* ---- Header ---- */
.chat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  border-bottom: 1px solid var(--border);
  background: var(--bg-surface);
  flex-shrink: 0;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 14px;
}

.tutor-avatar {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(62, 189, 79, 0.15), rgba(45, 212, 191, 0.1));
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  flex-shrink: 0;
}

.avatar-ring {
  position: absolute;
  inset: -1px;
  border-radius: 13px;
  border: 1px solid rgba(62, 189, 79, 0.2);
}

.avatar-icon {
  color: var(--accent);
}

.header-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.header-title {
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 400;
  color: var(--text-primary);
  line-height: 1.1;
}

.header-status {
  display: flex;
  align-items: center;
  gap: 6px;
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 8px var(--accent-glow-strong);
  animation: pulse-dot 2s ease-in-out infinite;
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.status-text {
  font-size: 12px;
  color: var(--text-muted);
}

.clear-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 7px 12px;
  color: var(--text-muted);
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  font-family: var(--font-body);
  transition: all 0.15s ease;
}

.clear-btn:hover:not(:disabled) {
  color: #f87171;
  border-color: rgba(248, 113, 113, 0.3);
  background: rgba(248, 113, 113, 0.06);
}

.clear-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

/* ---- Messages area ---- */
.messages-area {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  scroll-behavior: smooth;
}

.messages-area::-webkit-scrollbar {
  width: 4px;
}

.messages-area::-webkit-scrollbar-track {
  background: transparent;
}

.messages-area::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 4px;
}

/* ---- Empty state ---- */
.empty-state {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 40px 20px;
  position: relative;
}

.empty-glow {
  position: absolute;
  width: 260px;
  height: 260px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(62, 189, 79, 0.06) 0%, transparent 70%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -60%);
  pointer-events: none;
}

.empty-icon {
  width: 72px;
  height: 72px;
  border-radius: 20px;
  background: linear-gradient(135deg, rgba(62, 189, 79, 0.1), rgba(45, 212, 191, 0.06));
  border: 1px solid rgba(62, 189, 79, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent);
  margin-bottom: 20px;
  position: relative;
  animation: float 4s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}

.empty-title {
  font-family: var(--font-display);
  font-size: 24px;
  font-weight: 400;
  color: var(--text-primary);
  margin-bottom: 8px;
  letter-spacing: -0.01em;
}

.empty-desc {
  font-size: 14px;
  color: var(--text-muted);
  max-width: 380px;
  line-height: 1.6;
  margin-bottom: 32px;
}

.suggestions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  width: 100%;
  max-width: 480px;
}

.suggestion-chip {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 14px 16px;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  cursor: pointer;
  font-family: var(--font-body);
  text-align: left;
  transition: all 0.2s ease;
  animation: chipIn 0.4s ease-out both;
  animation-delay: calc(var(--i) * 60ms + 200ms);
}

@keyframes chipIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.suggestion-chip:hover {
  border-color: var(--accent);
  background: rgba(62, 189, 79, 0.04);
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.chip-icon {
  font-size: 18px;
  line-height: 1;
  flex-shrink: 0;
  margin-top: 1px;
}

.chip-text {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.4;
}

.suggestion-chip:hover .chip-text {
  color: var(--text-primary);
}

/* ---- Messages ---- */
.message {
  display: flex;
  gap: 10px;
  max-width: 85%;
  animation: msgIn 0.3s ease-out;
}

.message.entering {
  animation: msgIn 0.3s ease-out;
}

@keyframes msgIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

.message.user {
  align-self: flex-end;
  flex-direction: row-reverse;
}

.message.assistant {
  align-self: flex-start;
}

.msg-avatar {
  width: 30px;
  height: 30px;
  border-radius: 9px;
  background: linear-gradient(135deg, rgba(62, 189, 79, 0.12), rgba(45, 212, 191, 0.08));
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent);
  flex-shrink: 0;
  margin-top: 2px;
}

.msg-bubble {
  padding: 12px 16px;
  border-radius: 16px;
  position: relative;
}

.user .msg-bubble {
  background: var(--accent);
  border-bottom-right-radius: 4px;
}

.assistant .msg-bubble {
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-bottom-left-radius: 4px;
}

.msg-text {
  font-size: 14px;
  line-height: 1.6;
  word-break: break-word;
}

.user .msg-text {
  color: #fff;
}

.assistant .msg-text {
  color: var(--text-primary);
}

.msg-time {
  display: block;
  font-size: 10px;
  margin-top: 6px;
  opacity: 0.5;
}

.user .msg-time {
  color: rgba(255, 255, 255, 0.7);
  text-align: right;
}

.assistant .msg-time {
  color: var(--text-muted);
}

/* ---- Typing indicator ---- */
.typing-msg {
  animation: msgIn 0.3s ease-out;
}

.typing-bubble {
  padding: 14px 20px;
}

.typing-dots {
  display: flex;
  gap: 5px;
  align-items: center;
}

.typing-dots span {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--text-muted);
  animation: bounce 1.4s ease-in-out infinite;
}

.typing-dots span:nth-child(2) {
  animation-delay: 0.16s;
}

.typing-dots span:nth-child(3) {
  animation-delay: 0.32s;
}

@keyframes bounce {
  0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
  30% { transform: translateY(-6px); opacity: 1; }
}

/* ---- Input area ---- */
.input-area {
  padding: 16px 24px 14px;
  border-top: 1px solid var(--border);
  background: var(--bg-surface);
  flex-shrink: 0;
  position: relative;
}

.input-glow {
  position: absolute;
  top: -40px;
  left: 0;
  right: 0;
  height: 40px;
  background: linear-gradient(to top, var(--bg-dark), transparent);
  pointer-events: none;
}

.input-row {
  display: flex;
  align-items: flex-end;
  gap: 10px;
}

.input-wrap {
  flex: 1;
  position: relative;
}

.chat-input {
  width: 100%;
  padding: 12px 16px;
  background: var(--bg-dark);
  border: 1.5px solid var(--border);
  border-radius: 14px;
  color: var(--text-primary);
  font-size: 14px;
  font-family: var(--font-body);
  line-height: 1.5;
  resize: none;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  min-height: 44px;
  max-height: 120px;
}

.chat-input::placeholder {
  color: var(--text-muted);
}

.chat-input:focus {
  border-color: rgba(62, 189, 79, 0.4);
  box-shadow: 0 0 0 3px rgba(62, 189, 79, 0.08);
}

.chat-input:disabled {
  opacity: 0.5;
}

.send-btn {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  border: none;
  background: var(--bg-elevated);
  color: var(--text-muted);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.send-btn.active {
  background: var(--accent);
  color: #fff;
  box-shadow: 0 4px 16px rgba(62, 189, 79, 0.25);
}

.send-btn.active:hover {
  background: var(--accent-hover);
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(62, 189, 79, 0.3);
}

.send-btn:disabled {
  cursor: not-allowed;
}

.input-hint {
  font-size: 11px;
  color: var(--text-muted);
  text-align: center;
  margin-top: 10px;
  opacity: 0.6;
}

/* ---- Responsive ---- */
@media (max-width: 768px) {
  .tutor-page {
    margin: -20px;
    height: calc(100vh - 53px);
  }

  .chat-header {
    padding: 12px 16px;
  }

  .header-title {
    font-size: 17px;
  }

  .tutor-avatar {
    width: 36px;
    height: 36px;
    border-radius: 10px;
  }

  .avatar-icon {
    width: 18px;
    height: 18px;
  }

  .avatar-ring {
    border-radius: 11px;
  }

  .clear-text {
    display: none;
  }

  .clear-btn {
    padding: 7px 8px;
  }

  .messages-area {
    padding: 16px;
  }

  .message {
    max-width: 92%;
  }

  .empty-title {
    font-size: 20px;
  }

  .empty-desc {
    font-size: 13px;
  }

  .suggestions {
    grid-template-columns: 1fr;
    max-width: 100%;
  }

  .input-area {
    padding: 12px 16px 10px;
  }
}
</style>
