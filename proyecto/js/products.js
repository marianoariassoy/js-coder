const productsArray = [];
const cardsContainer = document.querySelector(".cards-container");

//Template
const templateCard = document.querySelector("#template-cards");
const card = templateCard.content.querySelector("article");

//Agrego productos al listado de productos
productsArray.push({ id: 0, nombre: "Moon", tipo: "Terrestrial", lunas: false, radio: 1737, imagen: "moon.png", precio: 1000, distance: 0.4 });
productsArray.push({ id: 1, nombre: "Mercury", tipo: "Terrestrial", lunas: false, radio: 2440, imagen: "mercury.png", precio: 3000, distance: 92 });
productsArray.push({ id: 2, nombre: "Venus", tipo: "Terrestrial", lunas: false, radio: 6052, imagen: "venus.png", precio: 2000, distance: 42 });
productsArray.push({ id: 3, nombre: "Earth", tipo: "Terrestrial", lunas: true, radio: 6371, imagen: "earth.png", precio: 0, distance: 0 });
productsArray.push({ id: 4, nombre: "Mars", tipo: "Terrestrial", lunas: true, radio: 3390, imagen: "mars.png", precio: 2000, distance: 78 });
productsArray.push({ id: 5, nombre: "Jupiter", tipo: "Gas giants", lunas: true, radio: 69911, imagen: "jupiter.png", precio: 5000, distance: 629 });
productsArray.push({ id: 6, nombre: "Saturn", tipo: "Gas giants", lunas: true, radio: 58232, imagen: "saturn.png", precio: 6000, distance: 1284 });
productsArray.push({ id: 7, nombre: "Uranus", tipo: "Gas giants", lunas: true, radio: 25362, imagen: "uranus.png", precio: 8000, distance: 2721 });
productsArray.push({ id: 8, nombre: "Neptune", tipo: "Gas giants", lunas: true, radio: 24622, imagen: "neptuno.png", precio: 9000, distance: 4345 });

//Renderizo las cards
for (let producto of productsArray) {
  if (producto.lunas) lunas = "Yes";
  else lunas = "No";
  let cardClonada = card.cloneNode(true);
  cardClonada.querySelector("img").src = `./assets/${producto.imagen}`;
  cardClonada.querySelector(".card-title").innerText = producto.nombre;
  cardClonada.querySelector(".card-description").innerText = `Distance: ${producto.distance} million km.\nType: ${producto.tipo}\nRadius: ${producto.radio} km. \nMoons: ${lunas}.`;
  cardClonada.querySelector(".card-price").innerText = `$${producto.precio}`;

  //Escuchador
  cardClonada.querySelector("button").addEventListener("click", () => agregarProducto(producto.id));

  cardsContainer.appendChild(cardClonada);
}
