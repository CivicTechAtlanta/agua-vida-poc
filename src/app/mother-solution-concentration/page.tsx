"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";

import Form from "./components/Form";
import Home from "./../components/Home/Home";
import LanguageSelector from "../components/LanguageSelector/LanguageSelector";

import "./styles/Main.css";


const mother_solution_volume = 600; // liters
const weight_of_chlorine = 100; // grams
const desired_reservoir_concentration = 1; // miligrams/liter

const concentration_mother_solution =
  (weight_of_chlorine * 10 * desired_reservoir_concentration) /
  mother_solution_volume; // miligrams/liter

function printMotherSolutionConcentration() {
  console.log(
    "The concentration of the mother solution is: " +
    concentration_mother_solution +
    " milligrams/liter"
  );
}

printMotherSolutionConcentration();

export default function MotherSolutionConcentrationFormula() {
  const { t } = useTranslation();

  const [concentratedMotherSolution, setConcentratedMotherSolution] =
    useState(0);

  const handleCalculate = (calculatedValue: number) => {
    setConcentratedMotherSolution(calculatedValue);
  };

  return (
    <div className="center">
      <Home></Home>
      <h1 className="page-header">{t('Mother Solution Concentration Formula')}</h1>
      <Form onCalculate={handleCalculate}></Form>

      <div className="result-wrapper">
        <h2>{`${t('The concentration of the mother solution is')}:`}</h2>

        <p className="answer">
          {`${concentratedMotherSolution.toFixed(2)} ${t('mg')}/${t('L')}`}
        </p>
      </div>

      <LanguageSelector></LanguageSelector>
    </div>
  );
}
