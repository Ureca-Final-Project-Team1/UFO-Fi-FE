export const PACKAGES = [
  { id: 'A', zet: 150, price: 1500 },
  { id: 'B', zet: 350, price: 3500 },
  { id: 'C', zet: 500, price: 5000 },
  { id: 'D', zet: 1000, price: 10000 },
  { id: 'E', zet: 3000, price: 30000 },
] as const;

export type PackageId = (typeof PACKAGES)[number]['id'];
