"use client";
import { useTranslation } from 'react-i18next';
import '../i18n';
import Link from "next/link";

export default function LangTest() {
    const { t, i18n } = useTranslation();

    const switchLanguage = () => {
        const newLang = i18n.language === 'en' ? 'es' : 'en';
        i18n.changeLanguage(newLang);
    };

    return (
        <div>
            <ul>
                <li><Link href="/">Home</Link></li>
            </ul>
            <h1>{t('title')}</h1>
            <p>{t('description')}</p>
            <br />
            <button onClick={switchLanguage}>{t('button')}</button>
        </div>
    );
}
