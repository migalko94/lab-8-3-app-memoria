import { Tablero } from "./model";
import { esPartidaCompleta, esPartidaNoIniciada, tablero } from "./motor";
import {
  sePuedeVoltearLaCarta,
  voltearLaCarta,
  sonPareja,
  marcarCartasNoEncontradas,
  esGanada,
  parejaEncontrada,
  barajarCartas,
  encontrarCartaPorPosicionArray,
  resetearIntentos,
  reinicioVolteo,
  obtenerIndiceCarta,
  reiniciarCartas,
} from "./motor";

const reiniciarDisplayCarta = (indice: number): void => {
  const divCarta = document.getElementById(`tablero-elemento-${indice}`);
  const imagen = document.querySelector(`img[data-imagen="${indice}"]`);
  if (
    divCarta &&
    divCarta instanceof HTMLElement &&
    imagen &&
    imagen instanceof HTMLImageElement
  ) {
    imagen.src = ".";
    divCarta.removeAttribute("style");
  }
};

export const reiniciarDisplayTablero = (): void => {
  for (let indice = 0; indice < tablero.cartas.length; indice++) {
    const divCarta = document.getElementById(`tablero-elemento-${indice}`);
    const imagen = document.querySelector(`img[data-imagen="${indice}"]`);

    if (
      divCarta &&
      divCarta instanceof HTMLElement &&
      imagen &&
      imagen instanceof HTMLImageElement
    ) {
      imagen.src = ".";
      divCarta.removeAttribute("style");
    }
  }
};

const pintarImagen = (
  tablero: Tablero,
  indice: number,
  imagen: HTMLImageElement
) => {
  const cartaAVoltear = encontrarCartaPorPosicionArray(tablero, indice);
  if (cartaAVoltear) {
    imagen.src = cartaAVoltear.imagen;
  }
};

const pintarCarta = (tablero: Tablero, indice: number): void => {
  const divCarta = document.getElementById(`tablero-elemento-${indice}`);
  const imagen = document.querySelector(`img[data-imagen="${indice}"]`);
  if (divCarta && divCarta instanceof HTMLElement) {
    if (imagen && imagen instanceof HTMLImageElement) {
      pintarImagen(tablero, indice, imagen);
    }

    divCarta.style.backgroundColor = "plum";
  }
};

const gestionarEmparejamiento = (tablero: Tablero) => {
  const cartasLevantadas = obtenerCartasLevantadas(tablero);

  if (cartasLevantadas.length === 2) {
    const cartaA = cartasLevantadas[0];
    const cartaB = cartasLevantadas[1];
    const indiceA = obtenerIndiceCarta(tablero, cartaA);
    const indiceB = obtenerIndiceCarta(tablero, cartaB);

    if (sonPareja(indiceA, indiceB, tablero)) {
      parejaEncontrada(tablero, indiceA, indiceB);
      esGanada(tablero);
      finalizarPartida(tablero);
    } else {
      setTimeout(() => {
        gestionarParejaNoEncontrada(tablero);
      }, 500);
    }
  }
};

const obtenerCartasLevantadas = (tablero: Tablero) => {
  return tablero.cartas.filter(
    (carta) => carta.estaVuelta && !carta.encontrada
  );
};

const gestionarParejaNoEncontrada = (tablero: Tablero) => {
  const cartasLevantadas = obtenerCartasLevantadas(tablero);

  if (cartasLevantadas.length === 2) {
    const cartaA = cartasLevantadas[0];
    const cartaB = cartasLevantadas[1];
    const indiceA = obtenerIndiceCarta(tablero, cartaA);
    const indiceB = obtenerIndiceCarta(tablero, cartaB);
    marcarCartasNoEncontradas(tablero, indiceA, indiceB);

    reinicioVolteo(tablero);

    reiniciarDisplayCarta(indiceA);
    reiniciarDisplayCarta(indiceB);
  }
};

export const clickDivCarta = (tablero: Tablero) => {
  for (let indice = 0; indice < tablero.cartas.length; indice++) {
    const divCarta = document.getElementById(`tablero-elemento-${indice}`);

    if (divCarta && divCarta instanceof HTMLElement) {
      divCarta.addEventListener("click", () => generarEventListener(indice));
    }
  }
};

const generarEventListener = (indice: number) => {
  if (sePuedeVoltearLaCarta(tablero, indice)) {
    voltearLaCarta(tablero, indice);
    pintarCarta(tablero, indice);

    gestionarEmparejamiento(tablero);
  }
};

const eliminaMensaje = () => {
  const contenedor = document.getElementById("app");
  if (contenedor && contenedor instanceof HTMLElement) {
    const mensaje = contenedor.querySelector(".mensaje-completo");
    if (mensaje) {
      contenedor.removeChild(mensaje);
    }
  }
};

export const empezarPartida = (tablero: Tablero): void => {
  if (tablero.estadoPartida === "PartidaCompleta") {
    reiniciarPartida(tablero);
  }
  clickDivCarta(tablero);
};

export const cargarJuego = (tablero: Tablero): void => {
  barajarCartas(tablero);
};

const reiniciarPartida = (tablero: Tablero) => {
  eliminaMensaje();
  reiniciarCartas(tablero);
  resetearIntentos(tablero);
  reiniciarDisplayTablero();
  esPartidaNoIniciada(tablero);

  barajarCartas(tablero);
  clickDivCarta(tablero);
};

const botonEmpezarPartida = document.getElementById("empezar-partida");
if (botonEmpezarPartida && botonEmpezarPartida instanceof HTMLButtonElement) {
  document.addEventListener("DOMContentLoaded", () =>
    botonEmpezarPartida.addEventListener("click", () => empezarPartida(tablero))
  );
}
document.addEventListener("DOMContentLoaded", () => cargarJuego(tablero));

export const finalizarPartida = (tablero: Tablero): void => {
  if (esPartidaCompleta(tablero)) {
    const mensaje = document.createElement("div");
    mensaje.innerText = `¡Felicidades! La partida fue completada en ${tablero.intentos} intentos`;
    mensaje.classList.add("mensaje-completo");

    const contenedor = document.getElementById("app");
    if (contenedor && contenedor instanceof HTMLElement) {
      contenedor.appendChild(mensaje);
    }
  }
};
