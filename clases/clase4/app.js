//Simulador interactivo de carrito de compras

//Variables globales
let costoTotal = 0;
let costoEnvio = 500;
let envioGratuitoMinimo = 5000;
let iva = 0.28;

let pedidoFinal = "";
let seleccion;

//Envio gratuito
const envioGratuito = () => {
  if (costoTotal > envioGratuitoMinimo) {
    alert(`¡Bien! Tu compra tiene envio gratuito, supera los $${envioGratuitoMinimo}.-`);
    costoEnvio = 0;
  } else alert(`Tu compra tiene un costo de envio de $${costoEnvio}.-, no superaste los $${envioGratuitoMinimo}.- para tener envio gratuito`);
};

//Costo final
const costoFinal = () => {
  costoTotal += costoEnvio;
  let ivaFinal = Math.round(costoTotal * iva);
  costoTotal += ivaFinal;

  alert(`El costo final de tu compra es $${costoTotal}.-\n($${costoEnvio}.- costo de envio)\n($${ivaFinal}.- IVA)\n¡Gracias por tu compra!`);
};

//Selección de productos
while (seleccion != "FIN" && seleccion != "Fin" && seleccion != "fin") {
  //Variables locales
  let costo;
  let producto;

  seleccion = prompt("¡Hola! Seleccione y agregue productos a su carrito de compras. Ingrese 'FIN' para finalizar. \n1. Mercurio - $50.- \n2. Venus - $800.- \n3. Tierra - $3000.- \n4. Marte - $2400.- \n5. Jupiter - $1400.- ");

  switch (seleccion) {
    case "1":
      producto = "Mercurio";
      costo = 50;
      costoTotal += costo;
      pedidoFinal += producto + ", ";
      break;
    case "2":
      producto = "Venus";
      costo = 800;
      costoTotal += costo;
      pedidoFinal += producto + ", ";
      break;
    case "3":
      producto = "Tierra";
      costo = 3000;
      costoTotal += costo;
      pedidoFinal += producto + ", ";
      break;
    case "4":
      producto = "Marte";
      costo = 2400;
      costoTotal += costo;
      pedidoFinal += producto + ", ";
      break;
    case "5":
      producto = "Jupiter";
      costo = 1400;
      costoTotal += costo;
      pedidoFinal += producto + ", ";
      break;
  }

  if (costo) alert(`Agregaste ${producto} a tu carrito ($${costo}.-)`);
  else if (seleccion == "FIN" || seleccion == "Fin" || seleccion == "fin") {
    alert(`Seleccionaste los siguientes productos: ${pedidoFinal}`);
    envioGratuito();
    costoFinal();
  }
}
