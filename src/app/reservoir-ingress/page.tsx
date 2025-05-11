"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";

import Form from "./components/Form";
import "./styles/Main.css";
import LanguageSelector from "../components/LanguageSelector/LanguageSelector";
import Home from "../components/Home/Home";

const containerSize = 20  // liters

const tryOne = 20 // seconds
const tryTwo = 25
const tryThree = 22

const sum = tryOne + tryTwo + tryThree

const avg = sum / 3

const ingress = containerSize / avg  // liters/second

function printIngressFormula() {
    console.log("The ingress formula is: " + ingress + " liters/second");
}

printIngressFormula()

export default function ReservoirIngressFormula() {
    const { t } = useTranslation();

    const [ingress, setIngress] =
        useState(0);

    const handleCalculate = (calculatedValue: number) => {
        setIngress(calculatedValue);
    };

    return (
        <div className="center">
            <Home></Home>
            <h1 className="page-header">{t('Reservoir Ingress Flow Rate Formula')}</h1>
            <Form onCalculate={handleCalculate}></Form>

            <div className="result-wrapper">
                <h2>{t('The flow rate for the reservoir ingress is')}:</h2>

                <p className="answer">
                    {ingress.toFixed(2)} {t('L')}/{t('s')}
                </p>

            </div>

            <LanguageSelector></LanguageSelector>
        </div>
    );
}
