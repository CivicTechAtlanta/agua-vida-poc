var motherSolution = 600  // liters
var waterIngress = 20  // liters/second
var desiredConcentration = 1  // miligrams/liter
var dripRate = 2  // liters/hour
var chlorinePercentage = .7 // 70%

var chlorineWeight = .36 * ((motherSolution * waterIngress * desiredConcentration) / (dripRate * chlorinePercentage))

function printChlorineFormula() {    
    console.log("The weight of chlorine needed is: " + chlorineWeight + " grams");
}

printChlorineFormula()  // The weight of chlorine needed is: 0.6 grams


export default function ChlorineWeightFormula() {
    return (
        <div>
            <h1>Chlorine Weight Formula</h1>
            <p>The weight of chlorine needed is: {chlorineWeight} grams</p>
        </div>
    );
}   