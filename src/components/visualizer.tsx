import styled from "@emotion/styled";
import { FC } from "react";
import { SortingAnim } from "../utils/types";

const Container = styled.div({
  maxWidth: "100%",
  height: "calc(100vh - 60px)",
  maxHeight: "100vh",
  display: "flex",
  gap: 2,
  justifyContent: "center",
});

const Bar = styled.div<{
  height: number;
  scanning?: boolean;
  swapping?: boolean;
}>(
  {
    width: 20,
    background: "red",
    alignSelf: "flex-end",
    borderRadius: "2px 2px 0 0",
  },
  (props) => ({
    height: `${props.height}%`,
    background: props.scanning
      ? "yellow"
      : props.swapping
      ? "green"
      : undefined,
  })
);

export const Visualizer: FC<{ props: SortingAnim }> = ({ props }) => {
  return (
    <Container>
      {props.list.map((v, i) => (
        <Bar
          key={i}
          height={v}
          swapping={props.swappingIdx?.includes(i)}
          scanning={props.scanningIdx?.includes(i)}
        />
      ))}
    </Container>
  );
};
