'use client';

import React, { useState } from 'react';
import { useTranslation } from "react-i18next";

import Input from '../../chlorine-weight/components/Input';
import Modal from '../../components/Modal/Modal';

import {
  CalculatorFlowSharedStateData
} from "./Interfaces";

import modalData from '@/app/modals/chlorine-weight-modal-data';

export default function ChlorineWeightFormula({ onCalculate, sharedState }: { onCalculate: (data: any) => void, sharedState: CalculatorFlowSharedStateData }) {
    const { t } = useTranslation();

    const [showText, setShowText] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [showModal, setShowModal] = useState(null as string | null);

    const [formData, setFormData] = useState({
        motherSolution: sharedState.msVolume || '',
        waterIngress: sharedState.reservoirIngress || '',
        desiredConcentration: sharedState.desiredConcentration || '',
        dripRate: sharedState.desiredDripRate || '',
        chlorinePercentage: sharedState.chlorinePercentage || '',
    });

    //Calculate the weight of chlorine needed
    const chlorineWeight = .36 * ((Number(formData.motherSolution) * Number(formData.waterIngress) * Number(formData.desiredConcentration)) / (Number(formData.dripRate) * Number(formData.chlorinePercentage)))

    const handleClick = () => {
        if (
            formData.motherSolution === '' ||
            formData.waterIngress === '' ||
            formData.desiredConcentration === '' ||
            formData.dripRate === '' ||
            formData.chlorinePercentage === ''
        ) {
            setErrorMessage('Please fill all inputs');
            setShowText(false);
        } else {
            setErrorMessage('');
            setShowText(true);
            onCalculate({
                chlorineWeight: chlorineWeight,
                msVolume: formData.motherSolution,
                waterIngress: formData.waterIngress,
                desiredConcentration: formData.desiredConcentration,
                dripRate: formData.dripRate,
                chlorinePercentage: formData.chlorinePercentage
            });
        }
    };

    const handleClear = () => {
        Object.keys(formData).forEach(key => {
            setFormData({
                ...formData,
                [key]: '',
            });
        });

        setShowText(false);
        setErrorMessage('')
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: parseFloat(value) || 0,
        }));
    };

    return (
        <div className="center">
            <div className="pageHeader">
                <h1>{t('Chlorine Weight Formula')}
                    <svg onClick={() => setShowModal('info')} fill="#288DCE" viewBox="0 0 50 50"><path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 25 11 A 3 3 0 0 0 22 14 A 3 3 0 0 0 25 17 A 3 3 0 0 0 28 14 A 3 3 0 0 0 25 11 z M 21 21 L 21 23 L 22 23 L 23 23 L 23 36 L 22 36 L 21 36 L 21 38 L 22 38 L 23 38 L 27 38 L 28 38 L 29 38 L 29 36 L 28 36 L 27 36 L 27 21 L 26 21 L 22 21 L 21 21 z" /></svg>
                </h1>
            </div>

            <div className="input-wrapper">
                <Input
                    label={`${t('Mother Solution')} (${t('liters')})`}
                    name='motherSolution'
                    value={formData.motherSolution}
                    placeholder='600'
                    handleChange={handleChange}
                />
                <Input
                    label={`${t('Water Ingress')} (${t('liters')}/${'second'})`}
                    name='waterIngress'
                    value={formData.waterIngress}
                    placeholder='20'
                    handleChange={handleChange}
                />
                <Input
                    label={`${t('Desired Concentration')} (${t('miligrams')}/${'liter'})`}
                    name='desiredConcentration'
                    value={formData.desiredConcentration}
                    placeholder='1'
                    handleChange={handleChange}
                />
                <Input
                    label={`${t('Drip Rate')} (${t('liters')}/${'hour'})`}
                    name='dripRate'
                    value={formData.dripRate}
                    placeholder='2'
                    handleChange={handleChange}
                />
                <Input
                    label={`${t('Chlorine Percentage')}`}
                    name='chlorinePercentage'
                    value={formData.chlorinePercentage}
                    placeholder='0.7'
                    handleChange={handleChange}
                />

                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

                <button className="button" onClick={handleClear}>{t('Clear')}</button>
                
                {showText ? (
                    <p>{`${t('The weight of chlorine needed is')}: ${chlorineWeight} ${t('grams')}`}</p>
                ) : (
                    <button className="button primary" onClick={handleClick}>{t('Submit')}</button>
                )}
            </div>

            <Modal
                show={showModal === 'info'}
                closeModal={() => setShowModal(null)}
                modalPageData={modalData}
            />

        </div>
    );
}