const productsArray = [];
const cardsContainer = document.querySelector(".cards-container");

//Template
const templateCard = document.querySelector("#template-cards");
const card = templateCard.content.querySelector("article");

//Clase Producto
class Producto {
  constructor(id, name, type, moons, radius, image, price, distance) {
    this.id = id;
    this.name = name;
    this.type = `Type: ${type}`;
    if (moons) this.moons = "Has one or more moons";
    else this.moons = "Has no moons";
    this.radius = `Radius: ${radius} million km.`;
    this.image = image;
    this.price = price;
    this.distance = `Distance: ${distance} million km.`;
  }
}

//Agrego items al listado de items
productsArray.push(new Producto(0, "Moon", "Terrestrial", false, 1737, "moon.png", 1000, 0.4));
productsArray.push(new Producto(1, "Mercury", "Terrestrial", false, 2440, "mercury.png", 3000, 92));
productsArray.push(new Producto(2, "Venus", "Terrestrial", false, 6052, "venus.png", 2000, 42));
productsArray.push(new Producto(3, "Earth", "Terrestrial", true, 6371, "earth.png", 0, 0));
productsArray.push(new Producto(4, "Mars", "Terrestrial", true, 3390, "mars.png", 2000, 78));
productsArray.push(new Producto(5, "Jupiter", "Gas giants", true, 69911, "jupiter.png", 4000, 629));
productsArray.push(new Producto(6, "Saturn", "Gas giants", true, 58232, "saturn.png", 5000, 1284));
productsArray.push(new Producto(7, "Uranus", "Gas giants", true, 25362, "uranus.png", 7000, 2721));
productsArray.push(new Producto(8, "Neptune", "Gas giants", true, 24622, "neptuno.png", 8000, 4345));

const renderizarCards = () => {
  //Renderizo las cards
  for (let item of productsArray) {
    let cardClonada = card.cloneNode(true);
    cardClonada.querySelector("img").src = `./assets/${item.image}`;
    cardClonada.querySelector(".card-title").innerText = item.name;
    cardClonada.querySelector(".card-description").innerText = ` ${item.distance}\n${item.type}\n${item.radius}\n${item.moons}`;
    cardClonada.querySelector(".card-price").innerText = `$${item.price}`;
    cardClonada.querySelector("button").addEventListener("click", () => agregarProducto(item.id));
    cardsContainer.appendChild(cardClonada);
  }
};

//Inicio
renderizarCards();
