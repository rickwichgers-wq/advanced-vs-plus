const CACHE_PREFIX = 'ap:db:';

const COLLECTIONS = {
  saved_calculations: 'saved_calculations',
  user_settings: 'user_settings',
  generated_docs: 'generated_docs',
};

function cacheKey(collection) {
  return `${CACHE_PREFIX}${collection}`;
}

function getCache(collection) {
  const raw = sessionStorage.getItem(cacheKey(collection));
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

function setCache(collection, data) {
  sessionStorage.setItem(cacheKey(collection), JSON.stringify(data));
}

function _append(collection, item) {
  const items = getCache(collection) || [];
  items.push(item);
  setCache(collection, items);
}

function _patch(collection, id, updates) {
  const items = getCache(collection) || [];
  const idx = items.findIndex(i => i.id === id);
  if (idx !== -1) {
    items[idx] = { ...items[idx], ...updates };
    setCache(collection, items);
  }
}

function _drop(collection, id) {
  const items = getCache(collection) || [];
  setCache(collection, items.filter(i => i.id !== id));
}

function createCollectionAPI(collectionName) {
  return {
    async getAll() {
      const cached = getCache(collectionName);
      if (cached) return cached;

      try {
        if (window.quick?.db) {
          const col = window.quick.db.collection(collectionName);
          const items = await col.getAll();
          setCache(collectionName, items);
          return items;
        }
      } catch (err) {
        console.warn(`db.getAll(${collectionName}) failed:`, err.message);
      }
      return [];
    },

    async getById(id) {
      const cached = getCache(collectionName);
      if (cached) {
        const found = cached.find(i => i.id === id);
        if (found) return found;
      }

      try {
        if (window.quick?.db) {
          const col = window.quick.db.collection(collectionName);
          return await col.get(id);
        }
      } catch (err) {
        console.warn(`db.getById(${collectionName}, ${id}) failed:`, err.message);
      }
      return null;
    },

    async create(data) {
      const item = {
        ...data,
        id: data.id || crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      try {
        if (window.quick?.db) {
          const col = window.quick.db.collection(collectionName);
          await col.set(item.id, item);
        }
      } catch (err) {
        console.warn(`db.create(${collectionName}) failed:`, err.message);
      }

      _append(collectionName, item);
      return item;
    },

    async update(id, updates) {
      const patched = { ...updates, updatedAt: new Date().toISOString() };

      try {
        if (window.quick?.db) {
          const col = window.quick.db.collection(collectionName);
          const existing = await col.get(id);
          await col.set(id, { ...existing, ...patched });
        }
      } catch (err) {
        console.warn(`db.update(${collectionName}, ${id}) failed:`, err.message);
      }

      _patch(collectionName, id, patched);
      return patched;
    },

    async remove(id) {
      try {
        if (window.quick?.db) {
          const col = window.quick.db.collection(collectionName);
          await col.delete(id);
        }
      } catch (err) {
        console.warn(`db.remove(${collectionName}, ${id}) failed:`, err.message);
      }

      _drop(collectionName, id);
    },
  };
}

export const savedCalculations = createCollectionAPI(COLLECTIONS.saved_calculations);
export const userSettings = createCollectionAPI(COLLECTIONS.user_settings);
export const generatedDocs = createCollectionAPI(COLLECTIONS.generated_docs);

export function invalidateAllCaches() {
  Object.values(COLLECTIONS).forEach(name => {
    sessionStorage.removeItem(cacheKey(name));
  });
}
