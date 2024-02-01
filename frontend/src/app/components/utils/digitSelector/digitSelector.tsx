import className from "./digitSelector.module.scss";
import { Dispatch } from "react";

type DigitSelectorProps = {
  digit: number;
  setDigit: Dispatch<number>;
};

export const DigitSelector = ({ digit, setDigit }: DigitSelectorProps) => {
  return (
    <div className={className.digit__selector}>
      <div
        onClick={() => setDigit(digit - 1)}
        className={className.digit__selector__sub}
      >
        -
      </div>
      <span>{digit}</span>
      <div
        onClick={() => setDigit(digit + 1)}
        className={className.digit__selector__add}
      >
        +
      </div>
    </div>
  );
};
