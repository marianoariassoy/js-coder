// Variables globales
let envioGratuitoMinimo = 5000;
let iva = 0.28;
const productos = [];
const carrito = [];

//Nodos del DOM
const precioSubtotal = document.querySelector("#precio-subtotal");
const precioShiping = document.querySelector("#precio-shiping");
const precioIVA = document.querySelector("#precio-iva");
const precioFinal = document.querySelector("#precio-final");

//Clase Producto
class Producto {
  constructor(id, nombre, descipcion, tipo, lunas, radio, imagen, precio, stock) {
    this.id = id;
    this.nombre = nombre;
    this.descipcion = descipcion;
    this.tipo = tipo;
    this.lunas = lunas;
    this.radio = radio;
    this.imagen = imagen;
    this.precio = precio;
    this.stock = stock;
  }

  agregarProducto(cantidad) {
    carrito.push(new Pedido(this, cantidad));
    const contenedor = document.querySelector(".cart-list");
    let item = document.createElement("article");
    item.innerHTML = `<article class="cart-item">
            <div class="cart-img">
              <img src="./assets/${this.imagen}" alt="${this.nombre}" />
            </div>
            <div class="cart-title">
              <small>${this.nombre}<br />$${this.precio}.-</small>
            </div>
            <div class="cart-amount">
              <small>${cantidad}</small>
            </div>
            <div class="cart-delete text-right">
              <a href="#"> <i class="fa-solid fa-xmark"></i></a>
            </div>
          </article> `;
    contenedor.appendChild(item);
    calcularMontos();
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
  monto() {
    return this.producto.precio * this.cantidad;
  }
}

// Agrego productos al listado de productos
productos.push(new Producto(100, "Mercurio", "", "rock", false, 2440, "mercury.png", 1000, 0));
productos.push(new Producto(200, "Venus", "", "rock", false, 6052, "venus.png", 1000, 10));
productos.push(new Producto(300, "Tierra", "", "rock", true, 6371, "earth.png", 5000, 10));
productos.push(new Producto(400, "Marte", "", "rock", true, 3390, "mars.png", 4000, 10));
productos.push(new Producto(500, "Jupiter", "", "gas", true, 69911, "jupiter.png", 2000, 10));
productos.push(new Producto(600, "Saturno", "", "gas", true, 58232, "saturn.png", 2000, 10));
productos.push(new Producto(700, "Urano", "", "gas", true, 25362, "uranus.png", 1000, 0));
productos.push(new Producto(800, "Neptuno", "", "gas", true, 24622, "neptuno.png", 1000, 0));

//Renderizo las cards de planetas
const contenedor = document.querySelector(".cards-container");
for (let producto of productos) {
  let item = document.createElement("article");
  if (producto.lunas) lunas = "Has moons";
  else lunas = "Has no moons";
  item.innerHTML = `<img src="./assets/${producto.imagen}" alt="${producto.nombre}" width="400" height="400" loading="lazy" class="mb-1" />
            <div class="content">
              <div class="card-title">${producto.nombre}</div>
              <div class="card-description mb-1">It has ${producto.radio} km. of radio. <br> Its composition is ${producto.tipo} <br> ${lunas} </div>
              <div class="content-price">
                <span class="text-primary">$${producto.precio}</span>
                <button class="btn-article text-primary">ADD CART</button>
              </div>
            </div>`;
  contenedor.appendChild(item);
}

const calcularMontos = () => {
  //Subtotal
  let subTotal = 0;
  for (const iterator of carrito) subTotal += iterator.monto();
  precioSubtotal.innerHTML = `$${subTotal}`;

  //Envio
  let costoEnvio = 0;
  if (subTotal <= envioGratuitoMinimo) costoEnvio = 500;
  precioShiping.innerHTML = `$${costoEnvio} <br /><small>Free shipping from $${envioGratuitoMinimo}</small>`;

  //Impuestos
  let ivaFinal = Math.round(subTotal * iva);
  precioIVA.innerHTML = `$${ivaFinal}`;

  //Precio final
  let costofinal = subTotal + costoEnvio + ivaFinal;
  let costoFinalCoutas = Math.round(costofinal / 12);
  precioFinal.innerHTML = `$${costofinal} <br /><small>Pay in 12 parts of $${costoFinalCoutas}</small>`;
};

// Finalizar la compra
const finalizarCompra = () => {
  alert("Finalizo su compra, ahora puede ver el resumen como corresponde en el DOM 😍");
};

// Agrego un item vácio al comienzo del array así comenzamos desde el indice 1
productos.unshift([]);

// Creo un String para el menu.
let listadoProductos = "¡Hola!👋 Selecciona un número y agregá el producto al carrito de compras. Ingresá 'FIN' para finalizar la compra 🙌\n\n";
for (let i = 1; i < productos.length; i++) listadoProductos += `${i}. ${productos[i].mostrarProducto()}\n`;

// Selección de productos
let op = "";
while (op != "fin") {
  op = prompt(listadoProductos);
  op = op.trim().toLowerCase();

  if (op === "fin") {
    finalizarCompra();
  } else if (parseInt(op) >= 1 && parseInt(op) < productos.length) {
    let cantidad = parseInt(prompt(`Ingresa la cantidad para ${productos[op].nombre}`));
    productos[op].agregarProducto(cantidad);
  } else {
    alert(`No ingresaste una opción valida ⚠️`);
  }
}
