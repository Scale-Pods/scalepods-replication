import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Converts large PNG/JPG/JPEG images in /public to WebP
// Skips files already in WebP/AVIF format and skips files under 100KB

const ROOT = 'public';
const SIZE_THRESHOLD = 100 * 1024; // 100 KB

async function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(fullPath);
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue;
      const stat = fs.statSync(fullPath);
      if (stat.size < SIZE_THRESHOLD) continue;

      const outPath = fullPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
      if (fs.existsSync(outPath)) {
        console.log(`⏭  Skip (webp exists): ${fullPath}`);
        continue;
      }

      try {
        const info = await sharp(fullPath)
          .webp({ quality: 82, effort: 4 })
          .toFile(outPath);
        const saved = Math.round((1 - info.size / stat.size) * 100);
        console.log(`✅ ${path.relative(ROOT, fullPath)} → .webp | ${(stat.size/1024).toFixed(0)}KB → ${(info.size/1024).toFixed(0)}KB (${saved}% smaller)`);
      } catch (err) {
        console.error(`❌ Failed: ${fullPath}`, err.message);
      }
    }
  }
}

console.log('🔄 Converting large images to WebP...\n');
await walk(ROOT);
console.log('\n✅ Done!');
