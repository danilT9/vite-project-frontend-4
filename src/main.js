import { getEventsApi } from "./js/api/getEventsApi.js";
import "./js/header.js";
import "./js/cards.js";


getEventsApi()

import "./js/card-modal.js";
import { handleCardClick } from "./js/card-modal.js";

setTimeout(() => {
    const cardList = document.getElementById('cardList');

    function setupEventDelegation() {
      cardList.addEventListener('click', async (event) => {
        const card = event.target.closest('.card');
        if (!card) return;
        const cards = cardList.querySelectorAll('.card');
        const index = Array.from(cards).indexOf(card);
        
        try {
          const response = await fetch('https://app.ticketmaster.com/discovery/v2/events.json?apikey=NKfpM5UvowsmCLMzAUmqihz3Fsx0dtjP&page=0&size=20');
          const data = await response.json();
          const events = data._embedded.events;
          
          if (events[index]) {
            handleCardClick(events[index].id);
          }
        } catch (error) {
          console.error('Помилка:', error);
        }
      });
    }
    setupEventDelegation();
    
  }, 1000);