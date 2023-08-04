import { SortingAnim } from "../utils/types";

export const cockTailShakerSort = function* (
  list: number[]
): Generator<SortingAnim, void, unknown> {
  do {
    let swapped = false;
    for (let j = 0; j < list.length; j++) {
      yield {
        list,
        scanningIdx: [j, j + 1],
      };
      if (list[j] > list[j + 1]) {
        yield {
          list,
          swappingIdx: [j, j + 1],
        };
        const temp = list[j];
        list[j] = list[j + 1];
        list[j + 1] = temp;
        swapped = true;
      }
    }

    for (let k = list.length; k > 1; k--) {
      yield {
        list,
        scanningIdx: [k, k - 1],
      };
      if (list[k] < list[k - 1]) {
        yield {
          list,
          swappingIdx: [k, k - 1],
        };
        const temp = list[k];
        list[k] = list[k - 1];
        list[k - 1] = temp;
        swapped = true;
      }
    }

    if (!swapped) break;
  } while (true);

  yield {
    list,
  };
};
