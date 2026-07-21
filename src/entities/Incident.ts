import { IncidentType } from "../types/IncidentType";
export class Incident {

    //Atributos del incidente: ID, descripción y nivel de gravedad.
    private readonly id: number;
    private readonly description: string;
    private readonly type: IncidentType;

    //Constructor de la clase Incident, que inicializa los atributos del incidente.
    constructor(id: number, description: string, type: IncidentType) {
        this.id = id;
        this.description = description;
        this.type = type;
    }

    //---------- Getters ----------
    public getId(): number {
        return this.id;
    }

    public getDescription(): string {
        return this.description;
    }

    public getType(): IncidentType {
        return this.type;
    }

    //No ponemos Setters ya que los atributos del incidente son de solo lectura y no se pueden modificar una vez creados.

}