// IndexedDB Media Storage for High-Resolution Images & Videos
// Bypasses the 5MB browser localStorage quota limitation

const DB_NAME = 'agnes_portfolio_media_store_v1';
const STORE_NAME = 'media_assets';
const DB_VERSION = 1;

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
 * Save an image or video dataUrl / Blob into IndexedDB
 */
export async function saveMediaItem(key: string, value: string | Blob): Promise<void> {
  try {
    const db = await getDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(value, key);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });

    // Also try saving smaller items (<1MB) in localStorage for instantaneous synchronous hydration
    if (typeof value === 'string' && value.length < 1000000) {
      try {
        localStorage.setItem(key, value);
      } catch {
        // quota exceeded - safely ignored since indexedDB saved it
      }
    }
  } catch (err) {
    console.warn(`Failed to save media in IndexedDB:`, err);
    // Fallback to localStorage if possible
    if (typeof value === 'string') {
      try {
        localStorage.setItem(key, value);
      } catch {
        // quota exceeded
      }
    }
  }
}

/**
 * Retrieve an image or video from IndexedDB (or fallback to localStorage)
 */
export async function getMediaItem(key: string): Promise<string | null> {
  // First check localStorage for instant synchronous hit
  try {
    const local = localStorage.getItem(key);
    if (local && (local.startsWith('data:') || local.startsWith('http') || local.startsWith('/'))) {
      return local;
    }
  } catch {
    // continue to indexedDB
  }

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
          resolve(result);
        } else if (result instanceof Blob) {
          const url = URL.createObjectURL(result);
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
 * Delete a media item from both IndexedDB and localStorage
 */
export async function deleteMediaItem(key: string): Promise<void> {
  try {
    localStorage.removeItem(key);
  } catch {}

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
