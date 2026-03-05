// Local development stub for Quick platform APIs
// Replace with the real quick.js when deploying to quick.shopify.io

window.quick = {
  id: {
    async waitForUser() {
      return {
        email: 'dev@shopify.com',
        displayName: 'Dev User',
        name: 'Dev User',
        avatar: null,
        photoURL: null,
      };
    },
  },

  db: {
    collection(name) {
      const storageKey = `quick_db_${name}`;

      function load() {
        try { return JSON.parse(localStorage.getItem(storageKey) || '{}'); }
        catch { return {}; }
      }

      function save(data) {
        localStorage.setItem(storageKey, JSON.stringify(data));
      }

      return {
        async getAll() {
          return Object.values(load());
        },
        async get(id) {
          return load()[id] || null;
        },
        async set(id, value) {
          const data = load();
          data[id] = value;
          save(data);
        },
        async delete(id) {
          const data = load();
          delete data[id];
          save(data);
        },
      };
    },
  },

  ai: {
    async chat({ messages }) {
      // Simulated AI response for local development
      const userMsg = messages.find(m => m.role === 'user')?.content || '';
      return {
        content: `[Local Dev — AI stub]\n\nThis is a placeholder response for local testing. In production, this will call the OpenAI proxy via quick.ai.\n\nYour prompt was:\n${userMsg.slice(0, 200)}...`,
      };
    },
  },

  fs: {
    async write() { console.warn('quick.fs.write: stub — no-op in local dev'); },
    async read() { console.warn('quick.fs.read: stub — no-op in local dev'); return null; },
  },
};

console.log('%c[quick.js] Local dev stub loaded', 'color: #6366f1; font-weight: bold');
