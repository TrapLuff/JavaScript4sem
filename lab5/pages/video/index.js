import {MainPage} from "../main/index.js";
import {CarouselFullComponent} from '../../components/carousel_full/index.js';
import { model } from "../../main.js";
import {BackButtonComponent} from "../../components/backbutton/index.js";

import { ajax } from "../../modules/ajax.js";
import { videocardUrls } from "../../modules/videocardUrls.js";


export class VideoPage {
    constructor(parent, id) {
        this.parent = parent
        this.id = id
    }

    getHTML() {
        return (
            `
                <div id="video_page"><h6>Страница с видео</h6></div>
                <div> <h5>Редактировать: </h5>
                <input id="new-title" class="patch" placeholder="Изменить название ролика">
                <input id="new-description" class="patch" placeholder="Изменить описание">
                <input id="new-author" class="patch" placeholder="Изменить никнейм автора">
                <input id="new-views" type="number" class="patch" placeholder="Подкрутить просмотры">
                <input id="new-date" class="patch" placeholder="Поменять дату выпуска">  
                <button id="save-button" class="btn-long" type="button">Сохранить изменения</button>
                </div>
            `
        )
    }

    get pageRoot() {
        return document.getElementById('video_page')
    }

    getData() {
        ajax.get(videocardUrls.getVideocardById(this.id), (data) => {
            this.currentData = data;
            this.renderData(data);
            this.updateFormFields(data);
        })
    }

    updateFormFields(data) {
        if (!data) return;
        
        document.getElementById("new-title").value = data.title || '';
        document.getElementById("new-description").value = data.description || '';
        document.getElementById("new-author").value = data.author || '';
        document.getElementById("new-views").value = data.views || 0;
        document.getElementById("new-date").value = data.date || '';
    }

    renderData(item) {
        const oldCard = this.pageRoot.querySelector('.video-card-full');
        if (oldCard) oldCard.remove();
        
        const card = document.createElement('div');
        card.className = 'video-card-full';
        this.pageRoot.appendChild(card);
        
        const carousel = new CarouselFullComponent(card, `carousel-${this.id}-full`);
        carousel.render(item);
    }

    clickBack() {
        const mainPage = new MainPage(this.parent)
        mainPage.render()
    }

    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
    
        const backButton = new BackButtonComponent(this.pageRoot)
        backButton.render(this.clickBack.bind(this))
  

        document.getElementById("save-button").addEventListener('click', this.patchCard.bind(this));
    
        this.getData()

        document.getElementById("new-title").value = data.title;
        document.getElementById("new-description").value = data.description;
        document.getElementById("new-author").value = data.author;
        document.getElementById("new-views").value = data.views;
        document.getElementById("new-date").value = data.date;
    }

    patchCard() {

        const updatedData = {
            title: document.getElementById('new-title').value,
            description: document.getElementById('new-description').value,
            author: document.getElementById('new-author').value,
            views: document.getElementById('new-views').value,
            date: document.getElementById('new-date').value
        };
        
        ajax.patch(videocardUrls.updateVideocardById(this.id), updatedData, (data, status) => {
            this.currentData = { ...this.currentData, ...updatedData };
            this.renderData(this.currentData);
        });
    }


}