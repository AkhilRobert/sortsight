import { generateRandomArray } from "./utils";
import { Visualizer } from "./components/visualizer";
import { useEffect, useRef, useState } from "react";
import { TbTriangle, TbRepeat, TbSettings } from "react-icons/tb";
import { bubbleSort } from "./algorithms/bubble-sort";
import { selectionSort } from "./algorithms/selection-sort";
import { insertionSort } from "./algorithms/insertion-sort";
import { SortingAnim } from "./utils/types";

const algorithms: Record<
  string,
  (list: number[]) => Generator<SortingAnim, void, unknown>
> = {
  "Bubble Sort": bubbleSort,
  "Selection Sort": selectionSort,
  "Insertion Sort": insertionSort,
};

const algorithmName = Object.keys(algorithms);

const App = () => {
  const [listLength, setListLength] = useState<number>(30);
  const [algorithm, setAlgorithm] = useState<string>(algorithmName[0]);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [speed, setSpeed] = useState(100);
  const [started, setStarted] = useState(false);
  const [data, setData] = useState<SortingAnim>({
    list: generateRandomArray(listLength),
  });
  const [generator, setGenerator] = useState<
    Generator<SortingAnim, void, unknown>
  >(bubbleSort(data.list));

  const canUpdateData = useRef<boolean>(false);
  const canUpdateAlgorithm = useRef<boolean>(false);

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
        console.log(id);
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
              onClick={() => {
                setData({ list: generateRandomArray(listLength) });
              }}
              size={22}
              className="cursor-pointer"
            />
            <TbSettings
              color={!started ? "black" : "var(--grey)"}
              size={22}
              className="cursor-pointer"
              onClick={() => setShowSettings((v) => !v)}
            />
          </div>
        </div>
        {showSettings && (
          <div className="floating-settings">
            <div className="input">
              <label htmlFor="algorithm">algorithm</label>
              <select
                onChange={(e) => {
                  setAlgorithm(e.currentTarget.value);
                }}
                name="algorithm"
              >
                {Object.keys(algorithms).map((v, i) => (
                  <option key={`${i}-${v}`}>{v}</option>
                ))}
              </select>
            </div>

            <div className="input">
              <label htmlFor="arraySize">Array Size</label>
              <div className="flex items-center gap-4">
                <input
                  className="w-9/12"
                  value={listLength}
                  onChange={(e) => {
                    setListLength(e.currentTarget.valueAsNumber);
                  }}
                  min={10}
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
                  className="w-9/12"
                  value={speed}
                  onChange={(e) => {
                    setSpeed(e.currentTarget.valueAsNumber);
                  }}
                  min={10}
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
