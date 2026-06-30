import { Station } from "./Station";
import { Train } from "./Train";

export class Track {
    private readonly id: number;
    private readonly origin: Station;
    private readonly destination: Station;
    private readonly length: number;
    private readonly maxSpeed: number;
    private readonly trains: Train[];

    constructor(id: number, origin: Station, destination: Station, length: number, maxSpeed: number) {
        this.id = id;
        this.origin = origin;
        this.destination = destination;
        this.length = length;
        this.maxSpeed = maxSpeed;
        this.trains = [];
    }

    public getId(): number {
        return this.id;
    }

    public getOrigin(): Station {
        return this.origin;
    }

    public getDestination(): Station {
        return this.destination;
    }

    public getLength(): number {
        return this.length;
    }

    public getMaxSpeed(): number {
        return this.maxSpeed;
    }

    public getTrains(): Train[] {
        return this.trains;
    }

}