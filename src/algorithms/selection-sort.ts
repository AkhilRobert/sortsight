import { SortingAnim } from "../utils/types";

export const selectionSort = function* (
  list: number[]
): Generator<SortingAnim, void, unknown> {
  for (let i = 0; i < list.length - 1; i++) {
    let min = i;

    for (let j = i + 1; j < list.length; j++) {
      yield {
        list,
        scanningIdx: [i, j],
      };
      if (list[j] < list[min]) {
        min = j;
      }
    }

    if (min != i) {
      const temp = list[min];
      list[min] = list[i];
      list[i] = temp;
      yield {
        list,
        swappingIdx: [min, i],
      };
    }
  }
  yield { list };
};
