import type { Station } from "../../entities/Station";
import { Track } from "../../entities/Track";
import { Train } from "../../entities/Train";
import { TrainState } from "../../types/TrainState";

export class TrainManager {
	private trains: Train[];
	private tracks: Track[];
	private stations: Station[];

	constructor(trains: Train[] = [], tracks: Track[] = [], stations: Station[] = []) {
		this.trains = [...trains];
		this.tracks = [...tracks];
		this.stations = [...stations];
	}

	public getTrains(): Train[] {
		return [...this.trains];
	}

	public getTracks(): Track[] {
		return [...this.tracks];
	}

	public getStations(): Station[] {
		return [...this.stations];
	}

	public addTrain(train: Train): void {
		this.trains.push(train);
	}

	public addTrack(track: Track): void {
		this.tracks.push(track);
	}

	public addStation(station: Station): void {
		this.stations.push(station);
	}

	public placeTrainAtStation(train: Train, station: Station): void {
		const platform = this.findAvailablePlatform(station);

		train.setCurrentStation(station);
		train.setCurrentTrack(null);
		train.setRemainingDistance(0);

		if (platform === null) {
			train.setCurrentPlatform(null);
			train.setState(TrainState.WAITING_SIGNAL);
			return;
		}

		platform.occupy();
		train.setCurrentPlatform(platform);
		train.setState(TrainState.WAITING_AT_PLATFORM);
	}

	public assignTrainToTrack(train: Train, track: Track, startingStation: Station = track.getOrigin()): void {
		const isStartingAtOrigin = startingStation.getId() === track.getOrigin().getId();
		const isStartingAtDestination = startingStation.getId() === track.getDestination().getId();

		if (!isStartingAtOrigin && !isStartingAtDestination) {
			throw new Error("La estación inicial no pertenece a la vía asignada.");
		}

		if (!this.trains.some((currentTrain) => currentTrain.getId() === train.getId())) {
			this.addTrain(train);
		}

		if (!this.tracks.some((currentTrack) => currentTrack.getId() === track.getId())) {
			this.addTrack(track);
		}

		this.placeTrainAtStation(train, startingStation);
		train.setCurrentTrack(track);
		train.setMovingFromOriginToDestination(isStartingAtOrigin);
	}

	public update(): void {
		for (const train of this.trains) {
			this.updateWaitingTrain(train);
			this.updateMovingTrain(train);
		}
	}

	private updateWaitingTrain(train: Train): void {
		if (train.getState() !== TrainState.WAITING_AT_PLATFORM && train.getState() !== TrainState.READY_TO_DEPART && train.getState() !== TrainState.WAITING_SIGNAL) {
			return;
		}

		const currentStation = train.getCurrentStation();
		const currentTrack = train.getCurrentTrack();

		if (currentStation === null || currentTrack === null) {
			return;
		}

		if (train.getCurrentPlatform() === null) {
			const platform = this.findAvailablePlatform(currentStation);

			if (platform === null) {
				train.setState(TrainState.WAITING_SIGNAL);
				return;
			}

			platform.occupy();
			train.setCurrentPlatform(platform);
			train.setState(TrainState.WAITING_AT_PLATFORM);
		}

		//passengerManager?.disembarkPassengersAtStation(currentStation, train);
		//passengerManager?.boardPassengersAtStation(currentStation, train);
		this.departTrain(train);
	}

	private updateMovingTrain(train: Train): void {
		if (train.getState() !== TrainState.MOVING) {
			return;
		}

		const currentTrack = train.getCurrentTrack();

		if (currentTrack === null) {
			train.setState(TrainState.OUT_OF_SERVICE);
			return;
		}

		const travelSpeed = Math.min(train.getMaxSpeed(), currentTrack.getMaxSpeed());
		train.setRemainingDistance(train.getRemainingDistance() - travelSpeed);

		if (train.getRemainingDistance() > 0) {
			return;
		}

		const nextStation = train.isMovingFromOriginToDestination() ? currentTrack.getDestination() : currentTrack.getOrigin();
		this.arriveTrainAtStation(train, nextStation);
		//passengerManager?.disembarkPassengersAtStation(nextStation, train);
	}

	private departTrain(train: Train): void {
		const currentStation = train.getCurrentStation();
		const currentPlatform = train.getCurrentPlatform();
		const currentTrack = train.getCurrentTrack();

		if (currentStation === null || currentTrack === null) {
			return;
		}

		if (currentPlatform !== null) {
			currentPlatform.release();
		}

		train.startJourney(currentTrack, train.isMovingFromOriginToDestination());
	}

	private arriveTrainAtStation(train: Train, station: Station): void {
		const platform = this.findAvailablePlatform(station);

		if (platform !== null) {
			platform.occupy();
		}

		train.arriveAtStation(station, platform);
		train.setMovingFromOriginToDestination(!train.isMovingFromOriginToDestination());
	}

	private findAvailablePlatform(station: Station) : import("../../entities/Platform").Platform | null {
		for (const platform of station.getPlatforms()) {
			if (!platform.isOccupied()) {
				return platform;
			}
		}

		return null;
	}

}

