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
    const arrayOfProjectsId = [1, 2, 3, 4, 5];
    result.forEach(item => {
        if(!arrayOfProjectsId.includes( item.id)){
            return
        }
        let project = new Projects ( item.id ,  item.name, item.homepage);
        const projectRender = project.render();
        mainDiv.appendChild (projectRender)
    })
}
