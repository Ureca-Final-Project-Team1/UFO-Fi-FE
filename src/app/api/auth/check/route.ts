import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get('Authorization');
    const refreshCookie = cookieStore.get('Refresh');

    return NextResponse.json({
      hasAuth: !!authCookie?.value,
      hasRefresh: !!refreshCookie?.value,
      isAuthenticated: !!authCookie?.value || !!refreshCookie?.value,
    });
  } catch (error) {
    console.error('Cookie check error:', error);
    return NextResponse.json(
      {
        hasAuth: false,
        hasRefresh: false,
        isAuthenticated: false,
      },
      { status: 500 },
    );
  }
}
