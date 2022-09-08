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
  //resumen
  let pedidoFinal = "";
  for (const iterator of productosCarrito) {
    pedidoFinal += iterator.nombre + "\n";
  }
  alert(`💪 Finalizaste tu compra con los siguientes productos: \n${pedidoFinal}`);

  let subTotal = productosCarrito.reduce((acc, item) => {
    return acc + item.precio;
  }, 0);

  //Envio
  if (subTotal >= envioGratuitoMinimo) {
    alert(`¡Bien! 🎉 Tu compra tiene envio gratuito, supera o es igual a $${envioGratuitoMinimo}.-`);
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

let seleccion = "";
let listadoProductos = "";

// Filtro los productos para mostrar solo los disponibles.
const productosDisponibles = productos.filter((item) => item.cantidad > 0);
// Agrego un item vácio al comienzo del array así comenzamos desde el indice 1
productosDisponibles.unshift([]);
// Creo un String para el menu.
for (let index = 1; index < productosDisponibles.length; index++) {
  listadoProductos += `${index}. ${productosDisponibles[index].nombre} $${productosDisponibles[index].precio}.-\n`;
}

// Selección de productos
while (seleccion != "fin") {
  seleccion = prompt(`¡Hola!👋 Selecciona un número y agregá productos al carrito de compras. Ingresá 'FIN' para finalizar la compra 🙌\n\n${listadoProductos} `);

  if (seleccion.toLowerCase() === "fin") {
    finalizarCompra();
  } else if (parseInt(seleccion) >= 1 && parseInt(seleccion) < productosDisponibles.length) {
    productosCarrito.push(new Producto(productosDisponibles[seleccion].id, productosDisponibles[seleccion].nombre, productosDisponibles[seleccion].precio, 1));
    alert(`👉 Agregaste ${productosDisponibles[seleccion].nombre} a tu carrito de compras`);
  } else {
    alert(`No ingresaste una opción valida ⚠️`);
  }
}
