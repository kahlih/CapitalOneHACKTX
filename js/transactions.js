
// Nancy id : 55e94a6af8d8770528e60eb6
var customerResponse = {
	"_id": "55e94a6af8d8770528e60eb6",
	"first_name": "Nancy",
	"last_name": "Tremaine",
	"address": {
	    "street_number": "4433",
	    "zip": "24531",
	    "state": "Virginia",
	    "city": "Chatham",
	    "street_name": "Irish Road"
  }
}


// $.ajax({
//     url: "http://api.reimaginebanking.com/customer/55e94a6af8d8770528e60eb6?key=e64dd763fec874bae04dabc13c0ec8ff",
//     type: 'GET',
//     dataType: "json",
//     async: true,
//     success: function(data) {
//         customerResponse = data;
//     	console.log(customerResponse);
//     }
// });



$.ajax({
    url: "http://api.reimaginebanking.com/customers/55e94a6af8d8770528e60eb6?key=e64dd763fec874bae04dabc13c0ec8ffd",
    type: 'GET',
    dataType: "application/json",
    async: true,
    success: function(data) {
        customerResponse = data;
        console.log(customerResponse);
    }
});