"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";

import Input from "./Input";

type FormProps = {
  onCalculate: (calculatedValue: number) => void;
};

export const MOTHER_TANK_MAX_CHLORINATION_CONCENTRATION = 5000;

export default function Form({ onCalculate }: FormProps) {
  const { t } = useTranslation();

  const [formData, setFormData] = useState<{
    motherSolutionVolume: number;
    chlorinePercentage: number;
  }>({
    motherSolutionVolume: 0,
    chlorinePercentage: 0
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
      chlorinePercentage: 0,
    });
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const {
      motherSolutionVolume,
      chlorinePercentage
    } = formData;

    let motherTankMaximumWeightSolution;
    if (chlorinePercentage != 0) {
      motherTankMaximumWeightSolution =
        (motherSolutionVolume * MOTHER_TANK_MAX_CHLORINATION_CONCENTRATION) /
        (10 * chlorinePercentage);
    } else {
      motherTankMaximumWeightSolution = 0;
    }

    onCalculate(motherTankMaximumWeightSolution);
  };

  const motherSolutionVolumeLabel = `${t('Mother Solution Volume')} (${t('L')})`;
  const chlorinationPercentageLabel = `${t('Chlorine %')}`;

  return (
    <form className="form" onSubmit={handleSubmit}>
      <Input
        label={motherSolutionVolumeLabel}
        name="motherSolutionVolume"
        min="0.01"
        handleChange={handleChange}
      ></Input>
      <Input
        label={chlorinationPercentageLabel}
        name="chlorinePercentage"
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
