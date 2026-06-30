export class Platform {

    private readonly id: number;
    private readonly name: string;
    private occupied: boolean;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
        this.occupied = false;
    }

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