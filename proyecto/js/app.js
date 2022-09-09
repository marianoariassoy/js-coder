// Variables globales
let costoEnvio = 500;
let envioGratuitoMinimo = 5000;
let iva = 0.28;

//Clase Producto
class Producto {
  constructor(id, nombre, precio, cantidad, tipo, lunas, radio) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.cantidad = cantidad;
    this.tipo = tipo;
    this.lunas = lunas;
    this.radio = radio;
  }
}

// Array de productos y carrito
const productos = [];
const productosCarrito = [];

// Agrego productos al listado
productos.push(new Producto(100, "Mercurio", 1000, 10, "Rocoso", false, 2440));
productos.push(new Producto(250, "Venus", 1000, 10, "Rocoso", false, 6052));
productos.push(new Producto(300, "Tierra", 4000, 5, "Rocoso", true, 6371));
productos.push(new Producto(301, "Marte", 2000, 0, "Gaseoso", true, 3390));
productos.push(new Producto(302, "Jupiter", 1500, 10, "Gaseoso", true, 69911));
productos.push(new Producto(400, "Saturno", 1500, 0, "Gaseoso", true, 58232));
productos.push(new Producto(500, "Urano", 1500, 10, "Gaseoso", true, 25362));
productos.push(new Producto(600, "Neptuno", 1500, 0, "Gaseoso", true, 24622));

// Finalizar la compra
const finalizarCompra = () => {
  //Resumen
  let pedidoFinal = "Finalizaste tu compra con los siguientes productos:\n";
  for (const iterator of productosCarrito) {
    pedidoFinal += `👉 ${iterator.nombre} $${iterator.precio}.- (${iterator.cantidad}) \n`;
  }
  alert(pedidoFinal);

  let subTotal = productosCarrito.reduce((acc, item) => {
    return acc + item.precio;
  }, 0);

  //Envio
  if (subTotal >= envioGratuitoMinimo) {
    alert(`🎉 Tu compra tiene envio gratuito, supera o es igual a $${envioGratuitoMinimo}.-`);
    costoEnvio = 0;
  } else
    alert(`Tu compra tiene un costo de envio de $${costoEnvio}.-. 
No superaste los $${envioGratuitoMinimo}.- para obtener envio gratuito`);

  //Costo final e impuestos
  let costofinal = subTotal + costoEnvio;
  let ivaFinal = Math.round(subTotal * iva);
  costofinal += ivaFinal;
  alert(`El subtotal de la compra es: $${subTotal}.-
Costo de envio: $${costoEnvio}.-
Impuestos: $${ivaFinal}.-

El costo final de tu compra es $${costofinal}.-

¡Muchas gracias! 😍`);
};

// Filtro los productos para mostrar solo los disponibles.
const stock = productos.filter((item) => item.cantidad > 0);
// Agrego un item vácio al comienzo del array así comenzamos desde el indice 1
stock.unshift([]);

// Creo un String para el menu.
let listadoProductos = "¡Hola!👋 Selecciona un número y agregá el producto al carrito de compras. Ingresá 'FIN' para finalizar la compra 🙌\n\n";
for (let index = 1; index < stock.length; index++) {
  listadoProductos += `${index}. ${stock[index].nombre} $${stock[index].precio}.-\n`;
}

// Selección de productos
let op = "";
while (op != "fin") {
  op = prompt(listadoProductos);
  op = op.trim().toLowerCase();

  if (op === "fin") {
    finalizarCompra();
  } else if (parseInt(op) >= 1 && parseInt(op) < stock.length) {
    let cantidad = prompt(`Ingresa la cantidad de ${stock[op].nombre}`);
    let precio = stock[op].precio * cantidad;
    productosCarrito.push(new Producto(stock[op].id, stock[op].nombre, precio, cantidad));
    alert(`👉 Agregaste ${cantidad} ${stock[op].nombre} a tu carrito de compras`);
  } else {
    alert(`No ingresaste una opción valida ⚠️`);
  }
}
