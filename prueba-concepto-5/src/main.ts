import "./style.css";

interface InfoCarta {
  idFoto: number;
  imagen: string;
}

const coleccionCartas: InfoCarta[] = [
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
  {
    idFoto: 7,
    imagen: "animales/1.png",
  },
  {
    idFoto: 8,
    imagen: "animales/2.png",
  },
  {
    idFoto: 9,
    imagen: "animales/3.png",
  },

  {
    idFoto: 10,
    imagen: "animales/4.png",
  },
  {
    idFoto: 11,
    imagen: "animales/5.png",
  },
  {
    idFoto: 12,
    imagen: "animales/6.png",
  },
];

const voltearLaCarta = (coleccionCartas: InfoCarta[], indice: number): void => {
  const cartaAVoltear = coleccionCartas.find(
    (carta: InfoCarta) => carta.idFoto === indice
  );
  if (cartaAVoltear) {
    const imagen = document.getElementById(`imagen-${indice}`);

    if (imagen && imagen instanceof HTMLImageElement) {
      imagen.src = cartaAVoltear.imagen;
    }
  }
};

const clickDivCarta = () => {
  coleccionCartas.forEach((carta) => {
    const indice = carta.idFoto;
    const divCarta = document.getElementById(`${indice}`);
    if (divCarta && divCarta instanceof HTMLElement) {
      divCarta.addEventListener("click", () =>
        voltearLaCarta(coleccionCartas, indice)
      );
      divCarta.addEventListener(
        "click",
        () => (divCarta.style.backgroundColor = "violet")
      );
    }
  });
};

clickDivCarta();
