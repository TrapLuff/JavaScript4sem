import {MainPage} from "../main/index.js";
import {CarouselFullComponent} from '../../components/carousel_full/index.js';
import { model } from "../../main.js";
import {BackButtonComponent} from "../../components/backbutton/index.js";

export class VideoPage {
    constructor(parent, id) {
        this.parent = parent
        this.id = id
    }

    getHTML() {
        return (
            `
                <div id="video_page"><h6>Страница с видео</h6></div>
            `
        )
    }

    get pageRoot() {
        return document.getElementById('video_page')
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
    
        /*const data = model.getData().find((d) => d.id == this.id)
        const faculty_information = new FacultyComponent(this.pageRoot)
        faculty_information.render(data)*/

       /* const data = model.getData().find((d) => d.id == this.id);*/
        const data = model.getData().find((d) => d.id == this.id);
        const card = document.createElement('div');
        card.className = 'video-card-full';
        this.pageRoot.appendChild(card);
        const carousel = new CarouselFullComponent(card, `carousel-${this.id}-full`);
        carousel.render(data);
    }


}