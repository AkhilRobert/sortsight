import { SortingAnim } from "../utils/types";

export const mergeSort = function* (
  list: number[]
): Generator<SortingAnim, void, unknown> {
  yield* helper(list, 0, list.length);
};

const helper = function* (
  list: number[],
  start: number,
  end: number
): Generator<SortingAnim, void, unknown> {
  if (end - start > 1) {
    const middle = Math.floor((start + end) / 2);

    yield* helper(list, start, middle);
    yield* helper(list, middle, end);

    const left = list.slice(start, middle);
    const right = list.slice(middle, end);

    let a = 0;
    let b = 0;
    let c = start;

    while (a < left.length && b < right.length) {
      yield {
        list,
        scanningIdx: [a, b],
      };

      if (left[a] < right[b]) {
        yield {
          list,
          swappingIdx: [c, a],
        };

        list[c] = left[a];
        a++;
      } else {
        yield {
          list,
          swappingIdx: [c, b],
        };

        list[c] = right[b];
        b++;
      }

      c++;
    }

    while (a < left.length) {
      yield {
        list,
        swappingIdx: [a, c],
      };

      list[c] = left[a];
      a++;
      c++;
    }

    while (b < right.length) {
      yield {
        list,
        swappingIdx: [b, c],
      };

      list[c] = right[b];
      b++;
      c++;
    }

    yield {
      list,
    };
  }
};
