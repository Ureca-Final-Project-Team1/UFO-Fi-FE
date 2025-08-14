export async function createQdrantFieldIndex(
  fieldName: string,
  fieldType: 'integer' | 'keyword' | 'text' | 'bool',
) {
  const res = await fetch(`${process.env.QDRANT_API_BASE_URL}/collections/ufo_fi/index`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...(process.env.QDRANT_API_KEY && {
        'api-key': process.env.QDRANT_API_KEY,
      }),
    },
    body: JSON.stringify({
      field_name: fieldName,
      field_schema: fieldType,
    }),
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(`${fieldName} 필드 인덱싱 실패: ${res.status} - ${msg}`);
  }
}
