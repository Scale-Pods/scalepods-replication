import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { exec } from 'child_process';

export async function GET() {
  return new Promise((resolve) => {
    const pyScript = `C:\\Users\\hrish\\.gemini\\antigravity-ide\\brain\\946f1797-9e13-4550-8e4e-8747d34da859\\scratch\\compress_images.py`;
    exec(`python "${pyScript}"`, (error, stdout, stderr) => {
      resolve(NextResponse.json({
        error: error ? error.message : null,
        stdout,
        stderr
      }));
    });
  });
}
