"use client";
import className from "./errors.module.scss";
import { useAppSelector } from "@/src/redux/hooks";
import { Dispatch, useEffect, useReducer, useRef } from "react";
import anime from "animejs/lib/anime.es.js";
import { Action } from "redux";

type ErrorProps = {
  index: number;
  message: string;
  setError: Action<number>;
  clearError: Action<number>;
};

const Error = ({ index, message, setError }: ErrorProps) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setError(index);
    const timeout = setTimeout(() => {
      clearError(index);
    }, 5000);

    anime({
      targets: ref.current,
      keyframes: [
        { translateX: 20, duration: 1000 },
        { duration: 3000 },
        { translateX: -20, opacity: 0, duration: 2000 },
      ],
      loop: false,
    });

    return () => {
      clearTimeout(timeout);
    };
  }, [index]);
  return (
    <div ref={ref} className={className.errors__box}>
      {message}
    </div>
  );
};

const SET_ERROR = "SET_ERROR";
const CLEAR_ERROR = "CLEAR_ERROR";

const setError = (index: number) => ({ type: SET_ERROR, index });
const clearError = (index: number) => ({ type: CLEAR_ERROR, index });

const reducer = (
  state: Record<number, boolean>,
  action: { type: string; index: number },
) => {
  switch (action.type) {
    case SET_ERROR:
      return { ...state, [action.index]: true };

    case CLEAR_ERROR:
      const { [action.index]: omit, ...rest } = state;
      return rest;

    default:
      return state;
  }
};

export const ErrorsBlock = () => {
  const errors = useAppSelector((state) => state.errors.errors);
  const [activeErrors, updateActiveErrors] = useReducer(reducer, {});
  return (
    <div className={className.errors}>
      {errors
        ? errors.map((err: any, index) => {
            return activeErrors[index] !== false ? (
              <Error
                key={index}
                index={index}
                message={err.message}
                setError={setError}
                clearError={clearError}
              />
            ) : null;
          })
        : null}
    </div>
  );
};
