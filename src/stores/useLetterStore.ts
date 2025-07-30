import { create } from 'zustand';

type LetterState = {
  letterCount: number;
  planetStatus: boolean[];
  setLetterCount: (count: number) => void;
  updatePlanetStatus: (count: number) => void;
  getCompletedPlanets: () => number;
};

export const useLetterStore = create<LetterState>()((set, get) => ({
  letterCount: 0,
  planetStatus: [false, false, false, false, false],

  setLetterCount: (count) => {
    set({ letterCount: count });
    get().updatePlanetStatus(count);
  },

  updatePlanetStatus: (count) => {
    const newStatus = [false, false, false, false, false];
    for (let i = 0; i < Math.min(count, 5); i++) {
      newStatus[i] = true;
    }
    set({ planetStatus: newStatus });
  },

  getCompletedPlanets: () => {
    return get().planetStatus.filter(Boolean).length;
  },
}));
