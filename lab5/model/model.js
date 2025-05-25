import { ajax } from "../../modules/ajax.js";
import { videocardUrls } from "../../modules/videocardUrls.js";

export class Model{
    constructor(){
        ajax.get(videocardUrls.getVideocards(), (data) => {
                this.data =  this.renderData(data);
            })
    }

    getData(){
        return this.data
    }

}