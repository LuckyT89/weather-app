
// Converts the weather codes from the weather API to more readable forms
function convertWeather(oldWeather) {
    let newWeather;

    switch(oldWeather) {
        case 'clearday':
        case 'clearnight':
            newWeather = 'Clear';
            break;
        
        case 'pcloudyday':
        case 'pcloudynight':
            newWeather = 'Partly Cloudy';
            break;

        case 'mcloudyday':
        case 'mcloudynight':
            newWeather = 'Cloudy';
            break;

        case 'cloudyday':
        case 'cloudynight':
            newWeather = 'Very Cloudy';
            break;

        case 'humidday':
        case 'humidnight':
            newWeather = 'Foggy';
            break;

        case 'lightrainday':
        case 'lightrainnight':
            newWeather = 'Light Rain';
            break;

        case 'oshowerday':
        case 'oshowernight':
            newWeather = 'Occasional Showers';
            break;

        case 'ishowerday':
        case 'ishowernight':
            newWeather = 'Isolated Showers';
            break;

        case 'lightsnowday':
        case 'lightsnownight':
            newWeather = 'Light Snow';
            break;

        case 'rainday':
        case 'rainnight':
            newWeather = 'Rain';
            break;

        case 'snowday':
        case 'snownight':
            newWeather = 'Snow';
            break;

        case 'rainsnowday':
        case 'rainsnownight':
            newWeather = 'Rain and Snow';
            break;

        case 'tsday':
        case 'tsnight':
            newWeather = 'Thunderstorm Possible';
            break;

        case 'tsrainday':
        case 'tsrainnight':
            newWeather = 'Thunderstorm';
            break;

        default:
            newWeather = 'Exact weather condition unkown';
    }

    return newWeather;
}



// Create a card with all the information to be displayed on screen
function createTempCard(location, temp, weather) {
    const card = document.createElement('div');
    const locationH3 = document.createElement('h3');
    const tempH2 = document.createElement('h2');
    const weatherH4 = document.createElement('h4');

    // &#730; is the HTML code for the degrees symbol. An additional one is added in front of the temp inside a span and hidden with CSS to help with aligment issues. 
    locationH3.textContent = location;
    tempH2.innerHTML = '<span>&#730;</span>' + temp + '&#730;'; 
    weatherH4.textContent = convertWeather(weather);

    card.appendChild(locationH3);
    card.appendChild(tempH2);
    card.appendChild(weatherH4);

    return card;
}



// Add the card to the DOM so it is displayed
function appendCard(card) {
    const outputContainer = document.getElementById('output-container');
    outputContainer.appendChild(card);
}



const spinner = document.getElementById('loading-gif');



// This main function displays the correct location/weather data to the screen using the helper functions above
// when the Get Weather button is clicked. 
function displayData() {
    const userInput = document.getElementById('location-textbox').value;

    // Add class so CSS will display the loading gif
    spinner.classList.add('show');

    // Clear previous displayed data when user searches new location
    document.getElementById('output-container').innerHTML = ''; 

    // The outer fetch function takes the text value of the location and makes a request to a geolocation API and gets an object
    // that includes the latitude and longitude of the location as a response. 
    fetch(`https://geocode.xyz/${userInput}?region=US&geoit=json`)
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        // console.log(json);

        // When the latitude and longitude is returned, the inner fetch function makes a request to a weather API and gets
        // an object that includes the current temperature and weather for the given coordinates. 
        fetch(`https://www.7timer.info/bin/civil.php?lon=${json.longt}&lat=${json.latt}&ac=0&unit=british&output=json&tzshift=0`)
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
            // console.log(json);

            let data = createTempCard(userInput, json.dataseries[0].temp2m, json.dataseries[0].weather);
            appendCard(data);

            // Clear text inputbox after display data is added
            document.getElementById('location-textbox').value = ''; 

            // Remove class attribute so the loading gif will go back to default CSS and be hidden
            spinner.removeAttribute('class');
        });

    });

}


const button = document.getElementById('weather-btn');
button.addEventListener('click', displayData);