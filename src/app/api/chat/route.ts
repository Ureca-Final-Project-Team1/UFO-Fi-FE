import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
  organization: process.env.OPENAI_ORGANIZATION_ID!,
});

export const POST = async (req: Request) => {
  try {
    const request: { message: string; prompt: string } = await req.json();

    const completion = await openai.chat.completions.create({
      model: 'gpt-4.1-mini',
      messages: [
        { role: 'system', content: request.prompt },
        { role: 'user', content: request.message },
      ],
    });

    const full = completion.choices[0].message?.content ?? '';
    const parsed = JSON.parse(full);

    return new Response(JSON.stringify(parsed), {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    console.error('GPT 처리 오류:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
};
