"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";

import Input from "./Input";
import "../styles/Form.css";

import {
  CalculatorFlowSharedStateData
} from "../../calculator-flow/components/Interfaces";

type FormProps = {
  onCalculate: (calculatedValue: object) => void;
  sharedState: CalculatorFlowSharedStateData;
};

export const MOTHER_TANK_MAX_CHLORINATION_CONCENTRATION = 5000;

export default function Form({ onCalculate, sharedState }: FormProps) {
  const { t } = useTranslation();

  const [formData, setFormData] = useState<{
    motherSolutionVolume: number;
    chlorinePercentage: number;
  }>({
    motherSolutionVolume: sharedState.msVolume || 0,
    chlorinePercentage: sharedState.chlorinePercentage || 0
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
  };

  const clear = () => {
    onCalculate({
      msMaximumWeight: 0,
      chlorinePercentage: 0
    });
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

    // Interpret chlorine percentage as a whole number (e.g., 70 => 0.70)
    const chlorinePct = (chlorinePercentage || 0) / 100;

    let motherTankMaximumWeightSolution;
    if (chlorinePct != 0) {
      motherTankMaximumWeightSolution =
        (motherSolutionVolume * MOTHER_TANK_MAX_CHLORINATION_CONCENTRATION) /
        (10 * chlorinePct);
    } else {
      motherTankMaximumWeightSolution = 0;
    }

    onCalculate({
      msMaximumWeight : motherTankMaximumWeightSolution,
      chlorinePercentage: chlorinePercentage,
      msVolume : motherSolutionVolume
    });
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
        defaultValue={formData.motherSolutionVolume.toString()}
      />
      <Input
        label={chlorinationPercentageLabel}
        name="chlorinePercentage"
        min="0"
  defaultValue={formData.chlorinePercentage.toString()}
        handleChange={handleChange}
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
