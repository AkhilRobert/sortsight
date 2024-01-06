import { RefObject, useEffect, ElementRef } from "react";

export const useClickAway = (
  ref: RefObject<ElementRef<"html">>,
  fn: () => void,
) => {
  useEffect(() => {
    document.addEventListener("mousedown", (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        fn();
      }
    });

    return () => {
      document.removeEventListener("mousedown", () => {
        // Do nothing
      });
    };
  }, [ref, fn]);
};
