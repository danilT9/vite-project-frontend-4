(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function n(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(o){if(o.ep)return;o.ep=!0;const s=n(o);fetch(o.href,s)}})();const g="NKfpM5UvowsmCLMzAUmqihz3Fsx0dtjP",h=async(e=0)=>{var i;const n=await(await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${g}&page=${e}&size=20`)).json();return console.log(n._embedded),{events:((i=n._embedded)==null?void 0:i.events)||[],totalPages:n.page.totalPages}};document.getElementById("cardList");const v="NKfpM5UvowsmCLMzAUmqihz3Fsx0dtjP",y=async e=>{try{const t=await fetch(`https://app.ticketmaster.com/discovery/v2/events/${e}.json?apikey=${v}`);if(!t.ok)throw new Error(`HTTP error! status: ${t.status}`);return await t.json()}catch(t){return console.error("Error fetching event details:",t),null}},b="/vite-project-frontend-4/assets/icons-062340aa.svg#icon-close",f="/vite-project-frontend-4/assets/icons-062340aa.svg#icon-ticket",p=document.getElementById("eventsModalThumb"),d=document.getElementById("events-modal");function $(e){const t=new Date(e),n=t.getFullYear(),i=String(t.getMonth()+1).padStart(2,"0"),o=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),a=String(t.getMinutes()).padStart(2,"0");return`${n}-${i}-${o}<br>${s}:${a} (Kyiv/Ukraine)`}async function w(e){try{const t=await y(e);if(!t){console.error("Не вдалося отримати деталі події");return}return E(t),d.classList.remove("is-hidden"),M(),t}catch(t){console.error("Помилка при відкритті модалки:",t)}}function E(e){var a,_,l,u;function t(r,c){return r=Math.ceil(r),c=Math.floor(c),Math.floor(Math.random()*(c-r+1))+r}const n=((_=(a=e._embedded)==null?void 0:a.venues)==null?void 0:_[0])||{},i=((l=e.images)==null?void 0:l.find(r=>r.ratio==="16_9"))||((u=e.images)==null?void 0:u[0])||{url:""};function o(r,c=200){if(!r||r.length<=c)return r||"";let m=r.substring(0,c).lastIndexOf(" ");return m===-1&&(m=c),r.substring(0,m)+"..."}let s=o(n.accessibleSeatingDetail);p.innerHTML=`
    <button class="modal__button__close close-button">
      <svg class="modal__button__close__icon">
        <use href="${b}"></use>
      </svg>
    </button>
    
    <img src="${i.url}" alt="${e.name}" class="modal__info-img-round">
    
    <div class="modal__info__thumb">
      <img src="${i.url}" alt="${e.name}" class="modal__info-img">
      
      <ul class="modal__info__list">
        <li class="modal__info__item">
          <h4 class="modal__info__item__title">INFO</h4>
          <p class="modal__info__item__text">${s||"Unfortunately, we found nothing about this event."}</p>
        </li>
        
        <li class="modal__info__item">
          <h4 class="modal__info__item__title">WHEN</h4>
          <p class="modal__info__item__text">${$(e.dates.start.dateTime)}</p>
        </li>
        
        <li class="modal__info__item">
          <h4 class="modal__info__item__title">WHERE</h4>
          <p class="modal__info__item__text">${n.name}, ${n.city.name||""}</p>
        </li>
        
        <li class="modal__info__item">
                    <h4 class="modal__info__item__title">PRICES</h4>
                    <div class="modal__info__item__thumb">
                        <svg class="modal__info__item-rect">
                            <use href="${f}"></use>
                        </svg>
                        <p class="modal__info__item__text">Standart ${t(100,300)}-${t(350,600)} UAH</p>
                    </div>
                    <button class="modal__info__item-btn" type="button" onclick="window.open('${e.url}', '_blank')">BUY TICKETS</button>
                    <div class="modal__info__item__thumb">
                        <svg class="modal__info__item-rect">
                            <use href="${f}"></use>
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
  `}function M(){const e=p.querySelector(".close-button");e&&(e.onclick=()=>{d.classList.add("is-hidden")}),d.onclick=function(t){t.target===d&&d.classList.add("is-hidden")}}h();setTimeout(()=>{const e=document.getElementById("cardList");function t(){e.addEventListener("click",async n=>{const i=n.target.closest(".card");if(!i)return;const o=e.querySelectorAll(".card"),s=Array.from(o).indexOf(i);try{const l=(await(await fetch("https://app.ticketmaster.com/discovery/v2/events.json?apikey=NKfpM5UvowsmCLMzAUmqihz3Fsx0dtjP&page=0&size=20")).json())._embedded.events;l[s]&&w(l[s].id)}catch(a){console.error("Помилка:",a)}})}t()},1e3);
//# sourceMappingURL=commonHelpers.js.map
