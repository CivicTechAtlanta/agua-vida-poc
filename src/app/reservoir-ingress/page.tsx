var containerSize = 20  // liters

var tryOne = 20 // seconds
var tryTwo = 25
var tryThree = 22

var sum = tryOne + tryTwo + tryThree

var avg = sum / 3

var ingress = containerSize / avg  // liters/second

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