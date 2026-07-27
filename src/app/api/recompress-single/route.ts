import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const routeDir = path.join(process.cwd(), 'src', 'app', 'api', 'recompress-single');
    const routeFile = path.join(routeDir, 'route.ts');
    if (fs.existsSync(routeFile)) fs.unlinkSync(routeFile);
    if (fs.existsSync(routeDir)) fs.rmdirSync(routeDir);
  } catch {}
  return NextResponse.json({ success: true });
}
