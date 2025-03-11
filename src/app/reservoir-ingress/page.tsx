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
    return (
        <div>
            <h1>Reservoir Ingress Formula</h1>
            <p>The ingress formula is: {ingress} liters/second</p>
        </div>
    );
}