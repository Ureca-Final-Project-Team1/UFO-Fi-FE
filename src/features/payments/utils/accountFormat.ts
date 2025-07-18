export function formatAccountNumber(value: string, format: number[]): string {
  let result = '';
  let idx = 0;
  for (let i = 0; i < format.length; i++) {
    if (value.length > idx) {
      result += value.slice(idx, idx + format[i]);
      idx += format[i];
      if (i < format.length - 1 && value.length > idx) result += '-';
    }
  }
  return result;
}

export function getBestFormat(formats: number[][], value: string): number[] {
  return formats.find((f) => f.reduce((a, b) => a + b, 0) === value.length) || formats[0];
}
