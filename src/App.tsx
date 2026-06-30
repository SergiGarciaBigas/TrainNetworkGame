//import { useState } from 'react'
import { useEffect } from "react";
import { Game } from "./engine/core/Game";

function App() {
    useEffect(() => {
        const game = new Game();
        game.start();
    }, []);

    return (
        <h1>Train Network Simulator</h1>
    );
}

export default App;