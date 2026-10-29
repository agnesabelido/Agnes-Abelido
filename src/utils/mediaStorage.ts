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
    try {
      const request = window.indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = () => {
        try {
          const db = request.result;
          if (!db.objectStoreNames.contains(STORE_NAME)) {
            db.createObjectStore(STORE_NAME);
          }
        } catch {}
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    } catch (e) {
      reject(e);
    }
  });
}

/**
 * Fetch all entries from IndexedDB safely without using cursors to prevent TransactionInactiveError
 */
async function getAllEntriesFromDB(): Promise<Array<{ key: string; value: any }>> {
  if (typeof window === 'undefined' || !window.indexedDB) return [];
  try {
    const db = await getDB();
    return new Promise((resolve) => {
      try {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);

        // Modern browsers: getAllKeys and getAll execute atomically without IDBCursor
        if (typeof store.getAllKeys === 'function' && typeof store.getAll === 'function') {
          const keysReq = store.getAllKeys();
          const valsReq = store.getAll();

          let keys: IDBValidKey[] | null = null;
          let vals: any[] | null = null;

          const finish = () => {
            if (keys !== null && vals !== null) {
              const entries: Array<{ key: string; value: any }> = [];
              for (let i = 0; i < keys.length; i++) {
                entries.push({ key: String(keys[i]), value: vals[i] });
              }
              resolve(entries);
            }
          };

          keysReq.onsuccess = () => {
            keys = keysReq.result || [];
            finish();
          };
          keysReq.onerror = () => resolve([]);

          valsReq.onsuccess = () => {
            vals = valsReq.result || [];
            finish();
          };
          valsReq.onerror = () => resolve([]);

          tx.onerror = () => resolve([]);
          tx.onabort = () => resolve([]);
          return;
        }

        // Fallback for legacy environments (synchronously push to array before returning)
        const entries: Array<{ key: string; value: any }> = [];
        const req = store.openCursor();
        req.onsuccess = () => {
          try {
            const cursor = req.result;
            if (cursor) {
              entries.push({ key: String(cursor.key), value: cursor.value });
              cursor.continue();
            } else {
              resolve(entries);
            }
          } catch {
            resolve(entries);
          }
        };
        req.onerror = () => resolve([]);
      } catch {
        resolve([]);
      }
    });
  } catch {
    return [];
  }
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
    await new Promise<void>((resolve) => {
      try {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        const req = store.put(value, key);
        req.onsuccess = () => resolve();
        req.onerror = () => resolve();
        tx.onerror = () => resolve();
        tx.onabort = () => resolve();
      } catch {
        resolve();
      }
    });

    if (value instanceof Blob && typeof window !== 'undefined') {
      const objectUrl = URL.createObjectURL(value);
      mediaMemoryCache[key] = objectUrl;
      notifyMediaChanged(key, objectUrl);
    }
  } catch (err) {
    console.warn(`Failed to save media in IndexedDB:`, err);
  }

  // Also sync directly to repository disk on server (non-blocking)
  syncMediaToServer(key, value, isVid).catch(() => {});
}

/**
 * Convert a Blob to base64 Data URL
 */
export function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

/**
 * Synchronize a single media asset directly to the backend repository files
 */
export async function syncMediaToServer(
  key: string,
  value: string | Blob,
  isVideo = false
): Promise<string | null> {
  if (typeof window === 'undefined') return null;

  // On static hosts (like Cloudflare Pages or Workers), there is no Node.js backend
  const isStaticHost =
    window.location.hostname.includes('workers.dev') ||
    window.location.hostname.includes('pages.dev') ||
    window.location.hostname.includes('cloudflare');
  if (isStaticHost) return null;

  try {
    let base64Data = '';
    if (value instanceof Blob) {
      base64Data = await blobToBase64(value);
      isVideo = isVideo || value.type.startsWith('video/');
    } else if (typeof value === 'string') {
      if (value.startsWith('data:')) {
        base64Data = value;
      } else if (value.startsWith('blob:')) {
        const resp = await fetch(value);
        const b = await resp.blob();
        base64Data = await blobToBase64(b);
        isVideo = isVideo || b.type.startsWith('video/');
      }
    }

    if (!base64Data) return null;

    const res = await fetch('/api/save-media-asset', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, base64Data, isVideo })
    });
    if (!res.ok) return null;
    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) return null;
    const json = await res.json();
    return json?.url || null;
  } catch {
    return null;
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
      try {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const req = store.get(key);
        req.onsuccess = () => {
          try {
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
          } catch {
            resolve(null);
          }
        };
        req.onerror = () => resolve(null);
        tx.onerror = () => resolve(null);
        tx.onabort = () => resolve(null);
      } catch {
        resolve(null);
      }
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
    await new Promise<void>((resolve) => {
      try {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        const req = store.delete(key);
        req.onsuccess = () => resolve();
        req.onerror = () => resolve();
        tx.onerror = () => resolve();
        tx.onabort = () => resolve();
      } catch {
        resolve();
      }
    });
  } catch (err) {
    console.warn('Failed to delete media from IndexedDB:', err);
  }
}

