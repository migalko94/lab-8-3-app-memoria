import { Carta, Tablero, crearTableroInicial, finalizarPartida } from "./model";
import {
  sePuedeVoltearLaCarta,
  voltearLaCarta,
  sonPareja,
  parejaNoEncontrada,
  parejaEncontrada,
  barajarCartas,
  encontrarCartaPorId,
} from "./motor";

const reiniciarDisplayCarta = (indice: number): void => {
  const divCarta = document.getElementById(`carta-${indice}`);
  if (divCarta && divCarta instanceof HTMLElement) {
    divCarta.innerHTML = "";
    divCarta.removeAttribute("style");
  }
};

const crearDivCarta = (indice: number): HTMLElement => {
  const divCarta = document.createElement("div");
  divCarta.classList.add("tablero-elemento");
  divCarta.id = `carta-${indice}`;
  return divCarta;
};

export const reiniciarDisplayTablero = (tablero: Tablero): void => {
  const tableroContenedor = document.getElementById("tablero");
  if (tableroContenedor && tableroContenedor instanceof HTMLElement) {
    tableroContenedor.innerHTML = "";
    tablero.cartas.forEach((carta) => {
      const indice = carta.idFoto;
      const divCarta = crearDivCarta(indice);
      tableroContenedor.appendChild(divCarta);
    });
  }

  tablero.estadoPartida = "PartidaNoIniciada";
};

const pintarCarta = (tablero: Tablero, indice: number): void => {
  const cartaAVoltear = encontrarCartaPorId(tablero, indice);
  if (cartaAVoltear) {
    const divCarta = document.getElementById(`carta-${indice}`);
    if (divCarta && divCarta instanceof HTMLElement) {
      const imagen = document.createElement("img");
      imagen.id = `imagen-${indice}`;
      imagen.src = cartaAVoltear.imagen;
      divCarta.appendChild(imagen);
      divCarta.style.backgroundColor = "plum";
    }
  }
};

const gestionarEmparejamiento = (
  tablero: Tablero,
  cartasLevantadas: Carta[]
): void => {
  if (cartasLevantadas.length === 2) {
    tablero.estadoPartida = "DosCartasLevantadas";
    const cartaA = cartasLevantadas[0];
    const cartaB = cartasLevantadas[1];

    if (sonPareja(cartaA.idFoto, cartaB.idFoto, tablero)) {
      parejaEncontrada(tablero, cartaA.idFoto, cartaB.idFoto);
    } else {
      setTimeout(() => {
        parejaNoEncontrada(tablero, cartaA.idFoto, cartaB.idFoto);
        reiniciarDisplayCarta(cartaA.idFoto);
        reiniciarDisplayCarta(cartaB.idFoto);
      }, 500);
    }
  }
};

export const clickDivCarta = (tablero: Tablero) => {
  tablero.cartas.forEach((carta) => {
    const indice = carta.idFoto;
    const divCarta = document.getElementById(`carta-${indice}`);

    if (divCarta && divCarta instanceof HTMLElement) {
      const imagen = document.createElement("img");
      imagen.id = `imagen-${indice}`;
      divCarta.appendChild(imagen);

      divCarta.addEventListener("click", () => {
        if (sePuedeVoltearLaCarta(tablero, indice)) {
          voltearLaCarta(tablero, indice);
          pintarCarta(tablero, indice);
          tablero.estadoPartida = "UnaCartaLevantada";

          const cartasLevantadas = tablero.cartas.filter(
            (carta) => carta.estaVuelta && !carta.encontrada
          );

          gestionarEmparejamiento(tablero, cartasLevantadas);
        }
      });
    }
  });
};

export const pintaMensajeFinPartida = (tablero: Tablero): void => {
  if (tablero.estadoPartida === "PartidaCompleta") {
    finalizarPartida(tablero);
  }
};

export const empezarPartida = (tablero: Tablero): void => {
  const contenedor = document.getElementById("app");
  if (contenedor && contenedor instanceof HTMLElement) {
    const mensaje = contenedor.querySelector(".mensaje-completo");
    if (mensaje) {
      contenedor.removeChild(mensaje);
    }
  }
  tablero = crearTableroInicial();

  reiniciarDisplayTablero(tablero);
  barajarCartas(tablero);
  clickDivCarta(tablero);

  pintaMensajeFinPartida(tablero);
};
