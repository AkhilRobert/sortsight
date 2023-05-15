const clamp = (value: number, min: number, max: number): number => {
  if (value > max) return max;
  if (value < min) return min;
  return value;
};

export const generateRandomArray = (size: number) => {
  return Array(size)
    .fill(0)
    .map(() => clamp(Math.round(Math.random() * 100), 1, 100));
};
