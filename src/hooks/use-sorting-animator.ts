import { useEffect, useState } from "react";
import { SortingAnim } from "../utils/types";

export const useSortingAnimator = <T extends Pick<SortingAnim, "list">>(
  input: T,
  generatorFn: (input: number[]) => Generator<T, void, unknown>,
  timeout: number
) => {
  const [data, setData] = useState<T>(input);
  const [generator, setGenerator] = useState<Generator<T, void, unknown>>(
    generatorFn(input.list)
  );
  const [started, setStarted] = useState(false);

  const startAnimation = () => {
    setStarted(() => true);
  };

  const changeData = (value: T) => {
    setData(value);
    setGenerator(generatorFn(value.list));
  };

  useEffect(() => {
    let id: number;
    if (started) {
      id = setInterval(() => {
        const sorted = generator.next();
        if (!sorted.done) {
          setData(sorted.value);
        } else {
          clearInterval(id);
          setStarted(false);
        }
      }, timeout);
    }

    return () => clearInterval(id);
  }, [generator, timeout, input, started]);

  return {
    data,
    startAnimation,
    started,
    changeData,
  };
};
