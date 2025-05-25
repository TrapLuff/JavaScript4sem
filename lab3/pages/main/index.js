import {CarouselComponent} from '../../components/carousel/index.js';
import { VideoPage } from "../video/index.js";

import { model } from "../../main.js";


export class MainPage {
    constructor(parent) {
        this.parent = parent;
        
    }

    getTopHeader() {
        return (
            `  
                <header class="header">
                <div class="logo"><img src="images/youtube-logo-png-white.png" alt="logo" class="main-logo"></div>
                <input id="views-min" type="number" class="search" placeholder="мин просмотров">
                <input id="views-max" type="number" class="search" placeholder="макс просмотров">
                <button id="filter-button" class="btn" type="button">Фильтровать</button>
                <button id="add-card" class="btn" type="button">Добавить</button>
                <input id="delete-id" type="number" class="search" placeholder="ID для удаления, начиная с нуля">
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
            `
        )
    }   

    clickCard(e) {
        if (
            e.target.closest('.carousel-control-prev') ||
            e.target.closest('.carousel-control-next')
        ) {
            return;
        }

        const cardId = e.currentTarget.dataset.id
        const videoPage = new VideoPage(this.parent, cardId)
        videoPage.render()
        
    }

    addCard() {
        console.log('Нажата кнопка добавления');    
        const newCard = {
            id: Date.now(),
            title: "Новое видео" + Date.now(),
            author: "Новый автор" + Date.now(),
            views: 0,
            date: "сегодня",
            image1: "images/image1.jpg",
            image2: "images/image2.jpg",
            image3: "images/image3.jpg"
        };
        model.getData().push(newCard);
        this.render(); 
    }
    
    deleteLastCard() {
        console.log('Нажата кнопка удаления');  
        if (model.getData().length > 0) {
            model.getData().pop();
            this.render();
        }
    }

    deleteCardById() {
        const input = document.getElementById("delete-id");
        const idToDelete = parseInt(input.value);
    
        if (isNaN(idToDelete)) {
            alert("Введите корректный ID");
            return;
        }
    
        const data = model.getData();
        const index = data.findIndex(item => item.id === idToDelete);
    
        if (index === -1) {
            alert("Карточка с таким ID не найдена");
            return;
        }
    
        data.splice(index, 1);
        this.reindexCards();
        this.render();
    }

    filterByViews(min, max) {
        const filtered = model.getData().filter(video => video.views >= min && video.views <= max);
        this.renderFiltered(filtered);
    }

    render() {
        this.parent.innerHTML = ''
        const topHeader = this.getTopHeader();
        this.parent.insertAdjacentHTML('beforeend', topHeader);

        document.getElementById("add-card").addEventListener('click', this.addCard.bind(this));
        document.getElementById("delete-card").addEventListener('click', this.deleteCardById.bind(this));
        document.getElementById("filter-button").addEventListener('click', this.handleFilterClick.bind(this));

        // контейнер для карточек
        const grid = document.getElementById('video-grid');

         // создаём несколько карточек с каруселью
         const dataArray = model.getData();
         for (let i = 0; i < dataArray.length; i++) {
             const card = document.createElement('div');
             card.className = 'video-card';
             
             grid.appendChild(card);
             const carousel = new CarouselComponent(card, `carousel-${i}`);
             carousel.render(dataArray[i],this.clickCard.bind(this));
         }
         this.updateStatistics()
    }

    renderFiltered(filteredData) {
        this.parent.innerHTML = ''
        const topHeader = this.getTopHeader();
        this.parent.insertAdjacentHTML('beforeend', topHeader);
    
        document.getElementById("add-card").addEventListener('click', this.addCard.bind(this));
        document.getElementById("delete-card").addEventListener('click', this.deleteCardById.bind(this));
        document.getElementById("filter-button").addEventListener('click', this.handleFilterClick.bind(this));
    
        const grid = document.getElementById('video-grid');
        for (let i = 0; i < filteredData.length; i++) {
            const card = document.createElement('div');
            card.className = 'video-card';
            grid.appendChild(card);
            const carousel = new CarouselComponent(card, `carousel-${i}`);
            carousel.render(filteredData[i], this.clickCard.bind(this));
        }
    }

    reindexCards() {
        const data = model.getData();
        for (let i = 0; i < data.length; i++) {
            data[i].id = i;
        }
    }

    handleFilterClick() {
        const min = parseInt(document.getElementById("views-min").value);
        const max = parseInt(document.getElementById("views-max").value);
    
        if (isNaN(min) || isNaN(max)) {
            alert("Введите оба значения");
            return;
        }
    
        this.filterByViews(min, max);
    }
}
