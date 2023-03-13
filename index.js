var apiKey = "33f65da4-d62c-4202-8fe4-11f6f1acbb95";
var airvisual = new AirVisual(apiKey);

var cityForm = document.getElementById("city-form");
cityForm.addEventListener("submit", function(event) {
  event.preventDefault();
  var cityInput = document.getElementById("city-input");
  var cityName = cityInput.value;
  airvisual.cities(cityName).then(function(data) {
    console.log(data);
    var firstResult = data[0];
    var mapContainer = document.getElementById("map-container");
    var mapUrl = `https://www.airvisual.com/earth/${firstResult.country.toLowerCase()}/${firstResult.city.toLowerCase()}`
    mapContainer.innerHTML = `<iframe src="${mapUrl}" width="100%" height="500" frameborder="0"></iframe>`;
  }).catch(function(error) {
    console.error(error);
  });
});



cityInput.addEventListener("input", function(event) {
    var cityName = event.target.value;
    if (cityName.length > 2) {
        airvisual.cities(cityName).then(function(data) {
            var citiesList = document.createElement("ul");
            data.forEach(function(city) {
              var cityItem = document.createElement("li");
              cityItem.textContent = city.city + ", " + city.state + ", " + city.country;
              cityItem.addEventListener("click", function() {
                var mapContainer = document.getElementById("map-container");
                var mapUrl = `https://www.airvisual.com/earth/${city.country.toLowerCase()}/${city.city.toLowerCase()}`
                mapContainer.innerHTML = `<iframe src="${mapUrl}" width="100%" height="500" frameborder="0"></iframe>`;
                cityInput.value = city.city + ", " + city.state + ", " + city.country;
                citiesList.style.display = "none";
            });
        });
        

    });
});
