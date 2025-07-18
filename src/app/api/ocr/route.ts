import { Buffer } from 'buffer';

import vision from '@google-cloud/vision';
import { NextResponse } from 'next/server';

function parseCredentialsFromEnv() {
  const keyBase64 = process.env.GCLOUD_KEY_BASE64!;
  const keyJson = Buffer.from(keyBase64, 'base64').toString('utf-8');
  return JSON.parse(keyJson);
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const description = formData.get('description')?.toString() || 'no description';

    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: '유효하지 않은 파일입니다.' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const credentials = parseCredentialsFromEnv();

    const client = new vision.ImageAnnotatorClient({
      projectId: credentials.project_id,
      credentials: {
        client_email: credentials.client_email,
        private_key: credentials.private_key,
      },
    });

    const [result] = await client.textDetection({ image: { content: buffer } });
    const text = result.textAnnotations?.[0]?.description || '';

    return NextResponse.json({ text, description });
  } catch (error) {
    console.error('OCR 실패:', error);
    return NextResponse.json({ error: 'OCR 처리 중 오류 발생' }, { status: 500 });
  }
}
