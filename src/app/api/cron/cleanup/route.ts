// 임시 파일

export async function GET() {
  // 매일 자정 실행됨
  //   await cleanupOldData();
  // 다 알지
  return Response.json({ ok: true });
}
