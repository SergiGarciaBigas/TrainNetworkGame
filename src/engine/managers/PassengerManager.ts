//import { Clock } from "../core/Clock";
import { Passenger } from "../../entities/Passenger";
import type { Station } from "../../entities/Station";
import type { Train } from "../../entities/Train";
import { randomInt } from "../../utils/Random";

export class PassengerManager {
	private passengers: Passenger[];
	private availableStations: Station[];
	private nextPassengerId: number;

	constructor(stations: Station[] = [], passengers: Passenger[] = []) {
		this.availableStations = [...stations];
		this.passengers = [...passengers];
		this.nextPassengerId = this.passengers.length + 1;
	}

	public getPassengers(): Passenger[] {
		return [...this.passengers];
	}

	public getAvailableStations(): Station[] {
		return [...this.availableStations];
	}

	public setAvailableStations(stations: Station[]): void {
		this.availableStations = [...stations];
	}

	public addAvailableStation(station: Station): void {
		this.availableStations.push(station);
	}

	public addPassenger(passenger: Passenger): void {
		this.passengers.push(passenger);
		this.nextPassengerId = Math.max(this.nextPassengerId, passenger.getId() + 1);
	}

	public createPassenger(originStation: Station, destinationStation: Station, spawnHour: number = randomInt(0, 23), spawnMinute: number = randomInt(0, 59)): Passenger {
		const passenger = new Passenger(this.nextPassengerId, originStation, destinationStation, spawnHour, spawnMinute);
		this.nextPassengerId++;
		this.passengers.push(passenger);

		return passenger;
	}

	public createRandomPassenger(): Passenger | null {
		if (this.availableStations.length < 2) {
			return null;
		}

		const originIndex = randomInt(0, this.availableStations.length - 1);
		let destinationIndex = randomInt(0, this.availableStations.length - 1);

		while (destinationIndex === originIndex) {
			destinationIndex = randomInt(0, this.availableStations.length - 1);
		}

		return this.createPassenger(this.availableStations[originIndex], this.availableStations[destinationIndex]);
	}

	public spawnPassenger(passenger: Passenger): void {
		if (!passenger.isNotSpawned()) {
			return;
		}

		passenger.spawn();
		//economyManager?.registerPassengerAtStation();
	}

	public arrivePassenger(passenger: Passenger): void {
		if (passenger.isRemoved()) {
			return;
		}

		passenger.arriveAtDestination();
		passenger.remove();
	}

	public removePassenger(passenger: Passenger): void {
		passenger.remove();
		this.passengers = this.passengers.filter((currentPassenger) => currentPassenger.getId() !== passenger.getId());
	}

	public getWaitingPassengersAtStation(station: Station): Passenger[] {
		return this.passengers.filter((passenger) => {
			return passenger.isWaitingAtOrigin() && passenger.getOriginStation().getId() === station.getId();
		});
	}

	public boardPassengersAtStation(station: Station, train: Train): Passenger[] {
		const waitingPassengers = this.getWaitingPassengersAtStation(station);
		const boardedPassengers: Passenger[] = [];
		const availableCapacity = train.getAvailableCapacity();

		for (const passenger of waitingPassengers.slice(0, availableCapacity)) {
			train.boardPassenger(passenger);
			boardedPassengers.push(passenger);
		}

		return boardedPassengers;
	}

	public disembarkPassengersAtStation(station: Station, train: Train): Passenger[] {
		const remainingPassengers: Passenger[] = [];
		const disembarkedPassengers: Passenger[] = [];

		for (const passenger of train.getPassengers()) {
			if (passenger.getDestinationStation().getId() === station.getId()) {
				passenger.arriveAtDestination();
				this.removePassenger(passenger);
				disembarkedPassengers.push(passenger);
				continue;
			}

			remainingPassengers.push(passenger);
		}

		train.clearPassengers();

		for (const passenger of remainingPassengers) {
			train.addPassenger(passenger);
		}

		return disembarkedPassengers;
	}

	public update(currentHour: number, currentMinute: number): void {
		const hour = currentHour;
		const minute = currentMinute;

		for (const passenger of this.passengers) {
			if (passenger.canSpawnAt(hour, minute) && passenger.isNotSpawned()) {
				this.spawnPassenger(passenger);
			}
		}
	}

}

