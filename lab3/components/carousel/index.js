export class CarouselComponent {
  constructor(parent, id = 'carouselExample') {
      this.parent = parent;
      this.id = id;
  }

  addListeners(data, listener) {
    document
        .getElementById(`${data.id}`)
        .addEventListener("click", listener)
  }

  getCarousel(data) {
      const images = [data.image1,data.image2,data.image3];
      return `
      <div class="carousel-card" id="${data.id}" data-id="${data.id}">
      <div id="${this.id}" class="carousel carousel-dark slide" data-bs-ride="carousel" data-bs-interval="3000">
        <div class="carousel-inner">
          ${images.map((img, index) => `
            <div class="carousel-item ${index === 0 ? 'active' : ''}">
              <img src="${img}" class="d-block w-100" alt="Slide ${index + 1}">
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
      <div class="video-meta">
        <div class="video-meta-row">
          <img src="${data.avatar}" alt="Автор" class="video-avatar">
          <div class="video-text">
            <h6 class="video-title">${data.title}</h6>
            <p class="video-author">${data.author}</p>
            <p class="video-stats">${data.views} тыс. просмотров • ${data.date}</p>
          </div>
        </div>
      </div>
      </div>
      `;
  }

  render(data, listener) {
      this.data = data; // сохраняем переданные данные
      const carouselHtml = this.getCarousel(data);
      this.parent.insertAdjacentHTML('beforeend', carouselHtml);
      this.addListeners(data, listener)
  }
}