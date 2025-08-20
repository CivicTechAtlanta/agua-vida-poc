"use client";

import React, { useState } from "react";
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
import { toSig2Number } from "@/app/utils/format";
import { useRouter } from "next/navigation";

type CalculatorFlowStep = 1 | 2 | 3 | 4 | 5;

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
  const router = useRouter();

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
    reservoirIngress: null,
    desiredConcentration: null,
    refillTime : null
  });

  // Popup state for config name/description
  const [showSavePopup, setShowSavePopup] = useState(false);
  const [configName, setConfigName] = useState("");
  const [configDescription, setConfigDescription] = useState("");

  // Render the appropriate step component explicitly to keep prop types correct

  const handleCalculateIngress = (calculatedValue: number) => {
      setCalculatorFlowStageData((prevData) => ({
          ...prevData,
          ingressData: {
              ...prevData.ingressData,
              flowRate: calculatedValue
          }
      }));
      setSharedState((prevState) => ({
          ...prevState,
          reservoirIngress: toSig2Number(calculatedValue)
      }));
  };

  const handleCalculateChlorineWeight = (calculatedValue: { chlorineWeight: number; desiredConcentration: number }) => {
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
          chlorineWeight: toSig2Number(calculatedValue.chlorineWeight),
          desiredConcentration: toSig2Number(calculatedValue.desiredConcentration)
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
          msConcentration: toSig2Number(calculatedValue)
      }));
      // Update shared state with the calculated value
  };

  const handleCalculateMotherTankMaxWeight = (calculatedValue: { msVolume: number; chlorinePercentage: number; msMaximumWeight: number }) => {
      setCalculatorFlowStageData((prevData) => ({
          ...prevData,
          motherSolutionTankMaxWeightData: {
              ...prevData.motherSolutionTankMaxWeightData,
              weight: calculatedValue.msMaximumWeight
          }
      }));
      setSharedState((prevState) => ({
          ...prevState,
          msVolume: toSig2Number(calculatedValue.msVolume),
          chlorinePercentage: toSig2Number(calculatedValue.chlorinePercentage)
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
          msVolume: toSig2Number(data.msVolume),
          desiredDripRate: toSig2Number(data.dripRate),
          refillTime: toSig2Number(data.refillTime)
      }));
  };

  // no helper; handlers are passed explicitly by step

  function uuidv4() {
    // https://stackoverflow.com/a/2117523/65387
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  const saveSharedState = () => {
    try {
      const now = new Date();
      const datetime = now.toISOString();
      const uuid = uuidv4();
      const key = `config.${datetime}.${uuid}`;
      const entry = {
        chlorinationConfigName: configName || null,
        chlorinationConfigDescription: configDescription || null,
        chlorinationConfigTimeCreated: datetime,
        ...sharedState,
      };
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(entry));
      }
      setShowSavePopup(false);
      setConfigName("");
      setConfigDescription("");
      router.push("/configurations");
    } catch (err) {
      console.error('Failed to save shared state', err);
    }
  };

  return (
    <div className="center">
      <Home/>
      <h1 className="page-header">{`${t('Step')} ${calculatorFlowStageData.step}`}</h1>
      {calculatorFlowStageData.step === 1 && (
        <DripRateFormula onCalculate={handleDripRateData} sharedState={sharedState} />
      )}
      {calculatorFlowStageData.step === 2 && (
        <ReservoirIngressFormula onCalculate={handleCalculateIngress} sharedState={sharedState} />
      )}
      {calculatorFlowStageData.step === 3 && (
        <MotherTankMaxWeightFormula onCalculate={handleCalculateMotherTankMaxWeight} sharedState={sharedState} />
      )}
      {calculatorFlowStageData.step === 4 && (
        <ChlorineWeightFormula onCalculate={handleCalculateChlorineWeight} sharedState={sharedState} />
      )}
      {calculatorFlowStageData.step === 5 && (
        <MotherSolutionConcentrationFormula onCalculate={handleCalculateMotherSolutionConcentration} sharedState={sharedState} />
      )}
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
        {calculatorFlowStageData.step < 5 ? (
          <button 
            onClick={() => setCalculatorFlowStageData(prev => ({
              ...prev, 
              step: prev.step < 5 ? (prev.step + 1) as CalculatorFlowStep : prev.step
            }))}
            className="nav-button next-button"
          >
            {t('Continue')}
          </button>
        ) : (
          <button 
            onClick={() => setShowSavePopup(true)}
            className="nav-button next-button"
          >
            {t('Save')}
          </button>
        )}
      </div>
      {showSavePopup && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: '#fff',
            color: '#222',
            borderRadius: 8,
            padding: 32,
            minWidth: 320,
            boxShadow: '0 2px 16px rgba(0,0,0,0.2)',
            display: 'flex',
            flexDirection: 'column',
            gap: 16
          }}>
            <h2 style={{margin:0}}>{t('Save Configuration')}</h2>
            <label style={{display:'flex',flexDirection:'column',gap:4}}>
              <span>{t('Configuration Name')}</span>
              <input
                value={configName}
                onChange={e => setConfigName(e.target.value)}
                style={{padding:8,borderRadius:4,border:'1px solid #ccc'}}
                placeholder={t('Enter a name')}
                autoFocus
              />
            </label>
            <label style={{display:'flex',flexDirection:'column',gap:4}}>
              <span>{t('Description')}</span>
              <textarea
                value={configDescription}
                onChange={e => setConfigDescription(e.target.value)}
                style={{padding:8,borderRadius:4,border:'1px solid #ccc',minHeight:60}}
                placeholder={t('Enter a description')}
              />
            </label>
            <div style={{display:'flex',gap:12,justifyContent:'flex-end'}}>
              <button onClick={() => setShowSavePopup(false)} style={{padding:'8px 16px'}}>{t('configurations.cancel')}</button>
              <button onClick={saveSharedState} style={{padding:'8px 16px',background:'#288DCE',color:'#fff',border:'none',borderRadius:4}}>{t('configurations.save')}</button>
            </div>
          </div>
        </div>
      )}
      <LanguageSelector/>
    </div>
  );
}
