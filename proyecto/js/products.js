const productsArray = [];
const cardsContainer = document.querySelector(".cards-container");

//Template
const templateCard = document.querySelector("#template-cards");
const card = templateCard.content.querySelector("article");

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
  cardClonada.querySelector(".card-description").innerText = `It's a ${producto.tipo} planet with ${producto.radio} km. of radio.\nIt ${lunas}.`;
  cardClonada.querySelector(".card-price").innerText = `$${producto.precio}`;

  //Escuchador
  cardClonada.querySelector("button").addEventListener("click", () => agregarProducto(producto.id));

  cardsContainer.appendChild(cardClonada);
}
