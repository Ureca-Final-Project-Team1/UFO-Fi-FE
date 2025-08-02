import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
  organization: process.env.OPENAI_ORGANIZATION_ID!,
});

export const POST = async (req: Request) => {
  let request: { message: string; prompt: string };

  try {
    request = await req.json();
  } catch {
    return NextResponse.json(
      { error: '잘못된 요청 형식입니다. JSON 형식으로 메시지를 보내주세요.' },
      { status: 400 },
    );
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: request.prompt },
        { role: 'user', content: request.message },
      ],
    });

    const full = completion.choices[0].message?.content ?? '';
    let parsed;

    try {
      parsed = JSON.parse(full);
    } catch {
      return NextResponse.json(
        {
          error: 'GPT 응답을 JSON으로 변환할 수 없습니다. 응답 형식을 확인해주세요.',
          detail: full,
        },
        { status: 400 },
      );
    }

    return new Response(JSON.stringify(parsed), {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-cache',
      },
    });
  } catch {
    return NextResponse.json(
      { error: '서버에서 요청을 처리하는 중 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
};
