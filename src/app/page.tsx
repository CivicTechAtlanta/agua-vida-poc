"use client"; // react-i18next is incompatible with React Server Components. This line of code is needed to give it context.

import styles from "./page.module.css";
import Link from "next/link";

// Language Translations
import { useTranslation } from "react-i18next";
import "./i18n";

export default function Home() {
  const { t, i18n } = useTranslation();
  const switchLanguage = () => {
    const newLang = i18n.language === 'en' ? 'es' : 'en';
    i18n.changeLanguage(newLang);
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <ul>
        <li>
          <Link href="">{t('Home')}</Link>
        </li>
        <li>
          <Link href="/chlorine-weight">{t('Chlorine Weight Formula')}</Link>
        </li>
        <li>
          <Link href="/mother-solution-concentration">{t('Mother Solution Concentration')}</Link>
        </li>
        <li>
          <Link href="/refill-time">{t('Refill Time')}</Link> 
        </li>
        <li>
          <Link href="/flow-rate">{t('Flow Rate')}</Link>
        </li>
        <li>
          <Link href="/reservoir-ingress">{t('Reservoir Ingress')}</Link>
        </li>
        <li>
          <Link href="/lang-test">{t('Language Test')}</Link>
        </li>
      </ul>

      <button onClick={switchLanguage}>{t('button')}</button>
      </main>
    </div>
  );
}
