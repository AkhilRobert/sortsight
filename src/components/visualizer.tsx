import { FC } from "react";
import { SortingAnim } from "../utils/types";

export const Visualizer: FC<{ props: SortingAnim }> = ({ props }) => {
  return (
    <div className="h-screen w-full flex gap-1">
      {props.list.map((v, i) => (
        <div
          key={i}
          className="rounded-t-sm w-20 self-end"
          style={{
            height: `${v}%`,
            background: props.scanningIdx?.includes(i)
              ? "yellow"
              : props.swappingIdx?.includes(i)
              ? "green"
              : "red",
          }}
        />
      ))}
    </div>
  );
};
