export const TrainState = {
    WAITING_AT_PLATFORM: "WAITING_AT_PLATFORM",
    READY_TO_DEPART: "READY_TO_DEPART",
    MOVING: "MOVING",
    WAITING_SIGNAL: "WAITING_SIGNAL",
    RESTING: "RESTING",
    OUT_OF_SERVICE: "OUT_OF_SERVICE",
} as const;

export type TrainState = typeof TrainState[keyof typeof TrainState];

/*
WAITING_AT_PLATFORM: Este tren está esperando en la plataforma de la estación para poder salir (puede estar recogiendo pasajeros).
READY_TO_DEPART: Este tren está listo para salir de la estación y comenzar/reanudar su viaje.
MOVING: Este tren está actualmente en movimiento a lo largo de la vía.
WAITING_SIGNAL: Este tren está esperando una señal para poder continuar su viaje(posible semáforo en rojo o bloqueo de la vía).
OUT_OF_SERVICE: Este tren no está en servicio y no puede ser utilizado.
RESTING: Este tren está descansando, lo que significa que no está en movimiento ni en servicio, pero tampoco está fuera de servicio(en cochera).
*/