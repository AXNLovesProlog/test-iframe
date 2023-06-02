import cx from "classnames";
import React, { Fragment, useCallback, useRef, useState } from "react";
import { createRoot } from "react-dom/client";

const Toto: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [threeDotsLeft, setThreeDotsLeft] = useState(0);

  const onMount = useCallback((div: HTMLDivElement | null) => {
    if (div !== null) {
      let max: DOMRect | undefined;
      div.childNodes.forEach((e) => {
        if (e instanceof HTMLElement) {
          const rect = e.getBoundingClientRect();
          if (
            max === undefined ||
            rect.top < max.top ||
            (rect.top === max.top && max.right < rect.right)
          ) {
            max = rect;
          }
        }
      });
      if (max !== undefined) setThreeDotsLeft(max.right + 8);
    }
  }, []);

  return (
    <div className="p-2 bg-zinc-100">
      <div
        className={cx(
          "gap-2",
          isOpen ? "flex flex-col" : "grid grid-cols-[auto_auto]"
        )}
      >
        <div
          ref={onMount}
          className={cx("flex flex-wrap gap-2 overflow-y-hidden", {
            "max-h-[26px]": !isOpen,
          })}
        >
          {items.map((elt, i) => (
            <Label key={i}>{elt}</Label>
          ))}
        </div>
        {isOpen ? null : (
          <Label className="absolute" style={{ left: threeDotsLeft }}>
            ...
          </Label>
        )}
        <div className={cx("flex items-start gap-2", { "self-end": isOpen })}>
          {/* {isOpen ? null : <Label className="invisible">...</Label>} */}
          <button
            onClick={() => setIsOpen((o) => !o)}
            className="font-bold underline"
          >
            {isOpen ? "Moins de substances ▴" : "Plus de substances ▾"}
          </button>
        </div>
      </div>
    </div>
  );
};

const Label: React.FC<{
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}> = ({ className, style, children }) => (
  <span
    className={cx(
      "border border-zinc-300 bg-white px-0.5 whitespace-nowrap",
      className
    )}
    style={style}
  >
    {children}
  </span>
);

const items = [
  "Bisphénol A (PPM) : 499,02",
  "Bisphénol B (PPM) : 122,01",
  "Bisphénol BA (PPM) : 998,09",
  "Bisphénol C (PPM) : 456,12",
  "Bisphénol D (PPM) : 747,02",
  "Bisphénol E (PPM) : 674,21",
  "PFA A (PPM) : 122,01",
  "PFA C (PPM) : 26,00",
  "PFA E (PPM) : 887,99",
  "PFA F (PPM) : 98,41",
  "Nickel NB7 (PPM) : 54,98",
  "Nickel NC (PPM) : 4,02",
  "Nickel D (PPM) : 1,01",
];

const rootEltId = "root";
const rootElt = document.getElementById(rootEltId);

if (rootElt === null) {
  // eslint-disable-next-line functional/no-throw-statements
  throw Error(`root element not found: #${rootEltId}`);
}

const root = createRoot(rootElt);

root.render(<Toto />);
