import { getEventsApi } from "./js/api/getEventsApi.js";
import "./js/header.js";
import "./js/cards.js";


getEventsApi()

import "./js/card-modal.js";

function setupCardClickHandlers() {
  const cardList = document.getElementById('cardList');
  
  cardList.addEventListener('click', (event) => {
    const card = event.target.closest('.card');
    if (!card) return;
    
    const eventId = card.dataset.eventId;
    
    window.handleCardClick(eventId);
    
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupCardClickHandlers();
  const checkInterval = setInterval(() => {
    const cards = document.querySelectorAll('.card');
    
    if (cards.length > 0) {
      cards.forEach((card) => {
        const eventId = card.dataset.eventId;
      });
      
      clearInterval(checkInterval);
    }
  }, 500);
  
  setTimeout(() => clearInterval(checkInterval), 10000);
});