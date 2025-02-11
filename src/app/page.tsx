import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <ul>
        <li>
          <Link href="">Home</Link>
        </li>
        <li>
          <Link href="/chlorine-weight">Chlorine Weight Formula</Link>
        </li>
        <li>
          <Link href="/mother-solution-concentration">Mother Solution Concentration</Link>
        </li>
        <li>
          <Link href="/refill-time">Refill Time</Link> 
        </li>
        <li>
          <Link href="/reservoir-ingress">Reservoir Ingress</Link>
        </li>
        <li>
          <Link href="/lang-test">Language Test</Link>
        </li>
      </ul>
      </main>
    </div>
  );
}
