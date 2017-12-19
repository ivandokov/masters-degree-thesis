function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: {lat: 43.466658, lng: 28.468913},
        zoom: 12,
        scaleControl: true,
        streetViewControl: false,
        fullscreenControl: false
    });

    loadPlaces(function (data) {
        var infoWindow = new google.maps.InfoWindow();

        for (var i = 0; i < data.places.length; i++) {
            addMarker(map, data.places[i], infoWindow);
        }
    }.bind(this));
}

function loadPlaces(callback) {
    $.getJSON('./places.json').then(callback);
}

function addMarker(map, place, infoWindow) {
    var marker = new google.maps.Marker({
        position: {lat: place.lat, lng: place.lng},
        map: map,
        title: place.name,
        zIndex: place.index,
        animation: google.maps.Animation.DROP
    });

    google.maps.event.addListener(marker, 'click', function () {
        var content = '<div>'+
            '<div class="mb-2"><img src="'+ place.image +'"></div>'+
            '<h5>'+ place.name +'</h5>'+
            '<div>'+
            '<p>'+ place.description + '</p>' +
            '<p class="mb-0"><a href="'+ place.moreInfoUrl +'" target="_blank">Повече информация</a></p>'+
            '</div>'+
            '</div>';
        infoWindow.close();
        infoWindow.setContent(content);
        setTimeout(function() {
            infoWindow.open(map, marker);
        }, 60);
    });
}
