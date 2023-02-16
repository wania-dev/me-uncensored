// object categories into sep categorised carousels
function createDIVforElement() {
    categories.forEach(element => {
        let megaContainer = document.createElement('div');
            megaContainer.className = `${element}`
            megaContainer.id = 'megaContainer'

        let container = document.createElement('div')
            container.className = 'container'
            container.id = `container-${element}`
        let elementDIV = document.createElement('div')
            elementDIV.className = 'cat-car'
            elementDIV.id = `${element}`
        let label = document.createElement('h1')
            label.innerText = `${element}`
            label.id = `label-${element}`
            label.className = 'carouselLabel'

        container.append(elementDIV)
        megaContainer.append(label)
        megaContainer.append(container)
        document.body.append(megaContainer)
    });
}
createDIVforElement()

// createCard that opens text content on click 
let objectNum
function createCard() {
    for (let i = 0; i < Object.values(Posts).length; i++) {
        let card = document.createElement("div");
        card.className = "card";
        card.addEventListener("click", function readFile() {
            objectNum = i;
            fetch(Object.values(Posts)[i].FilePath)
            .then(function (response){
                return response.text()
            })
            .then(function(data){
                // using data and data object to open article
                article(data, i)
            })
        });
            // creating internal image 
            let image = document.createElement('img');
            image.className = 'cardImg';
            image.src = Object.values(Posts)[i].src;

            // create Title section 
            let title = document.createElement('h1');
            title.className = 'cardTitle';
            title.innerText = Object.values(Posts)[i].title;

            // create subtitle section 
            let description = document.createElement('p');
            description.className = 'cardDes';
            description.innerText =  Object.values(Posts)[i].description;
            
        document.querySelector('.data').appendChild(card);
        card.append(image, title, description); 

        // to open articles 
            categories.forEach(element => {
                if (Object.values(Posts)[i].category.toLowerCase() == element.toLowerCase()){
                    // cardcopy 
                    cardCopy = card.cloneNode(true)
                    cardCopy.addEventListener("click", function readFile() {
                        objectNum = i;
                        fetch(Object.values(Posts)[i].FilePath)
                        .then(function (response){
                            return response.text()
                        })
                        .then(function(data){
                            // using data and data object to open article
                            article(data, i)
                        })
                    });
                    document.querySelector(`#${element}`).append(cardCopy)
                }
            });
    }
}
createCard();

// menu, on click, it will display a bar with all category items in them. if you click on any of those, 
// you will be directed to a new page containing all cards of that category 
let menuBar = document.querySelector('.menu')
let spanBtn = document.querySelector('.material-symbols-outlined')

function menu(){
    spanBtn.innerHTML = 'close';
    spanBtn.onclick = closeMenu;
    menuBar.style.width = '200px';
    menuBar.innerHTML = '';

    // all
    let all = document.createElement('div')
        all.innerHTML = '<p onclick="closeSearchSec()">All</p>'
        all.className = 'menuItems'
    menuBar.append(all)

    // display each element from category array into the menu div
    categories.forEach(element => {
    if (document.querySelector(`#${element}`).innerHTML == '') {
        console.log('Doesnt exist')
    } else {
        // save existing menu items for later
        let menuListItem = document.createElement('div');
        // // styling link and functionalities 
        menuListItem.innerHTML = `<p onclick='menuClicked(this.innerText)'>${element}</p>`

        menuListItem.id = `link-${element}`
        menuListItem.className = 'menuItems';
        menuBar.append(menuListItem);

    }});
    // add sign up and login 
    let buttonSignup = document.createElement('div')
        buttonSignup.className = 'signupBTN'
        buttonSignup.innerHTML = 'Signup'
        buttonSignup.id = 'menuBtns'
    menuBar.append(buttonSignup)
    let buttonLogin = document.createElement('div')
        buttonLogin.className = 'loginBTN'
        buttonLogin.innerHTML = 'Login'
        buttonLogin.id = 'menuBtns'
    menuBar.append(buttonLogin)
}
function closeMenu(){
    spanBtn.innerHTML = 'drag_handle';
    menuBar.style.width = '0';
    spanBtn.onclick = menu;
    console.clear()
}

// menu 

