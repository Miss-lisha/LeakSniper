import React, { useState, useEffect, useRef } from 'react';

/* ---------------- constants ---------------- */
const STORAGE_KEY = 'lissie_chat_history';
const SUGGESTIONS = [
  'What is MOAB?',
  'How do I create a strong password?',
  'What is phishing?',
  'Should I enable 2FA?',
  'How does anonymous scanning work?',
];
const genZRegex =
  /(yo|bro|fr|cap|bruh|ngl|on god|wtf|hella|deadass|lmao|no way|nah|slay|sus|vibe|lowkey|highkey|idk|bet)/i;
const TOPIC_KEYWORDS = [
  'moab',
  'password',
  'phishing',
  '2fa',
  'anonymous',
  'privacy',
];

/* --------------- component ----------------- */
const Chatbot: React.FC = () => {
  /* state */
  const [messages, setMessages] = useState<
    { role: 'user' | 'assistant'; content: string }[]
  >([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // default: minimized
  const [topics, setTopics] = useState<Set<string>>(new Set());

  /* refs */
  const chatRef = useRef<HTMLDivElement | null>(null);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ------------ local‑storage persistence ------------ */
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setMessages(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    if (chatRef.current)
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  /* ------------ idle auto‑open logic (10s) ------------ */
  useEffect(() => {
    const resetTimer = () => {
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => setIsOpen(true), 10_000);
    };
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);
    resetTimer(); // initialise
    return () => {
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, []);

  /* ------------ dark‑mode toggle ------------ */
  // (toggleTheme removed as it was unused)

  /* ------------ clear‑chat ------------ */
  const clearChat = () => {
    setMessages([]);
    setTopics(new Set());
    localStorage.removeItem(STORAGE_KEY);
  };

  /* ------------ sendMessage ------------ */
  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = input.trim();
    const lower = userMsg.toLowerCase();
    const isGenZ = genZRegex.test(lower);
    const append = (role: 'user' | 'assistant', content: string) =>
      setMessages((prev) => [...prev, { role, content }]);

    /* collect topic */
    TOPIC_KEYWORDS.forEach((k) => {
      if (lower.includes(k)) setTopics((s) => new Set(s).add(k));
    });

    append('user', userMsg);
    setInput('');
    setIsLoading(true);

    setTimeout(() => {
      let reply = '';

      if (lower.includes('moab')) {
        reply = isGenZ
          ? 'MOAB is wild—26 B creds dumped. Reset your passies, fr.'
          : 'MOAB is a 2024 mega‑breach (26 B records). Update passwords & enable 2FA.';
      } else if (lower.includes('password')) {
        reply = isGenZ
          ? 'Use a manager and get creative—no more “abc123”, okay?'
          : 'Use strong, unique passwords and a password manager.';
      } else if (lower.includes('phishing')) {
        reply = isGenZ
          ? 'If it looks sus, it is. Hover links. Don’t get finessed.'
          : 'Verify sender details and avoid clicking suspicious links.';
      } else if (lower.includes('2fa') || lower.includes('mfa')) {
        reply = isGenZ
          ? '2FA = free armor. Authenticator > SMS.'
          : 'Enable Two‑Factor Authentication wherever possible.';
      } else if (lower.includes('anonymous') || lower.includes('hash')) {
        reply = isGenZ
          ? 'We hash your input client‑side. Zero leaks.'
          : 'Anonymous mode hashes your data locally with SHA‑256.';
      } else if (lower.includes('privacy')) {
        reply = isGenZ
          ? 'Zero tracking. Zero storage. Period.'
          : 'We store nothing; all operations run within your browser.';
      } else if (lower.includes('who') && lower.includes('lissie')) {
        reply = isGenZ
          ? 'I’m Lissie—your cyber bestie. Ask me anything 🔐'
          : 'I’m Lissie, a cybersecurity assistant ready to help.';
      } else {
        reply = isGenZ
          ? 'Ask me about leaks, phishing, or passies—I got you.'
          : 'Ask about breaches, password best practices, phishing, or 2FA.';
      }

      /* memory ping 30 % chance */
      if (topics.size && Math.random() < 0.3) {
        const lastTopic = [...topics].slice(-1)[0];
        reply += isGenZ
          ? `  BTW, remember we talked about ${lastTopic}? Keep that in mind.`
          : `  By the way, we discussed ${lastTopic} earlier—keep that in mind.`;
      }

      append('assistant', reply);
      setIsLoading(false);
    }, 800 + Math.random() * 400);
  };

  /* ------------ UI: minimized pill ------------ */
  if (!isOpen)
  return (
    <button
      onClick={() => setIsOpen(true)}
      className="fixed bottom-4 right-4 w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center text-2xl shadow-lg transition-all"
      title="Chat with Lissie"
    >
      🤖
    </button>
  );

  /* ------------ full chat UI ------------ */
  return (
    <div className="fixed bottom-4 right-4 w-[350px] max-h-[80vh] flex flex-col backdrop-blur-md bg-white/70 dark:bg-slate-800/70 border border-slate-300 dark:border-slate-700 rounded-2xl shadow-xl p-4 text-sm z-50 transition-all">
      {/* header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {/* custom avatar */}
          <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
            LS
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white">
            Chat with Lissie
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={clearChat}
            className="text-xs underline text-red-600 dark:text-red-400"
          >
            Clear
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="text-lg text-slate-500 hover:text-slate-800 dark:text-slate-400"
            aria-label="Minimize"
          >
            ×
          </button>
        </div>
      </div>

      {/* chat history */}
      <div
        ref={chatRef}
        className="flex-1 overflow-auto space-y-2 text-slate-800 dark:text-slate-200 mb-3 scrollbar-thin"
      >
        {messages.map((m, i) => (
          <div key={i}>
            <strong>{m.role === 'user' ? 'You:' : 'Lissie:'}</strong>{' '}
            {m.content}
          </div>
        ))}
        {isLoading && <div>Lissie is typing…</div>}
      </div>

      {/* quick suggestions */}
      <div className="flex flex-wrap gap-2 mb-3">
        {SUGGESTIONS.map((q) => (
          <button
            key={q}
            onClick={() => {
              setInput(q);
              setTimeout(sendMessage, 50);
            }}
            className="px-3 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition-all"
          >
            {q}
          </button>
        ))}
      </div>

      {/* input */}
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Ask something…"
          className="flex-1 px-3 py-2 rounded-md border text-slate-900 dark:text-white bg-white dark:bg-slate-700 placeholder-slate-400"
        />
        <button
          onClick={sendMessage}
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
