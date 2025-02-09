import { sendMessageToGemini } from '@/utils/gemini';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { message } = await request.json();

  try {
    const geminiResponse = await sendMessageToGemini(message);
    return NextResponse.json({ response: geminiResponse });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch response from Gemini' },
      { status: 500 }
    );
  }
}