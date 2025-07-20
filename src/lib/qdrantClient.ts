import { QdrantClient } from '@qdrant/js-client-rest';

export const qdrantClient = new QdrantClient({
  url: process.env.QDRANT_API_BASE_URL,
  apiKey: process.env.QDRANT_API_KEY,
  timeout: 60000,
});
