var atmResponse;
var atmEntries;
var bankResponse;
var bankEntries;
var marker = [];
var map;
var counter = 0;
var mapCanvas;
var mapOptions;
var myLatLng;



//request to get the atm data
$.ajax({
    url: "http://api.reimaginebanking.com/atms?lat=39.1938439&lng=-76.8650825&rad=25&key=751e3f6f45743be67593eadf8e4f40be",
    type: 'GET',
    dataType: "json",
    async: true,
    success: function(data) {
        atmResponse = data;
        atm();
        data ={};
    }
});

//request to get the bank data
$.ajax({
    url: "http://api.reimaginebanking.com/branches?key=751e3f6f45743be67593eadf8e4f40be",
    type: 'GET',
    dataType: "json",
    async: true,
    success: function(data) {
        bankResponse = data;
        bank();

    }
});




function atm() {

    atmEntries = [];
    for (i = 0; i < atmResponse.data.length; i++) {

        atmEntries.push(atmResponse.data[i]);
        //console.log(atmEntries[i].geocode);
    }


    initialize(atmEntries);
}


function bank() {

    bankEntries = [];
    for (i = 0; i < bankResponse.length; i++) {

        bankEntries.push(bankResponse[i]);
        //console.log(bankEntries[i].geocode);
    }


    bankInitialize(bankEntries);
}





//initialize the map
function initialize(entries) {


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







    var trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(map);

    for (k = 0; k < entries.length; k++) {


 
            myLatLng = {
                lat: parseFloat(entries[k].geocode.lat),
                lng: parseFloat(entries[k].geocode.lng)
            };


            var thing = new google.maps.Marker({
                position: myLatLng,
                //title: entries[k].route + ' ' + entries[k].direction,
                map: map,
                icon: atm
            });

            marker.push(thing);



    }



    google.maps.event.addDomListener(window, 'reload', initialize);

}


//initialize the map
function bankInitialize(entries) {


//var atm = 'https://raw.githubusercontent.com/kahlih/CapitalOneHACKTX/master/images/piggybank.png';


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







    var trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(map);

    for (k = 0; k < entries.length; k++) {


 
            myLatLng = {
                lat: parseFloat(entries[k].geocode.lat),
                lng: parseFloat(entries[k].geocode.lng)
            };


            var thing = new google.maps.Marker({
                position: myLatLng,
                //title: entries[k].route + ' ' + entries[k].direction,
                map: map
               // icon: atm
            });

            marker.push(thing);
    }
    google.maps.event.addDomListener(window, 'reload', initialize);

}



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
