export const SimulationState = {
    STOPPED: "STOPPED",
    RUNNING: "RUNNING",
    PAUSED: "PAUSED",
} as const;

export type SimulationState = typeof SimulationState[keyof typeof SimulationState];