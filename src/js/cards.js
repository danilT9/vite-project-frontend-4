import { getEventsApi } from "./api/getEventsApi.js";

const cardList = document.getElementById('cardList');

let currentPage = 0;
let totalPages = 0;

export async function fetchEvents() {
  const data = await getEventsApi(currentPage);

  totalPages = data.totalPages;

  renderCards(data.events);
  return data.events
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
            <use href="./img/svg/icons.svg#icon-vector"></use>
        </svg>
        ${place}
      </p>
    `;
    
    cardList.appendChild(card);
  });
}

fetchEvents()
