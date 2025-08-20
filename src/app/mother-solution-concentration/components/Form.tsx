"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";

import Input from "./Input";
import "../styles/Form.css";

type FormProps = {
  onCalculate: (calculatedValue: number) => void;
  sharedState: {
    msVolume?: number | null;
    chlorineWeight?: number | null;
    msConcentration?: number | null;
    chlorinePercentage?: number | null;
  };
};

export default function Form({ onCalculate, sharedState }: FormProps) {

  const { t } = useTranslation();

  const [formData, setFormData] = useState<{
    motherSolutionVolume: number;
    weightOfChlorine: number;
    chlorinePercentage: number;
  }>({
    motherSolutionVolume: sharedState.msVolume || 0,
    weightOfChlorine: sharedState.chlorineWeight || 0,
    chlorinePercentage: sharedState.chlorinePercentage || 0,
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
      chlorinePercentage: 0,
    });
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const {
      motherSolutionVolume,
      weightOfChlorine,
      chlorinePercentage,
    } = formData;

    let newConcentratedMotherSolution;
    if (motherSolutionVolume != 0) {
      newConcentratedMotherSolution =
        (weightOfChlorine * 1000 * (chlorinePercentage / 100)) /
        motherSolutionVolume;
    } else {
      newConcentratedMotherSolution = 0;
    }

    console.log(newConcentratedMotherSolution)

    onCalculate(newConcentratedMotherSolution);
  };

  const motherSolutionVolumeLabel = `${t('Mother Solution Volume')} (${t('liters')})`;
  const weightOfChlorineLabel = `${t('Weight of Chlorine')} (${t('grams')})`;
  const chlorinePercentageLabel = `${t('Chlorine Percentage')} (%)`;

  return (
    <form className="form" onSubmit={handleSubmit}>
      <Input
        label={motherSolutionVolumeLabel}
        name="motherSolutionVolume"
        min="0.01"
        handleChange={handleChange}
        defaultValue={formData.motherSolutionVolume.toString()}
      />
      <Input
        label={weightOfChlorineLabel}
        name="weightOfChlorine"
        min="0"
        handleChange={handleChange}
        defaultValue={formData.weightOfChlorine.toString()}
      />
      <Input
        label={chlorinePercentageLabel}
        name="chlorinePercentage"
        min="0"
        handleChange={handleChange}
        defaultValue={formData.chlorinePercentage.toString()}
      />
      <button type="reset" className="button" onClick={clear}>
        {t('Clear')}
      </button>
      <button type="submit" className="primary button">
        {t('Submit')}
      </button>
    </form>
  );
}
