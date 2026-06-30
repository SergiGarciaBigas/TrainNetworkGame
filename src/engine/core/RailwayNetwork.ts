import { Station } from "../../entities/Station";
import { Track } from "../../entities/Track";
import { Train } from "../../entities/Train";

export class RailwayNetwork {
    private stations: Station[];
    private tracks: Track[];
    private trains: Train[];

    constructor() {
        this.stations = [];
        this.tracks = [];
        this.trains = [];
    }

    //Gestión de estaciones
    public addStation(station: Station): void {
        this.stations.push(station);
    }

    public getStations(): Station[] {
        return this.stations;
    }

    //Gestión de vías
    public addTrack(track: Track): void {
        this.tracks.push(track);
    }

    public getTracks(): Track[] {
        return this.tracks;
    }

    //Gestión de trenes
    public addTrain(train: Train): void {
        this.trains.push(train);
    }

    public getTrains(): Train[] {
        return this.trains;
    }

}