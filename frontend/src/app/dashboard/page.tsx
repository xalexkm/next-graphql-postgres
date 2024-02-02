"use client";

import { Tasks } from "@/src/app/components/tasks/tasks";
import { Wrapper } from "@/src/app/components/utils/wrapper/wrapper";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { isBrowser } from "react-device-detect";
import { useAppDispatch } from "@/src/redux/hooks";
import { addError } from "@/src/redux/reducers/errorsReducer";
import { useEffect } from "react";

export default function Dashboard() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isBrowser) {
      fetch("http://localhost:3000/api/login", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Cookies.get("AuthToken")}`,
        },
      }).then(async (res) => {
        const session = await res.json();
        if (res.status === 200) {
          Cookies.set("AuthToken", session.token, {
            domain: "localhost",
            path: "/",
            secure: false,
            expires: 1,
            sameSite: "lax",
          });
          dispatch(addError({ message: "Logged in!" }));
        } else {
          router.replace("/");
        }
      });
    }
  }, []);

  return (
    <Wrapper>
      <main>
        <Tasks />
      </main>
    </Wrapper>
  );
}
