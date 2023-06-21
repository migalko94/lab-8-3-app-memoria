import "./style.css";

const coleccionAnimales: string[] = [
  "1 - 🐸",
  "2 - 🐔",
  "3 - 🦊",
  "4 - 🐥",
  "5 - 🐰",
  "6 - 🐷",
  "7 - 🐮",
  "8 - 🦁",
  "9 - 🐻",
  "10 - 🐨",
  "11 - 🐯",
  "12 - 🐿️",
];

console.log(coleccionAnimales);

function barajar<T>(miArray: T[]) {
  for (let i = miArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));

    let temporal = miArray[i];
    miArray[i] = miArray[j];
    miArray[j] = temporal;
  }

  return miArray;
}

const coleccionBarajada = [...coleccionAnimales];

barajar<string>(coleccionBarajada);
console.log(coleccionBarajada);
