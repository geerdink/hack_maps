function Get(url){
    var request = new XMLHttpRequest();
    request.open("GET",url,false);
    request.send(null);
    return request.responseText;
}

function initMap() {
    console.log("initMap");
    loadMap("3454+LD");
}

function loadMap(postalCode) {
    console.log("initMap(" + postalCode + ")");

    var json = Get("https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyBL_3_jVj683n24Fm9zQZxnj9HjdrNCSSg&address=" + postalCode + "+Netherlands");
    console.log(json);

    var parsed = JSON.parse(json);
    var location = parsed.results[1].geometry.location;

    createMap(location)
}

function createMap(location) {
    console.log("createMap");

    // Create a map object and specify the DOM element for display.
    var map = new google.maps.Map(document.getElementById('googleMap'), {
        center: location,
        zoom: 10
    });

    google.maps.event.addListener(map, "rightclick", function(event) {
        var lat = event.latLng.lat();
        var lng = event.latLng.lng();

        createMap(new google.maps.LatLng(lat, lng))
    });

    // Create a marker and set its position.
    var marker = new google.maps.Marker({
        map: map,
        position: location,
        title: 'Uw bouwbedrijf'
    });

    // Construct the circle for each value in customers.
    // We scale the area of the circle based on the revenue.
    for (var c in customers) {
        //if (!customers.hasOwnProperty(key)) continue;
        //var customer = customers[key];
        // Add the circle for this city to the map.
        var circle = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            map: map,
            center: new google.maps.LatLng(customers[c].lat, customers[c].lng),
            radius: Math.sqrt(customers[c].revenue) * 2
        });
    }
}

function reLoadMap() {
    console.log("reLoadMap");

    var postalCode = $('#postcode').val();
    if (postalCode.length == 6) {
        initMap(postalCode.replace(" ", "+"))
    } else {
      //  $("#googleMap").hide();
    }
}

//google.maps.event.addDomListener(window, 'load', initMap());