function dontDisplayEmptyCarousel() {
    categories.forEach(element => {
        if (document.querySelector(`#${element}`).clientWidth == 0){
            document.querySelector(`.${element}`).style.display = 'none'
        }
    });
}
dontDisplayEmptyCarousel();

let searchSection = document.querySelector('.searchPage')

function OpenSearchSec() {
    searchSection.style.display = 'block';
    document.querySelector('.search').innerHTML = 'close';
    document.querySelector('.search').onclick = closeSearchSec;
    let dot_data = document.querySelector('.data')
        dot_data.style.display = 'flex'
        dot_data.style.flexWrap = 'wrap';
        dot_data.style.justifyContent = 'center'
        dot_data.style.width = '100%';
    document.querySelector('.carouselName').style.display = 'none'
    document.querySelector('.container').style.width = '100%'
    // document.querySelector('#leftbtn').style.display = 'none'
    // document.querySelector('#rightbtn').style.display = 'none'
    document.querySelector('.footer').style.display = 'none'

    // if all carouel is closed prehand, then disclose it
    document.querySelector('.megaContainer').style.display = 'block';

    categories.forEach(element => {
        document.querySelector(`.${element}`).style.display = 'none'
    });
}
let CardsThatDontMatch
function searchCards(){
    // this function when user inputs something, matches it with all texts in all cards 
    let input = document.querySelector('.inputSearchQuery input').value
    input = input.toLowerCase();
    let x = document.getElementsByClassName('card')
    for (i = 0; i < x.length; i++) {
		if (!x[i].innerHTML.toLowerCase().includes(input)) {
			x[i].style.display="none";
		}
		else {
			x[i].style.display= "block";			
		}
	}
}

function closeSearchSec() {
    location.reload()
}

// articles, data from file will be read onto a new html document that will open with _blank
function article(e, i){
    let footer = document.querySelector('footer').innerHTML

    var articleDoc = window.open("width=100vw,height=100vh,scrollbars=1,resizable=1")
    
    var text = e
    
    var html = `
    <html>
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${Object.values(Posts)[i].title}</title>
        <script src="/global files/objects.js"></script>
        <script src="/global files/nav.js"></script>
        <script defer src="article.js"></script>
        <link rel="stylesheet" href="style.css">
    </head>
        <body>
        <nav><a href="index.html"><div class="logo-article">me' uncensored</div></a></nav>
        <header class="title">${Object.values(Posts)[i].title}</header>
        <div class="subtitle">${Object.values(Posts)[i].description}</div>
        <img class="main-img" src="${Object.values(Posts)[i].src}">
        <p class="article-content" style="font-size:15px;">${text}</p>
        </body>
    </html>`

    articleDoc.document.querySelector('head').append('<link rel="shortcut icon" href="/component media/favicon and logo (w).jpeg" />');

    articleDoc.document.open()
    articleDoc.document.write(html)
    articleDoc.document.close()

    // all thanks to (http://jennifermadden.com/javascript/window3.html)
    
}


// add footer to site
function footer() {
    let footer = document.createElement('footer');
        footer.className = 'footer';
        footer.innerHTML = 'Developed by <a href="https://wwwd.vercel.app/" target="_blank">&copy;Wania</a>'
    document.body.append(footer)
}
footer();

// menu, onclick it will get rid of all carousels except for its corresponding one and display all articles in flex
// position like in search. all or relaoding page will change settings back
function menuClicked(e) {
    document.querySelector('.megaContainer').style.display = 'none';

    categories.forEach(element => {
        let megaContainer = document.querySelector(`.${element}`)
        let label = document.querySelector(`.label-${element}`)

        if (e == element){
            megaContainer.style.display = 'block';
            let dot_data = document.querySelector(`#${element}`)
            dot_data.style.display = 'flex'
            dot_data.style.flexWrap = 'wrap';
            dot_data.style.justifyContent = 'flex-start'
            dot_data.style.width = '100%';
        document.querySelector(`#container-${element}`).style.width = '100%';
        document.querySelector(`#label-${element}`).style.textAlign = "center";

        } else {
            megaContainer.style.display = 'none';
        }

})
}
function notready() {
    alert('This page is not ready yet. But dw, It\'ll soon be sorted')
}
