import { generateRandomArray } from "./utils";
import { Visualizer } from "./components/visualizer";
import { useSortingAnimator } from "./hooks/use-sorting-animator";
import { useState } from "react";
import { TbTriangle, TbRepeat, TbSettings } from "react-icons/tb";
import { bubbleSort } from "./algorithms/bubble-sort";

const App = () => {
  const [listLength] = useState<number>(30);
  const list = generateRandomArray(listLength);

  const { data, startAnimation, started, changeData } = useSortingAnimator(
    { list },
    bubbleSort,
    10
  );

  const algorithms = {
    "Bubble Sort": bubbleSort,
  };

  return (
    <main>
      <nav
        style={{
          height: "var(--nav-height)",
        }}
        className="border-black border-b-2"
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
            />
          </div>
        </div>
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
