import { generateRandomArray } from "./utils";
import { Visualizer } from "./components/visualizer";
import { useSortingAnimator } from "./hooks/use-sorting-animator";
import { useState } from "react";
import { insertionSort } from "./algorithms/insertion-sort";

const App = () => {
  const [listLength] = useState<number>(50);

  const list = generateRandomArray(listLength);

  const { data, startAnimation } = useSortingAnimator(
    { list },
    insertionSort,
    10
  );

  return (
    <main className="text-xl">
      <button onClick={startAnimation}>Start Animation</button>
      <Visualizer props={data} />
    </main>
  );
};

export default App;
