import Image from "next/image";
import styles from "./page.module.scss";
import {Button} from "@/app/components/utils/button";
// import anime from "animejs/lib/anime.es";

export default function Home() {
    // anime({
    //     targets: ,
    //     translateX: 250,
    //     rotate: '1turn',
    //     backgroundColor: '#FFF',
    //     duration: 800
    // });
    return (
        <main className={styles.main}>
            <div className={styles.title}>
                <div>
                    <h1>DAYBREAK</h1>
                    <h3>Something, something, planner!</h3>
                </div>
                <Button>Try it out</Button>
            </div>
        </main>
    );
}
