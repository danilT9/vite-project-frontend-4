// // let selectedEventId = null;

// // export function handleCardClick(event) {
// //   selectedEventId = event.id;
// //   console.log('Clicked event ID:', selectedEventId);
  
// //   const modal = document.getElementById("events-modal");
// //   modal.classList.remove("is-hidden");
  
// //   const close = document.querySelector(".close-button");
// //   close.addEventListener('click', () => {
// //       modal.classList.add("is-hidden");
// //   });
  
// //   return selectedEventId;
// // }


// // card.addEventListener('click', () => handleCardClick(event));
const API_KEY = "NKfpM5UvowsmCLMzAUmqihz3Fsx0dtjP";

export const getEventByIdApi = async (eventId) => {
  try {
    const response = await fetch(
      `https://app.ticketmaster.com/discovery/v2/events/${eventId}.json?apikey=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching event details:', error);
    return null;
  }
};