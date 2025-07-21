export type VectorParams =
  | {
      size: number;
      distance: 'Cosine' | 'Euclid' | 'Dot' | 'Manhattan';
    }
  | {
      default: {
        size: number;
        distance: 'Cosine' | 'Euclid' | 'Dot' | 'Manhattan';
      };
    };

export type CollectionInfo = {
  status: 'green' | 'yellow' | 'red' | string;
  optimizer_status: string;
  vectors_count?: number;
  segments_count?: number;
  points_count?: number;
  indexed_vectors_count?: number;
  on_disk_payload?: boolean;
  hnsw_config?: object;
  quantization_config?: object;
  params: {
    vectors?: VectorParams;
  };
};
