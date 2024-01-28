"use client";
import className from "./button.module.scss";
import {
  ForwardedRef,
  forwardRef,
  LegacyRef,
  Ref,
  RefObject,
  useImperativeHandle,
  useRef,
} from "react";

type ButtonProps = {
  onClick?: () => any;
  children?: string;
};

export type ButtonImperativeHandle = {
  focus: () => void;
};

export const Button = forwardRef(
  (
    { onClick = () => void 0, children = "Button" }: ButtonProps,
    ref: ForwardedRef<ButtonImperativeHandle>,
  ) => {
    const buttonRef = useRef<HTMLButtonElement>(null);

    if (ref !== null && buttonRef.current !== null) {
      useImperativeHandle<ButtonImperativeHandle, ButtonImperativeHandle>(
        ref,
        (): ButtonImperativeHandle => ({
          focus() {
            buttonRef.current!.focus();
          },
        }),
        [],
      );
    }
    return (
      <button
        ref={buttonRef}
        className={className.button}
        onClick={() => onClick()}
      >
        {children}
      </button>
    );
  },
);
