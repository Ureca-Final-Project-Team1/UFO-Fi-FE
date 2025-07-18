import { Buffer } from 'buffer';
import path from 'path';

import vision from '@google-cloud/vision';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const description = formData.get('description')?.toString() || 'no description';

    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: '유효하지 않은 파일입니다.' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    process.env.GOOGLE_APPLICATION_CREDENTIALS = path.join(
      process.cwd(),
      'ufo-fi-466307-c8452e8846a5.json',
    );

    const client = new vision.ImageAnnotatorClient();

    const [result] = await client.textDetection({ image: { content: buffer } });

    const text = result.textAnnotations?.[0]?.description || '';
    return NextResponse.json({ text, description });
  } catch (error) {
    console.error('OCR 실패:', error);
    return NextResponse.json({ error: 'OCR 처리 중 오류 발생' }, { status: 500 });
  }
}
