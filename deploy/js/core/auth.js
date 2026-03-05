const CACHE_KEY = 'ap:auth:user';

let cachedUser = null;

export async function initAuth() {
  const stored = sessionStorage.getItem(CACHE_KEY);
  if (stored) {
    try {
      cachedUser = JSON.parse(stored);
      return cachedUser;
    } catch { /* fall through */ }
  }

  try {
    if (window.quick?.id) {
      const user = await window.quick.id.waitForUser();
      cachedUser = user;
      sessionStorage.setItem(CACHE_KEY, JSON.stringify(user));
      return user;
    }
  } catch (err) {
    console.warn('Auth unavailable:', err.message);
  }

  return null;
}

export function getCurrentUser() {
  if (cachedUser) return cachedUser;
  const stored = sessionStorage.getItem(CACHE_KEY);
  if (stored) {
    try {
      cachedUser = JSON.parse(stored);
    } catch { /* ignore */ }
  }
  return cachedUser;
}

export function getUserEmail() {
  return getCurrentUser()?.email || '';
}

export function getUserDisplayName() {
  const user = getCurrentUser();
  if (!user) return '';
  return user.displayName || user.name || user.email?.split('@')[0] || '';
}

export function getUserAvatar() {
  return getCurrentUser()?.avatar || getCurrentUser()?.photoURL || '';
}

export function getUserSummary() {
  return {
    email: getUserEmail(),
    name: getUserDisplayName(),
    avatar: getUserAvatar(),
  };
}

export function clearAuthCache() {
  cachedUser = null;
  sessionStorage.removeItem(CACHE_KEY);
}
