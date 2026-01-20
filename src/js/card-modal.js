import { getEventByIdApi } from "./api/getEventByIdApi.js";

const modalThumb = document.getElementById("eventsModalThumb");
const modalElement = document.getElementById("events-modal");

function formatDate(dateString) {
    const date = new Date(dateString);
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day}<br>${hours}:${minutes} (Kyiv/Ukraine)`;
}

export async function handleCardClick(eventId) {
  try {
    const eventData = await getEventByIdApi(eventId);
    
    if (!eventData) {
      console.error('Не вдалося отримати деталі події');
      return;
    }
    renderModal(eventData);
    
    modalElement.classList.remove("is-hidden");
    setupModalClose();
    
    return eventData;
  } catch (error) {
    console.error('Помилка при відкритті модалки:', error);
  }
}

function renderModal(eventData) {
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
  
  const venue = eventData._embedded?.venues?.[0] || {};
  const mainImage = eventData.images?.find(img => img.ratio === '16_9') || eventData.images?.[0] || { url: '' };

  function limitText(text, limit = 200) {
    if (!text || text.length <= limit) return text || '';
    let lastSpace = text.substring(0, limit).lastIndexOf(' ');
    
    if (lastSpace === -1) lastSpace = limit;

    return text.substring(0, lastSpace) + '...';
  }
  
  let accessibleInfo = limitText(venue.accessibleSeatingDetail);
  
  modalThumb.innerHTML = `
    <button class="modal__button__close close-button">
      <svg class="modal__button__close__icon">
        <use href="./img/svg/icons.svg#icon-close"></use>
      </svg>
    </button>
    
    <img src="${mainImage.url}" alt="${eventData.name}" class="modal__info-img-round">
    
    <div class="modal__info__thumb">
      <img src="${mainImage.url}" alt="${eventData.name}" class="modal__info-img">
      
      <ul class="modal__info__list">
        <li class="modal__info__item">
          <h4 class="modal__info__item__title">INFO</h4>
          <p class="modal__info__item__text">${accessibleInfo || 'Unfortunately, we found nothing about this event.'}</p>
        </li>
        
        <li class="modal__info__item">
          <h4 class="modal__info__item__title">WHEN</h4>
          <p class="modal__info__item__text">${formatDate(eventData.dates.start.dateTime)}</p>
        </li>
        
        <li class="modal__info__item">
          <h4 class="modal__info__item__title">WHERE</h4>
          <p class="modal__info__item__text">${venue.name}, ${venue.city.name || ''}</p>
        </li>
        
        <li class="modal__info__item">
                    <h4 class="modal__info__item__title">PRICES</h4>
                    <div class="modal__info__item__thumb">
                        <svg class="modal__info__item-rect">
                            <use href="./img/svg/icons.svg#icon-ticket"></use>
                        </svg>
                        <p class="modal__info__item__text">Standart ${getRandomInt(100, 300)}-${getRandomInt(350, 600)} UAH</p>
                    </div>
                    <button class="modal__info__item-btn" type="button" onclick="window.open('${eventData.url}', '_blank')">BUY TICKETS</button>
                    <div class="modal__info__item__thumb">
                        <svg class="modal__info__item-rect">
                            <use href="./img/svg/icons.svg#icon-ticket"></use>
                        </svg>
                        <p class="modal__info__item__text">VIP ${getRandomInt(800, 1000)}-${getRandomInt(1100, 1600)} UAH</p>
                    </div>
                    <button class="modal__info__item-btn" type="button" onclick="window.open('${eventData.url}', '_blank')">BUY TICKETS</button>
            </li>
      </ul>
    </div>
    
    <button type="button" class="modal__info-btn" onclick="window.open('${eventData.url}', '_blank')">
      MORE FROM THIS AUTHOR
    </button>
  `;
}

function setupModalClose() {
  const closeBtn = modalThumb.querySelector(".close-button");
  if (closeBtn) {
    closeBtn.onclick = () => {
      modalElement.classList.add("is-hidden");
    };
  }
  
  modalElement.onclick = function(event) {
    if (event.target === modalElement) {
      modalElement.classList.add("is-hidden");
    }
  };
}