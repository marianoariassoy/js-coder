//  Consignas
// 1. Pedir número mediante prompt y sumarle otro número en cada repetición,realizando una salida por cada resultado.

let edad = parseInt(prompt("Ingresá tu edad por favor"));

for (let index = 2026; index < 2060; index += 4) {
  resultado = edad + (index - 2022);
  alert(`En el mundial de futbol de ${index} tendrás ${resultado} años de edad`);
}

// 2. Pedir un texto mediante prompt, concatenar un valor en cada repetición, realizando una salida por cada resultado, hasta que se ingresa “ESC”.

let textoConcatenado = "";
let texto = "";
while (texto != "ESC" && texto != "esc") {
  textoConcatenado = textoConcatenado + " " + texto;
  texto = prompt("Ingresá péliculas o series que te hayan gustado. Ingresa 'ESC' para finalizar. ");
}
alert(`Te gusta${textoConcatenado}`);

// 3.Pedir un número por prompt, repetir la salida del mensaje “Hola” la cantidad de veces ingresada.

let veces = parseInt(prompt("Ingresá la cantidad de veces que deseas repetir la palabra 'Hola'"));

for (let index = 1; index <= veces; index++) {
  alert(index + ". Hola");
}
