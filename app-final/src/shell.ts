import { tablero } from "./model";
import { empezarPartida } from "./ui";

const botonEmpezarPartida = document.getElementById("empezar-partida");

if (botonEmpezarPartida && botonEmpezarPartida instanceof HTMLButtonElement) {
  botonEmpezarPartida.addEventListener("click", () => {
    empezarPartida(tablero);
  });
}
