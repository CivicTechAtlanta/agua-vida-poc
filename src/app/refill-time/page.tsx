"use client";

import { useEffect, useState } from "react";

export default function RefillTimeFormula() {
    const [motherSolutionVolume, setMotherSolutionVolume] = useState<number>(0)
    const [dripRate, setDripRate] = useState<number>(0)
    const [refillTime, setRefillTime] = useState<number>(0)

    useEffect(() => {
        if (dripRate <= 0) {
            setRefillTime(0)
            return;
        }
        setRefillTime(motherSolutionVolume / dripRate)
    }, [motherSolutionVolume, dripRate])

    return (
        <div>
            <h1>Refill Time Formula</h1>
            <div>
                <label>Mother Solution Volume</label>
                <input type="number" value={motherSolutionVolume} onChange={(event) => { setMotherSolutionVolume(Number(event.target.value)) }} />
            </div>
            <div>
                <label>Drip rate</label>
                <input type="number" value={dripRate} onChange={(event) => { setDripRate(Number(event.target.value)) }} />
            </div>
            <p>Refill time is: {refillTime} hours</p>
            <button onClick={() => {
                setMotherSolutionVolume(0)
                setDripRate(0)
            }}>Clear</button>
        </div>
    );
}