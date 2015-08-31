(function ($) {
  
  function GEOprocess(position) {
      // update the page to show we have the lat and long and explain what we do next
    $('#geoMOB').prepend('Latitude: ' + position.coords.latitude + ' Longitude: ' + position.coords.longitude);
    $('#edit-field-point-und-0-geom-lat').val(position.coords.latitude);
    $('#edit-field-point-und-0-geom-lon').val(position.coords.longitude);
    $('#tipp-node-form').submit();
  }
  
  // this is used when the visitor bottles it and hits the "Don't Share" option
  function GEOdeclined(error) {
    document.getElementById('geo').innerHTML = 'Error: ' + error.message;
  }

  function setCookie(key, value) {
    var expires = new Date();
    expires.setTime(expires.getTime() + (1 * 24 * 60 * 60 * 1000));
    document.cookie = key + '=' + value + ';expires=' + expires.toUTCString();
  }

  function geoMOB() {
    if (navigator.geolocation) {
	  navigator.geolocation.getCurrentPosition(GEOprocess, GEOdeclined);
    } else {
      document.getElementById('geo').innerHTML = 'Your browser sucks. Upgrade it.';
    }
  }
  
  $(document).ready(function($) {
   
    $('#geoMOB').click(function() {
      geoMOB();
    });
    
    });
}) (jQuery);