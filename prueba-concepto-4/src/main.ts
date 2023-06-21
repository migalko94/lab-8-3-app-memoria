import "./style.css";

let indiceCartasVolteadas = 0;

const cambiarCarta = (
  idCarta: string,
  srcImagen: string,
  divImagen: HTMLElement
) => {
  let carta = document.getElementById(idCarta);

  if (carta && carta instanceof HTMLImageElement) {
    carta.src = srcImagen;
    if (divImagen && divImagen instanceof HTMLElement) {
      divImagen.style.backgroundColor = "violet";
    }
  }
  indiceCartasVolteadas++;
  if (indiceCartasVolteadas === 2) {
    setTimeout(() => {
      const divImagen1 = document.getElementById("div-imagen-1");
      if (divImagen1 && divImagen1 instanceof HTMLElement) {
        reiniciarCarta("carta-1", divImagen1);
      }
    }, 900);
    setTimeout(() => {
      const divImagen2 = document.getElementById("div-imagen-2");
      if (divImagen2 && divImagen2 instanceof HTMLElement) {
        reiniciarCarta("carta-2", divImagen2);
      }
    }, 900);
    indiceCartasVolteadas = 0;
  }
};

const reiniciarCarta = (idCarta: string, divImagen: HTMLElement) => {
  let carta = document.getElementById(idCarta);

  if (carta && carta instanceof HTMLImageElement) {
    carta.src = "_";
  }

  if (divImagen && divImagen instanceof HTMLElement) {
    divImagen.style.backgroundColor = "";
  }
};

const divImagen1 = document.getElementById("div-imagen-1");

if (divImagen1) {
  divImagen1.addEventListener("click", () =>
    cambiarCarta("carta-1", "animales/3.png", divImagen1)
  );
}

const divImagen2 = document.getElementById("div-imagen-2");

if (divImagen2) {
  divImagen2.addEventListener("click", () =>
    cambiarCarta("carta-2", "animales/1.png", divImagen2)
  );
}
