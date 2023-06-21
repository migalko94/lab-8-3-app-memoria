import "./style.css";

const cambiarCarta = (idCarta: string, srcImagen: string) => {
  let carta = document.getElementById(idCarta);

  if (carta && carta instanceof HTMLImageElement) {
    const cartaVuelta = carta.src;
    carta.src = srcImagen;
    const divImagen = document.getElementById("div-imagen");
    if (divImagen && divImagen instanceof HTMLElement) {
      divImagen.style.backgroundColor = "violet";
    }

    setTimeout(() => {
      if (divImagen && divImagen instanceof HTMLElement) {
        divImagen.style.backgroundColor = "";
      }
      if (carta && carta instanceof HTMLImageElement) {
        carta.src = cartaVuelta;
      }
    }, 900);
  }
};

const divImagen = document.getElementById("div-imagen");

if (divImagen) {
  divImagen.addEventListener("click", () =>
    cambiarCarta("imagen", "animales/3.png")
  );
}
