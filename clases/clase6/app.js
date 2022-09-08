// Simulador interactivo de carrito de compras

// Variables globales
let costoEnvio = 500;
let envioGratuitoMinimo = 5000;
let iva = 0.28;
let seleccion = "";
let listadoProductos = "";

//Clase Producto
class Producto {
  constructor(id, nombre, precio, cantidad) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.cantidad = cantidad;
    this.disponible = true;
  }
}

// Array de productos y carrito
const productos = [];
const productosCarrito = [];

// Agrego productos al listado
productos.push(new Producto(1, "Mercurio", 100, 10));
productos.push(new Producto(2, "Venus", 2500, 10));
productos.push(new Producto(3, "Tierra", 1000, 5));
productos.push(new Producto(4, "Marte", 500, 4));
productos.push(new Producto(5, "Jupiter", 500, 10));

// Finalizar la compra
const finalizarCompra = () => {
  //resumen
  let pedidoFinal = "";
  for (const iterator of productosCarrito) {
    pedidoFinal += iterator.nombre + "\n";
  }
  alert(`Finalizaste tu compra con los siguientes productos:\n${pedidoFinal}`);

  let subTotal = productosCarrito.reduce((acc, item) => {
    return acc + item.precio;
  }, 0);

  //Envio
  if (subTotal > envioGratuitoMinimo) {
    alert(`¡Bien! Tu compra tiene envio gratuito, supera los $${envioGratuitoMinimo}.-`);
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

¡Muchas gracias!`);
};

// String con el listado para mostrar
for (let index = 0; index < productos.length; index++) {
  listadoProductos += `${productos[index].id}. ${productos[index].nombre} $${productos[index].precio}.- \n`;
}

// Selección de productos
while (seleccion != "fin") {
  seleccion = prompt(`¡Hola! Seleccione y agregue productos a su carrito de compras. Ingrese 'FIN' para finalizar.\n${listadoProductos} `);
  seleccion.toLowerCase();

  if (seleccion === "fin") {
    finalizarCompra();
  } else if (parseInt(seleccion) >= 1 && parseInt(seleccion) <= productos.length) {
    seleccion--;
    productosCarrito.push(new Producto(productos[seleccion].id, productos[seleccion].nombre, productos[seleccion].precio, 1));

    alert(`Agregaste ${productos[seleccion].nombre} a tu carrito de compras`);
  } else {
    alert(`No ingresaste una opción valida`);
  }
}
