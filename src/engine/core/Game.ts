import type { SimulationSnapshot } from "../../types/SimulationSnapshot";
import { SimulationEngine } from "./SimulationEngine";

export class Game {
    private readonly simulation: SimulationEngine;
    
    constructor() { 
        this.simulation = new SimulationEngine();
    }

    public start(): void {
        this.simulation.start();
        setInterval(() => {this.simulation.update();}, 1000);
    }

    public getSimulationSnapshot(): SimulationSnapshot {
        return this.simulation.getSnapshot();
    } 
}
