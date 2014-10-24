var events_length = events.length;
var iterator = 0;
var map;

function initialize() {
    var mapOptions = {
        center: {lat: parseFloat(events[0]['geocode_latitude']), lng: parseFloat(events[0]['geocode_longitude'])},
        zoom: 12,
    };
    map = new google.maps.Map(document.getElementById('google-map'), mapOptions);

    var i;
    for (i=0; i<events_length; i++) {
        setTimeout(function(){
            addMarker();
        }, i*200);
    }
}

function addMarker() {
    var marker = new google.maps.Marker({
        position: {lat: parseFloat(events[iterator]['geocode_latitude']), lng: parseFloat(events[iterator]['geocode_longitude'])},
        map: map,
        animation: google.maps.Animation.DROP
    });
    var infowindow = new google.maps.InfoWindow();
    var contentHtml;
    google.maps.event.addListener(marker, 'click', (function(marker, iterator) {
        return function() {
            contentHtml = '<strong>'+events[iterator]['event_name']+'</strong>';
            infowindow.setContent(contentHtml);
            infowindow.open(map, marker);
        }
    })(marker, iterator));
    iterator++;
}
google.maps.event.addDomListener(window, 'load', initialize);
