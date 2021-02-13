'use strict';

import { TypeWriter } from './typeScript.js'
import { Projects } from './Projects.js'

console.log('hello');


document.addEventListener ('DOMContentLoaded', init);
document.addEventListener ('DOMContentLoaded', getWorks);

// Init App
function init(){
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    new TypeWriter (txtElement,words,wait);
}

const mainDiv = document.querySelector('.items');
async function getWorks () {

    const url = "https://api.github.com/users/razvanbrb/repos\?page\=1\&per_page\=100"

    const response = await fetch (url);
    const result = await response.json();
    console.log(result);
    console.log(response);
    const arrayOfProjectsId = [265817419, 267314573, 275780508, 270301227, 297422714];
    result.forEach(item => {
        if(!arrayOfProjectsId.includes( item.id)){
            return
        }
        let project = new Projects ( item.id ,  item.name, item.homepage);
        const projectRender = project.render();
        mainDiv.appendChild (projectRender)
    })
}
