import { Station } from "../../entities/Station";
import { Track } from "../../entities/Track";
import { Train } from "../../entities/Train";
import { Line } from "../../entities/Line";

export class RailwayNetwork {
    private stations: Station[];
    private tracks: Track[];
    private trains: Train[];
    private lines: Line[];

    constructor() {
        this.stations = [];
        this.tracks = [];
        this.trains = [];
        this.lines = [];
    }

    //Gestión de estaciones
    public addStation(station: Station): void {
        this.stations.push(station);
    }

    public removeStation(stationId: number): void {
        this.stations = this.stations.filter(station => station.getId() !== stationId);
    }

    public getStationById(stationId: number): Station | null {
        for (const station of this.stations) {
            if (station.getId() === stationId) {
                return station;
            }
        }
        return null;
    }

    public getStations(): Station[] {
        return [...this.stations];
    }

    //Gestión de vías
    public addTrack(track: Track): void {
        this.tracks.push(track);
    }

    public removeTrack(trackId: number): void {
        this.tracks = this.tracks.filter(track => track.getId() !== trackId);
    }

    public getTrackById(trackId: number): Track | null {
        for (const track of this.tracks) {
            if (track.getId() === trackId) {
                return track;
            }
        }
        return null;
    }

    public getTracks(): Track[] {
        return [...this.tracks];
    }

    //Gestión de trenes
    public addTrain(train: Train): void {
        this.trains.push(train);
    }

    public removeTrain(trainId: number): void {
        this.trains = this.trains.filter(train => train.getId() !== trainId);
    }

    public getTrainById(trainId: number): Train | null {
        for (const train of this.trains) {
            if (train.getId() === trainId) {
                return train;
            }
        }
        return null;
    }

    public getTrains(): Train[] {
        return [...this.trains];
    }

    //Gestión de líneas
    public addLine(line: Line): void {
        this.lines.push(line);
    }

    public removeLine(lineId: number): void {
        this.lines = this.lines.filter(line => line.getId() !== lineId);
    }

    public getLineById(lineId: number): Line | null {
        for (const line of this.lines) {
            if (line.getId() === lineId) {
                return line;
            }
        }
        return null;
    }

    public getLines(): Line[] {
        return [...this.lines];
    }

    //----------- Métodos extra -----------

    public findStationByName(name: string): Station | null {
        for (const station of this.stations) {
            if (station.getName() === name) {
                return station;
            }
        }
        return null;
    }

    public getConnectedStations(stationId: number): Station[] {
        const connectedStations: Station[] = [];
        const station = this.getStationById(stationId);

        if (station === null) {
            return connectedStations;
        }

        for (const track of this.tracks) {
            if (track.getOrigin().getId() === station.getId()) {
                connectedStations.push(track.getDestination());
            } else if (track.getDestination().getId() === station.getId()) {
                connectedStations.push(track.getOrigin());
            }
        }

        return connectedStations;
    }
}