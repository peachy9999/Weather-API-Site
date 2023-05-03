const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const title = document.getElementById('title');
const image = document.querySelector('.weather-box img');
const sButton = document.getElementById('search')
const cButton = document.getElementById('clear')
cButton.style.display = 'none'


function searchclick() {

    const APIKey = ''; // API Key from https://openweathermap.org goes here
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=metric`)
        .then(response => response.json())
        .then(json => {

            const temperature = document.querySelector('.weather-box .temp');
            const humidity = document.querySelector('.weather-box .humidity');
            const wind = document.querySelector('.weather-box .windspeed');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.png';
                    break;

                case 'Rain':
                    image.src = 'images/rain.png';
                    break;

                case 'Snow':
                    image.src = 'images/snow.png';
                    break;

                case 'Clouds':
                    image.src = 'images/clouds.png';
                    break;

                case 'Haze':
                    image.src = 'images/mist.png';
                    break;

                case 'Mist':
                    image.src = 'images/mist.png';
                    break;
                case 'Drizzle':
                    image.src = 'images/Drizzle.png';
                    break;   
                default:
                    image.src = '';
            }

            if (json.cod === '404') return;

            temperature.innerHTML = `${parseInt(json.main.temp)}°C`
            wind.innerHTML = `<i class="fa-solid fa-wind"></i> ${parseInt(json.wind.speed)}km/h`
            humidity.innerHTML = `<i class="fa-solid fa-droplet"></i> ${json.main.humidity}%`
        })

    weatherBox.style.display = '';
    weatherBox.classList.add('fadeIn');
    container.style.height = '580px';
    sButton.style.display = 'none'
    cButton.style.display = 'block'
}

function clear() {
    weatherBox.classList.add('fadeOut');
    container.style.height = '105px';
    sButton.style.display = 'block'
    cButton.style.display = 'none'
    document.getElementById('location').value = ''
    image.src = ''
}

document.getElementById('search').onclick = searchclick;
document.getElementById('clear').onclick = clear;