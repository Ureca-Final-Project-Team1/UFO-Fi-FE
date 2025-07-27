// vercel scheduler 임시 파일

export async function GET() {
  // 매일 자정 실행됨
  //   await cleanupOldData();
  return Response.json({ ok: true });
}
