export interface PlanComboProps {
  planNames: string[];
  onSelect?: (value: string) => void;
  value: string;
  disabled: boolean;
}
