import styled from "@emotion/styled";
import { generateRandomArray } from "./utils";
import { Visualizer } from "./components/visualizer";
import { useSortingAnimator } from "./hooks/use-sorting-animator";
import { useState } from "react";
import { insertionSort } from "./algorithms/insertion-sort";

const Container = styled.div({
  display: "flex",
  gap: 20,
  height: 60,
});

const Button = styled.button({
  padding: 10,
  cursor: "pointer",
});

const SliderContainer = styled.div({
  alignSelf: "center",
  display: "flex",
  gap: 20,
});

const RangeSlider = styled.input({});

const App = () => {
  const [listLength, setListLength] = useState<number>(23);

  const list = generateRandomArray(listLength);

  const { data, startAnimation, changeData, started } = useSortingAnimator(
    { list },
    insertionSort,
    10
  );

  return (
    <>
      <Container>
        <Button disabled={started} onClick={startAnimation}>
          Sort
        </Button>

        <Button
          disabled={started}
          onClick={() => {
            const list = generateRandomArray(listLength);
            changeData({ list });
          }}
        >
          Generate Random Array
        </Button>

        <SliderContainer>
          <RangeSlider
            onChange={(e) => {
              setListLength(e.currentTarget.valueAsNumber);
            }}
            disabled={started}
            value={listLength}
            type="range"
            min="0"
            max="100"
          />
          <p>{listLength}</p>
        </SliderContainer>
      </Container>
      <Visualizer props={data} />
    </>
  );
};

export default App;
