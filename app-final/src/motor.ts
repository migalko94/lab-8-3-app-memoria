import { Carta, Tablero, finalizarPartida } from "./model";

export const barajarCartas = (tablero: Tablero): void => {
  for (let i = tablero.cartas.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));

    let temporal = tablero.cartas[i].idFoto;
    tablero.cartas[i].idFoto = tablero.cartas[j].idFoto;
    tablero.cartas[j].idFoto = temporal;
  }
};

export const encontrarCartaPorId = (tablero: Tablero, indice: number) => {
  return tablero.cartas.find((carta) => carta.idFoto === indice);
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

  const carta = encontrarCartaPorId(tablero, indice);
  const cartasLevantadas = filtrarCartasLevantadas(tablero.cartas);
  const cartasNoEncontradas = filtrarCartasNoEncontradas(tablero.cartas);

  if (
    carta &&
    carta.estaVuelta === false &&
    carta.encontrada === false &&
    cartasLevantadas.length < 2 &&
    cartasNoEncontradas.length > 0
  ) {
    sePuedeVoltear = true;
  }

  return sePuedeVoltear;
};

export const voltearLaCarta = (tablero: Tablero, indice: number): void => {
  const cartaAVoltear = encontrarCartaPorId(tablero, indice);
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
  const cartaA = encontrarCartaPorId(tablero, indiceA);
  const cartaB = encontrarCartaPorId(tablero, indiceB);

  if (cartaA && cartaB && cartaA.imagen === cartaB.imagen) {
    return true;
  }

  return false;
};

const marcarCartasEncontradas = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
) => {
  let cartaA = encontrarCartaPorId(tablero, indiceA);
  let cartaB = encontrarCartaPorId(tablero, indiceB);

  if (cartaA) {
    cartaA.encontrada = true;
  }
  if (cartaB) {
    cartaB.encontrada = true;
  }
};

const marcarCartasNoEncontradas = (cartaA: Carta, cartaB: Carta) => {
  cartaA.encontrada = false;
  cartaB.encontrada = false;
};

export const parejaEncontrada = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
): void => {
  marcarCartasEncontradas(tablero, indiceA, indiceB);

  reiniciarCartas(tablero);

  actualizarEstadoPartida(tablero);
};

const actualizarEstadoPartida = (tablero: Tablero) => {
  if (esPartidaCompleta(tablero)) {
    tablero.estadoPartida = "PartidaCompleta";
    finalizarPartida(tablero);
  } else {
    tablero.estadoPartida = "CeroCartasLevantadas";
  }
};

const noSonPareja = (cartaA: Carta, cartaB: Carta): boolean => {
  return cartaA && cartaB && cartaA.idFoto !== cartaB.idFoto;
};

export const parejaNoEncontrada = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
): void => {
  let cartaA = encontrarCartaPorId(tablero, indiceA);
  let cartaB = encontrarCartaPorId(tablero, indiceB);
  if (cartaA && cartaB && noSonPareja(cartaA, cartaB)) {
    marcarCartasNoEncontradas(cartaA, cartaB);

    reiniciarCartas(tablero);
    actualizarEstadoPartida(tablero);
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
    console.log(tablero.estadoPartida);
  }
  return estaCompleta;
};

export const reiniciarCartas = (tablero: Tablero): void => {
  tablero.cartas.forEach((carta) => {
    carta.estaVuelta = false;
  });
};
