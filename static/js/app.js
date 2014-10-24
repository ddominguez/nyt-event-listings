var events_length = events.length;
var iterator = 0;
var map;
var infowindow = new google.maps.InfoWindow({
    maxWidth: 300
});

function initialize() {
    var mapOptions = {
        center: {lat: parseFloat(events[0]['geocode_latitude']), lng: parseFloat(events[0]['geocode_longitude'])},
        zoom: 12,
        panControl:false,
        mapTypeControl:false,
        streetViewControl:false,
    };
    map = new google.maps.Map(document.getElementById('google-map'), mapOptions);

    var i;
    for (i=0; i<events_length; i++) {
        addMarker();
    }
}

function addMarker() {
    var marker = new google.maps.Marker({
        position: {lat: parseFloat(events[iterator]['geocode_latitude']), lng: parseFloat(events[iterator]['geocode_longitude'])},
        map: map
    });
    var markerHtml, contentHtml;

    // open marker info when hovering over marker
    google.maps.event.addListener(marker, 'click', (function(marker, iterator) {
        return function() {
            markerHtml = '<strong>'+events[iterator]['event_name']+'</strong>'
                            +'<br/> at '+events[iterator]['venue_name'];
            infowindow.setContent(markerHtml);
            infowindow.open(map, marker);
        }
    })(marker, iterator));

    // load event info in new modal
    // google.maps.event.addListener(marker, 'click', (function(marker, iterator) {
    //     return function() {
    //         contentHtml = '<span id="close-button" class="close">&times;</span>'
    //                         +'<h4>'+events[iterator]['event_name']+'</h1>'
    //                         +events[iterator]['web_description'];
    //
    //         $('#event-info').fadeOut(function() {
    //             $(this).html(contentHtml).fadeIn();
    //         });
    //     }
    // })(marker, iterator));

    iterator++;
}

google.maps.event.addDomListener(window, 'load', initialize);

$(function() {
    // close event info
    $('body').on('click', '#close-button', function() {
        $(this).parent().fadeOut();
    });
});
