var mother_solution_volume = 600 // liters
var weight_of_chlorine = 100 // grams
var desired_reservoir_concentration = 1 // miligrams/liter

var concentration_mother_solution = ( weight_of_chlorine * 10 * desired_reservoir_concentration ) / mother_solution_volume // miligrams/liter

function printMotherSolutionConcentration() {
    console.log("The concentration of the mother solution is: " + concentration_mother_solution + " miligrams/liter");
}

printMotherSolutionConcentration();

export default function MotherSolutionConcentrationFormula() {
    return (
        <div>
            <h1>Mother Solution Concentration Formula</h1>
            <p>The concentration of the mother solution is: {concentration_mother_solution} miligrams/liter</p>
        </div>
    );
}   