let planetsArray = [];

//Nodos
const cardsContainer = document.querySelector(".cards-container"),
  templateCard = document.querySelector("#template-cards"),
  card = templateCard.content.querySelector("article");

//Render planetas
const cardsRender = (array) => {
  //Elimino todos los nodos y renderizo las cards de planetas
  cardsContainer.innerHTML = "";
  for (let item of array) {
    let cardClonada = card.cloneNode(true);
    item.moons ? (moons = "Has one or more moons") : (moons = "Has no moons");
    cardClonada.querySelector("img").src = `./assets/${item.image}`;
    cardClonada.querySelector(".card-title").innerText = item.name;
    cardClonada.querySelector(".card-description").innerText = ` Distance: ${item.distance} million km.\nType: ${item.type}\nRadius: ${item.radius} million km.\n${moons}`;
    cardClonada.querySelector(".card-price").innerText = `$${item.price} M`;
    cardClonada.querySelector("button").addEventListener("click", () => addPlanet(item.id));
    cardsContainer.appendChild(cardClonada);
  }
};

//Buscador de planetas
let searchText = "";
const searchOpen = (e) => {
  document.querySelector(".search-btn").classList.add("hide");
  document.querySelector(".search-input").classList.remove("hide");
};
const search = (e) => {
  for (const item of buttonsFilters) item.classList.remove("text-primary");
  searchText = e.target.value.toLowerCase();
  filtered = planetsArray.filter((item) => item.name.toLowerCase().includes(searchText));
  cardsRender(filtered);
};
document.querySelector(".search-input").addEventListener("keyup", search);
document.querySelector(".search-btn").addEventListener("click", searchOpen);

//Filtros
const addFilter = (i) => {
  filtersOpen();
  for (const item of buttonsFilters) item.classList.remove("text-primary");
  buttonsFilters[i].classList.add("text-primary");
  let filtered;
  const order = (a, b) => {
    if (a.radius < b.radius) return -1;
    if (a.radius < b.radius) return 1;
    return 0;
  };
  switch (i) {
    case 0:
      filtered = planetsArray;
      break;
    case 1:
      filtered = planetsArray.filter((item) => item.type === "Terrestrial");
      break;
    case 2:
      filtered = planetsArray.filter((item) => item.type === "Gas giants");
      break;
    case 3:
      filtered = planetsArray.filter((item) => item.moons === true);
      break;
    case 4:
      filtered = planetsArray.filter((item) => item.radius <= 6371);
      filtered.sort(order);
      break;
    case 5:
      filtered = planetsArray.filter((item) => item.radius > 6371);
      filtered.sort(order);
      break;
  }
  cardsRender(filtered);
};
const buttonsFilters = document.querySelectorAll(".addFilter");
for (let i = 0; i < buttonsFilters.length; i++) buttonsFilters[i].addEventListener("click", () => addFilter(i));

//Abre y cierra el panel de filtros
const filtersOpen = () => {
  document.querySelector("nav").classList.toggle("filtersOpen");
  document.querySelector(".search-input").classList.add("hide");
  document.querySelector(".search-btn").classList.remove("hide");
};
document.querySelector("nav .cart-close button").addEventListener("click", filtersOpen);
document.querySelector(".menu button").addEventListener("click", filtersOpen);

//Base de datos con fetch
async function getData() {
  let res = await fetch("./assets/data.json"),
    json = await res.json();
  planetsArray = json;
  cardsRender(planetsArray);
}

//Inicio
getData();
