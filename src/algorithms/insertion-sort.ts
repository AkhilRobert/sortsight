import { SortingAnim } from "../utils/types";

export const insertionSort = function* (
  list: number[]
): Generator<SortingAnim, void, unknown> {
  for (let i = 1; i < list.length; i++) {
    const key = list[i];
    let j = i - 1;
    yield {
      list,
      scanningIdx: [i, j],
    };

    while (j >= 0 && key < list[j]) {
      yield {
        list,
        swappingIdx: [j + 1, j],
      };
      list[j + 1] = list[j];
      j--;
    }

    list[j + 1] = key;
  }

  for (let i = 0; i < list.length; ++i) {
    yield {
      list,
      scanningIdx: [i],
    };
  }

  yield {
    list,
  };
};
