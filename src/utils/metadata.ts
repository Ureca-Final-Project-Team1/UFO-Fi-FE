import type { Metadata } from 'next';

export interface PageMetadataConfig {
  title: string;
  description: string;
  noIndex?: boolean;
}

export const createPageMetadata = (config: PageMetadataConfig): Metadata => {
  return {
    title: config.title,
    description: config.description,
    robots: {
      index: !config.noIndex,
      follow: !config.noIndex,
    },
  };
};
