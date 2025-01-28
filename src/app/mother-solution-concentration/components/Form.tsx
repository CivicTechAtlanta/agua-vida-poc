"use client";

import { useState } from "react";
import Input from "./Input";
import "../styles/Form.css";

type FormProps = {
  onCalculate: (calculatedValue: number) => void;
};

export default function Form({ onCalculate }: FormProps) {
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
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const {
      motherSolutionVolume,
      weightOfChlorine,
      desiredReservoirConcentration,
    } = formData;
    const newConcentratedMotherSolution =
      (weightOfChlorine * 10 * desiredReservoirConcentration) /
      motherSolutionVolume;

    onCalculate(newConcentratedMotherSolution);
  };

  const motherSolutionVolumeLabel = "Mother Solution Volume (L)";
  const weightOfChlorineLabel = "Weight of Chlorine (g)";
  const desiredReservoirConcentrationLabel =
    "Desired Reservoir Concentration (mg/L)";

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="input-wrapper">
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
      </div>

      <div className="button-wrapper">
        <button type="reset" className="clear-button" onClick={clear}>
          Clear
        </button>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </div>
    </form>
  );
}
