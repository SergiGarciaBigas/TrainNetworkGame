export class Clock {

    //Atributos del reloj: hora actual, minuto actual y velocidad a la que avanza el reloj.
    private currentHour: number;
    private currentMinute: number;
    private speed: number;

    //Constructor del reloj, con hora y minuto por defecto a las 8:00 y velocidad por defecto a 1.
    constructor(hour: number = 8, minute: number = 0, speed: number = 1) {
        this.currentHour = hour;
        this.currentMinute = minute;
        this.speed = speed;
    }

    //---------- Getters ----------
    public getSpeed(): number {
        return this.speed;
    }

    public getCurrentHour(): number {
        return this.currentHour;
    }

    public getMinute(): number {
        return this.currentMinute;
    }

    public getFormattedTime(): string {
        const hour = this.currentHour.toString().padStart(2, "0");
        const minute = this.currentMinute.toString().padStart(2, "0");

        return `${hour}:${minute}`;
    }



    //---------- Setters ----------

    //Hacemos que el reloj se pueda ajustar a una hora concreta.
    public setTime(hour: number, minute: number): void {
        this.currentHour = hour;
        this.currentMinute = minute;
    }

    //Hacemos que se pueda ajustar la velocidad del reloj.
    public setSpeed(speed: number): void {
        if (speed < 1) {
            throw new Error("El clock ha de ser mayor que 0.");
        }

        this.speed = speed;
    }

    //---------- Métodos extra ----------
    
    //Hacemos que el reloj avance en función de la velocidad.
    public advance_minute(): void {
        this.currentMinute += this.speed;

        if (this.currentMinute >= 60) {
            this.currentMinute -= 60;
            this.currentHour++;
            if (this.currentHour >= 24) {
                this.currentHour = 0;
            }
        }
    }

    //Hacemos que el reloj se resetee.
    public reset(hour: number = 8, minute: number = 0): void {
        this.currentHour = hour;
        this.currentMinute = minute;
    }

}