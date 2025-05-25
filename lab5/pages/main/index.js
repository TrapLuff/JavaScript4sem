import {CarouselComponent} from '../../components/carousel/index.js';
import { VideoPage } from "../video/index.js";

import { model } from "../../main.js";
import { concatenate, erase, countPrefixes, findAnagrams } from "../../functions/functions.js";

import { ajax } from "../../modules/ajax.js";
import { videocardUrls } from "../../modules/videocardUrls.js";



export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.originalData = [];
        
    }

    getTopHeader() {
        return (
            `  
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
            `
        )
    }   

    getData() {
        ajax.get(videocardUrls.getVideocards(), (data) => {
            this.originalData = data;
            this.renderData(data);    
        });
    }

    renderData(items) {
        if (!this.pageRoot) {
            this.pageRoot = document.getElementById('video-grid');
        }
    
        this.pageRoot.innerHTML = ''; // очищаем от предыдущих карточек
    
        items.forEach((item, i) => {
            const cardContainer = document.createElement('div');
            cardContainer.className = 'video-card';
            this.pageRoot.appendChild(cardContainer);
    
            const carousel = new CarouselComponent(cardContainer, `carousel-${i}`);
            carousel.render(item, this.clickCard.bind(this));
        });
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
            title: "Новое видео" + Date.now(),
            author: "Новый автор" + Date.now(),
            views: 0,
            date: "сегодня",
            image1: "images/image1.jpg",
            image2: "images/image2.jpg",
            image3: "images/image3.jpg",
            avatar: "images/avatar.jpg",
            description: "Описание нового видео"
        };
        
        ajax.post(videocardUrls.createVideocard(), newCard, (data) => {
            this.getData(); // Обновляем данные после добавления
        });
    }
    
    deleteCardById() {
        const input = document.getElementById("delete-id");
        const idToDelete = parseInt(input.value);
    
        if (isNaN(idToDelete)) {
            alert("Введите корректный ID");
            return;
        }
    
        ajax.delete(videocardUrls.removeVideocardById(idToDelete), (data, status) => {
            if (status === 200) {
                this.getData(); // Обновляем данные после удаления
            } else {
                alert("Ошибка при удалении карточки");
            }
        });
    }
    
    filterByViews(min, max) {
        const filtered = this.originalData.filter( video => video.views >= min && video.views <= max );
        this.renderData(filtered); // Рендерим отфильтрованные данные
    }

    render() {
        this.parent.innerHTML = ''
        const topHeader = this.getTopHeader();
        this.parent.insertAdjacentHTML('beforeend', topHeader);
    
        this.pageRoot = document.getElementById('video-grid');
    
        document.getElementById("add-card").addEventListener('click', this.addCard.bind(this));
        document.getElementById("delete-card").addEventListener('click', this.deleteCardById.bind(this));
        document.getElementById("filter-button").addEventListener('click', this.handleFilterClick.bind(this));
    
        this.getData(); // Загружаем данные с API
        this.updateStatistics();
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
    
        this.updateStatistics(); // если хочешь обновлять на основе фильтрованного списка — передай его
    }

    updateStatistics(){
        const dataArray = model.getData();
        // 1. Все авторы
        const authors = dataArray.map(video => video.author);
        document.getElementById("cont").innerHTML = "Все авторы - " + concatenate(authors, " & ");

        // 2. Очистка от пустых значений
        const possiblyEmpty = [...authors, null, "", false, undefined];
        document.getElementById("erase").innerHTML = "Очищено - " + erase(possiblyEmpty).join(", ");

    
        const prefix = "Лоуджики";
        document.getElementById("pref").innerHTML = `Авторы Лоуджики (2.10)" — ` + countPrefixes(authors, prefix);

        // 4. Поиск анаграмм среди авторов
        document.getElementById("anag").innerHTML = "Анаграммы авторов: <br>" + findAnagrams(authors);

        
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
