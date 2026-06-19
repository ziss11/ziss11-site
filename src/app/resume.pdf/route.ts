import { NextResponse, type NextRequest } from 'next/server';
import { getResumeUrl } from '@/lib/blob-content';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const url = await getResumeUrl();

  // Resume hasil upload (Blob public) → stream isinya di path /resume.pdf.
  if (url) {
    const res = await fetch(url, { cache: 'no-store' });
    if (res.ok) {
      return new NextResponse(res.body, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'inline; filename="resume.pdf"',
          'Cache-Control': 'no-store',
        },
      });
    }
  }

  // Fallback: file statis bawaan di /public/resume-default.pdf.
  return NextResponse.redirect(new URL('/resume-default.pdf', req.url));
}
