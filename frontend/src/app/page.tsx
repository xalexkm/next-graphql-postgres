"use client";
import styles from "./page.module.scss";
import { Button } from "@/src/app/components/utils/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Cookies from "js-cookie";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const routeToDashboard = async () => {
    const data = await fetch("/api/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }).then((res) => res.json());

    if (data?.token) {
      Cookies.set("AuthToken", data.token, {
        domain: "localhost",
        path: "/",
        secure: false,
        expires: 1,
        sameSite: "lax",
      });
      router.push("/dashboard");
    } else {
      setEmail("");
      setPassword("");
    }
  };

  const router = useRouter();
  return (
    <main className={styles.main}>
      <div className={styles.title}>
        <div>
          <h1>DAYBREAK</h1>
          <h3>Something, something, planner!</h3>
        </div>
        <input
          type={"email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type={"password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={() => routeToDashboard()}>Login</Button>
      </div>
    </main>
  );
}
