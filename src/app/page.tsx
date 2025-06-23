"use client"; // react-i18next is incompatible with React Server Components. This line of code is needed to give it context.

import { useTranslation } from "react-i18next";

import './page.scss';

import Link from "next/link";
import LanguageSelector from "./components/LanguageSelector/LanguageSelector";

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className='page'>
      <main className='main'>
        <Link className='go-to-page' href="/chlorine-weight">{t('Chlorine Weight Formula')}</Link>
        <Link className='go-to-page' href="/mother-solution-concentration">{t('Mother Solution Concentration')}</Link>
        <Link className='go-to-page' href="/refill-time">{t('Refill Time')}</Link>
        <Link className='go-to-page' href="/reservoir-ingress">{t('Reservoir Ingress')}</Link>
        <Link className='go-to-page' href="/mother-tank-maximum-weight">{t('Mother Tank Maximum Weight')}</Link>
        {/* <Link className='go-to-page' href="/lang-test">{t('Language Test')}</Link> */}

        <LanguageSelector></LanguageSelector>
      </main>
    </div>
  );
}
