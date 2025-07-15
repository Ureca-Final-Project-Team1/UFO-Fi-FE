export const PACKAGES = [
  { id: 'A', zet: 180, price: 1800 },
  { id: 'B', zet: 360, price: 3600 },
  { id: 'C', zet: 360, price: 3600 },
  { id: 'D', zet: 1200, price: 12000 },
  { id: 'E', zet: 3000, price: 30000 },
] as const;

export type PackageId = (typeof PACKAGES)[number]['id'];
