import { SortingAnim } from "../utils/types";

export const bubbleSort = function* (
  list: number[]
): Generator<SortingAnim, void, unknown> {
  for (let i = 0; i < list.length; i++) {
    let swapped = false;
    for (let j = 0; j < list.length - 1; j++) {
      yield {
        list,
        scanningIdx: [j, j + 1],
      };

      if (list[j] > list[j + 1]) {
        const temp = list[j];
        list[j] = list[j + 1];
        list[j + 1] = temp;
        swapped = true;

        yield {
          list,
          swappingIdx: [j, j + 1],
        };
      }
    }

    // Optimization: Breaking out of loop if the array is fully sorted ie, there has been no swap occured
    if (!swapped) {
      break;
    }
  }

  yield {
    list,
  };
};
