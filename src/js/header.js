import { getEventsByKeywordApi } from "./api/getFiltredApi.js"
import vector from "../img/svg/icons.svg#icon-vector"

localStorage.setItem("page", 0);
const selectFilter = document.querySelector(".filter");
const cardList = document.getElementById("cardList");
const search = document.querySelector(".search");
let page = Number(localStorage.getItem("page"));
search.value = "";
selectFilter.value = "";

const getEvents = async(page, keyword = "", countryCode = "") => {
    return await getEventsByKeywordApi(page, keyword, countryCode).then(res => {
        const cards = res.events;
        cardList.innerHTML = "";
        
        cards.forEach((event, index) => {
            const image = event.images[0]?.url || '';
            const date = event.dates?.start?.localDate || 'Unknown date';
            const place = event._embedded?.venues?.[0]?.name || 'Unknown';
            const card = document.createElement('li');
            card.className = 'card';
            card.style.animationDelay = `${index * 0.1}s`;
            card.dataset.eventId = event.id;

            card.innerHTML = `
            <img class="card-img" src="${image}" alt="${event.name}" />
            <h3 class="card-title">${event.name}</h3>
            <p class="card-date">${date}</p>
            <p class="card-place">
            <svg class="location-icon">
                    <use href="${vector}"></use>
                </svg>
                ${place}
            </p>
            `;
            
            cardList.appendChild(card);
        });
    });
};
getEvents(page, search.value);

const searchEvent = e => {
    e.preventDefault();
    const keyword = e.target.value;
    const countryCode = selectFilter.value;
    getEvents(page, keyword, countryCode);
};
const searchFilterEvent = e => {
    e.preventDefault();
    const keyword = search.value;
    const countryCode = e.target.value;
    getEvents(page, keyword, countryCode);
};
selectFilter.addEventListener("change", _.debounce(searchFilterEvent, 500))
search.addEventListener("input", _.debounce(searchEvent, 500));