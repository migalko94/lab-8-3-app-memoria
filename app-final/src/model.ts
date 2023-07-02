export interface Carta {
  idFoto: number;
  imagen: string;
  estaVuelta: boolean;
  encontrada: boolean;
}

export interface InfoCarta {
  idFoto: number;
  imagen: string;
}

export const infoCartas: InfoCarta[] = [
  {
    idFoto: 1,
    imagen: "animales/1.png",
  },
  {
    idFoto: 2,
    imagen: "animales/2.png",
  },
  {
    idFoto: 3,
    imagen: "animales/3.png",
  },

  {
    idFoto: 4,
    imagen: "animales/4.png",
  },
  {
    idFoto: 5,
    imagen: "animales/5.png",
  },
  {
    idFoto: 6,
    imagen: "animales/6.png",
  },
];

export const crearCartaInicial = (idFoto: number, imagen: string): Carta => ({
  idFoto,
  imagen,
  estaVuelta: false,
  encontrada: false,
});

type EstadoPartida =
  | "PartidaNoIniciada"
  | "CeroCartasLevantadas"
  | "UnaCartaLevantada"
  | "DosCartasLevantadas"
  | "PartidaCompleta";

export interface Tablero {
  cartas: Carta[];
  estadoPartida: EstadoPartida;
  indiceCartaVolteadaA?: number;
  indiceCartaVolteadaB?: number;
  intentos: number;
}
