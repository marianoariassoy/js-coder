//Carrito en el local stogare
const cartArray = JSON.parse(localStorage.getItem("cart")) || [];

//Nodos y template del carrito
const cartContainer = document.querySelector(".cart-list"),
  templateItemCart = document.querySelector("#template-cart"),
  itemCart = templateItemCart.content.querySelector("article"),
  cartFooter = document.querySelector(".cart-footer"),
  cartEmpty = document.querySelector(".cart-empty");

//Funciones
function addPlanet(id) {
  //Reviso si el producto ya existe en el array del carrito
  const total = cartArray.some((item) => item.id === id);
  if (total) {
    //Incremento la cantidad
    cartArray.map((item) => (item.id === id ? item.cantidad++ : item.cantidad));
  } else {
    //Busco el id en el array de productos
    let product = planetsArray.find((item) => item.id === id);
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
      cardClonada.querySelector(".cart-title").innerHTML = `<strong>${item.name}</strong><br>$${item.price * item.cantidad} M.`;
      cardClonada.querySelector(".cart-amount").innerHTML = item.cantidad;
      cartContainer.appendChild(cardClonada);
      //Escuchadores
      cardClonada.querySelector(".cart-delete button").addEventListener("click", () => productDelete(index));
      cardClonada.querySelectorAll(".cart-add button")[0].addEventListener("click", () => productEdit(index, 0));
      cardClonada.querySelectorAll(".cart-add button")[1].addEventListener("click", () => productEdit(index, 1));
    });
    cartFooter.classList.remove("hide");
    cartEmpty.classList.add("hide");
    cartOpen();
  } else {
    cartFooter.classList.add("hide");
    cartEmpty.classList.remove("hide");
  }
  //Guardo el carrito en el local storage
  localStorage.setItem("cart", JSON.stringify(cartArray));
};

//Abrir y cerrar el carrito y los filtros
const cartOpen = () => document.querySelector("aside").classList.add("cartOpen");
const cartClose = () => document.querySelector("aside").classList.remove("cartOpen");
const filtersOpen = () => document.querySelector("nav").classList.toggle("filtersOpen");

document.querySelector(".cart-open button").addEventListener("click", cartOpen);
document.querySelector("aside .cart-close button").addEventListener("click", cartClose);
document.querySelector(".btn-continue").addEventListener("click", cartClose);
document.querySelector("nav .cart-close button").addEventListener("click", filtersOpen);
document.querySelector(".menu button").addEventListener("click", filtersOpen);

//Incio
cartRender();
