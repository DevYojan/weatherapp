$(document).ready(function(){
	
	$('#message').html("Please allow the application to access your location.");

	if (navigator.geolocation) {
		
		navigator.geolocation.getCurrentPosition(function(position) {

			$.getJSON('https://fcc-weather-api.glitch.me/api/current?lat='+
			position.coords.latitude+'&lon='+position.coords.longitude, function(json){
				$('#message').remove();
				$('#location').html(json.name + ', ' + json.sys.country);
				$('#icon').html("<img src="+json.weather[0].icon+'" id="image">');
				$('#temp').html("<span id='degree'>" + json.main.temp + "</span> &deg; "
					+"<span id='convert'>C</span>");

				/*Captizlizing first letter of each word of description*/
				
				json.weather[0].description =  json.weather[0].description.replace(/\w\S*/g, 
				function(txt){
					return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
				});

				$('#description').html("<br>" + json.weather[0].description);

				$('#convert').on('click', function(){
					var c = json.main.temp;

					var text = $('#convert').text();

					if (text == "C") {
						var f = (json.main.temp * (9/5))+32;
						$('#degree').html(f);
						$('#convert').html("F");
					} else {
						$('#degree').html(c);
						$('#convert').html("C");
					}

				});
			});
		});
	}
});
