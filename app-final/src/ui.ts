import { Tablero } from "./model";
import {
  crearTableroInicial,
  esPartidaCompleta,
  esPartidaNoIniciada,
  tablero,
} from "./motor";
import {
  sePuedeVoltearLaCarta,
  voltearLaCarta,
  sonPareja,
  parejaNoEncontrada,
  esGanada,
  parejaEncontrada,
  barajarCartas,
  encontrarCartaPorPosicionArray,
  resetearIntentos,
  reiniciarCartas,
  sonCeroCartasLevantadas,
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
    reiniciarDisplayCarta(indice);
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

const volteaParejaNoEncontrada = (tablero: Tablero) => {
  setTimeout(() => {
    gestionarParejaNoEncontrada(tablero);
  }, 300);
};

const gestionarEmparejamiento = (tablero: Tablero) => {
  const indiceA = tablero.indiceCartaVolteadaA;
  const indiceB = tablero.indiceCartaVolteadaB;
  if (indiceA !== undefined && indiceB !== undefined) {
    sonPareja(indiceA, indiceB, tablero)
      ? gestionarSonPareja(tablero, indiceA, indiceB)
      : volteaParejaNoEncontrada(tablero);
  }
};

const gestionarSonPareja = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
) => {
  parejaEncontrada(tablero, indiceA, indiceB),
    esGanada(tablero),
    finalizarPartida(tablero);
};

const gestionarParejaNoEncontrada = (tablero: Tablero) => {
  const indiceA = tablero.indiceCartaVolteadaA;
  const indiceB = tablero.indiceCartaVolteadaB;
  if (indiceA !== undefined && indiceB !== undefined) {
    parejaNoEncontrada(tablero, indiceA, indiceB);
    sonCeroCartasLevantadas(tablero);
    reiniciarDisplayCarta(indiceA);
    reiniciarDisplayCarta(indiceB);
  }
};

export const clickDivCarta = (tablero: Tablero) => {
  for (let indice = 0; indice < tablero.cartas.length; indice++) {
    const divCarta = document.getElementById(`tablero-elemento-${indice}`);

    if (divCarta && divCarta instanceof HTMLElement) {
      divCarta.addEventListener("click", () => {
        if (tablero.estadoPartida !== "PartidaNoIniciada") {
          generarEventListener(indice);
        }
      });
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

export const empezarPartida = (tablero: Tablero) => {
  reiniciarPartida(tablero);
  sonCeroCartasLevantadas(tablero);
};

export const cargarJuego = (tablero: Tablero): void => {
  crearTableroInicial();
  barajarCartas(tablero);
  clickDivCarta(tablero);
};

const reiniciarPartida = (tablero: Tablero) => {
  eliminaMensaje();
  reiniciarCartas(tablero);
  resetearIntentos(tablero);
  reiniciarDisplayTablero();
  esPartidaNoIniciada(tablero);
  barajarCartas(tablero);
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
    tablero.estadoPartida = "PartidaCompleta";
    const mensaje = document.createElement("div");
    mensaje.innerText = `¡Felicidades! La partida fue completada en ${tablero.intentos} intentos`;
    mensaje.classList.add("mensaje-completo");

    const contenedor = document.getElementById("app");
    if (contenedor && contenedor instanceof HTMLElement) {
      contenedor.appendChild(mensaje);
    }
  }
};
