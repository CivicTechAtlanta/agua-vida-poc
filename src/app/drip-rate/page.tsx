"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import LanguageSelector from "../components/LanguageSelector/LanguageSelector";

import './DripRate.scss';
import Home from "../components/Home/Home";

export default function DripRateFormula() {
    const { t } = useTranslation();

    const [motherSolutionVolume, setMotherSolutionVolume] = useState<number>(0)
    const [dripRate, setDripRate] = useState<number>(0)
    const [refillTime, setRefillTime] = useState<number>(0)

    useEffect(() => {
        // The mother solution is in liters. The refill time is in days. We want the drip rate in milliliters per minute.
        // We convert liters to milliliters and days to minutes and perform the division.
        const calculatedDripRate = refillTime > 0 ? (motherSolutionVolume * 1000) / (refillTime * 1440) : 0
        setDripRate(calculatedDripRate)
    }, [motherSolutionVolume, refillTime])

    return (
        <div className="center">
            <Home></Home>
            <h1>{t('Drip Rate Formula')}</h1>
            <div className="input-wrapper">

                <div className="input-group">
                    <label>{`${t('Mother Solution Volume')} (${t('L')})`}</label>
                    <input type="number" value={motherSolutionVolume} onChange={(event) => { setMotherSolutionVolume(Number(event.target.value)) }} />
                </div>

                <div className="input-group">
                    <label>{`${t('Refill time')} (${t('days')})`}</label>
                    <input type="number" value={refillTime} onChange={(event) => { setRefillTime(Number(event.target.value)) }} />
                </div>

                <h2>{`${t('Drip Rate is')}: ${dripRate.toFixed(2)} ${t('milliliters')}/${t('minute')}`}</h2>

                <button className="button" onClick={() => {
                    setMotherSolutionVolume(0)
                    setRefillTime(0)
                }}>{t('Clear')}</button>
            </div>

            <LanguageSelector></LanguageSelector>
        </div>
    );
}