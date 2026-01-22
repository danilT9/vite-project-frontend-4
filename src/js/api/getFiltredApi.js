import { API_KEY } from "./getEventsApi";

export const getCountriesByApi = async() => {
    return await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${API_KEY}&size=200`)
        .then(res => res.json())
        .then(res => res._embedded.events);
};

export const getEventsByKeywordApi = async (page = 0, keyword, countryCode = "") => {
  const response = await fetch(
    `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${API_KEY}&page=${page}&size=20&keyword=${keyword}&countryCode=${countryCode}`
  );

  const data = await response.json();
  return {
    events: data._embedded?.events || [],
    totalPages: data.page.totalPages
  };
};
