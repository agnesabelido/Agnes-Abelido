import express from 'express';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
import path from 'path';

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  // Accept up to 150MB payloads for high-resolution images & short clips
  app.use(express.json({ limit: '150mb' }));
  app.use(express.urlencoded({ extended: true, limit: '150mb' }));

  // Helper to persist media to disk and update portfolioData.ts
  const persistMedia = (
    key: string,
    base64Data: string,
    isVideo = false,
    projectId?: string
  ) => {
    const matches = base64Data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    let mimeType = 'image/jpeg';
    let buffer: Buffer;

    if (matches && matches.length === 3) {
      mimeType = matches[1];
      buffer = Buffer.from(matches[2], 'base64');
    } else {
      // Raw base64 or invalid
      buffer = Buffer.from(base64Data, 'base64');
    }

    let ext = '.jpg';
    if (mimeType.includes('png')) ext = '.png';
    else if (mimeType.includes('webp')) ext = '.webp';
    else if (mimeType.includes('gif')) ext = '.gif';
    else if (mimeType.includes('svg')) ext = '.svg';
    else if (mimeType.includes('mp4')) ext = '.mp4';
    else if (mimeType.includes('webm')) ext = '.webm';
    else if (mimeType.includes('quicktime') || mimeType.includes('mov')) ext = '.mp4';

    const isVid =
      isVideo ||
      mimeType.startsWith('video/') ||
      ext === '.mp4' ||
      ext === '.webm';

    const folder = isVid
      ? path.resolve(process.cwd(), 'public/assets/videos')
      : path.resolve(process.cwd(), 'public/assets/images');
    const distFolder = isVid
      ? path.resolve(process.cwd(), 'dist/assets/videos')
      : path.resolve(process.cwd(), 'dist/assets/images');

    fs.mkdirSync(folder, { recursive: true });
    fs.mkdirSync(distFolder, { recursive: true });

    const cleanKey = key.replace(/[^a-zA-Z0-9_-]/g, '_');
    const filename = `${cleanKey}_user${ext}`;
    const targetPath = path.join(folder, filename);
    const distPath = path.join(distFolder, filename);

    fs.writeFileSync(targetPath, buffer);
    try {
      fs.writeFileSync(distPath, buffer);
    } catch {}

    const publicUrl = isVid
      ? `/assets/videos/${filename}`
      : `/assets/images/${filename}`;

    // Update src/data/portfolioData.ts
    const portfolioPath = path.resolve(process.cwd(), 'src/data/portfolioData.ts');
    if (fs.existsSync(portfolioPath)) {
      let code = fs.readFileSync(portfolioPath, 'utf8');

      if (key.includes('wallpaper')) {
        code = code.replace(
          /wallpaperUrl:\s*"[^"]*"/,
          `wallpaperUrl: "${publicUrl}"`
        );
      } else if (key.includes('avatar') || key.includes('profile')) {
        code = code.replace(
          /avatarUrl:\s*"[^"]*"/,
          `avatarUrl: "${publicUrl}"`
        );
      } else {
        const pId = projectId || key.replace(/^agnes_work_img_/, '');
        if (isVid) {
          const vRegex = new RegExp(
            `(id:\\s*"${pId}",[\\s\\S]*?videoUrl:\\s*")[^"]*(")`,
            'm'
          );
          if (vRegex.test(code)) {
            code = code.replace(vRegex, `$1${publicUrl}$2`);
          } else {
            // Insert videoUrl after imageUrl
            const insertRegex = new RegExp(
              `(id:\\s*"${pId}",[\\s\\S]*?imageUrl:\\s*"[^"]*",)`,
              'm'
            );
            if (insertRegex.test(code)) {
              code = code.replace(
                insertRegex,
                `$1\n    videoUrl: "${publicUrl}",`
              );
            }
          }
        } else {
          // Update project imageUrl only
          const pRegex = new RegExp(
            `(id:\\s*"${pId}",[\\s\\S]*?imageUrl:\\s*")[^"]*(")`,
            'm'
          );
          if (pRegex.test(code)) {
            code = code.replace(pRegex, `$1${publicUrl}$2`);
          }
        }
      }

      fs.writeFileSync(portfolioPath, code, 'utf8');
    }

    return publicUrl;
  };

  // Endpoint to save a single media asset directly to the repository files
  app.post('/api/save-media-asset', (req, res) => {
    try {
      const { key, base64Data, isVideo, projectId } = req.body;
      if (!key || !base64Data) {
        return res
          .status(400)
          .json({ success: false, error: 'Missing key or base64Data' });
      }

      const publicUrl = persistMedia(key, base64Data, Boolean(isVideo), projectId);
      console.log(`Saved media asset [${key}] -> ${publicUrl}`);
      return res.json({ success: true, url: publicUrl });
    } catch (err: any) {
      console.error('Error saving media asset:', err);
      return res
        .status(500)
        .json({ success: false, error: err.message || 'Server error' });
    }
  });

  // Batch sync endpoint for syncing multiple items from IndexedDB
  app.post('/api/sync-all-media', (req, res) => {
    try {
      const { items } = req.body;
      if (!Array.isArray(items) || items.length === 0) {
        return res.json({ success: true, count: 0 });
      }

      const results = [];
      for (const item of items) {
        if (item.key && item.base64Data) {
          const publicUrl = persistMedia(
            item.key,
            item.base64Data,
            Boolean(item.isVideo),
            item.projectId
          );
          results.push({ key: item.key, url: publicUrl });
        }
      }

      console.log(`Synced ${results.length} media items to project repository.`);
      return res.json({ success: true, count: results.length, items: results });
    } catch (err: any) {
      console.error('Error in batch sync:', err);
      return res
        .status(500)
        .json({ success: false, error: err.message || 'Server error' });
    }
  });

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Mount Vite middlewares in development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: process.env.DISABLE_HMR !== 'true' },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve('dist/index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Full-Stack dev server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
