"use client"; // react-i18next is incompatible with React Server Components. This line of code is needed to give it context.

import { useTranslation } from "react-i18next";

import './page.scss';

import Link from "next/link";
import { useRouter } from "next/navigation";
import LanguageSelector from "./components/LanguageSelector/LanguageSelector";

export default function Home() {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <div className='page'>
      <header className="headerHamburger">
        <div className="hamburger-menu" style={{ marginLeft: 'auto' }}>
          <button
            className="hamburger-button"
            aria-label="menu"
            type="button"
            onClick={() => router.push('/configurations')}
          >
        <span></span>
        <span></span>
        <span></span>
          </button>
        </div>
      </header>
      <main className='main'>
        <Link className='go-to-page' href="/calculator-flow">{t('Start Clorination Flow')}</Link>

        <div className="full-width">
          <h1 className="titleSectionFormulas">{t('Formula Titles')}</h1>
        </div>

        <Link className='go-to-page-formula' href="/chlorine-weight">{t('Chlorine Weight Formula')}</Link>
        <Link className='go-to-page-formula' href="/mother-solution-concentration">{t('Mother Solution Concentration')}</Link>
        <Link className='go-to-page-formula' href="/drip-rate">{t('Drip Rate')}</Link>
        <Link className='go-to-page-formula' href="/reservoir-ingress">{t('Reservoir Ingress')}</Link>
        <Link className='go-to-page-formula' href="/mother-tank-maximum-weight">{t('Mother Tank Maximum Weight')}</Link>
        <LanguageSelector/>
      </main>
    </div>
  );
}
