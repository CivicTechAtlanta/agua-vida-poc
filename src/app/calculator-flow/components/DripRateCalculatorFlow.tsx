"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Modal from '../../components/Modal/Modal';

import '../../drip-rate/DripRate.scss';

import {
  CalculatorFlowSharedStateData
} from "./Interfaces";

export default function DripRateFormula({ onCalculate, sharedState }: { 
    onCalculate: (data: any) => void,
    sharedState: CalculatorFlowSharedStateData
}) {
        const { t } = useTranslation();

        const [motherSolutionVolume, setMotherSolutionVolume] = useState<number>(sharedState.msVolume || 0)
        const [dripRate, setDripRate] = useState<number>(sharedState.desiredDripRate || 0)
        const [refillTime, setRefillTime] = useState<number>(0)

        const [showModal, setShowModal] = useState(null as string | null);

        const handleSubmit = () => {
                const calculatedDripRate = refillTime > 0 ? (motherSolutionVolume * 1000) / (refillTime * 1440) : 0
                setDripRate(calculatedDripRate)
                onCalculate({
                    msVolume: motherSolutionVolume,
                    refillTime: refillTime,
                    dripRate: calculatedDripRate
                })
        }

        return (
                <div className="center">
                        <div className="pageHeader">
                            <h1>{t('Recharge Time Formula')}
                                <svg onClick={() => setShowModal('info')} fill="#288DCE" viewBox="0 0 50 50"><path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 25 11 A 3 3 0 0 0 22 14 A 3 3 0 0 0 25 17 A 3 3 0 0 0 28 14 A 3 3 0 0 0 25 11 z M 21 21 L 21 23 L 22 23 L 23 23 L 23 36 L 22 36 L 21 36 L 21 38 L 22 38 L 23 38 L 27 38 L 28 38 L 29 38 L 29 36 L 28 36 L 27 36 L 27 21 L 26 21 L 22 21 L 21 21 z" /></svg>
                            </h1>
                        </div>

                        <div className="input-wrapper">

                                <div className="input-group">
                                        <label>{`${t('Mother Solution Volume')} (${t('L')})`}</label>
                                        <input type="number" value={motherSolutionVolume} onChange={(event) => { setMotherSolutionVolume(Number(event.target.value)) }} />
                                </div>

                                <div className="input-group">
                                        <label>{`${t('Refill time')} (${t('days')})`}</label>
                                        <input type="number" value={refillTime} onChange={(event) => { setRefillTime(Number(event.target.value)) }} />
                                </div>

                                <button className="button" onClick={() => {
                                        setMotherSolutionVolume(0)
                                        setRefillTime(0)
                                        setDripRate(0)
                                }}>{t('Clear')}</button>

                                <button type="submit" className="primary button" onClick={() => {
                                        handleSubmit()  // Simulate form submission
                                }}>
                                    {t('Submit')}
                                </button>

                                <h2>{`${t('Drip Rate is')}: ${dripRate.toFixed(2)} ${t('milliliters')}/${t('minute')}`}</h2>
                        </div>

                    <Modal
                        show={showModal === 'info'}
                        closeModal={() => setShowModal(null)}
                        headerText={['Drip Rate']}
                        modalText={[t('RechargeText1')]}
                        imageKey={[null, 'CHLORINE_WEIGHT']}
                    />
                </div>
        );
}