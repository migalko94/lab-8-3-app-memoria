export interface Carta {
  idFoto: number;
  imagen: string;
  estaVuelta: boolean;
  encontrada: boolean;
}

interface InfoCarta {
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

const crearCartaInicial = (idFoto: number, imagen: string): Carta => ({
  idFoto,
  imagen,
  estaVuelta: false,
  encontrada: false,
});

export const crearColeccionDeCartasInicial = (
  infoCartas: InfoCarta[]
): Carta[] => {
  const coleccionCartasOriginal = infoCartas.map((carta) =>
    crearCartaInicial(carta.idFoto, carta.imagen)
  );
  const copiaColeccionCartas = coleccionCartasOriginal.map((carta) => ({
    ...carta,
    idFoto: carta.idFoto + coleccionCartasOriginal.length,
  }));

  const coleccionCartasFinal = [
    ...coleccionCartasOriginal,
    ...copiaColeccionCartas,
  ];

  return coleccionCartasFinal;
};

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

export const crearTableroInicial = (): Tablero => {
  return {
    cartas: crearColeccionDeCartasInicial(infoCartas),
    estadoPartida: "PartidaNoIniciada",
    indiceCartaVolteadaA: -1,
    indiceCartaVolteadaB: -1,
    intentos: 0,
  };
};

export let tablero: Tablero = crearTableroInicial();

export const finalizarPartida = (tablero: Tablero): void => {
  tablero.estadoPartida = "PartidaCompleta";

  const mensaje = document.createElement("div");
  mensaje.innerText = `¡Felicidades! La partida fue completada en ${tablero.intentos} intentos`;
  mensaje.classList.add("mensaje-completo");

  const contenedor = document.getElementById("app");
  if (contenedor && contenedor instanceof HTMLElement) {
    contenedor.appendChild(mensaje);
  }
};
