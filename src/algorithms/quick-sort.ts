import { SortingAnim } from "../utils/types";

export const quickSort = function* (
  list: number[]
): Generator<SortingAnim, void, unknown> {
  yield* helper(list, 0, list.length - 1);

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

const helper = function* (
  list: number[],
  left: number,
  right: number
): Generator<SortingAnim, void, unknown> {
  if (left < right) {
    const pivot = yield* partition(list, left, right);

    yield* helper(list, left, pivot - 1);
    yield* helper(list, pivot + 1, right);
  }
};

const partition = function* (
  list: number[],
  left: number,
  right: number
): Generator<SortingAnim, number, unknown> {
  const pivot = list[right];
  let i = left - 1;

  for (let j = left; j < right; j++) {
    yield {
      list,
      scanningIdx: [j, right],
    };

    if (list[j] <= pivot) {
      i++;

      yield {
        list,
        swappingIdx: [i, j],
      };
      const temp = list[j];
      list[j] = list[i];
      list[i] = temp;
    }
  }

  yield {
    list,
    swappingIdx: [i + 1, right],
  };

  const temp = list[i + 1];
  list[i + 1] = list[right];
  list[right] = temp;

  return i + 1;
};
