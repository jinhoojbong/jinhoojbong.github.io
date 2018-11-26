function weather() {
    var location = document.getElementById("location");
    var apiKey = "265c2ea9a67e8d8b35153eff6980f1c8";
    var url = "https://api.forecast.io/forecast/";

    navigator.geolocation.getCurrentPosition(success, error);

    function success(position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;

        location.innerHTML = "Latitude is " + latitude + "&deg; Longitude is " + longitude + "&deg";

        $.getJSON(
            url + apiKey + "/" + latitude + "," + longitude + "?callback=?",
            function(data) {
                $("#temperature").html(data.currently.temperature + " &deg; F <br>");
                $("#day").html(data.hourly.summary);
                var x = document.getElementById("temperature").innerHTML;
                var temperature = parseFloat(x);
                clothingAdvice(temperature);
            }
        );

        function displayLocation(latitude, longitude) {
            var geocoder;
            geocoder = new google.maps.Geocoder();
            var latlng = new google.maps.LatLng(latitude, longitude);

            geocoder.geocode(
                    {'latLng': latlng}, 
                    function(results, status) {
                        if(status == google.maps.GeocoderStatus.OK) {
                            if(results[0]) {
                                var add = results[0].formatted_address;
                                var value = add.split(",");

                                count = value.length;
                                country = value[count-1];
                                state = value[count-2];
                                city = value[count-3];
                                location.innerHTML = city + ", " + state;
                            } else {
                                location.innerHTML = "Not found";
                            }
                        }
                        else {
                            location.innerHTML = "Error: " + status;
                        }
                    }
            );
        }
        displayLocation(latitude, longitude);
    }

    function error() {
        location.innerHTML = "Unable to locate.";
    }

    function clothingAdvice(temperature) {
        if(temperature > 80) {
            $("#clothing").html("I would recommend something cool because the day seems like it will be relatively hot");
        } else if(temperature > 60 && temperature < 80) {
            $("#clothing").html("I might recommend a light jacket and some jeans. The day seems a little chilly");
        } else {
            $("#clothing").html("I might recommend some extra layers because in California, this is freezing");
        }
    }

    location.innerHTML = "Searching...";
}

weather();
