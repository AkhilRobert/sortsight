import { SortingAnim } from "../utils/types";

// TODO: change to the optimized version of bubble sort
export const bubbleSort = function* (
  list: number[]
): Generator<SortingAnim, void, unknown> {
  for (let i = 0; i < list.length; i++) {
    for (let j = 0; j < list.length - 1; j++) {
      yield {
        list,
        scanningIdx: [j, j + 1],
      };

      if (list[j] > list[j + 1]) {
        const temp = list[j];
        list[j] = list[j + 1];
        list[j + 1] = temp;

        yield {
          list,
          swappingIdx: [j, j + 1],
        };
      }
    }
  }

  yield {
    list,
  };
};
