var map = L.map('map').setView([51.505, -0.09], 13); 
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
var marker;

function searchLocation() {
    var location = document.getElementById('search-input').value; 
    if (location) {
        var geocoder = L.Control.Geocoder.nominatim();
        geocoder.geocode(location, function(results) {
            if (results.length > 0) {
                var latlng = results[0].center; 
                map.setView(latlng, 13, {animate: true}); 
                if (marker) {
                    marker.setLatLng(latlng); 
                } else {
                    marker = L.marker(latlng).addTo(map); 
                }
                marker.bindPopup('<b>Location:</b> ' + results[0].name).openPopup();
            } else {
                alert("Location not found.");
            }
        });
    } else {
        alert("Please enter a location.");
    }
}