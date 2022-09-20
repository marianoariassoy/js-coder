//Variables globales
const freeShiping = 5000;
const iva = 0.28;

//Carrito en el local stogare o vácio
const cartArray = JSON.parse(localStorage.getItem("cart"));

//Nodos y template del carrito
const cartContainer = document.querySelector(".cart-list");
const templateItemCart = document.querySelector("#template-cart");
const itemCart = templateItemCart.content.querySelector("article");
const cartFooter = document.querySelector(".cart-footer");
const cartEmpty = document.querySelector(".cart-empty");

//Funciones
function agregarProducto(id) {
  //Reviso si el producto ya existe en el array del carrito
  const total = cartArray.some((item) => item.id == id);
  if (total) {
    //Incremento la cantidad
    cartArray.map((item) => (item.id == id ? item.cantidad++ : item.cantidad));
  } else {
    //Busco el id en el array de productos
    let product = productsArray.find((item) => item.id == id);
    //Sumo el producto al array del carrito
    cartArray.push({ ...product, cantidad: 1 });
  }
  renderizoCarrito();
}

const eliminarProducto = (num) => {
  cartArray.splice(num, 1);
  renderizoCarrito();
};

const modificarProducto = (num, op) => {
  if (op == 1) {
    if (cartArray[num].cantidad > 1) cartArray[num].cantidad--;
  } else cartArray[num].cantidad++;
  renderizoCarrito();
};

const calcularMontos = () => {
  //Subtotal
  let subTotal = 0;
  for (const item of cartArray) subTotal += item.precio * item.cantidad;
  document.querySelector("#precio-subtotal").innerText = `$${subTotal}`;
  //Envio
  if (subTotal <= freeShiping) {
    costoEnvio = 500;
    document.querySelector("#precio-shiping").innerHTML = `$${costoEnvio} <br><small>Free shipping from $${freeShiping}</small>`;
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
  document.querySelector("#precio-final").innerHTML = `$${costofinal} <br><small>Pay in 12 parts of $${costoFinalCoutas}</small>`;
};

//Renderizo el carrito
const renderizoCarrito = () => {
  //Elimino todos los nodos
  cartContainer.innerHTML = "";
  //Veo si hay items en el array cartArray
  let total = cartArray.length;
  if (total) {
    cartArray.forEach(function (item, index) {
      let cardClonada = itemCart.cloneNode(true);
      cardClonada.querySelector("img").src = `./assets/${item.imagen}`;
      cardClonada.querySelector(".cart-title").innerHTML = `<strong>${item.nombre}</strong><br>$${item.precio * item.cantidad}.-`;
      cardClonada.querySelector(".cart-amount").innerHTML = item.cantidad;
      if (total > 4) cardClonada.querySelector(".cart-img img").classList.add("cart-img-small");
      cartContainer.appendChild(cardClonada);
      //Escuchadores
      cardClonada.querySelector(".cart-delete button").addEventListener("click", () => eliminarProducto(index));
      cardClonada.querySelectorAll(".cart-add button")[0].addEventListener("click", () => modificarProducto(index, 0));
      cardClonada.querySelectorAll(".cart-add button")[1].addEventListener("click", () => modificarProducto(index, 1));
    });
    cartFooter.classList.remove("hide");
    cartEmpty.classList.add("hide");
    calcularMontos();
    carritoAbrir();
  } else {
    cartFooter.classList.add("hide");
    cartEmpty.classList.remove("hide");
  }
  //Guardo el carrito en el local storage
  localStorage.setItem("cart", JSON.stringify(cartArray));
};

//Abrir y cerrar el carrito
const carritoAbrir = () => document.querySelector("aside").classList.add("cartOpen");
const carritoClose = () => document.querySelector("aside").classList.remove("cartOpen");
document.querySelector(".cart-open button").addEventListener("click", carritoAbrir);
document.querySelector(".cart-close button").addEventListener("click", carritoClose);
document.querySelector(".btn-continue").addEventListener("click", carritoClose);

renderizoCarrito();
