var events_length = events.length;
var iterator = 0;
var map;
var infowindow = new google.maps.InfoWindow({
    maxWidth: 250
});

function initialize() {
    var mapOptions = {
        center: {lat: parseFloat(events[0]['geocode_latitude']), lng: parseFloat(events[0]['geocode_longitude'])},
        zoom: 12,
        panControl:false,
        mapTypeControl:false,
        streetViewControl:false,
        zoomControlOptions: {
            position: google.maps.ControlPosition.LEFT_CENTER
        }
    };
    map = new google.maps.Map(document.getElementById('google-map'), mapOptions);

    var i;
    for (i=0; i<events_length; i++) {
        addMarker();
    }
}

function addMarker() {
    var icon = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
    if (events[iterator]['times_pick']) {
        icon = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
    }

    var marker = new google.maps.Marker({
        position: {lat: parseFloat(events[iterator]['geocode_latitude']), lng: parseFloat(events[iterator]['geocode_longitude'])},
        map: map,
        icon: new google.maps.MarkerImage(icon)
    });
    var markerHtml, contentHtml;

    // open marker info when hovering over marker
    google.maps.event.addListener(marker, 'click', (function(marker, iterator) {
        return function() {
            markerHtml = '<strong>'+events[iterator]['event_name']+'</strong>'
                            +'<br/> '+events[iterator]['venue_name']
                            +'<br/><a id="more-info" href="#" data-key="'+iterator+'">More Info</a>';
            infowindow.setContent(markerHtml);
            infowindow.open(map, marker);
        }
    })(marker, iterator));

    iterator++;
}

google.maps.event.addDomListener(window, 'load', initialize);

// jquery methods
$(function() {
    // close event info
    $('body').on('click', '#close-button', function() {
        $(this).parent().fadeOut();
    });

    // open event info
    $('body').on('click', '#more-info', function() {
        event.preventDefault();
        var key = $(this).data('key');
        contentHtml = '<span id="close-button" class="close">&times;</span>'
                        +'<h4>'+events[key]['event_name']+'</h4>'
                        +'<p class="addr"><strong>Location</strong> '+events[key]['venue_name']
                        +'<br/>'+events[key]['street_address']
                        +'<br/>'+events[key]['city']+', '+events[key]['state']+' '+events[key]['postal_code']
                        +'<br/>'+events[key]['telephone']+'</p>'
                        +'<p class="description">'+stripTags(events[key]['web_description'])
                        +'<span class="small">&mdash;'+events[key]['critic_name']+'</span></p>'
                        +'<p>'+events[key]['date_time_description']+'</p>';
        if (events[key]['times_pick']) {
            contentHtml += '<p><span class="glyphicon glyphicon-ok"></span> New York Times Critics\' Pick</p>'
        }

        // if about info is open...close it!
        if ($('#about-info').css('display') === 'block') {
            $('#about-info').fadeOut();
        }

        $('#event-info').fadeOut(function() {
            $(this).html(contentHtml).fadeIn();
        });
    });

    // open about info
    $('#nav-about').click(function() {
        event.preventDefault();
        // if event info is open...close it!
        if ($('#event-info').css('display') === 'block') {
            $('#event-info').fadeOut();
        }

        // hide collapased navbar, then show about info
        if ($('.navbar-collapse').hasClass('in')) {
            $('button.navbar-toggle').click();
        }
        $('#about-info').fadeIn();
    });
});

function stripTags(content) {
    content = content.replace(/<p>/gi, '');
    content = content.replace(/<\/p>/gi, '');
    return content;
}
