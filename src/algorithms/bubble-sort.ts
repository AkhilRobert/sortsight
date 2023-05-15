import { SortingAnim } from "../utils/types";

export const bubbleSort = function* (
  arr: number[]
): Generator<SortingAnim, void, unknown> {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - 1; j++) {
      yield {
        list: arr,
        scanningIdx: [j, j + 1],
        swappingIdx: [],
      };

      if (arr[j] > arr[j + 1]) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;

        yield {
          list: arr,
          scanningIdx: [],
          swappingIdx: [j, j + 1],
        };
      }
    }
  }

  yield {
    list: arr,
    scanningIdx: [],
    swappingIdx: [],
  };
};
