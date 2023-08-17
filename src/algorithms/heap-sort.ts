import { SortingAnim } from "../utils/types";

export const heapSort = function* (
  list: number[]
): Generator<SortingAnim, void, unknown> {
  for (let i = Math.floor(list.length / 2 - 1); i >= 0; i--) {
    yield {
      list,
      scanningIdx: [i],
    };
    yield* heapify(list, list.length, i);
  }

  for (let i = list.length - 1; i > 0; i--) {
    yield {
      list,
      scanningIdx: [0, i],
    };

    yield {
      list,
      swappingIdx: [0, i],
    };

    const temp = list[i];
    list[i] = list[0];
    list[0] = temp;
    yield* heapify(list, i, 0);
  }

  yield {
    list,
  };
};

const heapify = function* (
  list: number[],
  size: number,
  idx: number
): Generator<SortingAnim, void, unknown> {
  let largest = idx;
  const left = 2 * idx + 1;
  const right = 2 * idx + 2;

  if (left < size && list[largest] < list[left]) {
    largest = left;
  }
  if (right < size && list[largest] < list[right]) {
    largest = right;
  }

  yield {
    list,
    scanningIdx: [left, right],
  };

  if (largest != idx) {
    yield {
      list,
      swappingIdx: [left, right],
    };
    const temp = list[idx];
    list[idx] = list[largest];
    list[largest] = temp;
    yield* heapify(list, size, largest);
  }
};
