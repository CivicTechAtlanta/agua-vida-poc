"use client";

import { useState } from "react";
import Form from "./components/Form";
import "./styles/Main.css";
import Link from "next/link";

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
    const [ingress, setIngress] =
        useState(0);

    const handleCalculate = (calculatedValue: number) => {
        setIngress(calculatedValue);
    };

    return (
        <div className="page">
            <div className="main-content-wrapper">
                <div className="main-content">
                    <div className="header-wrapper">
                        <h1 className="page-header">
                            Reservoir Ingress Flow Rate Formula
                        </h1>
                    </div>
                    <div className="form-wrapper">
                        <Form onCalculate={handleCalculate}></Form>
                    </div>
                    <div className="result-wrapper">
                        <h2>The flow rate for the reservoir ingress is:</h2>
                        <div className="result-container">
                            <div>
                                <p className="answer">
                                    {ingress.toFixed(2)} L/s
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
