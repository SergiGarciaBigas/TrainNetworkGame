import { RailwayNetwork } from "../engine/core/RailwayNetwork";

import { Station } from "../entities/Station";
import { Platform } from "../entities/Platform";
import { Track } from "../entities/Track";
import { Train } from "../entities/Train";

export class TestScenario {

    public static create(): RailwayNetwork {

        const network = new RailwayNetwork();

        // Estaciones

        const stationA = new Station(
            1,
            "Barcelona",
            { x: 100, y: 100 },
            [
                new Platform(1, "1"),
                new Platform(2, "2")
            ]
        );

        const stationB = new Station(
            2,
            "Sant Feliu de Llobregat",
            { x: 500, y: 100 },
            [
                new Platform(3, "1"),
                new Platform(4, "2")
            ]
        );

        // Vía

        const track = new Track(
            1,
            stationA,
            stationB,
            18000,
            120
        );

        // Tren

        const train = new Train(
            1,
            "R4-001",
            120,
            250
        );

        network.addStation(stationA);
        network.addStation(stationB);

        network.addTrack(track);

        network.addTrain(train);

        return network;

    }

}