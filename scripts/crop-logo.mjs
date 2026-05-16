/**
 * Crops ScalePods-Logo-FINAL.png tightly around the wordmark by:
 * 1. Trimming transparent/near-white pixels from all edges
 * 2. Adding a small horizontal padding for breathing room
 * Saves to public/scalepods-navbar-logo.png
 */
import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const src  = join(__dirname, '..', 'ScalePods-Logo-FINAL.png');
const dest = join(__dirname, '..', 'public', 'scalepods-navbar-logo.png');

const img = sharp(src);
const meta = await img.metadata();
console.log(`Original: ${meta.width}x${meta.height}`);

// trim() removes contiguous background pixels from all edges.
// threshold 10 catches near-white (255,255,255) padding.
const trimmed = await sharp(src)
  .trim({ threshold: 10 })
  .toBuffer({ resolveWithObject: true });

console.log(`Trimmed:  ${trimmed.info.width}x${trimmed.info.height}`);

// Add a tiny horizontal pad (2% of trimmed width) so letters don't clip
const padH = Math.round(trimmed.info.width * 0.02);
const padV = Math.round(trimmed.info.height * 0.04);

await sharp(trimmed.data)
  .extend({
    top: padV, bottom: padV,
    left: padH, right: padH,
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .png({ compressionLevel: 9 })
  .toFile(dest);

const final = await sharp(dest).metadata();
console.log(`Output:   ${final.width}x${final.height}  →  ${dest}`);
