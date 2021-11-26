// variables declaration

let weatherIcon = document.querySelector('.icon');
let weatherTemp = document.querySelector('.temp');
let weatherName = document.querySelector('.name');
let weatherDescription = document.querySelector('.description');
let weatherCity = document.querySelector('.city');
let weatherDate = document.querySelector('.date');
let weatherTempMin = document.querySelector('.min-value');
let weatherTempMax = document.querySelector('.max-value');

let dropDownCity1 = document.querySelector('#city-1');
let dropDownCity2 = document.querySelector('#city-2');
let dropDownCity3 = document.querySelector('#city-3');
let dropDownCity4 = document.querySelector('#city-4');

let date = new Date();



// get focus on search field

function setFocus() {
    input.focus();
}

// render night mode

function turnNightMode() {
    let time = date.getHours();
    if (time > 6 && time < 21 ){
        document.getElementById('bg-mode')
        .classList.remove("hero-section-night");
        document.getElementById('search-button-mode')
        .classList.remove("search-button-night");
    }
    else {
        document.getElementById('bg-mode').classList.add("hero-section-night");
        document.getElementById('search-button-mode').classList.add("search-button-night");
    }
}

setTimeout(turnNightMode,1000);


// footer render current year

let footer = document.getElementById('footer');
let current_year = date.getFullYear();
footer.innerHTML = `Andrey ${current_year}`;


//render modals

let modalUnfound = document.querySelector('.modal-not-found');
let modalFound = document.querySelector('.modal-found');

function showUnfound() {
    modalUnfound.classList.add('modal-not-found-visible');
}

function hideUnfound() {
    modalUnfound.classList.remove('modal-not-found-visible');
}

function showFound() {
    modalFound.classList.add('modal-found-visible');
}

function hideFound() {
    modalFound.classList.remove('modal-found-visible');
}


// temperature conversion to Celsius

function KelvinToCelsius(temp){
    return temp - 273;
}


// business logig

//weather get and show

function changeCart (data) {
    weatherIcon.setAttribute('src', `https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/${data['weather'][0]['icon']}.png`);
    weatherIcon.setAttribute('height','100px');
    weatherTemp.innerHTML = `${KelvinToCelsius(parseInt(data['main']['temp']))}` + ' ℃';
    weatherName.innerHTML = `${data['weather'][0]['main']}`;
    weatherDescription.innerHTML = `${data['weather'][0]['description']}`.charAt(0).toUpperCase() + `${data['weather'][0]['description']}`.slice(1);
    weatherCity.innerHTML = `${data['name']}` + ', ' + `${data['sys']['country']}`;
    weatherDate.innerHTML = date.toDateString();
    weatherTempMin.innerHTML = `${KelvinToCelsius(parseInt(data['main']['temp_min']))}`;
    weatherTempMax.innerHTML = `${KelvinToCelsius(parseInt(data['main']['temp_max']))}`
}

function findCities(city, api="0a2bf8880e3e4b43f5f0eea3378254ae"){
    fetch(`https://api.openweathermap.org/data/2.5/find?q=${city}&appid=${api}`)
    .then(response => response.json())
        .then(data => {
            // console.log(data);
            if (data['count'] == 0){
                // console.log('data equals 0')
                hideFound();
                showUnfound();
            }
            else {
                hideUnfound();
                showFound();
                dropDownCity1.innerHTML = `${data['list'][0]['name']}` + ', ' + `${data['list'][0]['sys']['country']}`;
                dropDownCity2.innerHTML = `${data['list'][1]['name']}` + ', ' + `${data['list'][1]['sys']['country']}`;
                dropDownCity3.innerHTML = `${data['list'][2]['name']}` + ', ' + `${data['list'][2]['sys']['country']}`;
                dropDownCity4.innerHTML = `${data['list'][3]['name']}` + ', ' + `${data['list'][3]['sys']['country']}`;



                // console.log(data['count']);

            }
        })
        .catch(err => console.log('error - too few results, some of dropdown fieldS werent rewrite'));
}


function getWeather(city, api="0a2bf8880e3e4b43f5f0eea3378254ae") {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}`)
        .then(response => response.json())
        .then(data => {
            //console.log(data)
            if (data['cod'] == 404)
            {   
                showUnfound();
                hideFound();
            } 
            else if (city == 'new york' || city == 'london' || city == 'dubai' || city == 'paris') {
                changeCart(data);
                hideFound();
                hideUnfound();
                window.scroll(0,0);
                return;
            }
            else {
                hideUnfound();
                changeCart(data);
                
            }
        })
        .catch(err => console.log('errow - something wrong with getting weather info'))
}

function selectCityFromDropDown() {
    document.querySelector('.modal-content').addEventListener('click', element =>{
        let city = element.target.textContent;
        getWeather(city);
        hideUnfound();
        hideFound();
    })
    
}


//user fill the search field; 2 ways how to confirm input

function inputCity(){

    let city = document.getElementById('input').value;
    return city;
}

window.addEventListener('keypress',function(event){
    if (event.keyCode == 13){
        findCities(inputCity()); // getWeather
    }
})


// hidden add to text to hide; visible to show

function openCloseFaq (arrow, block) {
    let myArrow = document.querySelector(`.${arrow}`);
    let myBlock = document.querySelector(`.${block}`);
    myArrow.onclick = function () {
        myBlock.classList.toggle('visible');
        myArrow.classList.toggle('arrow-rotate');
    }
}





