(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const r of t.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function c(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=c(e);fetch(e.href,t)}})();const f="NKfpM5UvowsmCLMzAUmqihz3Fsx0dtjP",u=async(n=0)=>{var o;const c=await(await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${f}&page=${n}&size=20`)).json();return{events:((o=c._embedded)==null?void 0:o.events)||[],totalPages:c.page.totalPages}},l=document.getElementById("cardList");let m=0;async function p(){const n=await u(m);n.totalPages,g(n.events)}function g(n){l.innerHTML="",n.forEach((s,c)=>{var a,i,d;const o=((a=s.images[0])==null?void 0:a.url)||"",e=s.dates.start.localDate,t=((d=(i=s._embedded)==null?void 0:i.venues[0])==null?void 0:d.name)||"Unknown",r=document.createElement("li");r.className="card",r.style.animationDelay=`${c*.1}s`,r.innerHTML=`
      <img class="card-img" src="${o}" alt="${s.name}" />
      <h3 class="card-title">${s.name}</h3>
      <p class="card-date">${e}</p>
      <p class="card-place">
      <svg class="location-icon">
            <use href="../img/svg/symbol-defs[1].svg#icon-vector"></use>
        </svg>
        ${t}
      </p>
    `,l.appendChild(r)})}p();u();
//# sourceMappingURL=commonHelpers.js.map
