let myPlace = 'basking ridge, nj';



function createTempCard(location, temp, weather) {
    const card = document.createElement('div');
    const locationH2 = document.createElement('h2');
    const tempH2 = document.createElement('h2');
    const weatherH3 = document.createElement('h3');

    locationH2.textContent = location;
    tempH2.innerHTML = temp + '&#730;'; // This is the HTML code for the degrees symbol
    weatherH3.textContent = weather;

    card.appendChild(locationH2);
    card.appendChild(tempH2);
    card.appendChild(weatherH3);

    return card;
}




function appendCard(card) {
    const outputContainer = document.getElementById('output-container');
    outputContainer.appendChild(card);
}




// The outer fetch function takes the text value of the location and makes a request to a geolocation API and gets an object
// that includes the latitude and longitude of the location as a response. 
fetch(`https://geocode.xyz/${myPlace}?region=US&geoit=json`)
.then(function(response) {
  return response.json();
})
.then(function(json) {

    // When the latitude and longitude is returned, the inner fetch function makes a request to a weather API and gets
    // an object that includes the current temperature and weather for the given coordinates. 
    fetch(`https://www.7timer.info/bin/civil.php?lon=${json.longt}&lat=${json.latt}&ac=0&unit=british&output=json&tzshift=0`)
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        let data = createTempCard(myPlace, json.dataseries[0].temp2m, json.dataseries[0].weather);
        appendCard(data);
    });

});




