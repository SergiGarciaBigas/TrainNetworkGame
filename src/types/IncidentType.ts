export const IncidentType = {
    BLACKOUT: "BLACKOUT",
    BROKEN_TRAIN: "BROKEN_TRAIN",
    OBJECT_ON_TRACK: "OBJECT_ON_TRACK",
    USER_ROBBED: "USER_ROBBED",
    PASSENGER_NOT_PAID: "PASSENGER_NOT_PAID",

} as const;

export type IncidentType = typeof IncidentType[keyof typeof IncidentType];

/*
BLACKOUT: Este incidente indica que ha habido un corte de energía en la estación, lo que hará que el tren no pueda salir de la estación y afectará a otros trenes en la red.
BROKEN_TRAIN: Este incidente indica que un tren se ha averiado y no puede continuar su viaje, lo que puede causar retrasos y afectar a otros trenes en la red.
OBJECT_ON_TRACK: Este incidente indica que hay un objeto en la vía del tren, lo que hará que tengamos que mandar un vehículo de rescate.
USER_ROBBED: Este incidente indica que un usuario ha sido robado en la estación, lo que requerirá la intervención de las autoridades.
PASSENGER_NOT_PAID: Este incidente indica que un pasajero no ha pagado su billete, lo que puede afectar los ingresos de la estación y requerirá la intervención del personal de seguridad.
*/