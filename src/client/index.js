// js files
import { handleSubmit } from './js/app';
import { drawSavedUI } from './js/draw';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
import Scrollbar from 'smooth-scrollbar';

// sass files
import './styles/resets.scss'
import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'


document.addEventListener("DOMContentLoaded", function() {
    const scrollbar = Scrollbar.init(document.querySelector('.app-content'));
    startTime();
});


/* Navigation Menu*/
const search = document.getElementById("to-search");
const saved = document.getElementById("to-saved");

search.addEventListener("click", (event) => {
    event.preventDefault();
    goTo('search-view');
    
});

saved.addEventListener("click", (event) => {
    event.preventDefault();
    goTo('saved-view');
    drawSavedUI();
});


function goTo(id){
    const newPage = document.getElementById(id);

    const allPages = document.querySelectorAll(".page");


    for (let i = 0; i < allPages.length; i++) {
        allPages[i].classList.remove("active");
    }

    newPage.classList.add("active");
}

function startTime() {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('txt').innerHTML =  h + ":" + m;
    setTimeout(startTime, 1000);
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}