import { getEventsApi } from "./api/getEventsApi.js";

const cardList = document.getElementById('cardList');

let currentPage = 0;
let totalPages = 0;

async function fetchEvents() {
  const data = await getEventsApi(currentPage);

  totalPages = data.totalPages;

  renderCards(data.events);
}

function renderCards(events) {
  cardList.innerHTML = '';

  events.forEach((event, index) => {
    const image = event.images[0]?.url || '';
    const date = event.dates.start.localDate;
    const place = event._embedded?.venues[0]?.name || 'Unknown';

    const card = document.createElement('li');
    card.className = 'card';
    card.style.animationDelay = `${index * 0.1}s`;

    card.innerHTML = `
      <img class="card-img" src="${image}" alt="${event.name}" />
      <h3 class="card-title">${event.name}</h3>
      <p class="card-date">${date}</p>
      <p class="card-place">
      <svg class="location-icon">
            <use href="../img/svg/symbol-defs[1].svg#icon-vector"></use>
        </svg>
        ${place}
      </p>
    `;

    card.addEventListener('click', () => {
      const modal = document.getElementById("events-modal")
      modal.classList.remove("is-hidden")
      console.log(event.id);
      const close = document.querySelector(".close-button")
      close.addEventListener('click', ()=> {
        modal.classList.add("is-hidden")
      })
    })
    

    cardList.appendChild(card);
  });
}

fetchEvents()
