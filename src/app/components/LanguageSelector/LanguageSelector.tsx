import { useTranslation } from "react-i18next";
import "../../i18n";

import './LanguageSelector.scss';

export default function LanguageSelector() {
    const { i18n } = useTranslation();
    const switchLanguage = (language: string) => {
        i18n.changeLanguage(language);
    }

    return (
        <div className='language-selector'>
            <button onClick={() => switchLanguage('es')}>Español</button>
            <p className='divider'>|</p>
            <button onClick={() => switchLanguage('en')}>English</button>
        </div>
    );
}