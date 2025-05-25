(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const n of a)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function t(a){const n={};return a.integrity&&(n.integrity=a.integrity),a.referrerPolicy&&(n.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?n.credentials="include":a.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(a){if(a.ep)return;a.ep=!0;const n=t(a);fetch(a.href,n)}})();class c{constructor(e,t="carouselExample"){this.parent=e,this.id=t}addListeners(e,t){document.getElementById(`${e.id}`).addEventListener("click",t)}getCarousel(e){const t=[e.image1,e.image2,e.image3];return`
      <div class="carousel-card" id="${e.id}" data-id="${e.id}">
      <div id="${this.id}" class="carousel carousel-dark slide" data-bs-ride="carousel" data-bs-interval="3000">
        <div class="carousel-inner">
          ${t.map((s,a)=>`
            <div class="carousel-item ${a===0?"active":""}">
              <img src="${s}" class="d-block w-100" alt="Slide ${a+1}">
            </div>
          `).join("")}
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#${this.id}" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Предыдущий</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#${this.id}" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Следующий</span>
        </button>
      </div>
      <div class="video-meta">
        <div class="video-meta-row">
          <img src="${e.avatar}" alt="Автор" class="video-avatar">
          <div class="video-text">
            <h6 class="video-title">${e.title}</h6>
            <p class="video-author">${e.author}</p>
            <p class="video-stats">${e.views} тыс. просмотров • ${e.date}</p>
          </div>
        </div>
      </div>
      </div>
      `}render(e,t){this.data=e;const s=this.getCarousel(e);this.parent.insertAdjacentHTML("beforeend",s),this.addListeners(e,t)}}class h{constructor(e,t){this.parent=e,this.id=t}getHTML(e){const t=[e.image1,e.image2,e.image3];return`
        <div class="carousel-card-full" >
        <div id="${this.id}" class="carousel carousel-dark slide" data-bs-ride="carousel">
          <div class="carousel-inner-full">
            ${t.map((s,a)=>`
              <div class="carousel-item ${a===0?"active":""}">
                <img src="${s}" class="d" alt="Slide ${a+1}">
                <p>Момент из видео №${a}</.p>
              </div>
            `).join("")}
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#${this.id}" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Предыдущий</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#${this.id}" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Следующий</span>
          </button>
        </div>
        <div class="video-meta-full">
        <div class="video-meta-row-full">
          <img src="${e.avatar}" alt="Автор" class="video-avatar">
          <div class="video-text-full">
            <h6 class="video-title-full">${e.title}</h6>
            <p class="video-author-full">${e.author}</p>
            <p class="video-stats-full">${e.views} тыс. просмотров • ${e.date}</p>
            <p class="video-desc-full">${e.description}</p>
          </div>
        </div>
        </div>
        `}render(e){this.data=e;const t=this.getHTML(e);this.parent.insertAdjacentHTML("beforeend",t)}}class p{constructor(e){this.parent=e}addListeners(e){document.getElementById("back-button").addEventListener("click",e)}getHTML(){return`
                <button id="back-button" class="btn" type="button">Назад</button>
            `}render(e){const t=this.getHTML();this.parent.insertAdjacentHTML("beforeend",t),this.addListeners(e)}}class m{get(e){return fetch(e).then(t=>this._handleResponse(t)).catch(t=>this._handleError(t))}post(e,t){return fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}).then(s=>this._handleResponse(s)).catch(s=>this._handleError(s))}patch(e,t){return fetch(e,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}).then(s=>this._handleResponse(s)).catch(s=>this._handleError(s))}delete(e){return fetch(e,{method:"DELETE"}).then(t=>this._handleResponse(t)).catch(t=>this._handleError(t))}async _handleResponse(e){if(!e.ok)throw new Error(`HTTP error! status: ${e.status}`);try{return{data:await e.json(),status:e.status}}catch(t){return console.error("Ошибка парсинга JSON:",t),{data:null,status:e.status}}}_handleError(e){return console.error("Ошибка запроса:",e),Promise.reject(e)}}const i=new m;class g{constructor(){this.baseUrl="http://localhost:3000"}getVideocards(){return`${this.baseUrl}/videocards`}getVideocardById(e){return`${this.baseUrl}/videocards/${e}`}createVideocard(){return`${this.baseUrl}/videocards`}removeVideocardById(e){return`${this.baseUrl}/videocards/${e}`}updateVideocardById(e){return`${this.baseUrl}/videocards/${e}`}}const d=new g;class v{constructor(e,t){this.parent=e,this.id=t}getHTML(){return`
                <div id="video_page"><h6>Страница с видео</h6></div>
                <div> <h5>Редактировать: </h5>
                <input id="new-title" class="patch" placeholder="Изменить название ролика">
                <input id="new-description" class="patch" placeholder="Изменить описание">
                <input id="new-author" class="patch" placeholder="Изменить никнейм автора">
                <input id="new-views" type="number" class="patch" placeholder="Подкрутить просмотры">
                <input id="new-date" class="patch" placeholder="Поменять дату выпуска">  
                <button id="save-button" class="btn-long" type="button">Сохранить изменения</button>
                </div>
            `}get pageRoot(){return document.getElementById("video_page")}getData(){i.get(d.getVideocardById(this.id)).then(({data:e})=>{this.currentData=e,this.renderData(e),this.updateFormFields(e)}).catch(e=>console.error("Ошибка загрузки данных:",e))}updateFormFields(e){e&&(document.getElementById("new-title").value=e.title||"",document.getElementById("new-description").value=e.description||"",document.getElementById("new-author").value=e.author||"",document.getElementById("new-views").value=e.views||0,document.getElementById("new-date").value=e.date||"")}renderData(e){const t=this.pageRoot.querySelector(".video-card-full");t&&t.remove();const s=document.createElement("div");s.className="video-card-full",this.pageRoot.appendChild(s),new h(s,`carousel-${this.id}-full`).render(e)}clickBack(){new u(this.parent).render()}render(){this.parent.innerHTML="";const e=this.getHTML();this.parent.insertAdjacentHTML("beforeend",e),new p(this.pageRoot).render(this.clickBack.bind(this)),document.getElementById("save-button").addEventListener("click",this.patchCard.bind(this)),this.getData(),document.getElementById("new-title").value=data.title,document.getElementById("new-description").value=data.description,document.getElementById("new-author").value=data.author,document.getElementById("new-views").value=data.views,document.getElementById("new-date").value=data.date}patchCard(){const e={title:document.getElementById("new-title").value,description:document.getElementById("new-description").value,author:document.getElementById("new-author").value,views:document.getElementById("new-views").value,date:document.getElementById("new-date").value};i.patch(d.updateVideocardById(this.id),e).then(({data:t})=>{this.currentData={...this.currentData,...e},this.renderData(this.currentData)}).catch(t=>console.error("Ошибка обновления:",t))}}function y(r,e){return r.join(e)}function b(r){return r.filter(Boolean)}function f(r,e){let t=0;for(let s of r)e.startsWith(s)&&t++;return t}function w(r){const e=new Map;for(let a of r){if(typeof a!="string"||!a.trim())continue;const n=a.split("").sort().join("");e.has(n)||e.set(n,[]),e.get(n).push(a)}return Array.from(e.values()).filter(a=>a.length>1).map(a=>a.sort()).sort((a,n)=>a[0].localeCompare(n[0])).map(a=>a.join(", ")).join("<br>")}class u{constructor(e){this.parent=e,this.originalData=[]}getTopHeader(){return`  
                <header class="header">
                <div class="logo"><img src="images/youtube-logo-png-white.png" alt="logo" class="main-logo"></div>
                <input id="views-min" type="number" class="search" placeholder="мин просмотров">
                <input id="views-max" type="number" class="search" placeholder="макс просмотров">
                <button id="filter-button" class="btn-long" type="button">Фильтровать</button>
                <button id="add-card" class="btn" type="button">Добавить</button>
                <input id="delete-id" type="number" class="search" placeholder="Какой номер удалить">
                <button id="delete-card" class="btn" type="button">Удалить</button>
                </header>
                

                <div class="main-layout">
                    <div class="buttons">
                        
                        <p id="cont">lol</p>
                        <p id="erase">lol2</p>
                        <p id="pref">lol3</p>
                        <p id="anag">lol4</p>
                    </div>
                <div id="video-grid" class="video-grid"></div>
            </div>
            `}getData(){i.get(d.getVideocards()).then(({data:e})=>{this.originalData=e,this.renderData(e)}).catch(e=>{console.error("Ошибка загрузки данных:",e)})}renderData(e){this.pageRoot||(this.pageRoot=document.getElementById("video-grid")),this.pageRoot.innerHTML="",e.forEach((t,s)=>{const a=document.createElement("div");a.className="video-card",this.pageRoot.appendChild(a),new c(a,`carousel-${s}`).render(t,this.clickCard.bind(this))})}clickCard(e){if(e.target.closest(".carousel-control-prev")||e.target.closest(".carousel-control-next"))return;const t=e.currentTarget.dataset.id;new v(this.parent,t).render()}addCard(){console.log("Нажата кнопка добавления");const e={title:"Новое видео"+Date.now(),author:"Новый автор"+Date.now(),views:0,date:"сегодня",image1:"images/image1.jpg",image2:"images/image2.jpg",image3:"images/image3.jpg",avatar:"images/avatar.jpg",description:"Описание нового видео"};i.post(d.createVideocard(),e).then(()=>this.getData()).catch(t=>console.error("Ошибка добавления карточки:",t))}deleteCardById(){const e=document.getElementById("delete-id"),t=parseInt(e.value);if(isNaN(t)){alert("Введите корректный ID");return}i.delete(d.removeVideocardById(t)).then(({status:s})=>{s===200?this.getData():alert("Ошибка при удалении карточки")}).catch(s=>console.error("Ошибка удаления:",s))}filterByViews(e,t){const s=this.originalData.filter(a=>a.views>=e&&a.views<=t);this.renderData(s)}render(){this.parent.innerHTML="";const e=this.getTopHeader();this.parent.insertAdjacentHTML("beforeend",e),this.pageRoot=document.getElementById("video-grid"),document.getElementById("add-card").addEventListener("click",this.addCard.bind(this)),document.getElementById("delete-card").addEventListener("click",this.deleteCardById.bind(this)),document.getElementById("filter-button").addEventListener("click",this.handleFilterClick.bind(this)),this.getData(),this.updateStatistics()}renderFiltered(e){this.parent.innerHTML="";const t=this.getTopHeader();this.parent.insertAdjacentHTML("beforeend",t),document.getElementById("add-card").addEventListener("click",this.addCard.bind(this)),document.getElementById("delete-card").addEventListener("click",this.deleteCardById.bind(this)),document.getElementById("filter-button").addEventListener("click",this.handleFilterClick.bind(this));const s=document.getElementById("video-grid");for(let a=0;a<e.length;a++){const n=document.createElement("div");n.className="video-card",s.appendChild(n),new c(n,`carousel-${a}`).render(e[a],this.clickCard.bind(this))}this.updateStatistics()}updateStatistics(){const t=l.getData().map(n=>n.author);document.getElementById("cont").innerHTML="Все авторы - "+y(t," & ");const s=[...t,null,"",!1,void 0];document.getElementById("erase").innerHTML="Очищено - "+b(s).join(", ");const a="Лоуджики";document.getElementById("pref").innerHTML='Авторы Лоуджики (2.10)" — '+f(t,a),document.getElementById("anag").innerHTML="Анаграммы авторов: <br>"+w(t)}reindexCards(){const e=l.getData();for(let t=0;t<e.length;t++)e[t].id=t}handleFilterClick(){const e=parseInt(document.getElementById("views-min").value),t=parseInt(document.getElementById("views-max").value);if(isNaN(e)||isNaN(t)){alert("Введите оба значения");return}this.filterByViews(e,t)}}class E{constructor(){}getData(){return this.data}}const B=document.getElementById("root"),l=new E,I=new u(B);I.render();
