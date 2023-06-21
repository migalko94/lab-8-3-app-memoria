# Implementación

> Aquí describimos resumidamente nuestra implementación del proyecto

## HTML

A diferencia de las pruebas de concepto, en la implementación creamos con _TS_, como en el ejemplo de _MFIX_ del módulo, los elementos del HTML que nos hacen falta. Definimos un botón para empezar la partida. Mantenemos los elementos que nos son precisos para la estructura grid y que haya tablero al cargar la página, aunque no se pueda manipular.

## CSS

Cambiamos los colores. También hemos tenido que reducir la dimensión de las imágenes porque 128 por 128 era mucho y afectaba la visualización en el navegador. Se cambian todas las medidas. Hemos creado animaciones para cuando el usuario pasa el cursor por el _div_. Mantenemos el efecto del cursor ya visible en pruebas de concepto. Efecto _hover_ en el botón para comenzar la partida. Estilado del mensaje final con la puntuación.

## MODELO

Creamos nuestra colección de elementos con id y ruta de imagen. A continuación, la duplicamos: hemos marcado el id de las copias con su referencia más la longitud del _array_ así tenemos los 12 elementos. De la misma forma, estos elementos, también, gracias al _map_, tienen las propiedades de si las cartas están vueltas o encontradas.

En nuestro tablero, además de las propiedades del ejemplo de la práctica, tenemos el número de intentos.
Creamos el tablero inicial y nos aseguramos de que tenga las propiedades marcadas. También nos garantizamos que los índices funcionen y por eso la inicialización es en menos 1, tal y como vimos en uno de los submódulos del módulo 8.

En último lugar, hemos incluido una función que es más propia de _UI_, pero que tira no sólo de _UI_ sino también de _motor_ por lo que está en _modelo_ para evitar dependencias circulares.

## MOTOR

Hemos optado por barajar el id de las fotos porque la clave para el emparejamiento va a ser la ruta de imagen. Definimos varias funciones auxiliares como _encontrarCartaPorId_, _filtrarCartasLevantadas_, _filtrarCartasNoEncontradas_ para aligerar el contenido de las principales e intentar mantener una separación de responsabilidades.

Definimos las condiciones con las que se puede voltear una carta. Cambiamos el estado a carta volteada y, para nuestro contador, añadimos 0, 5. La razón es que no consideramos un intento hasta cuando el usuario ha volteado dos cartas y no sólo una. Vemos la lógica del emparejamiento, actualizamos el estado de la partida, nos servimos de funciones auxiliares que cambian los estados de las cartas, comprobamos si están todas las cartas vueltas y podemos dar la partida por acabada, definimos una función que reinicie las cartas para que se puedan seguir volteando.

## UI

Aquí establecemos métodos para reiniciar la visualización de una carta concreta, crear el _html_ del _div_ de una carta, reiniciar toda la interfaz del tablero, pintar la carta, gestionar el emparejamiento.

Sobre la gestión del emparejamiento, definimos un array de cartas levantadas y a cada carta le asignamos una posición del mismo, con esto podemos dar entrada a la comprobación de si son o no pareja. A continuación, organizamos el _click_ en el _div_ que dispara las anteriores funciones. Definimos la función que llama al modelo para pintar el mensaje con el número de intentos al terminar la partida. Por último, agrupamos lo que sucede al comenzar cada una de las partidas. Destacar que eliminamos el mensaje de los intentos previos. Para ello nos servimos de un _query selector_ en vez de _getElementById_ porque lo estamos creando de nuevas y es más manejable evitando constatar si está creado o no a esas alturas del bloque de código.

## SHELL

Definimos el botón para empezar partida y le asignamos la función correspondiente.

## MAIN

Lo hemos dejado limpio para que sólo haya que importar _shell_.

> Fin de la implementación