/**
 * Auto-sync all stored IndexedDB & localStorage media to the server's repository disk
 */
export async function autoSyncAllMediaToServer(): Promise<number> {
  if (typeof window === 'undefined') return 0;

  // On static hosts (like Cloudflare Pages or Workers), there is no Node.js backend
  const isStaticHost =
    window.location.hostname.includes('workers.dev') ||
    window.location.hostname.includes('pages.dev') ||
    window.location.hostname.includes('cloudflare');
  if (isStaticHost) return 0;

  try {
    const rawEntries = await getAllEntriesFromDB();
    const itemsToSync: Array<{ key: string; base64Data: string; isVideo: boolean }> = [];
    const seenKeys = new Set<string>();

    for (const { key, value: val } of rawEntries) {
      try {
        seenKeys.add(key);
        if (val instanceof Blob) {
          const b64 = await blobToBase64(val);
          const isVid = val.type.startsWith('video/') || key.includes('video');
          itemsToSync.push({ key, base64Data: b64, isVideo: isVid });
        } else if (typeof val === 'string' && val.startsWith('data:')) {
          const isVid = val.startsWith('data:video/') || key.includes('video');
          itemsToSync.push({ key, base64Data: val, isVideo: isVid });
        }
      } catch {}
    }

    // Also scan localStorage for any entries not yet in IndexedDB
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && !seenKeys.has(k) && (k.startsWith('agnes_') || k.startsWith('work_'))) {
          const v = localStorage.getItem(k);
          if (v && v.startsWith('data:')) {
            const isVid = v.startsWith('data:video/') || k.includes('video');
            itemsToSync.push({ key: k, base64Data: v, isVideo: isVid });
          }
        }
      }
    } catch {}

    if (itemsToSync.length > 0) {
      try {
        const res = await fetch('/api/sync-all-media', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items: itemsToSync })
        });
        if (!res.ok) return 0;
        const contentType = res.headers.get('content-type') || '';
        if (!contentType.includes('application/json')) return 0;
        const data = await res.json();
        return data?.count || 0;
      } catch {
        return 0;
      }
    }
  } catch {
    return 0;
  }
  return 0;
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

  // 2. Scan IndexedDB safely using atomic getAll/getAllKeys
  try {
    const entries = await getAllEntriesFromDB();
    for (const { key, value } of entries) {
      if (typeof value === 'string') {
        mediaMemoryCache[key] = value;
      } else if (value instanceof Blob) {
        const isVid = value.type.startsWith('video/');
        mediaTypeCache[key] = isVid ? 'video' : 'image';
        try {
          localStorage.setItem(key + '_type', isVid ? 'video' : 'image');
        } catch {}
        try {
          mediaMemoryCache[key] = URL.createObjectURL(value);
        } catch {}
      }
    }
  } catch {}

  notifyMediaChanged('__all__', '');

  // Only auto-sync if we are on a dev/full-stack host (not static Cloudflare host)
  const isStaticHost =
    typeof window !== 'undefined' &&
    (window.location.hostname.includes('workers.dev') ||
      window.location.hostname.includes('pages.dev') ||
      window.location.hostname.includes('cloudflare'));

  if (!isStaticHost) {
    autoSyncAllMediaToServer().catch(() => {});
  }
}

// Auto-run hydration on client
if (typeof window !== 'undefined') {
  hydrateAllMedia().catch(() => {});
}
