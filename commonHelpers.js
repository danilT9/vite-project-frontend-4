(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function n(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(s){if(s.ep)return;s.ep=!0;const o=n(s);fetch(s.href,o)}})();const h="NKfpM5UvowsmCLMzAUmqihz3Fsx0dtjP",g=async(e=0)=>{var a;const n=await(await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${h}&page=${e}&size=20`)).json();return console.log(n._embedded),{events:((a=n._embedded)==null?void 0:a.events)||[],totalPages:n.page.totalPages}},f=document.getElementById("cardList");let v=0;async function y(){const e=await g(v);return e.totalPages,b(e.events),e.events}function b(e){f.innerHTML="",e.forEach((t,n)=>{var d,r,_;const a=((d=t.images[0])==null?void 0:d.url)||"",s=t.dates.start.localDate,o=((_=(r=t._embedded)==null?void 0:r.venues[0])==null?void 0:_.name)||"Unknown",i=document.createElement("li");i.className="card",i.style.animationDelay=`${n*.1}s`,i.innerHTML=`
      <img class="card-img" src="${a}" alt="${t.name}" />
      <h3 class="card-title">${t.name}</h3>
      <p class="card-date">${s}</p>
      <p class="card-place">
      <svg class="location-icon">
            <use href="./img/svg/icons.svg#icon-vector"></use>
        </svg>
        ${o}
      </p>
    `,f.appendChild(i)})}y();const $="NKfpM5UvowsmCLMzAUmqihz3Fsx0dtjP",E=async e=>{try{const t=await fetch(`https://app.ticketmaster.com/discovery/v2/events/${e}.json?apikey=${$}`);if(!t.ok)throw new Error(`HTTP error! status: ${t.status}`);return await t.json()}catch(t){return console.error("Error fetching event details:",t),null}},p=document.getElementById("eventsModalThumb"),m=document.getElementById("events-modal");function w(e){const t=new Date(e),n=t.getFullYear(),a=String(t.getMonth()+1).padStart(2,"0"),s=String(t.getDate()).padStart(2,"0"),o=String(t.getHours()).padStart(2,"0"),i=String(t.getMinutes()).padStart(2,"0");return`${n}-${a}-${s}<br>${o}:${i} (Kyiv/Ukraine)`}async function M(e){try{const t=await E(e);if(!t){console.error("Не вдалося отримати деталі події");return}return L(t),m.classList.remove("is-hidden"),I(),t}catch(t){console.error("Помилка при відкритті модалки:",t)}}function L(e){var i,d,r,_;function t(c,l){return c=Math.ceil(c),l=Math.floor(l),Math.floor(Math.random()*(l-c+1))+c}const n=((d=(i=e._embedded)==null?void 0:i.venues)==null?void 0:d[0])||{},a=((r=e.images)==null?void 0:r.find(c=>c.ratio==="16_9"))||((_=e.images)==null?void 0:_[0])||{url:""};function s(c,l=200){if(!c||c.length<=l)return c||"";let u=c.substring(0,l).lastIndexOf(" ");return u===-1&&(u=l),c.substring(0,u)+"..."}let o=s(n.accessibleSeatingDetail);p.innerHTML=`
    <button class="modal__button__close close-button">
      <svg class="modal__button__close__icon">
        <use href="./img/svg/icons.svg#icon-close"></use>
      </svg>
    </button>
    
    <img src="${a.url}" alt="${e.name}" class="modal__info-img-round">
    
    <div class="modal__info__thumb">
      <img src="${a.url}" alt="${e.name}" class="modal__info-img">
      
      <ul class="modal__info__list">
        <li class="modal__info__item">
          <h4 class="modal__info__item__title">INFO</h4>
          <p class="modal__info__item__text">${o||"Unfortunately, we found nothing about this event."}</p>
        </li>
        
        <li class="modal__info__item">
          <h4 class="modal__info__item__title">WHEN</h4>
          <p class="modal__info__item__text">${w(e.dates.start.dateTime)}</p>
        </li>
        
        <li class="modal__info__item">
          <h4 class="modal__info__item__title">WHERE</h4>
          <p class="modal__info__item__text">${n.name}, ${n.city.name||""}</p>
        </li>
        
        <li class="modal__info__item">
                    <h4 class="modal__info__item__title">PRICES</h4>
                    <div class="modal__info__item__thumb">
                        <svg class="modal__info__item-rect">
                            <use href="./img/svg/icons.svg#icon-ticket"></use>
                        </svg>
                        <p class="modal__info__item__text">Standart ${t(100,300)}-${t(350,600)} UAH</p>
                    </div>
                    <button class="modal__info__item-btn" type="button" onclick="window.open('${e.url}', '_blank')">BUY TICKETS</button>
                    <div class="modal__info__item__thumb">
                        <svg class="modal__info__item-rect">
                            <use href="./img/svg/icons.svg#icon-ticket"></use>
                        </svg>
                        <p class="modal__info__item__text">VIP ${t(800,1e3)}-${t(1100,1600)} UAH</p>
                    </div>
                    <button class="modal__info__item-btn" type="button" onclick="window.open('${e.url}', '_blank')">BUY TICKETS</button>
            </li>
      </ul>
    </div>
    
    <button type="button" class="modal__info-btn" onclick="window.open('${e.url}', '_blank')">
      MORE FROM THIS AUTHOR
    </button>
  `}function I(){const e=p.querySelector(".close-button");e&&(e.onclick=()=>{m.classList.add("is-hidden")}),m.onclick=function(t){t.target===m&&m.classList.add("is-hidden")}}g();setTimeout(()=>{const e=document.getElementById("cardList");function t(){e.addEventListener("click",async n=>{const a=n.target.closest(".card");if(!a)return;const s=e.querySelectorAll(".card"),o=Array.from(s).indexOf(a);try{const r=(await(await fetch("https://app.ticketmaster.com/discovery/v2/events.json?apikey=NKfpM5UvowsmCLMzAUmqihz3Fsx0dtjP&page=0&size=20")).json())._embedded.events;r[o]&&M(r[o].id)}catch(i){console.error("Помилка:",i)}})}t()},1e3);
//# sourceMappingURL=commonHelpers.js.map
