// JavaScript for Weather App

const form = document.querySelector('#testDataForm')

form.addEventListener('submit', ( event ) => {
    event.preventDefault();

    let query_city = document.querySelector('#city');
    let info = getData(query_city.value)
    load_data(info) 
})


let clientId = "8db8b1168a333a492c2dcb0dc7c67c9d";

// Get Data from OpenWeatherMap API

const getData = async (query_city) => {
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query_city}&units=imperial&appid=${clientId}`)
    const data = await response.json();
    return data
}

// Holding Dom Elements

const DOM_Elements = {
    city_list: '.city-list',
}

// Creating the Table on the HTML Doc

const create_list = ( name, temp, humidity, currentTime, currentDate, main ) => {
    const html = 
    `<div class="container-fluid px-1 px-md-4 py-5 mx-auto">
    <div class="row d-flex justify-content-center px-3">
        <div class="card">
            <h2 class="ml-auto mr-4 mt-3 mb-0">${name}</h2>
            <p class="ml-auto mr-4 mb-0 med-font">${main}</p>
            <h1 class="ml-auto mr-4 large-font">${temp}&#176;</h1>
            <p class="ml-auto mr-4 mb-0 med-font"><img src="/images/humidity.png" alt="drop"> ${humidity}%</p>

            <p class="time-font mb-0 ml-4 mt-auto">${currentTime}</p>
            <p class="ml-4 mb-4">${currentDate}</p>
        </div>
    </div>
    </div>`

    document.querySelector(DOM_Elements.city_list).insertAdjacentHTML('beforeend', html)

}

// Function to Load Data and display HTML that includes date/time formatting

const load_data = async (info) => {
    const weather = await info;
    let currentTemp = Math.floor(weather.main.temp)
    let date = new Date();

    let dateformatter = Intl.DateTimeFormat(
        "default", 
        {
            weekday: "long", 
            year: "numeric",
            month: "short",
            day: "numeric",
        }
    );

    let timeformatter = Intl.DateTimeFormat(
        "default", 
        {
            hour: "numeric",
            minute: "numeric"
        }
    );

    console.log(dateformatter.format(date));
    console.log(timeformatter.format(date));

    let currentDate = dateformatter.format(date);
    let currentTime = timeformatter.format(date);

    create_list(weather.name, currentTemp, weather.main.humidity, currentTime, currentDate, weather.weather[0].main)
}
