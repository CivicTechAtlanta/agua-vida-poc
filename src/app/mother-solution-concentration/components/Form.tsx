"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";

import Input from "./Input";
import "../styles/Form.css";

type FormProps = {
  onCalculate: (calculatedValue: number) => void;
};

export default function Form({ onCalculate }: FormProps) {
  const { t } = useTranslation();

  const [formData, setFormData] = useState<{
    motherSolutionVolume: number;
    weightOfChlorine: number;
    desiredReservoirConcentration: number;
  }>({
    motherSolutionVolume: 0,
    weightOfChlorine: 0,
    desiredReservoirConcentration: 0,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
  };

  const clear = () => {
    onCalculate(0);
    setFormData({
      motherSolutionVolume: 0,
      weightOfChlorine: 0,
      desiredReservoirConcentration: 0,
    });
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const {
      motherSolutionVolume,
      weightOfChlorine,
      desiredReservoirConcentration,
    } = formData;

    let newConcentratedMotherSolution;
    if (motherSolutionVolume != 0) {
      newConcentratedMotherSolution =
        (weightOfChlorine * 10 * desiredReservoirConcentration) /
        motherSolutionVolume;
    } else {
      newConcentratedMotherSolution = 0;
    }

    onCalculate(newConcentratedMotherSolution);
  };

  const motherSolutionVolumeLabel = `${t('Mother Solution Volume')} (${t('L')})`;
  const weightOfChlorineLabel = `${'Weight of Chlorine'} (${t('g')})`;
  const desiredReservoirConcentrationLabel = `${'Desired Reservoir Concentration'} (${t('mg')}/${t('L')})`;

  return (
    <form className="form" onSubmit={handleSubmit}>
      <Input
        label={motherSolutionVolumeLabel}
        name="motherSolutionVolume"
        min="0.01"
        handleChange={handleChange}
      ></Input>
      <Input
        label={weightOfChlorineLabel}
        name="weightOfChlorine"
        min="0"
        handleChange={handleChange}
      ></Input>
      <Input
        label={desiredReservoirConcentrationLabel}
        name="desiredReservoirConcentration"
        min="0"
        handleChange={handleChange}
      ></Input>

      <button type="reset" className="button" onClick={clear}>
        {t('Clear')}
      </button>
      <button type="submit" className="primary button">
        {t('Submit')}
      </button>
    </form>
  );
}
