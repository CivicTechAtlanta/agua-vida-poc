"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import LanguageSelector from "../components/LanguageSelector/LanguageSelector";

import './RefillTime.scss';
import Home from "../components/Home/Home";

export default function RefillTimeFormula() {
    const { t } = useTranslation();

    const [motherSolutionVolume, setMotherSolutionVolume] = useState<number>(0)
    const [dripRate, setDripRate] = useState<number>(0)
    const [refillTime, setRefillTime] = useState<number>(0)

    useEffect(() => {
        if (dripRate <= 0) {
            setRefillTime(0)
            return;
        }
        setRefillTime(motherSolutionVolume / dripRate)
    }, [motherSolutionVolume, dripRate])

    return (
        <div className="center">
            <Home></Home>
            <h1>{t('Refill Time Formula')}</h1>
            <div className="input-wrapper">

                <div className="input-group">
                    <label>{t('Mother Solution Volume')}</label>
                    <input type="number" value={motherSolutionVolume} onChange={(event) => { setMotherSolutionVolume(Number(event.target.value)) }} />
                </div>

                <div className="input-group">
                    <label>{t('Drip Rate')}</label>
                    <input type="number" value={dripRate} onChange={(event) => { setDripRate(Number(event.target.value)) }} />
                </div>

                <h2>{`${t('Refill time is')}: ${refillTime} ${t('hours')}`}</h2>

                <button className="button" onClick={() => {
                    setMotherSolutionVolume(0)
                    setDripRate(0)
                }}>{t('Clear')}</button>
            </div>

            <LanguageSelector></LanguageSelector>
        </div>
    );
}