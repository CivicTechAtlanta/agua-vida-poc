"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import Modal from '../../components/Modal/Modal';

import Form from "../../mother-solution-concentration/components/Form";

import "../../mother-solution-concentration/styles/Main.css";

import modalData from "../../modals/mother-solution-concentration-modal-data";
import { formatSig2 } from "@/app/utils/format";

export default function MotherSolutionConcentrationFormula({ onCalculate, sharedState }: { onCalculate: (data: number) => void, sharedState: Record<string, unknown> }) {
  const { t } = useTranslation();

  const [concentratedMotherSolution, setConcentratedMotherSolution] =
    useState(0);

  const [showModal, setShowModal] = useState(null as string | null);
  const handleCalculate = (calculatedValue: number) => {
    setConcentratedMotherSolution(calculatedValue);
    onCalculate(calculatedValue);
  };

  return (
    <div className="center">
      <div className="pageHeader">
        <h1>{t('Mother Solution Concentration Formula')}
            <svg onClick={() => setShowModal('info')} fill="#288DCE" viewBox="0 0 50 50"><path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 25 11 A 3 3 0 0 0 22 14 A 3 3 0 0 0 25 17 A 3 3 0 0 0 28 14 A 3 3 0 0 0 25 11 z M 21 21 L 21 23 L 22 23 L 23 23 L 23 36 L 22 36 L 21 36 L 21 38 L 22 38 L 23 38 L 27 38 L 28 38 L 29 38 L 29 36 L 28 36 L 27 36 L 27 21 L 26 21 L 22 21 L 21 21 z" /></svg>
        </h1>
      </div>

      <Form onCalculate={handleCalculate} sharedState={sharedState} />

      <div className="result-wrapper">
        <h2>{`${t('The concentration of the mother solution is')}:`}</h2>

        <p className="answer">
          {`${formatSig2(concentratedMotherSolution)} ${t('mg')}/${t('L')}`}
        </p>
      </div>
      <Modal
          show={showModal === 'info'}
          closeModal={() => setShowModal(null)}
          modalPageData={modalData}
      />
    </div>
    
  );
}
