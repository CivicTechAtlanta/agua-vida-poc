"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";

import DripRateFormula from "./components/DripRateCalculatorFlow";
import ChlorineWeightFormula from "./components/ChlorineWeightFlow";
import ReservoirIngressFormula from "./components/ReservoirIngressFlow";
import MotherSolutionConcentrationFormula from "./components/MotherSolutionConcentrationFlow";
import MotherTankMaxWeightFormula from "./components/MotherTankMaximumWeightFlow";

import {
  DripRateData,
  IngressData,
  ChlorineWeightData,
  MotherSolutionConcentrationData,
  MotherSolutionTankMaxWeightData,
  CalculatorFlowSharedStateData
} from "./components/Interfaces";

import Home from "./../components/Home/Home";
import LanguageSelector from "../components/LanguageSelector/LanguageSelector";

import "./styles/Main.css";

type CalculatorFlowStep = 1 | 2 | 3 | 4 | 5;

interface StepComponentMap {
  1: typeof DripRateFormula;
  2: typeof ReservoirIngressFormula;
  3: typeof MotherTankMaxWeightFormula;
  4: typeof ChlorineWeightFormula;
  5: typeof MotherSolutionConcentrationFormula;
}

interface CalculatorFlowStageData {
  step: CalculatorFlowStep;
  dripRateData : DripRateData;
  ingressData : IngressData;
  chlorineWeightData : ChlorineWeightData;
  motherSolutionConcentrationData : MotherSolutionConcentrationData;
  motherSolutionTankMaxWeightData : MotherSolutionTankMaxWeightData;
}

export default function CalculatorFlow() {
  const { t } = useTranslation();

  const [calculatorFlowStageData, setCalculatorFlowStageData] = useState<CalculatorFlowStageData>({ 
    step: 1,
    dripRateData: {
      msVolume: null,
      refillTime: null,
      dripRate: null
    },
    ingressData: {
      flowRate: null
    },
    chlorineWeightData: {
      weight: null,
      concentration: null
    },
    motherSolutionConcentrationData: {
      volume: null,
      concentration: null
    },
    motherSolutionTankMaxWeightData: {
      weight: null,
      concentration: null
    }
  });

  const [sharedState, setSharedState] = useState<CalculatorFlowSharedStateData>({
    msVolume: null,
    chlorinePercentage: null,
    chlorineWeight: null,
    desiredDripRate: null,
    msConcentration: null,
    reservoirIngress: null
  });

  const stepComponents: StepComponentMap = {
    1: DripRateFormula,
    2: ReservoirIngressFormula,
    3: MotherTankMaxWeightFormula,
    4: ChlorineWeightFormula,
    5: MotherSolutionConcentrationFormula
  };

  const CurrentComponent = stepComponents[calculatorFlowStageData.step];

  const handleCalculateIngress = (calculatedValue: number) => {
    console.log("Ingress Data Updated:", calculatedValue);
      setCalculatorFlowStageData((prevData) => ({
          ...prevData,
          ingressData: {
              ...prevData.ingressData,
              flowRate: calculatedValue
          }
      }));
      setSharedState((prevState) => ({
          ...prevState,
          reservoirIngress: calculatedValue
      }));
      // Update shared state with the calculated value
      console.log("Ingress Data Updated sharedState:", sharedState);
  };

  const handleCalculateChlorineWeight = (calculatedValue: any) => {
      setCalculatorFlowStageData((prevData) => ({
          ...prevData,
          chlorineWeightData: {
              ...prevData.chlorineWeightData,
              weight: calculatedValue.chlorineWeight,
              concentration: calculatedValue.desiredConcentration
          }
      }));
      setSharedState((prevState) => ({
          ...prevState,
          chlorineWeight: calculatedValue.chlorineWeight,
          desiredConcentration: calculatedValue.desiredConcentration
      }));
      // Update shared state with the calculated value
  };

  const handleCalculateMotherSolutionConcentration = (calculatedValue: number) => {
      setCalculatorFlowStageData((prevData) => ({
          ...prevData,
          motherSolutionConcentrationData: {
              ...prevData.motherSolutionConcentrationData,
              concentration: calculatedValue
          }
      }));
      setSharedState((prevState) => ({
          ...prevState,
          msConcentration: calculatedValue
      }));
      // Update shared state with the calculated value
  };

  const handleCalculateMotherTankMaxWeight = (calculatedValue: any) => {
      setCalculatorFlowStageData((prevData) => ({
          ...prevData,
          motherSolutionTankMaxWeightData: {
              ...prevData.motherSolutionTankMaxWeightData,
              weight: calculatedValue
          }
      }));
      setSharedState((prevState) => ({
          ...prevState,
          msVolume: calculatedValue.msVolume,
          chlorinePercentage: calculatedValue.chlorinePercentage
      }));
  };

  const handleDripRateData = (data: DripRateData) => {
      setCalculatorFlowStageData((prevData) => ({
          ...prevData,
          dripRateData: {
            ...data
          }
      }));
      setSharedState((prevState) => ({
          ...prevState,
          msVolume: data.msVolume,
          desiredDripRate: data.dripRate
      }));
    console.log("Drip Rate Data Updated sharedState:", sharedState);
  };

  const getHandlerForStep = (step: CalculatorFlowStep) => {
    switch (step) {
      case 1:
        return handleDripRateData;
      case 2:
        return handleCalculateIngress;
      case 3:
        return handleCalculateMotherTankMaxWeight;
      case 4:
        return handleCalculateChlorineWeight;
      case 5:
        return handleCalculateMotherSolutionConcentration;
    }
  };

  return (
    <div className="center">
      <Home/>
      <h1 className="page-header">{`${t('Step')} ${calculatorFlowStageData.step}`}</h1>
      <CurrentComponent onCalculate={getHandlerForStep(calculatorFlowStageData.step)} sharedState={sharedState} />
      <div className="navigation-buttons">
        <button 
          onClick={() => setCalculatorFlowStageData(prev => ({
            ...prev, 
            step: prev.step > 1 ? (prev.step - 1) as CalculatorFlowStep : prev.step
          }))}
          disabled={calculatorFlowStageData.step === 1}
          className="nav-button back-button"
        >
          {t('Back')}
        </button>
        <button 
          onClick={() => setCalculatorFlowStageData(prev => ({
            ...prev, 
            step: prev.step < 5 ? (prev.step + 1) as CalculatorFlowStep : prev.step
          }))}
          disabled={calculatorFlowStageData.step === 5}
          className="nav-button next-button"
        >
          {t('Continue')}
        </button>
      </div>
      <LanguageSelector/>
    </div>
  );
}
