"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";

import Form from "./components/Form";
import Home from "../components/Home/Home";
import Modal from '../components/Modal/Modal';
import LanguageSelector from "../components/LanguageSelector/LanguageSelector";

export default function MotherTankMaximumWeightFormula() {
  const { t } = useTranslation();

  const [motherWeightMaximumWeightSolution, setMotherWeightMaximumWeightSolution] = useState(0);
  const [showModal, setShowModal] = useState(null as string | null);


  const handleCalculate = (calculatedValue: number) => {
    setMotherWeightMaximumWeightSolution(calculatedValue);
  };

  return (
    <div className="center">
      <Home></Home>
      <h1 className="pageHeader">
        {t('Mother Tank Maximum Weight Formula')}
        <svg onClick={() => setShowModal('info')} fill="#288DCE" viewBox="0 0 50 50"><path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 25 11 A 3 3 0 0 0 22 14 A 3 3 0 0 0 25 17 A 3 3 0 0 0 28 14 A 3 3 0 0 0 25 11 z M 21 21 L 21 23 L 22 23 L 23 23 L 23 36 L 22 36 L 21 36 L 21 38 L 22 38 L 23 38 L 27 38 L 28 38 L 29 38 L 29 36 L 28 36 L 27 36 L 27 21 L 26 21 L 22 21 L 21 21 z" /></svg>
      </h1>

      <Form onCalculate={handleCalculate}></Form>

      <div className="result-wrapper">
        <h2>{`${t('The maximum weight of the mother tank is')}:`}</h2>
        <p className="answer">
          {`${Math.trunc(motherWeightMaximumWeightSolution)} ${t('grams')}`} {`(${(motherWeightMaximumWeightSolution / 1000).toFixed(1)} ${t('kilograms')})`}
        </p>
      </div>

      <Modal
        show={showModal === 'info'}
        closeModal={() => setShowModal(null)}
        headerText='How to Determine Maximum Mother Tank Weight'
        imageKey='CHLORINE_WEIGHT'></Modal>
      <LanguageSelector></LanguageSelector>
    </div>
  );
}
