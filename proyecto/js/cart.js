//Variables globales
const freeShiping = 5000;
const iva = 0.28;

//Carrito en el local stogare
const cartArray = JSON.parse(localStorage.getItem("cart")) || [];

//Nodos y template del carrito
const cartContainer = document.querySelector(".cart-list");
const templateItemCart = document.querySelector("#template-cart");
const itemCart = templateItemCart.content.querySelector("article");
const cartFooter = document.querySelector(".cart-footer");
const cartEmpty = document.querySelector(".cart-empty");

//Funciones
function agregarProducto(id) {
  //Reviso si el producto ya existe en el array del carrito
  const total = cartArray.some((item) => item.id === id);
  if (total) {
    //Incremento la cantidad
    cartArray.map((item) => (item.id === id ? item.cantidad++ : item.cantidad));
  } else {
    //Busco el id en el array de productos
    let product = productsArray.find((item) => item.id === id);
    //Sumo el producto al array del carrito
    cartArray.push({ ...product, cantidad: 1 });
  }
  Toastify({
    text: "Ticket added 💪",
    style: {
      background: "black",
      color: "white",
    },
  }).showToast();
  cartRender();
}

const productDelete = (num) => {
  cartArray.splice(num, 1);
  Toastify({
    text: "Ticket was delete 😔",
    style: {
      background: "black",
      color: "white",
    },
  }).showToast();
  cartRender();
};

const productEdit = (num, op) => {
  if (op == 1) cartArray[num].cantidad > 1 && cartArray[num].cantidad--;
  else cartArray[num].cantidad++;
  cartRender();
};

const calcularMontos = () => {
  //Subtotal
  let subTotal = 0;
  for (const item of cartArray) subTotal += item.price * item.cantidad;
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
const cartRender = () => {
  //Elimino todos los nodos
  cartContainer.innerHTML = "";
  //Veo si hay items en el array cartArray
  let total = cartArray.length;
  if (total) {
    cartArray.forEach(function (item, index) {
      let cardClonada = itemCart.cloneNode(true);
      cardClonada.querySelector("img").src = `./assets/${item.image}`;
      cardClonada.querySelector(".cart-title").innerHTML = `<strong>${item.name}</strong><br>$${item.price * item.cantidad}.-`;
      cardClonada.querySelector(".cart-amount").innerHTML = item.cantidad;
      cartContainer.appendChild(cardClonada);
      //Escuchadores
      cardClonada.querySelector(".cart-delete button").addEventListener("click", () => productDelete(index));
      cardClonada.querySelectorAll(".cart-add button")[0].addEventListener("click", () => productEdit(index, 0));
      cardClonada.querySelectorAll(".cart-add button")[1].addEventListener("click", () => productEdit(index, 1));
    });
    cartFooter.classList.remove("hide");
    cartEmpty.classList.add("hide");
    calcularMontos();
    cartOpen();
  } else {
    cartFooter.classList.add("hide");
    cartEmpty.classList.remove("hide");
  }
  //Guardo el carrito en el local storage
  localStorage.setItem("cart", JSON.stringify(cartArray));
};

//Abrir y cerrar el carrito y filtros
const cartOpen = () => document.querySelector("aside").classList.add("cartOpen");
const cartClose = () => document.querySelector("aside").classList.remove("cartOpen");
const filtrosArbir = () => {
  document.querySelector("nav").classList.toggle("hide");
  document.querySelector(".logo").classList.toggle("hide");
};
document.querySelector(".cart-open button").addEventListener("click", cartOpen);
document.querySelector(".cart-close button").addEventListener("click", cartClose);
document.querySelector(".btn-continue").addEventListener("click", cartClose);
document.querySelector(".menu button").addEventListener("click", filtrosArbir);

//Incio
cartRender();
