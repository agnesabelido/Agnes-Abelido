// IndexedDB & Synchronous Storage for High-Resolution Images & Videos
// Bypasses browser localStorage quota limitations while guaranteeing zero-delay hydration

const DB_NAME = 'agnes_portfolio_media_store_v1';
const STORE_NAME = 'media_assets';
const DB_VERSION = 1;

// Global memory cache for instantaneous synchronous lookups
const mediaMemoryCache: Record<string, string> = {};
const mediaTypeCache: Record<string, 'video' | 'image'> = {};

function getDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Dispatch an event so all open cards, modals, and thumbnails re-render immediately
 */
export function notifyMediaChanged(key: string, url: string) {
  mediaMemoryCache[key] = url;
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('agnes_media_updated', {
        detail: { key, url }
      })
    );
  }
}

/**
 * Detect whether a stored key or URL represents a playable video
 */
export function getMediaType(key: string, url = ''): 'video' | 'image' {
  if (mediaTypeCache[key]) return mediaTypeCache[key];

  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(key + '_type');
      if (stored === 'video' || stored === 'image') {
        mediaTypeCache[key] = stored;
        return stored;
      }
    } catch {}
  }

  const clean = url.toLowerCase();
  if (
    clean.startsWith('data:video/') ||
    clean.endsWith('.mp4') ||
    clean.endsWith('.webm') ||
    clean.endsWith('.mov') ||
    clean.includes('.mp4?') ||
    clean.includes('.webm?')
  ) {
    mediaTypeCache[key] = 'video';
    return 'video';
  }

  mediaTypeCache[key] = 'image';
  return 'image';
}

/**
 * Instant synchronous lookup from memory or localStorage.
 */
export function getSyncMediaItem(key: string, fallback = ''): string {
  if (mediaMemoryCache[key]) {
    return mediaMemoryCache[key];
  }
  if (typeof window !== 'undefined') {
    try {
      const local = localStorage.getItem(key);
      if (
        local &&
        (local.startsWith('data:') ||
          local.startsWith('http') ||
          local.startsWith('/') ||
          local.startsWith('blob:'))
      ) {
        mediaMemoryCache[key] = local;
        return local;
      }
    } catch {
      // quota or access restriction ignored
    }
  }
  return fallback;
}

/**
 * Save an image or video dataUrl / Blob into IndexedDB, localStorage, and memory cache
 */
export async function saveMediaItem(
  key: string,
  value: string | Blob,
  isVideo = false
): Promise<void> {
  const isVid =
    isVideo ||
    (value instanceof Blob && value.type.startsWith('video/')) ||
    (typeof value === 'string' &&
      (value.startsWith('data:video/') ||
        value.endsWith('.mp4') ||
        value.endsWith('.webm') ||
        value.endsWith('.mov')));

  mediaTypeCache[key] = isVid ? 'video' : 'image';
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(key + '_type', isVid ? 'video' : 'image');
    } catch {}
  }

  // If it's a string, update synchronous caches immediately
  if (typeof value === 'string') {
    mediaMemoryCache[key] = value;
    try {
      if (value.length < 2500000) {
        localStorage.setItem(key, value);
      }
    } catch {
      // quota exceeded - safely ignored since IndexedDB persists it below
    }
    notifyMediaChanged(key, value);
  }

  try {
    const db = await getDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(value, key);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });

    if (value instanceof Blob && typeof window !== 'undefined') {
      const objectUrl = URL.createObjectURL(value);
      mediaMemoryCache[key] = objectUrl;
      notifyMediaChanged(key, objectUrl);
    }
  } catch (err) {
    console.warn(`Failed to save media in IndexedDB:`, err);
  }
}

/**
 * Retrieve an image or video from IndexedDB (or fallback to localStorage / cache)
 */
export async function getMediaItem(key: string): Promise<string | null> {
  if (mediaMemoryCache[key]) {
    return mediaMemoryCache[key];
  }

  try {
    const local = localStorage.getItem(key);
    if (
      local &&
      (local.startsWith('data:') ||
        local.startsWith('http') ||
        local.startsWith('/') ||
        local.startsWith('blob:'))
    ) {
      mediaMemoryCache[key] = local;
      return local;
    }
  } catch {}

  try {
    const db = await getDB();
    return new Promise<string | null>((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(key);
      req.onsuccess = () => {
        const result = req.result;
        if (!result) {
          resolve(null);
          return;
        }
        if (typeof result === 'string') {
          mediaMemoryCache[key] = result;
          resolve(result);
        } else if (result instanceof Blob) {
          if (result.type.startsWith('video/')) {
            mediaTypeCache[key] = 'video';
            try { localStorage.setItem(key + '_type', 'video'); } catch {}
          } else {
            mediaTypeCache[key] = 'image';
            try { localStorage.setItem(key + '_type', 'image'); } catch {}
          }
          const url = URL.createObjectURL(result);
          mediaMemoryCache[key] = url;
          resolve(url);
        } else {
          resolve(null);
        }
      };
      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

/**
 * Delete a media item from memory, localStorage, and IndexedDB
 */
export async function deleteMediaItem(key: string): Promise<void> {
  delete mediaMemoryCache[key];
  delete mediaTypeCache[key];
  try {
    localStorage.removeItem(key);
    localStorage.removeItem(key + '_type');
  } catch {}

  notifyMediaChanged(key, '');

  try {
    const db = await getDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(key);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('Failed to delete media from IndexedDB:', err);
  }
}

/**
 * Hydrate all cached media from localStorage and IndexedDB immediately on load
 */
export async function hydrateAllMedia(): Promise<void> {
  if (typeof window === 'undefined') return;

  // 1. Scan localStorage
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && (k.startsWith('agnes_') || k.startsWith('work_'))) {
        const v = localStorage.getItem(k);
        if (v) mediaMemoryCache[k] = v;
      }
    }
  } catch {}

  // 2. Scan IndexedDB
  try {
    const db = await getDB();
    await new Promise<void>((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.openCursor();
      req.onsuccess = () => {
        const cursor = req.result;
        if (cursor) {
          const key = String(cursor.key);
          const val = cursor.value;
          if (typeof val === 'string') {
            mediaMemoryCache[key] = val;
          } else if (val instanceof Blob) {
            if (val.type.startsWith('video/')) {
              mediaTypeCache[key] = 'video';
              try { localStorage.setItem(key + '_type', 'video'); } catch {}
            } else {
              mediaTypeCache[key] = 'image';
              try { localStorage.setItem(key + '_type', 'image'); } catch {}
            }
            mediaMemoryCache[key] = URL.createObjectURL(val);
          }
          cursor.continue();
        } else {
          resolve();
        }
      };
      req.onerror = () => resolve();
    });
  } catch {}

  notifyMediaChanged('__all__', '');
}

// Auto-run hydration on client
if (typeof window !== 'undefined') {
  hydrateAllMedia().catch(() => {});
}
