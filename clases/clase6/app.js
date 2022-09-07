// Simulador interactivo de carrito de compras

//Clase Producto
class Producto {
  constructor(id, nombre, precio, stock) {
    this.id = id;
    this.nombre = nombre;
    this.precio = parseInt(precio);
    this.stock = parseInt(stock);
    this.disponible = true;
  }
}
//Clase Carrito
class Carrito {
  constructor(id, nombre, precio, cantidad) {
    this.id = id;
    this.nombre = nombre;
    this.precio = parseInt(precio);
    this.cantidad = parseInt(cantidad);
  }
}

// Array de productos de la clase Producto y carrito
const productos = [];
const productosCarrito = [];

// Agrego productos al listado
productos.push(new Producto(1, "Mercurio", 500, 10));
productos.push(new Producto(2, "Venus", 2500, 10));
productos.push(new Producto(3, "Tierra", 800, 5));
productos.push(new Producto(4, "Marte", 200, 4));
productos.push(new Producto(5, "Jupiter", 200, 10));

// Finalizar la compra
const finalizarCompra = () => {
  //resumen
  let pedidoFinal = "";
  for (const iterator of productosCarrito) {
    pedidoFinal += iterator.nombre + ", ";
  }
  alert(`Finalizaste tu compra con los siguientes productos: ${pedidoFinal}`);

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

// Variables globales
let costoTotal = 0;
let costoEnvio = 500;
let envioGratuitoMinimo = 5000;
let iva = 0.28;
let seleccion = "";
let listadoProductos = "";

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
    productosCarrito.push(new Carrito(productos[seleccion].id, productos[seleccion].nombre, productos[seleccion].precio, 1));
    costoTotal += productos[seleccion].precio;

    alert(`Agregaste ${productos[seleccion].nombre} a tu carrito`);
  } else {
    alert(`No ingresaste una opción valida`);
  }
}
