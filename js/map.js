function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: {lat: 43.4322045, lng: 28.3385676}
    });

    loadPlaces(function (data) {
        addMarkers(map, data.places);
    })

}

function loadPlaces(callback) {
    $.getJSON('./places.json').then(callback);
}

function addMarkers(map, places) {
    for (var i = 0; i < places.length; i++) {
        var place = places[i];
        var infoWindow = window.infoWindow(place);
        var marker = new google.maps.Marker({
            position: {lat: place.lat, lng: place.lng},
            map: map,
            title: place.name,
            zIndex: place.index,
            animation: google.maps.Animation.DROP
        });
        marker.addListener('click', function() {
            infoWindow.open(map, marker);
        });
    }
}

function infoWindow(place) {
    var contentString = '<div>'+
            '<h5>'+ place.name +'</h5>'+
            '<div>'+
                '<p>'+ place.description + '</p>' +
                '<p class="mb-0"><a href="'+ place.moreInfoUrl +'" target="_blank">Повече информация</a></p>'+
            '</div>'+
        '</div>';

    return new google.maps.InfoWindow({
        content: contentString
    });
}