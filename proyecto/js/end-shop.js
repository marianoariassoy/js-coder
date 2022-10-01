//Variables globales
const freeShiping = 5000;
const iva = 0.28;

//Carrito en el local stogare
const cartArray = JSON.parse(localStorage.getItem("cart")) || [];

//Ordeno el array por distancia creciente
const order = (a, b) => {
  if (a.distance < b.distance) return -1;
  if (a.distance < b.distance) return 1;
  return 0;
};
cartArray.sort(order);

//Template
const cartContainer = document.querySelector(".container-travel");
const templateItemCart = document.querySelector("#template-travel");
const itemCart = templateItemCart.content.querySelector("article");

//Renderizo el carrito
const cartRender = () => {
  //Elimino todos los nodos
  cartContainer.innerHTML = "";

  cartArray.forEach((item) => {
    let cardClonada = itemCart.cloneNode(true);
    cardClonada.querySelector("img").src = `./assets/${item.image}`;
    cartContainer.appendChild(cardClonada);
  });

  //Texto descriptivo cuando son mas de 3 productos
  if (cartArray.length >= 3) {
    let rest = "";
    let arrayAux = cartArray.filter((item, index) => index > 0 && index < cartArray.length - 1);
    arrayAux.forEach((item) => (rest += item.name + ", "));
    rest = rest.substring(0, rest.length - 2);
    const text = `Your journey begins on ${cartArray[0].name}, continues with ${rest} and ends on ${cartArray[cartArray.length - 1].name}.`;
    document.querySelector(".travel-txt").innerText = text;
  }
};

//Calcular Montos
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
    document.querySelector("#precio-shiping").innerHTML = `$${costoEnvio} <br><small>Free shipping</small>`;
  }
  //Impuestos
  let ivaFinal = Math.round(subTotal * iva);
  document.querySelector("#precio-iva").innerHTML = `$${ivaFinal}`;
  //Precio final
  let costofinal = subTotal + costoEnvio + ivaFinal;
  let costoFinalCoutas = Math.round(costofinal / 12);
  document.querySelector("#precio-final").innerHTML = `$${costofinal} <br><small>Pay in 12 parts of $${costoFinalCoutas}</small>`;
};

//Modal
const modalOpen = () => {
  let error = false;
  let name = document.querySelector("#name").value;
  let email = document.querySelector("#email").value;

  if (!name) {
    error = true;
    Toastify({
      text: "Need your name ⚠",
      style: {
        background: "black",
        color: "white",
      },
    }).showToast();
  }
  if (!email) {
    error = true;
    Toastify({
      text: "Need your email ⚠",
      style: {
        background: "black",
        color: "white",
      },
    }).showToast();
  }

  if (!error) {
    localStorage.removeItem("cart");
    document.querySelector("#modal-overlay").classList.add("flex");
    let text = `<strong>Hi ${name}! Your payment was made successfully</strong> 🎉<br /> We have sent you an email at ${email}. <br /> Thank you very much for trusting us. <br /> <strong>Have a good trip!! 🚀</strong>`;
    document.querySelector(".modal-txt").innerHTML = text;
  }
};
document.querySelector("#btn-lift-off").addEventListener("click", modalOpen);

//Incio
cartRender();
calcularMontos();
