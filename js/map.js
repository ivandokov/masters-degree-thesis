var latestIndex = 100;

function initMap() {
    var zoom = screen.width > 992 ? 12 : 10;
    var map = new google.maps.Map(document.getElementById('map'), {
        mapTypeId: google.maps.MapTypeId.TERRAIN,
        center: {lat: 43.466658, lng: 28.468913},
        zoom: zoom,
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
        },
        scaleControl: true,
        streetViewControl: false,
        fullscreenControl: false
    });

    loadPlaces(function (data) {
        var infoWindow = new google.maps.InfoWindow({
            pixelOffset: new google.maps.Size(-1,-40)
        });

        for (var i = 0; i < data.places.length; i++) {
            addMarker(map, data.places[i], infoWindow);
        }
    }.bind(this));
}

function loadPlaces(callback) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                callback(JSON.parse(httpRequest.responseText));
            }
        }
    };
    httpRequest.open('GET', './places.json');
    httpRequest.send();
}

function addMarker(map, place, infoWindow) {
    var markerWidth = 26;
    var markerHeight = 40;
    var marker = new SVGMarker({
        position: new google.maps.LatLng(place.lat, place.lng),
        map: map,
        title: place.name,
        zIndex: place.index,
        icon: {
            url: place.icon,
            size: new google.maps.Size(markerWidth, markerHeight),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(markerWidth/2, markerHeight)
        }
    });

    google.maps.event.addListener(marker, 'click', function (e) {
        e.stopPropagation();
        marker.setZIndex(latestIndex);
        latestIndex += 1;
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
