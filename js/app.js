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

app.dislayInfo = function(information){
	var city = $('<h3>').text(information.display_location.full);
	console.log(city)
	var temp = $('<h2>').text('Current Tempature '+ Math.floor(information.temp_c) + '°');
	var feel = $('<h2>').text('Feels Like ' + information.feelslike_c + '°');
	var icon = $('<img>').attr('src', information.icon_url)
	var weather = $('<h4>').text(information.icon);
	var finalAnswer = $('<div>').addClass('weatherResult').append(city,temp, icon, feel, weather);
	$('#weather').append(finalAnswer);

};

app.makeup = function(){
	$.ajax({ 
		url: 'https://sheetsu.com/apis/v1.0/3a19b965',
		dataType: 'json',
		type: 'GET',
		success: function(data) {
           addCharacters(data);
         },
​
         error: function(data) {
           console.log(data);
         }

       });
​
       addCharacters = function(characters) {
         var list = $('#characters-list');
         for(var i=0; i<characters.length; i+=1) {
           char = characters[i];
           html = "<li id=" + char.id + "><h3>" + char.name + "</h3><p>Score: " + char.score + "</p></li>";
           list.append(html);
         }
};




app.init = function() {
	app.addCharacters();
	};

 

$(function(){
 app.init();
});