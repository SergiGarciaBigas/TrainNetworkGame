import { useEffect, useRef, useState } from "react";
import { Game } from "./engine/core/Game";
import type { SimulationSnapshot } from "./types/SimulationSnapshot";
import './App.css';

function App() {
    const [snapshot, setSnapshot] = useState<SimulationSnapshot | null>(null);
    const gameRef = useRef<Game | null>(null);

    const syncGameState = () => {
        if (!gameRef.current) {
            return;
        }

        setSnapshot(gameRef.current.getSimulationSnapshot());
    };

    useEffect(() => {
        gameRef.current = new Game();
        gameRef.current.start();
        syncGameState();
        
        const timer = setInterval(() => {
            syncGameState();
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    if (!snapshot) {
        return <h1>Cargando...</h1>;
    }

        return (
            <div className="app-shell">
                <main className="app-main">
                    <section className="status-card" aria-label="Estado de la simulación">
                        <p className="eyebrow">Estado de la simulación</p>
                        <h1>{snapshot.time}</h1>
                        <p className="status-value">{snapshot.state}</p>
                    </section>

                    <section className="messages-panel" aria-label="Mensajes de la simulación">
                        <h2>Mensajes</h2>
                        {snapshot.events.length > 0 ? (
                            <ul>
                                {snapshot.events.map((event, index) => (
                                    <li key={index}>{event}</li>
                                ))}
                            </ul>
                        ) : (
                            <p className="empty-state">No hay eventos por ahora.</p>
                        )}
                    </section>
                </main>
            </div>
        );
}

export default App;