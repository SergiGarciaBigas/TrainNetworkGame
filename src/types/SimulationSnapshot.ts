export interface SimulationSnapshot {
    time: string;
    state: string;
    stations: number;
    tracks: number;
    trains: number;
    events: string[];
}