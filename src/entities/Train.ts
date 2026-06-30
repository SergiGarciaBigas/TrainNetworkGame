import { Platform } from "./Platform";
import { Track } from "./Track";
import type { Station } from "./Station";
import type { Passenger } from "./Passenger";
import { TrainState } from "../types/TrainState";

export class Train {

    private readonly id: number;
    private readonly name: string;

    private maxSpeed: number;
    private capacity: number;

    private state: TrainState;

    private currentStation: Station | null;
    private currentPlatform: Platform | null;
    private currentTrack: Track | null;
    private remainingDistance: number;
    private movingFromOriginToDestination: boolean;
    private passengers: Passenger[];

    constructor(
        id: number,
        name: string,
        maxSpeed: number,
        capacity: number
    ) {
        this.id = id;
        this.name = name;
        this.maxSpeed = maxSpeed;
        this.capacity = capacity;

        this.state = TrainState.OUT_OF_SERVICE;

        this.currentStation = null;
        this.currentPlatform = null;
        this.currentTrack = null;
        this.remainingDistance = 0;
        this.movingFromOriginToDestination = true;
        this.passengers = [];
    }

    public getId(): number {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getMaxSpeed(): number {
        return this.maxSpeed;
    }

    public getCapacity(): number {
        return this.capacity;
    }

    public getState(): TrainState {
        return this.state;
    }

    public getCurrentPlatform(): Platform | null {
        return this.currentPlatform;
    }

    public getCurrentTrack(): Track | null {
        return this.currentTrack;
    }

    public getCurrentStation(): Station | null {
        return this.currentStation;
    }

    public getRemainingDistance(): number {
        return this.remainingDistance;
    }

    public isMovingFromOriginToDestination(): boolean {
        return this.movingFromOriginToDestination;
    }

    public getPassengers(): Passenger[] {
        return this.passengers;
    }

    public getPassengerCount(): number {
        return this.passengers.length;
    }

    public getAvailableCapacity(): number {
        return Math.max(0, this.capacity - this.passengers.length);
    }

    public hasAvailableCapacity(): boolean {
        return this.getAvailableCapacity() > 0;
    }

    public setState(state: TrainState): void {
        this.state = state;
    }

    public setCurrentPlatform(platform: Platform | null): void {
        this.currentPlatform = platform;
    }

    public setCurrentTrack(track: Track | null): void {
        this.currentTrack = track;
    }

    public setCurrentStation(station: Station | null): void {
        this.currentStation = station;
    }

    public setRemainingDistance(distance: number): void {
        this.remainingDistance = Math.max(0, distance);
    }

    public setMovingFromOriginToDestination(movingFromOriginToDestination: boolean): void {
        this.movingFromOriginToDestination = movingFromOriginToDestination;
    }

    public addPassenger(passenger: Passenger): void {
        if (!this.hasAvailableCapacity()) {
            throw new Error("El tren no tiene capacidad disponible.");
        }

        this.passengers.push(passenger);
    }

    public removePassenger(passengerId: number): Passenger | null {
        const passengerIndex = this.passengers.findIndex((passenger) => passenger.getId() === passengerId);

        if (passengerIndex === -1) {
            return null;
        }

        const [passenger] = this.passengers.splice(passengerIndex, 1);
        return passenger;
    }

    public clearPassengers(): Passenger[] {
        const passengers = [...this.passengers];
        this.passengers = [];

        return passengers;
    }

    public boardPassenger(passenger: Passenger): void {
        this.addPassenger(passenger);
        passenger.boardTrain(this);
    }

    public disembarkPassenger(passenger: Passenger): void {
        this.removePassenger(passenger.getId());
    }

    public startJourney(track: Track, movingFromOriginToDestination: boolean): void {
        this.currentTrack = track;
        this.currentStation = null;
        this.currentPlatform = null;
        this.remainingDistance = track.getLength();
        this.movingFromOriginToDestination = movingFromOriginToDestination;
        this.state = TrainState.MOVING;
    }

    public arriveAtStation(station: Station, platform: Platform | null): void {
        this.currentStation = station;
        this.currentPlatform = platform;
        this.remainingDistance = 0;
        this.state = TrainState.WAITING_AT_PLATFORM;
    }

    public prepareToDepart(): void {
        this.state = TrainState.READY_TO_DEPART;
    }

    public setOutOfService(): void {
        this.state = TrainState.OUT_OF_SERVICE;
    }

}