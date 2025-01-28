'use client';

import React, { useState } from 'react';
import './ChlorineWeightFormula.css';

// var motherSolution = 600  // liters
// var waterIngress = 20  // liters/second
// var desiredConcentration = 1  // miligrams/liter
// var dripRate = 2  // liters/hour
// var chlorinePercentage = .7 // 70%




export default function ChlorineWeightFormula() {
    //Set initial values for variables
    const [motherSolution, setMotherSolution] = useState("600");  // liters
    const [waterIngress, setWaterIngress] = useState("20");  // liters/second
    const [desiredConcentration, setDesiredConcentration] = useState("1");  // miligrams/liter
    const [dripRate, setDripRate] = useState("2");  // liters/hour
    const [chlorinePercentage, setChlorinePercentage] = useState("0.7"); // 70%
    const [showText, setShowText] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');


    //Calculate the weight of chlorine needed
    var chlorineWeight = .36 * ((Number(motherSolution) * Number(waterIngress) * Number(desiredConcentration)) / (Number(dripRate) * Number(chlorinePercentage)))

    function printChlorineFormula() {    
        console.log("The weight of chlorine needed is: " + chlorineWeight + " grams");
    }
    printChlorineFormula()  // The weight of chlorine needed is: 0.6 grams

    const handleClick = () => {
        if (
            motherSolution === '' ||
            waterIngress === '' ||
            desiredConcentration === '' ||
            dripRate === '' ||
            chlorinePercentage === ''
        ) {
            setErrorMessage('Please fill all inputs');
            setShowText(false);
        } else {
            setErrorMessage('');
            setShowText(true);
        }
    };

    const handleClear = () => {
        setMotherSolution('');
        setWaterIngress('');
        setDesiredConcentration('');
        setDripRate('');
        setChlorinePercentage('');;
        setShowText(false);
        setErrorMessage('')
    };
    return (
        <div className="center">
            <h1>Chlorine Weight Formula</h1>
            <div>
                <label>
                    Mother Solution (liters):
                    <input type="number" value={motherSolution} onChange={(e) => setMotherSolution(e.target.value)} />
                </label>
            </div>
            <div>
                <label>
                    Water Ingress (liters/second):
                    <input type="number" value={waterIngress} onChange={(e) => setWaterIngress(e.target.value)} />
                </label>
            </div>
            <div>
                <label>
                    Desired Concentration (miligrams/liter):
                    <input type="number" value={desiredConcentration} onChange={(e) => setDesiredConcentration(e.target.value)} />
                </label>
            </div>
            <div>
                <label>
                    Drip Rate (liters/hour):
                    <input type="number" value={dripRate} onChange={(e) => setDripRate(e.target.value)} />
                </label>
            </div>
            <div>
                <label>
                    Chlorine Percentage:
                    <input type="number" step="0.01" value={chlorinePercentage} onChange={(e) => setChlorinePercentage(e.target.value)} />
                </label>
            </div>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {showText ? (
                <p>The weight of chlorine needed is: {chlorineWeight} grams</p>
            ) : (
                <button onClick={handleClick}>Show Chlorine Weight</button>
            )}
                <button onClick={handleClear}>Clear</button>

        </div>
    );
}