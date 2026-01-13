const API_KEY = "NKfpM5UvowsmCLMzAUmqihz3Fsx0dtjP";

export const getEventsApi = async () => {
    return await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${API_KEY}`)
    .then(response => response.json())
    .then(event => console.log(event._embedded.events))
}