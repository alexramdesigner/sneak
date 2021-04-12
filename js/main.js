/** Hamburger  **/
function changeClass() {
    let siteNav = document.getElementById('site-nav');
    siteNav.classList.toggle('site-nav-open');
    let menuOpen = document.getElementById('menu-toggle');
    menuOpen.classList.toggle('menu-open');
}

/** views  **/
var btn_grid = document.getElementById("btn-grid-view");
var btn_list = document.getElementById("btn-list-view");
var container = document.getElementsByClassName("container")[0];

btn_grid.addEventListener('click', fn_grid, false);

function fn_grid(e) {
    container.style.columnCount = '3';
    e.preventDefault();
}

btn_list.addEventListener('click', fn_list, false);

function fn_list(e) {
    container.style.columnCount = '1';
    e.preventDefault();
}

/** Categories **/
let buttons = document.querySelectorAll(".categories .cat-list .cat_link");
var page = localStorage.setItem('page', 1);
var cat = localStorage.setItem('cat', "All");

buttons.forEach(function(button) {
    button.onclick = function() {
        localStorage.setItem('page', 1);
        cat = localStorage.setItem('cat', this.dataset.cat);
        //console.log(this.dataset.cat);
        request(localStorage.getItem('page'), this.dataset.cat, "");
        for (i = 0; i < buttons.length; i++) { buttons[i].classList.remove('cat_link_active'); }
        this.classList.add('cat_link_active');
    }
})

/** API list Unsplash  **/
let photos = document.getElementById('photos');
request(localStorage.getItem('page'), localStorage.getItem('cat'), "");

function request(page, query, type) {
    if (type != "sm") { photos.innerHTML = ""; }

    fetch("https://api.unsplash.com/search/photos?page=" + page + "&query=" + query + "&client_id=BSnakK0e8nvwJ-vM2ICpOUG3FcooJDGdaSgrLKTS68A")
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            //console.log(data.results);
            for (item of data.results) {
                image = `<figure><img class="img-unsplash" src="${item.urls.regular}" alt="${item.alt_description}"/></figure>`;
                photos.insertAdjacentHTML('beforeend', image);
            }
        })
}

//** show more **//
let btn_showmore = document.getElementById('showmore');
btn_showmore.addEventListener('click', fn_showmore, false);

function fn_showmore(e) {
    page = parseInt(localStorage.getItem('page')) + 1;
    request(page, localStorage.getItem('cat'), "sm");
    localStorage.setItem('page', page);
    e.preventDefault();
}