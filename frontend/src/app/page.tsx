"use client";
import styles from "./page.module.scss";
import { Button } from "@/src/app/components/utils/button";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const routeToDashboard = (router: AppRouterInstance) => {
  router.push("/dashboard");
};

export default function Home() {
  const router = useRouter();
  return (
    <main className={styles.main}>
      <div className={styles.title}>
        <div>
          <h1>DAYBREAK</h1>
          <h3>Something, something, planner!</h3>
        </div>
        <Button onClick={() => routeToDashboard(router)}>Try it out</Button>
      </div>
    </main>
  );
}
