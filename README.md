This app allows users to search a US city and state and will return the temperature and weather for that location.

This uses two public APIs: https://geocode.xyz/api and http://www.7timer.info/doc.php?lang=en
7timer allows you to make a request providing latitude and longitude coordinates and will return weather forecast data
for that location. To prevent the user having to enter coordinates (since most humans do not know locations by coordinates), the second 
API is used to make a request by giving a location string (such as "Dallas, TX") and returning coordinates for this location. 
Combined together, the following steps are taken:

1 The user enters a location string
2 A request is made to the geocode API
3 A response is received with the corresponding coordinates
4 Another request is then made to the 7timer API with the received coordinates
5 A response is received with the weather forecast data for that location
6 The weather data is parsed and displayed on the screen 