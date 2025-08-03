import { Control, FieldErrors, UseFormSetValue } from 'react-hook-form';

import { Plan } from '@/backend';
import { Carrier } from '@/backend/types/carrier';
import { SignupPlanSchema } from '@/schemas/signupSchema';

export interface OCRInputSectionProps {
  className?: string;
  control: Control<SignupPlanSchema>;
  errors: FieldErrors<SignupPlanSchema>;
  setValue: UseFormSetValue<SignupPlanSchema>;
  plans: Plan[];
  setPlans: (plans: Plan[]) => void;
  setMaxData: (n: number | null) => void;
  setNetworkType: (s: string) => void;
  isLoading: boolean;
  setIsLoading: (b: boolean) => void;
  setForm: (form: { carrier?: Carrier; planName?: string }) => void;
}
