# Prueba de concepto 5 - Mapear el DIV que contiene la carta con la posición del array de las cartas

> Aquí implementamos la quinta prueba de concepto

Lo que queremos hacer en esta prueba de concepto es mapear el div que contiene la carta con la posición del array de las cartas, es decir, si el usuario pincha en la primera carta, queremos saber que es la primera carta del array de cartas.

- Vamos a crear un array de cartas.
- El array va a tener 2 cartas de cada foto.
- Vamos a crear un div por cada carta.
- A cada div le vamos a poner un atributo con el indice del array de cartas que le corresponde.
- Vamos a escuchar al evento click de los divs.
- Dentro de cada div vamos a tener una imagen, y vamos a cambiar el src de la imagen.
- Para hacer esto dentro de cada imagen vamos a tener un atributo que va a tener el mismo índice que el div que la contiene.
- Cuando el usuario pinche en el primer div, vamos a leer el atributo data-indice-id y vamos a saber que es la primera carta del array de cartas y mostraremos la imagen correspondiente.

Utilizamos _array methods_ para recorrer el arreglo cambiando el _src_ de la imagen, y añadiendo el evento de volteo así como de cambio de fondo del div al div de la carta.
Esta implementación es rudimentaria. Cambiará significativamente en la prueba final.

> Fin de la prueba
