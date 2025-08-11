export interface DripRateData {
    msVolume: number | null,
    refillTime: number | null,
    dripRate: number | null
}

export interface ChlorineWeightData {
    weight: number | null,
    concentration: number | null
}

export interface IngressData {
    flowRate: number | null,
}

export interface MotherSolutionConcentrationData {
    volume: number | null,
    concentration: number | null
}

export interface MotherSolutionTankMaxWeightData {
    weight: number | null,
    concentration: number | null
}

export interface CalculatorFlowSharedStateData {
    msVolume: number | null,
    chlorinePercentage: number | null,
    reservoirIngress: number | null,
    chlorineWeight: number | null,
    desiredDripRate: number | null,
    msConcentration: number | null
    desiredConcentration: number | null
    refillTime : number | null,
    
}