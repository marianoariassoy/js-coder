//Simulador interactivo de carrito de compras

//Objeto producto
class Producto {
  constructor(nombre, precio, stock) {
    this.nombre = nombre;
    this.precio = parseInt(precio);
    this.stock = parseInt(stock);
    this.disponible = true;
  }
}

//Creo instancias de Producto
const mercurio = new Producto("Mercurio", "50", "10");
const venus = new Producto("Venus", "800", "5");
const tierra = new Producto("Tierra", "2000", "2");
const marte = new Producto("Marte", "1500", "20");
const jupiter = new Producto("Jupiter", "1000", "5");

//Variables globales
let costoTotal = 0;
let costoEnvio = 500;
let envioGratuitoMinimo = 5000;
let iva = 0.28;
let pedidoFinal = "";
let seleccion = "";

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
while (seleccion.toLowerCase() != "fin") {
  //Variables locales
  let producto;

  seleccion = prompt(`¡Hola! Seleccione y agregue productos a su carrito de compras. Ingrese 'FIN' para finalizar. 
1. ${mercurio.nombre} - $${mercurio.precio}.- 
2. ${venus.nombre} - $${venus.precio}.- 
3. ${tierra.nombre} - $${tierra.precio}.- 
4. ${marte.nombre} - $${marte.precio}.- 
5. ${jupiter.nombre} - $${jupiter.precio}.-  `);

  switch (seleccion) {
    case "1":
      producto = mercurio.nombre;
      costoTotal += mercurio.precio;
      break;
    case "2":
      producto = venus.nombre;
      costoTotal += venus.precio;
      break;
    case "3":
      producto = tierra.nombre;
      costoTotal += tierra.precio;
      break;
    case "4":
      producto = marte.nombre;
      costoTotal += marte.precio;
      break;
    case "5":
      producto = jupiter.nombre;
      costoTotal += jupiter.precio;
      break;
  }

  if (producto) {
    alert(`Agregaste ${producto} a tu carrito`);
    pedidoFinal += producto + ", ";
  } else if (seleccion.toLowerCase() === "fin") {
    alert(`Finalizaste tu compra con los siguientes productos: ${pedidoFinal}`);
    envioGratuito();
    costoFinal();
  } else {
    alert(`No ingresaste una opción valida`);
  }
}
