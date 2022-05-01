// Initialize and add the map
function initMap() {
    // The location of Uluru
    const uluru = { lat: -25.344, lng: 131.031 };

    const iade = { lat: 38.7073, lng: -9.1528 };
    const lisboa = { lat: 38.7109, lng: -9.1401 };
    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: uluru,
    });
    // The marker, positioned at Uluru
    const marker = new google.maps.Marker({
        position: uluru,
        map: map,
    });

    const iadeMarker = new google.maps.Marker({
       position: iade,
       map: map,
    });

    const lsiboaMarker = new google.maps.Marker({
        position: lisboa,
        map: map,
    });
}

window.initMap = initMap;