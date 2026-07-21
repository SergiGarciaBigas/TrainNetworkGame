import type { Position } from "../types/Position";
import { Platform } from "./Platform.ts";
export class Station {
    private readonly id: number;
    private readonly name: string;
    private readonly position: Position;
    private readonly platforms: Platform[];

    constructor(id: number, name: string, position: Position, platforms: Platform[]) {
        this.id = id;
        this.name = name;
        this.position = position;
        this.platforms = platforms;
    }

    //---------- Getters ----------
    public getId(): number {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getPosition(): Position {
        return this.position;
    }

    public getPlatforms(): Platform[] {
        return [...this.platforms];
    }

    public getNumOfPlatforms(): number {
        return this.platforms.length;
    }

    public getAvailablePlatform(): Platform | null {
        for (const platform of this.platforms) {
            if (!platform.isOccupied()) {
                platform.getId();
            }
        }

        return null;
    } 
    
    public hasAvailablePlatform(): boolean {
        return this.getAvailablePlatform() !== null;
    }
    
}