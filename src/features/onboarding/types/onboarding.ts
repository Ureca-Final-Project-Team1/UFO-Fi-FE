export type OnboardingStep = {
  id: number;
  title: string;
  alienMessage: string;
  description: string;
  bulletPoints: string[];
  buttonText: string;
  image: string;
  isLastStep: boolean;
};
