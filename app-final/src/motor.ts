import {
  crearCartaInicial,
  infoCartas,
  Carta,
  Tablero,
  InfoCarta,
} from "./model";

const crearColeccionDeCartasInicial = (infoCartas: InfoCarta[]): Carta[] => {
  const coleccionCartasOriginal = infoCartas.map((carta) =>
    crearCartaInicial(carta.idFoto, carta.imagen)
  );
  const copiaColeccionCartas = infoCartas.map((carta) =>
    crearCartaInicial(carta.idFoto, carta.imagen)
  );
  const coleccionCartasFinal = [
    ...coleccionCartasOriginal,
    ...copiaColeccionCartas,
  ];

  return coleccionCartasFinal;
};

export const crearTableroInicial = (): Tablero => {
  return {
    cartas: crearColeccionDeCartasInicial(infoCartas),
    estadoPartida: "PartidaNoIniciada",
    indiceCartaVolteadaA: undefined,
    indiceCartaVolteadaB: undefined,
    intentos: 0,
  };
};

export let tablero: Tablero = crearTableroInicial();

export const barajarCartas = (tablero: Tablero): void => {
  for (let i = tablero.cartas.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));

    let temporal = tablero.cartas[i];
    tablero.cartas[i] = tablero.cartas[j];
    tablero.cartas[j] = temporal;
  }
};

export const encontrarCartaPorPosicionArray = (
  tablero: Tablero,
  indice: number
) => tablero.cartas[indice];

export const obtenerIndiceCarta = (tablero: Tablero, carta: Carta) =>
  tablero.cartas.indexOf(carta);

export const sePuedeVoltearLaCarta = (
  tablero: Tablero,
  indice: number
): boolean =>
  !tablero.cartas[indice].encontrada && !tablero.cartas[indice].estaVuelta;

export const voltearLaCarta = (tablero: Tablero, indice: number): void => {
  const cartaAVoltear = encontrarCartaPorPosicionArray(tablero, indice);
  if (cartaAVoltear) {
    cartaAVoltear.estaVuelta = true;
    tablero.intentos += 0.5;
    if (esUnaCartaLevantada(tablero)) {
      tablero.indiceCartaVolteadaA = indice;
    }
    if (sonDosCartasLevantadas(tablero)) {
      tablero.indiceCartaVolteadaB = indice;
    }
  }
};

export const sonPareja = (
  indiceA: number,
  indiceB: number,
  tablero: Tablero
): boolean => tablero.cartas[indiceA].idFoto === tablero.cartas[indiceB].idFoto;

const marcarCartasEncontradas = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
) => {
  let cartaA = encontrarCartaPorPosicionArray(tablero, indiceA);
  let cartaB = encontrarCartaPorPosicionArray(tablero, indiceB);

  tablero.cartas.map((carta) => {
    carta.idFoto === cartaA.idFoto ? (cartaA.encontrada = true) : null;
    carta.idFoto === cartaB.idFoto ? (cartaB.encontrada = true) : null;
  });
};

const restaurarIndicesTablero = (tablero: Tablero) => {
  tablero.indiceCartaVolteadaA = undefined;
  tablero.indiceCartaVolteadaB = undefined;
};

export const parejaNoEncontrada = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
) => {
  marcarCartasNoEncontradas(tablero, indiceA, indiceB);
  restaurarIndicesTablero(tablero);
};

const marcarCartasNoEncontradas = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
) => {
  let cartaA = encontrarCartaPorPosicionArray(tablero, indiceA);
  let cartaB = encontrarCartaPorPosicionArray(tablero, indiceB);

  tablero.cartas.map((carta) => {
    carta.idFoto !== cartaA.idFoto ? (cartaA.encontrada = false) : null;
    carta.idFoto !== cartaB.idFoto ? (cartaB.encontrada = false) : null;
  });
};

export const parejaEncontrada = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
): void => {
  reinicioVolteo(tablero);
  marcarCartasEncontradas(tablero, indiceA, indiceB);
  restaurarIndicesTablero(tablero);
};

export const esGanada = (tablero: Tablero) =>
  (tablero.estadoPartida = esPartidaCompleta(tablero)
    ? "PartidaCompleta"
    : "CeroCartasLevantadas");

export const esPartidaCompleta = (tablero: Tablero): boolean => {
  const partidaCompletada = tablero.cartas.every(
    (carta) => carta.encontrada === true
  );
  if (partidaCompletada) {
    tablero.estadoPartida = "PartidaCompleta";
  }
  return partidaCompletada;
};

export const esPartidaNoIniciada = (tablero: Tablero) =>
  (tablero.estadoPartida = "PartidaNoIniciada");

const obtenerCartasLevantadas = (tablero: Tablero) =>
  tablero.cartas.filter((carta) => carta.estaVuelta && !carta.encontrada);

const esUnaCartaLevantada = (tablero: Tablero): boolean => {
  const cartasLevantadas = obtenerCartasLevantadas(tablero);
  return cartasLevantadas.length === 1;
};

const sonDosCartasLevantadas = (tablero: Tablero): boolean => {
  const cartasLevantadas = obtenerCartasLevantadas(tablero);
  return cartasLevantadas.length === 2;
};

export const reinicioVolteo = (tablero: Tablero): void => {
  tablero.cartas.forEach((carta) => {
    carta.estaVuelta = false;
  });
};

export const resetearIntentos = (tablero: Tablero) => (tablero.intentos = 0);

export const reiniciarCartas = (tablero: Tablero): void => {
  tablero.cartas.forEach((carta) => {
    carta.estaVuelta = false;
    carta.encontrada = false;
  });
};
