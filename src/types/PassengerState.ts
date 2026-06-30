export const PassengerState = {
    NOT_SPAWNED: "NOT_SPAWNED",
    WAITING_AT_ORIGIN: "WAITING_AT_ORIGIN",
    ON_TRAIN: "ON_TRAIN",
    ARRIVED_AT_DESTINATION: "ARRIVED_AT_DESTINATION",
    REMOVED: "REMOVED",
} as const;

export type PassengerState = typeof PassengerState[keyof typeof PassengerState];

/*
NOT_SPAWNED: Este pasajero todavía no ha aparecido en la estación de origen.
WAITING_AT_ORIGIN: Este pasajero está esperando en la estación de origen para abordar un tren.
ON_TRAIN: Este pasajero está actualmente a bordo de un tren en movimiento hacia su destino.
ARRIVED_AT_DESTINATION: Este pasajero ha llegado a su estación de destino y ha desembarcado del tren.
REMOVED: Este pasajero ha sido eliminado del sistema, ya sea porque completó su viaje o por alguna otra razón.
*/