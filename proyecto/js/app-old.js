// Variables globales
let costoEnvio = 500;
let envioGratuitoMinimo = 5000;
let iva = 0.28;
const productos = [];
const carrito = [];

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
    carrito.push(new Pedido(this, cantidad));
    return alert(`👉 Agregaste ${cantidad} de ${this.nombre} a tu carrito de compras`);
  }
  mostrarProducto() {
    return `${this.nombre} $${this.precio}.-`;
  }
}

//Clase Pedido
class Pedido {
  constructor(producto, cantidad) {
    this.producto = producto;
    this.cantidad = cantidad;
  }
  calcularMonto() {
    return this.producto.precio * this.cantidad;
  }
  mostrarPedido() {
    return `${this.producto.nombre} $${this.producto.precio}.- (${this.cantidad})`;
  }
}

// Agrego productos al listado de productos
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
  //Resumen y subtotal
  let pedidoFinal = "Finalizaste tu compra con los siguientes productos:\n";
  for (let i = 0; i < carrito.length; i++) pedidoFinal += `👉 ${carrito[i].mostrarPedido()}\n`;

  alert(pedidoFinal);

  let subTotal = 0;
  for (const iterator of carrito) subTotal += iterator.calcularMonto();

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
for (let i = 1; i < stock.length; i++) listadoProductos += `${i}. ${stock[i].mostrarProducto()}\n`;

// Selección de productos
let op = "";
while (op != "fin") {
  op = prompt(listadoProductos);
  op = op.trim().toLowerCase();

  if (op === "fin") {
    finalizarCompra();
  } else if (parseInt(op) >= 1 && parseInt(op) < stock.length) {
    let cantidad = parseInt(prompt(`Ingresa la cantidad para ${stock[op].nombre}`));
    stock[op].agregarProducto(cantidad);
  } else {
    alert(`No ingresaste una opción valida ⚠️`);
  }
}
