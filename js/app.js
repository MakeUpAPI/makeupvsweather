// Weather API Key 695d8437df55f0c3

var app = {};

// this is to get your Geolocation
var options = {
	  enableHighAccuracy: true,
	  timeout: 5000,
	  maximumAge: 0
	};

	function success(pos) {
	  var crd = pos.coords;
	  app.latitude = crd.latitude;
	  app.longitude = crd.longitude;
	  console.log('Your current position is:');
	  console.log('Latitude : ' + crd.latitude);
	  console.log('Longitude: ' + crd.longitude);
	  console.log('More or less ' + crd.accuracy + ' meters.');
	  app.weather(app.latitude,app.longitude)
	};

	function error(err) {
	  console.warn('ERROR(' + err.code + '): ' + err.message);
	};

	navigator.geolocation.getCurrentPosition(success, error, options);

// AJAX call to weather API
app.weather = function(lat,long){
	$.ajax({
	  url: 'http://api.wunderground.com/api/695d8437df55f0c3/conditions/forecast/alert/q/'+ lat +',' + long +'.json',
	  method: 'GET',
	  dataType: 'json',
	}).then(function(result) {
		app.dislayInfo(result.current_observation)
	  console.log(result.current_observation);
	});
};

// Displaying weather API info onto page
app.dislayInfo = function(information){
	app.city = $('<h3>').text(information.display_location.full);
	// console.log(city)
	app.temp = $('<h2>').text('Current Tempature '+ Math.floor(information.temp_c) + '°');
	app.feel = $('<h2>').text('Feels Like ' + information.feelslike_c + '°');
	app.icon = $('<img>').attr('src', information.icon_url)
	app.weather = $('<h4>').text(information.icon);
	app.finalAnswer = $('<div>').addClass('weatherResult').append(app.city,app.temp, app.icon, app.feel, app.weather);
	$('#weather').append(app.finalAnswer);

};

// AJAX call to makeup sheetsu
app.makeupData = function(){
	    $.ajax({
	        url: 'https://sheetsu.com/apis/v1.0/3a19b965',
	        method: 'GET',
	        dataType: 'json',
	    }).then(function(data){
	        app.lipstick(data);
	        console.log(data);
	    }); // end of Sheetsu AJAX call
	
};

// app.lipStick = function (lipstick){
// 	app.lipStickType = lipstick[index].type
// 	console.log(app.lipStickType);
// };


app.lipstick = function(lipcolor){
	if(app.temp <= 0 && app.icon === 'clear' && color.type === 'red') {
		$.each(lipcolor, function(i, color) {
			var lipStickType= $('<h2>').text(color.name);
			var lipStickShade =$('<h3>').text(color.type);
			var makeUpAnswer = $('<div>').append(lipStickType, lipStickShade);
			console.log(makeUpAnswer)
			$('#makeUp').append(makeUpAnswer);
		});
	}
	else if (app.temp >= 0 && app.icon === 'clear' && color.type === 'coral'){
		$.each(lipcolor, function(i, color) {
			var lipStickType= $('<h2>').text(color.name);
			var lipStickShade =$('<h3>').text(color.type);
			var makeUpAnswer = $('<div>').append(lipStickType, lipStickShade);
			console.log(makeUpAnswer)
			$('#makeUp').append(makeUpAnswer);
		});
	}
	else {
		$.each(lipcolor, function(i, color) {
			var lipStickType= $('<h2>').text(color.name);
			var lipStickShade =$('<h3>').text(color.type);
			var makeUpAnswer = $('<div>').append(lipStickType, lipStickShade);
			console.log(makeUpAnswer)
			$('#makeUp').append(makeUpAnswer);
		});
	}
};




app.init = function() {
	app.makeupData();
	app.lipstick();
	};

 

$(function(){
 app.init();
});