import { useState } from "react"
import { useEffect } from "react";
import { useRef } from "react";
import { Game } from "./engine/core/Game";
import type { SimulationSnapshot } from './types/SimulationSnapshot';
import './App.css';

function App() {
    const [snapshot, setSnapshot] = useState<SimulationSnapshot | null>(null);
    const gameRef = useRef<Game | null>(null);

    useEffect(() => {
        gameRef.current = new Game();
        gameRef.current.start();
        
        const timer = setInterval(() => {
            if (gameRef.current) {
                setSnapshot(gameRef.current.getSimulationSnapshot());
            }
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    
        if (!snapshot) {
            return <h1>Cargando...</h1>;
        } else {

        return (
                <div className="app-shell">
                    <header className="app-header">
                        <h1>Train Network Simulator</h1>
                    </header>

                    <aside className="status-panel" aria-label="Estado de la simulación">
                        <h2>{snapshot.time}</h2>
                        <p>Estado: {snapshot.state}</p>
                        <p>Estaciones: {snapshot.stations}</p>
                        <p>Vías: {snapshot.tracks}</p>
                        <p>Trenes: {snapshot.trains}</p>
                    </aside>

                    <aside className="events-panel" aria-label="Eventos de la simulación">
                        <h3>Eventos</h3>
                        <ul>
                            {snapshot.events.map((event, index) => (
                                <li key={index}>{event}</li>
                            ))}
                        </ul>
                    </aside>

                    <main className="app-main">
                        
                    </main>
                </div>

            );
        }
}

export default App;