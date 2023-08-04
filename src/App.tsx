import { calculatePercentage, generateRandomArray } from "./utils";
import { Visualizer } from "./components/visualizer";
import { useEffect, useRef, useState } from "react";
import { TbTriangle, TbRepeat, TbSettings } from "react-icons/tb";
import { bubbleSort } from "./algorithms/bubble-sort";
import { selectionSort } from "./algorithms/selection-sort";
import { insertionSort } from "./algorithms/insertion-sort";
import { SortingAnim } from "./utils/types";
import { useClickAway } from "./hooks/useClickAway";
import { heapSort } from "./algorithms/heap-sort";
import { mergeSort } from "./algorithms/merge-sort";
import { cockTailShakerSort } from "./algorithms/cocktail-shaker-sort";
import { quickSort } from "./algorithms/quick-sort";

const algorithms: Record<
  string,
  (list: number[]) => Generator<SortingAnim, void, unknown>
> = {
  "Bubble Sort": bubbleSort,
  "Selection Sort": selectionSort,
  "Insertion Sort": insertionSort,
  "Heap Sort": heapSort,
  "Merge Sort": mergeSort,
  "Quick Sort": quickSort,
  "Cock Tail Shaker Sort": cockTailShakerSort,
};

const algorithmNames = Object.keys(algorithms);

const LIST_MIN = 10;
const LIST_MAX = 100;

const SPEED_MIN = 10;
const SPEED_MAX = 500;

// TODO: Add a stop button
const App = () => {
  const [listLength, setListLength] = useState<number>(30);
  const [algorithm, setAlgorithm] = useState<string>(algorithmNames[0]);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [speed, setSpeed] = useState(100);
  const [started, setStarted] = useState(false);
  const [data, setData] = useState<SortingAnim>({
    list: generateRandomArray(listLength),
  });
  const [generator, setGenerator] = useState<
    Generator<SortingAnim, void, unknown>
  >(bubbleSort(data.list));

  const ref = useRef<HTMLDivElement>(null);

  const canUpdateData = useRef<boolean>(false);
  const canUpdateAlgorithm = useRef<boolean>(false);

  useClickAway(ref, () => {
    if (showSettings) {
      setShowSettings(false);
    }
  });

  useEffect(() => {
    // Don't update array on initial render
    if (canUpdateData.current) {
      setData({ list: generateRandomArray(listLength) });
    } else {
      canUpdateData.current = true;
    }
  }, [listLength]);

  useEffect(() => {
    // Don't update algorithm on initial render
    if (canUpdateAlgorithm.current) {
      const fn = algorithms[algorithm];
      setGenerator(fn(data.list));
    } else {
      canUpdateAlgorithm.current = true;
    }
  }, [algorithm, data.list]);

  // Sorting animator
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
      }, speed);
    }

    return () => {
      clearInterval(id);
    };
  }, [generator, started, speed]);

  const listPercentage = calculatePercentage(listLength, LIST_MIN, LIST_MAX);
  const speedPercentage = calculatePercentage(speed, SPEED_MIN, SPEED_MAX);

  return (
    <main>
      <nav
        style={{
          height: "var(--nav-height)",
        }}
        className="border-black border-b-2 relative"
      >
        <div className="flex justify-between items-center h-[50px] max-w-[95%] m-auto">
          <h1 className="text-2xl">{algorithm}</h1>
          <div className="flex gap-4 items-center">
            <TbTriangle
              size={22}
              color={!started ? "black" : "var(--grey)"}
              onClick={!started ? () => setStarted(true) : undefined}
              className="rotate-90 cursor-pointer"
            />
            <TbRepeat
              color={!started ? "black" : "var(--grey)"}
              onClick={
                !started
                  ? () => {
                      setData({ list: generateRandomArray(listLength) });
                    }
                  : undefined
              }
              size={22}
              className="cursor-pointer"
            />
            <TbSettings
              color={!started ? "black" : "var(--grey)"}
              size={22}
              className="cursor-pointer"
              onClick={!started ? () => setShowSettings((v) => !v) : undefined}
            />
          </div>
        </div>
        {showSettings && (
          <div ref={ref} className="floating-settings">
            <div className="input">
              <label htmlFor="algorithm">algorithm</label>
              <select
                value={algorithm}
                onChange={(e) => {
                  setAlgorithm(e.currentTarget.value);
                }}
                name="algorithm"
              >
                {Object.keys(algorithms).map((v, i) => (
                  <option value={v} key={`${i}-${v}`}>
                    {v}
                  </option>
                ))}
              </select>
            </div>

            <div className="input">
              <label htmlFor="arraySize">Array Size</label>
              <div className="flex items-center gap-4">
                <input
                  className="w-9/12"
                  style={{
                    background: `linear-gradient(to right, #a855f7 ${listPercentage}%, #d8b4fe ${listPercentage}%)`,
                  }}
                  value={listLength}
                  onChange={(e) => {
                    setListLength(e.currentTarget.valueAsNumber);
                  }}
                  min={LIST_MIN}
                  max={LIST_MAX}
                  name="arraySize"
                  type="range"
                />
                <span>{listLength}</span>
              </div>
            </div>

            <div className="input">
              <label htmlFor="timing">Sorting speed</label>

              <div className="flex items-center gap-4">
                <input
                  style={{
                    background: `linear-gradient(to right, #a855f7 ${speedPercentage}%, #d8b4fe ${speedPercentage}%)`,
                  }}
                  className="w-9/12"
                  value={speed}
                  onChange={(e) => {
                    setSpeed(e.currentTarget.valueAsNumber);
                  }}
                  min={SPEED_MIN}
                  max={SPEED_MAX}
                  name="timing"
                  type="range"
                />
                <span>{speed} ms</span>
              </div>
            </div>
          </div>
        )}
      </nav>
      <div
        style={{
          height: "calc(100dvh - (var(--nav-height) + 10px))",
        }}
        className="max-w-[95%] m-auto mt-[10px]"
      >
        <Visualizer props={data} />
      </div>
    </main>
  );
};

export default App;
