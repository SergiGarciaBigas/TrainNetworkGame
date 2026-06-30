import type { Position } from "../types/Position";
import type { Station } from "./Station";
import type { Train } from "./Train";
import { PassengerState } from "../types/PassengerState";
import { randomInt } from "../utils/Random";

export class Passenger {
	private readonly id: number;
	private readonly originStation: Station;
	private readonly destinationStation: Station;
	private readonly spawnHour: number;
	private readonly spawnMinute: number;


	private state: PassengerState;
	private currentStation: Station | null; //Será null si está en un tren.
	private currentTrain: Train | null; //Será null si no está en un tren.
	private position: Position;

	constructor(id: number, originStation: Station, destinationStation: Station, spawnHour: number = randomInt(0, 23), spawnMinute: number = randomInt(1, 60)) {
		this.id = id;
		this.originStation = originStation;
		this.destinationStation = destinationStation;
		this.spawnHour = spawnHour;
		this.spawnMinute = spawnMinute;

		this.state = PassengerState.NOT_SPAWNED;
		this.currentStation = null;
		this.currentTrain = null;
		this.position = { x: 0, y: 0 };
	}

	public getId(): number {
		return this.id;
	}

	public getOriginStation(): Station {
		return this.originStation;
	}

	public getDestinationStation(): Station {
		return this.destinationStation;
	}

	public getSpawnHour(): number {
		return this.spawnHour;
	}

	public getSpawnMinute(): number {
		return this.spawnMinute;
	}

	public getState(): PassengerState {
		return this.state;
	}

	public getCurrentStation(): Station | null {
		return this.currentStation;
	}

	public getCurrentTrain(): Train | null {
		return this.currentTrain;
	}

	public getPosition(): Position {
		return this.position;
	}

	public isWaitingAtOrigin(): boolean {
		return this.state === PassengerState.WAITING_AT_ORIGIN;
	}

	public isNotSpawned(): boolean {
		return this.state === PassengerState.NOT_SPAWNED;
	}

	public isOnTrain(): boolean {
		return this.state === PassengerState.ON_TRAIN;
	}

	public hasArrived(): boolean {
		return this.state === PassengerState.ARRIVED_AT_DESTINATION;
	}

	public isRemoved(): boolean {
		return this.state === PassengerState.REMOVED;
	}

	public setPosition(position: Position): void {
		this.position = { ...position };
	}

	public canSpawnAt(minute: number, hour: number): boolean {
		return minute === this.spawnMinute && hour === this.spawnHour && this.state === PassengerState.NOT_SPAWNED;
	}

	public spawn(): void {
		this.currentStation = this.originStation;
		this.currentTrain = null;
		this.position = { ...this.originStation.getPosition() };
		this.state = PassengerState.WAITING_AT_ORIGIN;
	}

	public boardTrain(train: Train): void {
		this.currentTrain = train;
		this.currentStation = null;
		this.state = PassengerState.ON_TRAIN;
	}

	public arriveAtDestination(): void {
		this.currentTrain = null;
		this.currentStation = this.destinationStation;
		this.position = { ...this.destinationStation.getPosition() };
		this.state = PassengerState.ARRIVED_AT_DESTINATION;
	}

	public remove(): void {
		this.currentTrain = null;
		this.currentStation = null;
		this.state = PassengerState.REMOVED;
	}

}

