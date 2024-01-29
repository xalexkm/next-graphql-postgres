import className from "./wrapper.module.scss";
import { ReactNode } from "react";

type WrapperProps = { children: ReactNode };
export const Wrapper = ({ children }: WrapperProps) => (
  <div className={className.wrapper}>{children}</div>
);
