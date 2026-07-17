import sharp from 'sharp';

// Creates a simple dark gradient poster for the hero background video.
// In production you'd extract a real frame from the video with ffmpeg,
// but this dark gradient matches the video's primary tone and loads instantly.
const width = 1920;
const height = 1080;

const svgBuffer = Buffer.from(`<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#04070D"/>
      <stop offset="0.5" stop-color="#060c1a"/>
      <stop offset="1" stop-color="#0a1020"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
</svg>`);

await sharp(svgBuffer)
  .webp({ quality: 50 })
  .toFile('public/background-poster.webp');

console.log('✅ background-poster.webp created');
