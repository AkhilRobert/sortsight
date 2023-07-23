import { FC } from "react";
import { SortingAnim } from "../utils/types";

export const Visualizer: FC<{ props: SortingAnim }> = ({ props }) => {
  return (
    <div className="w-full h-full flex justify-center gap-0.5">
      {props.list.map((v, i) => (
        <div
          key={i}
          className="rounded-t-sm max-w-[15px] w-[5%] self-end opacity-50"
          style={{
            height: `${v}%`,
            background: props.scanningIdx?.includes(i)
              ? "var(--scanning)"
              : props.swappingIdx?.includes(i)
              ? "var(--swapping)"
              : "var(--primary)",
          }}
        />
      ))}
    </div>
  );
};
