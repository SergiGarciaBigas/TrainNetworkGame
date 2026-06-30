import { Incident } from "../../entities/Incident";

export class IncidentManager {

    private incidents: Incident[];

    constructor() {
        this.incidents = [];
    }

    public addIncident(incident: Incident): void {
        this.incidents.push(incident);
    }

    public removeIncident(id: number): void {
        this.incidents = this.incidents.filter(
            incident => incident.getId() !== id
        );
    }

    public getIncidents(): Incident[] {
        return [...this.incidents];
    }

    public update(): void {

        // Aquí en el futuro:
        // - generar averías
        // - incendios
        // - retrasos
        // - clima
        // - incidencias de pasajeros
        // - cortes de vía

    }

}
