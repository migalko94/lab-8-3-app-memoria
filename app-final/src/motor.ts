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
) => {
  return tablero.cartas[indice];
};

export const obtenerIndiceCarta = (tablero: Tablero, carta: Carta) => {
  return tablero.cartas.indexOf(carta);
};

const filtrarCartasLevantadas = (cartas: Carta[]): Carta[] => {
  return cartas.filter((carta) => carta.estaVuelta === true);
};

const filtrarCartasNoEncontradas = (cartas: Carta[]): Carta[] => {
  return cartas.filter((carta) => carta.encontrada === false);
};

export const sePuedeVoltearLaCarta = (
  tablero: Tablero,
  indice: number
): boolean => {
  let sePuedeVoltear = false;

  const cartasLevantadas = filtrarCartasLevantadas(tablero.cartas);
  const cartasNoEncontradas = filtrarCartasNoEncontradas(tablero.cartas);

  if (
    !tablero.cartas[indice].encontrada &&
    !tablero.cartas[indice].estaVuelta &&
    cartasLevantadas.length < 2 &&
    cartasNoEncontradas.length > 0
  ) {
    sePuedeVoltear = true;
  }

  return sePuedeVoltear;
};

const sonDosCartasLevantadas = () => {
  const cartasLevantadas = filtrarCartasLevantadas(tablero.cartas);
  if (cartasLevantadas.length === 2) {
    tablero.estadoPartida = "DosCartasLevantadas";
  }
};

const esUnaCartaLevantada = () => {
  const cartasLevantadas = filtrarCartasLevantadas(tablero.cartas);
  if (cartasLevantadas.length === 1) {
    tablero.estadoPartida = "UnaCartaLevantada";
  }
};

esUnaCartaLevantada();

sonDosCartasLevantadas();

export const voltearLaCarta = (tablero: Tablero, indice: number): void => {
  const cartaAVoltear = encontrarCartaPorPosicionArray(tablero, indice);
  if (cartaAVoltear) {
    cartaAVoltear.estaVuelta = true;
    tablero.intentos += 0.5;
  }
};

export const sonPareja = (
  indiceA: number,
  indiceB: number,
  tablero: Tablero
): boolean => {
  return tablero.cartas[indiceA].idFoto === tablero.cartas[indiceB].idFoto;
};

const marcarCartasEncontradas = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
) => {
  let cartaA = encontrarCartaPorPosicionArray(tablero, indiceA);
  let cartaB = encontrarCartaPorPosicionArray(tablero, indiceB);

  tablero.cartas.map((carta) => {
    if (carta.idFoto === cartaA.idFoto) {
      cartaA.encontrada = true;
    }
    if (carta.idFoto === cartaB.idFoto) {
      cartaB.encontrada = true;
    }
  });
};

export const marcarCartasNoEncontradas = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
) => {
  let cartaA = encontrarCartaPorPosicionArray(tablero, indiceA);
  let cartaB = encontrarCartaPorPosicionArray(tablero, indiceB);

  tablero.cartas.map((carta) => {
    if (carta.idFoto !== cartaA.idFoto) {
      cartaA.encontrada = false;
    }
    if (carta.idFoto !== cartaB.idFoto) {
      cartaB.encontrada = false;
    }
  });
};

export const parejaEncontrada = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
): void => {
  reinicioVolteo(tablero);
  marcarCartasEncontradas(tablero, indiceA, indiceB);
};

export const esGanada = (tablero: Tablero) => {
  if (esPartidaCompleta(tablero)) {
    tablero.estadoPartida = "PartidaCompleta";
  } else {
    tablero.estadoPartida = "CeroCartasLevantadas";
  }
};

export const esPartidaCompleta = (tablero: Tablero): boolean => {
  let estaCompleta = false;
  const partidaCompletada = tablero.cartas.every(
    (carta) => carta.encontrada === true
  );
  if (partidaCompletada) {
    estaCompleta = true;
    tablero.estadoPartida = "PartidaCompleta";
  }
  return estaCompleta;
};

export const esPartidaNoIniciada = (tablero: Tablero): void => {
  tablero.estadoPartida = "PartidaNoIniciada";
};

export const reinicioVolteo = (tablero: Tablero): void => {
  tablero.cartas.forEach((carta) => {
    carta.estaVuelta = false;
  });
};

export const resetearIntentos = (tablero: Tablero) => {
  tablero.intentos = 0;
};

export const reiniciarCartas = (tablero: Tablero): void => {
  tablero.cartas.forEach((carta) => {
    carta.estaVuelta = false;
    carta.encontrada = false;
  });
};
