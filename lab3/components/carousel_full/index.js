export class CarouselFullComponent {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
    }
  
    getHTML(data) {
        const images = [data.image1,data.image2,data.image3];
        return `
        <div class="carousel-card-full" >
        <div id="${this.id}" class="carousel carousel-dark slide" data-bs-ride="carousel">
          <div class="carousel-inner-full">
            ${images.map((img, index) => `
              <div class="carousel-item ${index === 0 ? 'active' : ''}">
                <img src="${img}" class="d" alt="Slide ${index + 1}">
                <p>Момент из видео №${index}</.p>
              </div>
            `).join('')}
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
          <img src="${data.avatar}" alt="Автор" class="video-avatar">
          <div class="video-text-full">
            <h6 class="video-title-full">${data.title}</h6>
            <p class="video-author-full">${data.author}</p>
            <p class="video-stats-full">${data.views} тыс. просмотров • ${data.date}</p>
            <p class="video-desc-full">${data.description}</p>
          </div>
        </div>
        </div>
        `;
    }
  
    render(data) {
        this.data = data; // сохраняем переданные данные
        const carouselHtml = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', carouselHtml);
    }
  }