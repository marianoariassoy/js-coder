//Variables globales
const freeShiping = 5000;
const iva = 0.28;
const productsArray = [];
const cartArray = [];

//Nodos del DOM
//Containers
const cardsContainer = document.querySelector(".cards-container");
const cartContainer = document.querySelector(".cart-list");
//Templates
const templateCard = document.querySelector("#template-cards");
const card = templateCard.content.querySelector("article");
const templateItemCart = document.querySelector("#template-cart");
const itemCart = templateItemCart.content.querySelector("article");
//Cart
const cartFooter = document.querySelector(".cart-footer");
const cartEmpty = document.querySelector(".cart-empty");

//Agrego productos al listado de productos
productsArray.push({ id: 1, nombre: "Mercury", tipo: "terrestrial", lunas: false, radio: 2440, imagen: "mercury.png", precio: 1000, stock: 0 });
productsArray.push({ id: 2, nombre: "Venus", tipo: "terrestrial", lunas: false, radio: 6052, imagen: "venus.png", precio: 1000, stock: 0 });
productsArray.push({ id: 3, nombre: "Earth", tipo: "terrestrial", lunas: true, radio: 6371, imagen: "earth.png", precio: 5000, stock: 0 });
productsArray.push({ id: 4, nombre: "Mars", tipo: "terrestrial", lunas: true, radio: 3390, imagen: "mars.png", precio: 3000, stock: 0 });
productsArray.push({ id: 5, nombre: "Jupiter", tipo: "gas giants", lunas: true, radio: 69911, imagen: "jupiter.png", precio: 2000, stock: 0 });
productsArray.push({ id: 6, nombre: "Saturn", tipo: "gas giants", lunas: true, radio: 58232, imagen: "saturn.png", precio: 2000, stock: 0 });
productsArray.push({ id: 7, nombre: "Uranus", tipo: "gas giants", lunas: true, radio: 25362, imagen: "uranus.png", precio: 1000, stock: 0 });
productsArray.push({ id: 8, nombre: "Neptune", tipo: "gas giants", lunas: true, radio: 24622, imagen: "neptuno.png", precio: 1000, stock: 0 });

//Renderizo las cards
for (let producto of productsArray) {
  if (producto.lunas) lunas = "has moons";
  else lunas = "has no moons";
  let cardClonada = card.cloneNode(true);
  cardClonada.querySelector("img").src = `./assets/${producto.imagen}`;
  cardClonada.querySelector(".card-title").innerText = producto.nombre;
  cardClonada.querySelector(".card-description").innerText = `It is a ${producto.tipo} planet with ${producto.radio} km. of radio, and it ${lunas}.`;
  cardClonada.querySelector(".card-price").innerText = `$${producto.precio}`;
  cardClonada.querySelector("button").dataset.id = producto.id;
  cardsContainer.appendChild(cardClonada);
}

//Funciones
function agregarProducto(id) {
  //Busco el id en el array de productos
  let pos = 0;
  for (let index = 0; index < productsArray.length; index++) {
    if (productsArray[index].id == id) {
      pos = index;
      break;
    }
  }
  //Reviso si el item ya existe en el array cartArray
  const existe = cartArray.some((item) => item.id == id);
  if (existe) {
    //Incremento la cantidad
    cartArray.map((item) => (item.id == id ? item.cantidad++ : item.cantidad));
  } else {
    //Creo el pedido
    cartArray.push({ ...productsArray[pos], cantidad: 1 });
  }
  renderCarrito();
}

const calcularMontos = () => {
  //Subtotal
  let subTotal = 0;
  for (const item of cartArray) subTotal += item.precio * item.cantidad;
  document.querySelector("#precio-subtotal").innerText = `$${subTotal}`;
  //Envio
  if (subTotal <= freeShiping) {
    costoEnvio = 500;
    document.querySelector("#precio-shiping").innerHTML = `$${costoEnvio} <br /><small>Free shipping from $${freeShiping}</small>`;
  } else {
    costoEnvio = 0;
    document.querySelector("#precio-shiping").innerText = `$${costoEnvio}`;
  }
  //Impuestos
  let ivaFinal = Math.round(subTotal * iva);
  document.querySelector("#precio-iva").innerHTML = `$${ivaFinal}`;
  //Precio final
  let costofinal = subTotal + costoEnvio + ivaFinal;
  let costoFinalCoutas = Math.round(costofinal / 12);
  document.querySelector("#precio-final").innerHTML = `$${costofinal} <br /><small>Pay in 12 parts of $${costoFinalCoutas}</small>`;
};

const eliminarPedido = (num) => {
  cartArray.splice(num, 1);
  renderCarrito();
};

const modificarPedido = (num, op) => {
  if (op == 1) {
    if (cartArray[num].cantidad > 1) cartArray[num].cantidad--;
  } else cartArray[num].cantidad++;
  renderCarrito();
};

//Renderizo el carrito
const renderCarrito = () => {
  //Elimino todos los nodos
  cartContainer.innerHTML = "";
  //Veo si hay items en el array cartArray
  let total = cartArray.length;
  if (total) {
    cartArray.forEach(function (item, index) {
      let cardClonada = itemCart.cloneNode(true);
      cardClonada.querySelector("img").src = `./assets/${item.imagen}`;
      cardClonada.querySelector(".cart-title").innerHTML = `<strong>${item.nombre}</strong><br>$${item.precio}.-`;
      cardClonada.querySelector(".cart-amount").innerHTML = item.cantidad;
      if (total > 4) cardClonada.querySelector(".cart-img img").classList.add("cart-img-small");

      cartContainer.appendChild(cardClonada);

      //Escuchadores
      cardClonada.querySelector(".cart-delete button").addEventListener("click", () => {
        eliminarPedido(index);
      });
      cardClonada.querySelectorAll(".cart-add button")[0].addEventListener("click", (e) => {
        modificarPedido(index, 0);
      });
      cardClonada.querySelectorAll(".cart-add button")[1].addEventListener("click", (e) => {
        modificarPedido(index, 1);
      });
    });
    cartFooter.classList.remove("hide");
    cartEmpty.classList.add("hide");
    calcularMontos();
    carritoAbrir();
  } else {
    cartFooter.classList.add("hide");
    cartEmpty.classList.remove("hide");
  }
};

//Escuchadores
const addCartButtons = document.querySelectorAll("button.btn-article");
addCartButtons.forEach((item) => {
  item.addEventListener("click", () => {
    let id = item.dataset.id;
    agregarProducto(id);
  });
});

//Abrir y cerrar el carrito
const carritoAbrir = () => document.querySelector("aside").classList.add("cartOpen");
const carritoClose = () => document.querySelector("aside").classList.remove("cartOpen");
document.querySelector(".cart-open button").addEventListener("click", carritoAbrir);
document.querySelector(".cart-close button").addEventListener("click", carritoClose);
