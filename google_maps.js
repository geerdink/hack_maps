// First, create an object containing LatLng and revenue for each customer.
var customers = {
    1: {
        postal_code: "3454+LD",
        revenue: 2714856,
        location: {lat: 52.0823742, lng: 5.0764477}
    },
    2: {
        postal_code: "3455+AB",
        revenue: 8405837,
        location: {lat: 52.1823742, lng: 5.1764477}
    },
    3: {
        postal_code: "3456+AB",
        revenue: 3857799,
        location: {lat: 52.0823742, lng: 5.1764477}
    },
    4: {
        postal_code: "3457+AA",
        revenue: 603502,
        location: {lat: 52.1823742, lng: 5.0764477}
    }
};

function getCustomers() {
    for (var key in customers) {
        if (!customers.hasOwnProperty(key)) continue;

        var customer = customers[key];
        var url = "https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyBL_3_jVj683n24Fm9zQZxnj9HjdrNCSSg&address=" + customer.postal_code + "+Netherlands"

        $.ajax({
            async: true,
            type: "GET",
            url: url,
            success: function (response) {
               //processResponse(response, key)
            }
        });
    }
}

function processResponse(json, key) {
    console.log(json.results[1].geometry.location.lat);
    customers[key].location = json.results[1].geometry.location;
}

function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                alert(allText);
            }
        }
    }
    rawFile.send(null);
}

function Get(url){
    var request = new XMLHttpRequest();
    request.open("GET",url,false);
    request.send(null);
    return request.responseText;
}

function initMap(postalCode) {
    // location of company
    var json = Get("https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyBL_3_jVj683n24Fm9zQZxnj9HjdrNCSSg&address=" + postalCode + "+Netherlands")
    var parsed = JSON.parse(json)
    var location = parsed.results[1].geometry.location

    // Create a map object and specify the DOM element for display.
    var map = new google.maps.Map(document.getElementById('googleMap'), {
        center: location,
        zoom: 10
    });

    // Create a marker and set its position.
    var marker = new google.maps.Marker({
        map: map,
        position: location,
        title: 'Uw bouwbedrijf'
    });

    // Construct the circle for each value in customers.
    // Note: We scale the area of the circle based on the population.
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
            //center: citymap[city].center,
            center: customers[c].location,
            radius: Math.sqrt(customers[c].revenue) * 2
        });
    }
}

function loadMap() {
    console.log("loadMap");

    var postalCode = $('#postcode').val();
    if (postalCode.length == 6) {
        initMap(postalCode.replace(" ", "+"))
    } else {
      //  $("#googleMap").hide();
    }
}

//google.maps.event.addDomListener(window, 'load', getCustomers);
//google.maps.event.addDomListener(window, 'load', initMap);
