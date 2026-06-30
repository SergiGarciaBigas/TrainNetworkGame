export class Incident {
    private readonly id: number;
    private readonly description: string;
    private readonly severity: number;
    constructor(id: number, description: string, severity: number) {
        this.id = id;
        this.description = description;
        this.severity = severity;
    }

    public getId(): number {
        return this.id;
    }

    public getDescription(): string {
        return this.description;
    }

    public getSeverity(): number {
        return this.severity;
    }

}