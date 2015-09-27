var atmResponse;
var atmatmEntries;
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
        
        //request to get the bank data
    $.ajax({
    url: "http://api.reimaginebanking.com/branches?key=751e3f6f45743be67593eadf8e4f40be",
    type: 'GET',
    dataType: "json",
    async: true,
    success: function(Bankdata) {
        bankResponse = Bankdata;
        atm();
    }
});


    }
});






function atm() {

    atmEntries = [];
    for (i = 0; i < atmResponse.data.length; i++) {

        atmEntries.push(atmResponse.data[i]);
        //console.log(atmEntries[i].geocode);
    }

        bankEntries = [];
    for (i = 0; i < bankResponse.length; i++) {

        bankEntries.push(bankResponse[i]);
        //console.log(bankEntries[i].geocode);
    }


    initialize(atmEntries, bankEntries);
}


//initialize the map
function initialize(atmEntries, bankEntries) {


var atm = 'https://raw.githubusercontent.com/kahlih/CapitalOneHACKTX/master/images/piggybank.png';
var bank = 'https://raw.githubusercontent.com/kahlih/CapitalOneHACKTX/master/images/bank.png';


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

    for (k = 0; k < atmEntries.length; k++) {


 
            myLatLng = {
                lat: parseFloat(atmEntries[k].geocode.lat),
                lng: parseFloat(atmEntries[k].geocode.lng)
            };


            var thing = new google.maps.Marker({
                position: myLatLng,
                title: 'Open '+ atmEntries[k].hours,
                map: map,
                icon: atm
            });

            marker.push(thing);



    }

        for (k = 0; k < bankEntries.length; k++) {


 
            myLatLng = {
                lat: parseFloat(bankEntries[k].geocode.lat),
                lng: parseFloat(bankEntries[k].geocode.lng)
            };


            var thing = new google.maps.Marker({
                position: myLatLng,
                //title: bankEntries[k].route + ' ' + bankEntries[k].direction,
                map: map,
                icon: bank
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
