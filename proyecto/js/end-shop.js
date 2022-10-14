//Variables globales
const freeShiping = 5000,
  iva = 0.28;

//Template
const cartContainer = document.querySelector(".container-travel"),
  templateItemCart = document.querySelector("#template-travel"),
  itemCart = templateItemCart.content.querySelector("article");

//Carrito en el local stogare
const cartArray = JSON.parse(localStorage.getItem("cart")) || [];

//Ordeno el array por distancia creciente
const order = (a, b) => {
  if (a.distance < b.distance) return -1;
  if (a.distance < b.distance) return 1;
  return 0;
};
cartArray.sort(order);

//Agrego a La Tierra en primer lugar donde comienza el itinerario
cartArray.unshift({ name: "Earth", image: "earth.png", price: 0, distance: 0, cantidad: 1 });

//Render del carrito
const cartRender = () => {
  //Elimino todos los nodos
  cartContainer.innerHTML = "";
  cartArray.forEach((item) => {
    let cardClonada = itemCart.cloneNode(true);
    cardClonada.querySelector("img").src = `./assets/${item.image}`;
    cartContainer.appendChild(cardClonada);
  });

  //Texto para el itenerario
  let rest = "";
  let text = "";
  const distance = cartArray.reduce((sum, val) => sum + val.distance, 0);

  if (cartArray.length >= 3) {
    let arrayAux = cartArray.filter((item, index) => index > 0 && index < cartArray.length - 1);
    arrayAux.forEach((item) => (rest += item.name + ", "));
    rest = rest.substring(0, rest.length - 2);
    text = `Your journey begins on ${cartArray[0].name}, continues with ${rest} and ends on ${cartArray[cartArray.length - 1].name}.`;
  } else {
    text = `Your journey begins on ${cartArray[0].name} and ends on ${cartArray[1].name}.`;
  }
  document.querySelector(".travel-txt").innerHTML = `${text} <br><span class="distance-txt">Total distance: ${distance} million Km.</span> `;
};

//Calcular montos finales
const calcularMontos = () => {
  //Subtotal
  let subTotal = 0;
  for (const item of cartArray) subTotal += item.price * item.cantidad;
  document.querySelector("#precio-subtotal").innerText = `$${subTotal} M`;
  //Envio
  if (subTotal <= freeShiping) {
    costoEnvio = 500;
    document.querySelector("#precio-shiping").innerHTML = `$${costoEnvio} M<br><small>Free shipping from $${freeShiping} M.</small>`;
  } else {
    costoEnvio = 0;
    document.querySelector("#precio-shiping").innerHTML = `$${costoEnvio} <br><small>Free shipping</small>`;
  }
  //Impuestos
  let ivaFinal = Math.round(subTotal * iva);
  document.querySelector("#precio-iva").innerHTML = `$${ivaFinal} M`;
  //Precio final
  let costofinal = subTotal + costoEnvio + ivaFinal;
  let costoFinalCoutas = Math.round(costofinal / 12);
  document.querySelector("#precio-final").innerHTML = `$${costofinal} M<br><small>Pay in 12 parts of $${costoFinalCoutas} M</small>`;
};

//Modal final
const modalOpen = () => {
  let error = false,
    name = document.querySelector("#name").value,
    email = document.querySelector("#email").value,
    card = document.querySelector("#card").value;

  if (!name) {
    error = true;
    Toastify({
      text: "⚠️ Please enter your name",
      style: {
        background: "black",
        color: "white",
      },
    }).showToast();
  } else if (!email) {
    error = true;
    Toastify({
      text: "⚠️ Please enter your email",
      style: {
        background: "black",
        color: "white",
      },
    }).showToast();
  } else if (!card) {
    error = true;
    Toastify({
      text: "⚠️ Please enter your credit card number",
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

const cleaveCard = new Cleave("#card", {
  creditCard: true,
});
const cleaveExpire = new Cleave("#expire", {
  date: true,
  datePattern: ["m", "y"],
});

//Incio
cartRender();
calcularMontos();
