import { getEventsApi } from "./api/getEventsApi.js";

const cardList = document.getElementById('cardList');

let currentPage = 0;
let totalPages = 0;

async function loadEvents() {
  const data = await getEventsApi(currentPage);

  totalPages = data.totalPages;

  renderCards(data.events);
  renderPagination()
}

function renderCards(events) {
  cardList.innerHTML = '';

  events.forEach((event, index) => {
    const image = event.images[0]?.url || '';
    const date = event.dates?.start?.localDate || 'Unknown date';
    const place = event._embedded?.venues?.[0]?.name || 'Unknown';

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

    cardList.appendChild(card);
  });
}

loadEvents()




const pagination = document.getElementById('pagination')

function renderPagination() {
  pagination.innerHTML = '';

  const VISIBLE_PAGES = 5;

  let startPage = Math.max(0, currentPage - Math.floor(VISIBLE_PAGES / 2));
  let endPage = startPage + VISIBLE_PAGES - 1;

  if (endPage >= totalPages) {
    endPage = totalPages - 1;
    startPage = Math.max(0, endPage - VISIBLE_PAGES + 1);
  }

  const prevBtn = document.createElement('button');
  prevBtn.textContent = '◀';
  prevBtn.disabled = currentPage === 0;

  prevBtn.addEventListener('click', () => {
    currentPage--;
    loadEvents();
  });

  pagination.appendChild(prevBtn);


  for (let i = startPage; i <= endPage; i++) {
    const btn = document.createElement('button');
    btn.textContent = i + 1;

    if (i === currentPage) {
      btn.classList.add('active');
    }

    btn.addEventListener('click', () => {
      currentPage = i;
      loadEvents();
    });

    pagination.appendChild(btn);
  }

  const nextBtn = document.createElement('button');
  nextBtn.textContent = '▶';
  nextBtn.disabled = currentPage === totalPages - 1;

  nextBtn.addEventListener('click', () => {
    currentPage++;
    loadEvents();
  });

  pagination.appendChild(nextBtn);
}

