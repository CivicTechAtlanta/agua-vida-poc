"use client";
import { useState } from "react";
import Form from "./components/Form";
import "./styles/Main.css";
import Link from "next/link";

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
  const [concentratedMotherSolution, setConcentratedMotherSolution] =
    useState(0);

  const handleCalculate = (calculatedValue: number) => {
    setConcentratedMotherSolution(calculatedValue);
  };

  return (
    <div className="page">
      <div className="main-content-wrapper">
        <div className="main-content">
          <div className="header-wrapper">
            <h1 className="page-header">
              Mother Solution Concentration Formula
            </h1>
          </div>
          <div className="form-wrapper">
            <Form onCalculate={handleCalculate}></Form>
          </div>
          <div className="result-wrapper">
            <h2>The concentration of the mother solution is:</h2>
            <div className="result-container">
              <div>
                <p className="answer">
                  {concentratedMotherSolution.toFixed(2)} mg/L
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="footer">
            <Link href="/">Return to home</Link>
          </div>
      </div>
    </div>
  );
}
