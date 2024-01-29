import className from "./header.module.scss";
import { Wrapper } from "@/src/app/components/utils/wrapper/wrapper";
import Link from "next/link";

export default function Header() {
  return (
    <header className={className.header__wrapper}>
      <Wrapper>
        <div className={className.header__block}>
          <Link href={"/"}>
            <span className={className.header__title}>DAYBREAK</span>
          </Link>
        </div>
      </Wrapper>
    </header>
  );
}
