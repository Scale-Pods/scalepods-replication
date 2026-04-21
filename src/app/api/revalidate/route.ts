import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const secret = searchParams.get('secret');
    const path = searchParams.get('path');

    // 1. Verify Secret
    if (secret !== process.env.REVALIDATION_SECRET) {
      console.warn('[Revalidate] Invalid secret');
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    // 2. Perform Revalidation
    if (path) {
      console.log(`[Revalidate] Refreshing path: ${path}`);
      revalidatePath(path);
      // Also revalidate the main blog listing if it's a specific slug
      if (path.startsWith('/blog/')) {
        revalidatePath('/blog');
      }
    } else {
      console.log('[Revalidate] Refreshing all blog paths');
      revalidatePath('/blog');
      revalidatePath('/blog/[slug]', 'page');
    }

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err: any) {
    console.error('[Revalidate] Error:', err.message);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
