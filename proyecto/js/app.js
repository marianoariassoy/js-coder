// Variables globales
let costoEnvio = 500;
let envioGratuitoMinimo = 5000;
let iva = 0.28;

//Clase Producto
class Producto {
  constructor(id, nombre, precio, stock, tipo, lunas, radio) {
    this.id = id;
    this.nombre = nombre;
    this.tipo = tipo;
    this.lunas = lunas;
    this.radio = radio;
    this.precio = precio;
    this.stock = stock;
  }
  agregarProducto(cantidad) {
    return alert(`👉 Agregaste ${cantidad} de ${this.nombre} a tu carrito de compras`);
  }
}

class Pedido {
  constructor(producto, cantidad) {
    this.producto = producto;
    this.cantidad = cantidad;
  }
}

// Arrays de productos y carrito de compra
const productos = [];
const carrito = [];

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
  for (let index = 0; index < carrito.length; index++) {
    pedidoFinal += `👉 ${carrito[index].producto.nombre} $${carrito[index].producto.precio}.- (${carrito[index].cantidad})\n`;
  }
  alert(pedidoFinal);

  let subTotal = carrito.reduce((acc, item) => {
    return acc + item.producto.precio * item.cantidad;
  }, 0);

  //Envio
  if (subTotal >= envioGratuitoMinimo) {
    alert(`🎉 Tu compra tiene envio gratuito, supera los $${envioGratuitoMinimo}.-`);
    costoEnvio = 0;
  } else alert(`Tu compra tiene un costo de envio de $${costoEnvio}.-.\n😔 No superaste los $${envioGratuitoMinimo}.- para obtener envio gratuito`);

  //Costo final e impuestos
  let costofinal = subTotal + costoEnvio;
  let ivaFinal = Math.round(subTotal * iva);
  costofinal += ivaFinal;
  alert(`El subtotal de la compra es: $${subTotal}.-\nCosto de envio: $${costoEnvio}.-\nImpuestos: $${ivaFinal}.-\n\nEl costo final de tu compra es $${costofinal}.-\n\n¡Muchas gracias por tu compra simulada! 😍`);
};

// Hago un filtro en los productos para mostrar solo los disponibles.
const stock = productos.filter((item) => item.stock > 0);
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
    let cantidad = prompt(`Ingresa la cantidad para ${stock[op].nombre}`);
    carrito.push(new Pedido(stock[op], cantidad));
    stock[op].agregarProducto(cantidad);
  } else {
    alert(`No ingresaste una opción valida ⚠️`);
  }
}
