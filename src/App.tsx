import { generateRandomArray } from "./utils";
import { Visualizer } from "./components/visualizer";
import { useSortingAnimator } from "./hooks/use-sorting-animator";
import { useState } from "react";
import { TbTriangle, TbRepeat, TbSettings } from "react-icons/tb";
import { bubbleSort } from "./algorithms/bubble-sort";
import { selectionSort } from "./algorithms/selection-sort";
import { insertionSort } from "./algorithms/insertion-sort";

const App = () => {
  const [listLength, setListLength] = useState<number>(30);
  const [showSettings, setShowSettings] = useState<boolean>(false);

  const list = generateRandomArray(listLength);

  const { data, startAnimation, started, changeData } = useSortingAnimator(
    { list },
    bubbleSort,
    10
  );

  const algorithms = {
    "Bubble Sort": bubbleSort,
    "Selection Sort": selectionSort,
    "Insertion Sort": insertionSort,
  };

  return (
    <main>
      <nav
        style={{
          height: "var(--nav-height)",
        }}
        className="border-black border-b-2 relative"
      >
        <div className="flex justify-between items-center h-[50px] max-w-[95%] m-auto">
          <h1 className="text-2xl">{Object.keys(algorithms)[0]}</h1>
          <div className="flex gap-4 items-center">
            <TbTriangle
              size={22}
              color={!started ? "black" : "var(--grey)"}
              onClick={!started ? startAnimation : undefined}
              className="rotate-90 cursor-pointer"
            />
            <TbRepeat
              color={!started ? "black" : "var(--grey)"}
              onClick={() => {
                changeData({ list: generateRandomArray(listLength) });
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
              <select name="algorithm">
                {Object.keys(algorithms).map((v, i) => (
                  <option key={`${i}-${v}`}>{v}</option>
                ))}
              </select>
            </div>

            <div className="input">
              <label htmlFor="arraySize">Array Size</label>
              <input
                value={listLength}
                onChange={(e) => setListLength(e.target.valueAsNumber)}
                name="arraySize"
                type="range"
              />
            </div>

            <div className="input">
              <label htmlFor="timing">Sorting speed</label>
              <input name="timing" type="range" />
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
