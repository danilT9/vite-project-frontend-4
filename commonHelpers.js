(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))c(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&c(r)}).observe(document,{childList:!0,subtree:!0});function n(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function c(o){if(o.ep)return;o.ep=!0;const s=n(o);fetch(o.href,s)}})();const g="NKfpM5UvowsmCLMzAUmqihz3Fsx0dtjP",I=async(t=0)=>{var c;const n=await(await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${g}&page=${t}&size=20`)).json();return{events:((c=n._embedded)==null?void 0:c.events)||[],totalPages:n.page.totalPages}},M=async(t=0,e,n="")=>{var s;const o=await(await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${g}&page=${t}&size=20&keyword=${e}&countryCode=${n}`)).json();return{events:((s=o._embedded)==null?void 0:s.events)||[],totalPages:o.page.totalPages}},T="/vite-project-frontend-4/assets/icons-062340aa.svg#icon-vector";localStorage.setItem("page",0);const h=document.querySelector(".filter"),S=document.getElementById("cardList"),p=document.querySelector(".search");let v=Number(localStorage.getItem("page"));p.value="";h.value="";const y=async(t,e="",n="")=>await M(t,e,n).then(c=>{const o=c.events;S.innerHTML="",o.forEach((s,r)=>{var i,d,b,$,w,E;const u=((i=s.images[0])==null?void 0:i.url)||"",l=((b=(d=s.dates)==null?void 0:d.start)==null?void 0:b.localDate)||"Unknown date",f=((E=(w=($=s._embedded)==null?void 0:$.venues)==null?void 0:w[0])==null?void 0:E.name)||"Unknown",a=document.createElement("li");a.className="card",a.style.animationDelay=`${r*.1}s`,a.innerHTML=`
            <img class="card-img" src="${u}" alt="${s.name}" />
            <h3 class="card-title">${s.name}</h3>
            <p class="card-date">${l}</p>
            <p class="card-place">
            <svg class="location-icon">
                    <use href="${T}"></use>
                </svg>
                ${f}
            </p>
            `,S.appendChild(a)})});y(v,p.value);const P=t=>{t.preventDefault();const e=t.target.value,n=h.value;y(v,e,n)},j=t=>{t.preventDefault();const e=p.value,n=t.target.value;y(v,e,n)};h.addEventListener("change",_.debounce(j,500));p.addEventListener("input",_.debounce(P,500));document.getElementById("cardList");const U=async t=>{try{const e=await fetch(`https://app.ticketmaster.com/discovery/v2/events/${t}.json?apikey=${g}`);if(!e.ok)throw new Error(`HTTP error! status: ${e.status}`);return await e.json()}catch(e){return console.error("Error fetching event details:",e),null}},A="/vite-project-frontend-4/assets/icons-062340aa.svg#icon-close",k="/vite-project-frontend-4/assets/icons-062340aa.svg#icon-ticket",L=document.getElementById("eventsModalThumb"),m=document.getElementById("events-modal");function C(t){const e=new Date(t),n=e.getFullYear(),c=String(e.getMonth()+1).padStart(2,"0"),o=String(e.getDate()).padStart(2,"0"),s=String(e.getHours()).padStart(2,"0"),r=String(e.getMinutes()).padStart(2,"0");return`${n}-${c}-${o}<br>${s}:${r} (Kyiv/Ukraine)`}async function O(t){try{const e=await U(t);if(!e){console.error("Не вдалося отримати деталі події");return}return H(e),m.classList.remove("is-hidden"),B(),e}catch(e){console.error("Помилка при відкритті модалки:",e)}}function H(t){var r,u,l,f;function e(a,i){return a=Math.ceil(a),i=Math.floor(i),Math.floor(Math.random()*(i-a+1))+a}const n=((u=(r=t._embedded)==null?void 0:r.venues)==null?void 0:u[0])||{},c=((l=t.images)==null?void 0:l.find(a=>a.ratio==="16_9"))||((f=t.images)==null?void 0:f[0])||{url:""};function o(a,i=200){if(!a||a.length<=i)return a||"";let d=a.substring(0,i).lastIndexOf(" ");return d===-1&&(d=i),a.substring(0,d)+"..."}let s=o(n.accessibleSeatingDetail);L.innerHTML=`
    <button class="modal__button__close close-button">
      <svg class="modal__button__close__icon">
        <use href="${A}"></use>
      </svg>
    </button>
    
    <img src="${c.url}" alt="${t.name}" class="modal__info-img-round">
    
    <div class="modal__info__thumb">
      <img src="${c.url}" alt="${t.name}" class="modal__info-img">
      
      <ul class="modal__info__list">
        <li class="modal__info__item">
          <h4 class="modal__info__item__title">INFO</h4>
          <p class="modal__info__item__text">${s||"Unfortunately, we found nothing about this event."}</p>
        </li>
        
        <li class="modal__info__item">
          <h4 class="modal__info__item__title">WHEN</h4>
          <p class="modal__info__item__text">${C(t.dates.start.dateTime)}</p>
        </li>
        
        <li class="modal__info__item">
          <h4 class="modal__info__item__title">WHERE</h4>
          <p class="modal__info__item__text">${n.name}, ${n.city.name||""}</p>
        </li>
        
        <li class="modal__info__item">
                    <h4 class="modal__info__item__title">PRICES</h4>
                    <div class="modal__info__item__thumb">
                        <svg class="modal__info__item-rect">
                            <use href="${k}"></use>
                        </svg>
                        <p class="modal__info__item__text">Standart ${e(100,300)}-${e(350,600)} UAH</p>
                    </div>
                    <button class="modal__info__item-btn" type="button" onclick="window.open('${t.url}', '_blank')">BUY TICKETS</button>
                    <div class="modal__info__item__thumb">
                        <svg class="modal__info__item-rect">
                            <use href="${k}"></use>
                        </svg>
                        <p class="modal__info__item__text">VIP ${e(800,1e3)}-${e(1100,1600)} UAH</p>
                    </div>
                    <button class="modal__info__item-btn" type="button" onclick="window.open('${t.url}', '_blank')">BUY TICKETS</button>
            </li>
      </ul>
    </div>
    
    <button type="button" class="modal__info-btn" onclick="window.open('${t.url}', '_blank')">
      MORE FROM THIS AUTHOR
    </button>
  `}function B(){const t=L.querySelector(".close-button");t&&(t.onclick=()=>{m.classList.add("is-hidden")}),m.onclick=function(e){e.target===m&&m.classList.add("is-hidden")}}I();setTimeout(()=>{const t=document.getElementById("cardList");function e(){t.addEventListener("click",async n=>{const c=n.target.closest(".card");if(!c)return;const o=t.querySelectorAll(".card"),s=Array.from(o).indexOf(c);try{const l=(await(await fetch("https://app.ticketmaster.com/discovery/v2/events.json?apikey=NKfpM5UvowsmCLMzAUmqihz3Fsx0dtjP&page=0&size=20")).json())._embedded.events;l[s]&&O(l[s].id)}catch(r){console.error("Помилка:",r)}})}e()},1e3);
//# sourceMappingURL=commonHelpers.js.map
