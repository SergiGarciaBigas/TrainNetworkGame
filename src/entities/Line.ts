import { Station } from "./Station";
import { Track } from "./Track";
export class Line {
    private readonly id: number
    private readonly name: string
    private readonly stations: Station[]
    private readonly tracks: Track[]

    constructor(id: number, name: string, stations: Station[], tracks: Track[]) {
        this.id = id
        this.name = name
        this.stations = stations
        this.tracks = tracks
    }

    public getId(): number {
        return this.id
    }

    public getName(): string {
        return this.name
    }

    public getStations(): Station[] {
        return [...this.stations];
    }

    public getTracks(): Track[] {
        return [...this.tracks];
    }

    public getNumOfStations(): number {
        return this.stations.length
    }

    public getNumOfTracks(): number {
        return this.tracks.length
    }

    public getStationById(stationId: number): Station | null {
        for (const station of this.stations) {
            if (station.getId() === stationId) {
                return station
            }

        }
        return null
    }

    public getTrackById(trackId: number): Track | null {
        for (const track of this.tracks) {
            if (track.getId() === trackId) {
                return track
            }       
    }
        return null
    }
}