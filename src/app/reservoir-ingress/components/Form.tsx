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
    containerSize: number;
    tryOne: number;
    tryTwo: number;
    tryThree: number;
  }>({
    containerSize: 0,
    tryOne: 0,
    tryTwo: 0,
    tryThree: 0,
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
      containerSize: 0,
      tryOne: 0,
      tryTwo: 0,
      tryThree: 0,
    });
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const {
      containerSize,
      tryOne,
      tryTwo,
      tryThree,
    } = formData;

    const sum = tryOne + tryTwo + tryThree;
    const avg = sum / 3;

    let ingress;
    if (avg != 0) {
      ingress = containerSize / avg;
    } else {
      ingress = 0;
    }

    onCalculate(ingress);
  };

  const containerSizeLabel = `${t('Container Size')} (${t('L')})`;
  const tryOneLabel = `${t('Try One')} (${t('s')})`;
  const tryTwoLabel = `${t('Try Two')} (${t('s')})`;
  const tryThreeLabel = `${t('Try Three')} (${t('s')})`;

  return (
    <form className="form" onSubmit={handleSubmit}>
      <Input
        label={containerSizeLabel}
        name="containerSize"
        min="0.01"
        handleChange={handleChange}
      />
      <Input
        label={tryOneLabel}
        name="tryOne"
        min="0"
        handleChange={handleChange}
      />
      <Input
        label={tryTwoLabel}
        name="tryTwo"
        min="0"
        handleChange={handleChange}
      />
      <Input
        label={tryThreeLabel}
        name="tryThree"
        min="0"
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
