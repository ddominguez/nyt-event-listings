var events_length = events.length;
var iterator = 0;
var map;
var infowindow;

function initialize() {
    var mapOptions = {
        center: {lat: parseFloat(events[0]['geocode_latitude']), lng: parseFloat(events[0]['geocode_longitude'])},
        zoom: 12,
    };
    map = new google.maps.Map(document.getElementById('google-map'), mapOptions);

    var i;
    for (i=0; i<events_length; i++) {
        // setTimeout(function(){
        //     addMarker();
        // }, i*200);
        addMarker();
    }
}

function addMarker() {
    var marker = new google.maps.Marker({
        position: {lat: parseFloat(events[iterator]['geocode_latitude']), lng: parseFloat(events[iterator]['geocode_longitude'])},
        map: map,
        // animation: google.maps.Animation.DROP
    });
    var contentHtml;

    // open marker info when hovering over marker
    google.maps.event.addListener(marker, 'mouseover', (function(marker, iterator) {
        return function() {
            contentHtml = '<strong>'+events[iterator]['event_name']+'</strong>';

            infowindow = new google.maps.InfoWindow({
                content: contentHtml,
                maxWidth: 300
            });
            infowindow.open(map, marker);
        }
    })(marker, iterator));

    // close marker info on mouse out
    google.maps.event.addListener(marker, 'mouseout', (function(marker, iterator) {
        return function() {
            infowindow.close();
        }
    })(marker, iterator));

    // load event info in new modal
    iterator++;
}
google.maps.event.addDomListener(window, 'load', initialize);
