var atmResponse;
var atmEntries;
var marker = [];
var map;
var counter = 0;
var mapCanvas;
var mapOptions;
var myLatLng;

//Kahli
var user_lat;
var user_long;


//request to get the bus data
$.ajax({
    url: "http://api.reimaginebanking.com/atms?lat=39.1938439&lng=-76.8650825&rad=25&key=751e3f6f45743be67593eadf8e4f40be",
    type: 'GET',
    dataType: "json",
    async: true,
    success: function(data) {
        atmResponse = data;
        done();

    }
});



function done() {

    atmEntries = [];
    for (i = 0; i < atmResponse.data.length; i++) {

        atmEntries.push(atmResponse.data[i]);
        //console.log(atmEntries[i].geocode);
    }

    initialize(atmEntries);
}

function updater() {
    atmEntries = [];
    for (i = 0; i < atmResponse.length; i++) {

        atmEntries.push(atmResponse[i]);
    }

    updateMarkers(atmEntries);
}


//initialize the map
function initialize(atmEntries) {


var atm = 'https://raw.githubusercontent.com/kahlih/CapitalOneHACKTX/master/images/piggybank.png';


//sets the layout of the google map
    var customMapType = new google.maps.StyledMapType([{
        "stylers": [{
            "hue": "#0000ff"
        }, {
            "saturation": -79
        }, {
            "gamma": 0.51
        }, {
            "visibility": "on"
        }, {
            "weight": 1.4
        }]
    }], {
        name: 'Custom Style'
    });
    var customMapTypeId = 'custom_style';

    mapCanvas = document.getElementById('map');
    mapOptions = {
        //console.log(user_lat);
        //console.log(user_long);
        center: new google.maps.LatLng(39.2073984, -76.82441),
        zoom: 11,
                mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, customMapTypeId]
        },
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    map = new google.maps.Map(mapCanvas, mapOptions);
    map.mapTypes.set(customMapTypeId, customMapType);
    map.setMapTypeId(customMapTypeId);

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      if (pos.lat < 35.5000){
        pos.lat = 39.2073984;
        pos.lng = -76.82441;
      }
      map.setCenter(pos);
    }, function() {
      //handleLocationError(true, infoWindow, map.getCenter());
      console.log("ERROR 1");
    });
    } else {
      console.log("ERROR 2");    
    // Browser doesn't support Geolocation
    //handleLocationError(false, infoWindow, map.getCenter());
    }

    var trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(map);

    for (k = 0; k < atmEntries.length; k++) {


 
            myLatLng = {
                lat: parseFloat(atmEntries[k].geocode.lat),
                lng: parseFloat(atmEntries[k].geocode.lng)
            };


            var thing = new google.maps.Marker({
                position: myLatLng,
                title: atmEntries[k].route + ' ' + atmEntries[k].direction,
                map: map,
                icon: atm
            });

            marker.push(thing);



    }


    google.maps.event.addDomListener(window, 'reload', initialize);

}

// function updateMarkers(atmEntries) {

// //var bus = 'https://raw.githubusercontent.com/mannypamintuan/atxbusmap/master/images/bus.png';

//     for (k = 0; k < atmEntries.length; k++) {
//  if (atmEntries[k].inservice === "Y") {
//             myLatLng = {
//                 lat: parseFloat(atmEntries[k].location.substring(0, atmEntries[k].location.indexOf(",") - 1)),
//                 lng: parseFloat(atmEntries[k].location.substring(atmEntries[k].location.indexOf(",") + 1, atmEntries[k].location.length))
//             };
//            // console.log("Updated!");
//         var thing = new google.maps.Marker({
//                 position: myLatLng,
//                 title: atmEntries[k].route + ' ' + atmEntries[k].direction,
//                 map: map,
//                 //icon: bus
//             });
//            marker.push(thing);

//         }
//     }
// }


function reloadTiles() {
    var tiles = $("#map").find("img");
    for (var i = 0; i < tiles.length; i++) {
        var src = $(tiles[i]).attr("src");
        if (/googleapis.com\/vt\?pb=/.test(src)) {              
            var new_src = src.split("&ts")[0] + '&ts=' + (new Date()).getTime();
            $(tiles[i]).attr("src", new_src);                                                   
        }               
    }
}   



//var markers = marker;
//console.log(markers);

// function test(fee, currentMap) {
//     var counter = 0;

//     setInterval(function() {

//         for (i = 0; i < fee.length; i++) {
//             console.log(fee[i]);
//             fee[i].setMap(null);
//         }

//         $.ajax({
//             url: "https://data.texas.gov/resource/9e7h-gz56.json",
//             type: 'GET',
//             dataType: "json",
//             async: true,
//             success: function(data) {
//                 atmResponse = data;
//                 updater();
//             }
//         });

//     }, 20000);

//     setInterval(reloadTiles, 5000);       

// };

// test(markers, map);