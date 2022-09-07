// Simulador interactivo de carrito de compras

// Array de objetos literales para productos
const productos = [
  { id: 2, nombre: "Venus", precio: 800, stock: 5 },
  { id: 3, nombre: "Tierra", precio: 2000, stock: 2 },
  { id: 4, nombre: "Marte", precio: 1500, stock: 8 },
];

// Agrego algunos faltantes
productos.unshift({ id: 1, nombre: "Mercurio", precio: 50, stock: 10 });
productos.push({ id: 5, nombre: "Jupiter", precio: 1000, stock: 10 });
productos.push({ id: 6, nombre: "Saturno", precio: 600, stock: 2 });

// Variables globales
let costoTotal = 0;
let costoEnvio = 500;
let envioGratuitoMinimo = 5000;
let iva = 0.28;
let pedidoFinal = "";
let seleccion = "";
let listadoProductos = "";

// String con el listado para mostrar
for (let index = 0; index < productos.length; index++) {
  listadoProductos += `${productos[index].id}. ${productos[index].nombre} $${productos[index].precio}.- \n`;
}
// Finalizar la compra
const finalizarCompra = () => {
  //Envio gratuito
  if (costoTotal > envioGratuitoMinimo) {
    alert(`¡Bien! Tu compra tiene envio gratuito, supera los $${envioGratuitoMinimo}.-`);
    costoEnvio = 0;
  } else alert(`Tu compra tiene un costo de envio de $${costoEnvio}.-, no superaste los $${envioGratuitoMinimo}.- para tener envio gratuito`);

  //Costo final
  costoTotal += costoEnvio;
  let ivaFinal = Math.round(costoTotal * iva);
  costoTotal += ivaFinal;
  alert(`El costo final de tu compra es $${costoTotal}.-\n($${costoEnvio}.- costo de envio)\n($${ivaFinal}.- IVA)\n¡Gracias por tu compra!`);
};

// Selección de productos
while (seleccion != "fin") {
  seleccion = prompt(`¡Hola! Seleccione y agregue productos a su carrito de compras. Ingrese 'FIN' para finalizar.\n${listadoProductos} `);

  seleccion.toLowerCase();

  if (seleccion === "fin") {
    alert(`Finalizaste tu compra con los siguientes productos: ${pedidoFinal}`);
    finalizarCompra();
  } else if (parseInt(seleccion) >= 1 && parseInt(seleccion) <= productos.length) {
    seleccion--;
    let producto = productos[seleccion].nombre;
    costoTotal += productos[seleccion].precio;
    pedidoFinal += producto + ", ";
    alert(`Agregaste ${producto} a tu carrito`);
  } else {
    alert(`No ingresaste una opción valida`);
  }
}
