
const API_KEY = "NKfpM5UvowsmCLMzAUmqihz3Fsx0dtjP";

export const getEventsApi = async (page = 0) => {
  const response = await fetch(
    `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${API_KEY}&page=${page}&size=20`
  );

  const data = await response.json();
  console.log(data._embedded);
  return {
    events: data._embedded?.events || [],
    totalPages: data.page.totalPages
  };
};
