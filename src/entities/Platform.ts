export class Platform {

    //Atributos de la plataforma: ID, nombre y estado(ocupada o no ocupada).
    private readonly id: number;
    private readonly name: string;
    private occupied: boolean;

    //Constructor de la clase Platform, que inicializa los atributos de la plataforma.
    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
        this.occupied = false;
    }

    //---------- Getters ----------
    public getId(): number {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public isOccupied(): boolean {
        return this.occupied;
    }

    public occupy(): void {
        this.occupied = true;
    }

    public release(): void {
        this.occupied = false;
    }

}