import type { Metadata } from 'next';

export interface PageMetadataConfig {
  title: string;
  description: string;
  noIndex?: boolean;
}

export const createPageMetadata = (config: PageMetadataConfig): Metadata => {
  const { title = '', description = '', noIndex = false } = config;
  return {
    title,
    description,
    robots: {
      index: !noIndex,
      follow: !noIndex,
    },
  };
};
