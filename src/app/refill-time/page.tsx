var mother_solution_volume = 600 // liters
var drip_rate = 2 // liters/hour

var refill_time = mother_solution_volume / drip_rate

function printRefillTimeInDays() {
    console.log("In days, that is: " + refill_time / 24 + " days");
}

printRefillTimeInDays();

export default function RefillTimeFormula() {
    return (
        <div>
            <h1>Refill Time Formula</h1>
            <p>Refill time is: {refill_time} hours</p>
        </div>
    );
}