"use client";
import className from "./button.module.scss";
import {forwardRef} from "react";

type ButtonProps = {
    onClick?: () => any;
    children?: string;
};

export const Button = forwardRef(
    ({onClick = () => void 0, children = "Button"}: ButtonProps, ref) => (
        <button className={className.button} onClick={() => onClick()}>
            {children}
        </button>
    ),
);
