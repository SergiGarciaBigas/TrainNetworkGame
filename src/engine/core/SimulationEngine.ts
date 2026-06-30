import { Clock } from './Clock';
import { RailwayNetwork } from "./RailwayNetwork";

import { TestScenario } from "../../services/TestScenario";

import { SimulationState } from "../simulation/SimulationState";
import type { SimulationSnapshot } from "../../types/SimulationSnapshot";

import { EconomyManager } from '../managers/EconomyManager';
import { IncidentManager } from '../managers/IncidentManager';
import { PassengerManager } from '../managers/PassengerManager';
import { TrainManager } from '../managers/TrainManager';

export class SimulationEngine {
    private readonly clock: Clock;
    private readonly network: RailwayNetwork;

    private readonly trainManager: TrainManager;
    private readonly passengerManager: PassengerManager;
    private readonly incidentManager: IncidentManager;
    private readonly economyManager: EconomyManager;

    private state: SimulationState;

    private eventLog: string[];

    constructor() {
        this.clock = new Clock(23, 0, 1);
        //this.network = new RailwayNetwork();
        this.network = TestScenario.create();

        this.trainManager = new TrainManager();
        this.passengerManager = new PassengerManager();
        this.incidentManager = new IncidentManager();
        this.economyManager = new EconomyManager();

        this.state = SimulationState.STOPPED;

        this.eventLog = [];
        this.eventLog.push("Simulación creada");
    }

    public start(): void {
        this.state = SimulationState.RUNNING;
        this.eventLog.push("Simulación iniciada");
    }

    public pause(): void {
        this.state = SimulationState.PAUSED;
    }

    public stop(): void {
        this.state = SimulationState.STOPPED;
    }

    public update(): void {
        if (this.state !== SimulationState.RUNNING) {
            return;
        }

        this.clock.advance_minute();
        this.passengerManager.update(this.clock.getCurrentHour(), this.clock.getMinute());
        this.trainManager.update();
        this.incidentManager.update();
        this.economyManager.update();
        /*
        console.clear();

        console.log("====================================");
        console.log("TRAIN NETWORK SIMULATOR");
        console.log("====================================");

        console.log();

        console.log("Hora:", this.clock.getFormattedTime());
        console.log("Estado:", this.state);

        console.log();

        console.log("Estaciones:", this.network.getStations().length);
        console.log("Vías:", this.network.getTracks().length);
        console.log("Trenes:", this.network.getTrains().length);

        console.log();

        console.log("------------------------------------");
        */
    }

    public getClock(): Clock {
        return this.clock;
    }

    public getNetwork(): RailwayNetwork {
        return this.network;
    }

    public getSnapshot(): SimulationSnapshot {
    return {
        time: this.clock.getFormattedTime(),
        state: this.state,
        stations: this.network.getStations().length,
        tracks: this.network.getTracks().length,
        trains: this.network.getTrains().length,
        events: [...this.eventLog]
    };
    }

}
