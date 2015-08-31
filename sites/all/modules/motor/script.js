(function ($) {
  
  function GEOprocess(position) {
      // update the page to show we have the lat and long and explain what we do next
    $('body').prepend('Latitude: ' + position.coords.latitude + ' Longitude: ' + position.coords.longitude);
      
  }
  
  // this is used when the visitor bottles it and hits the "Don't Share" option
  function GEOdeclined(error) {
    document.getElementById('geo').innerHTML = 'Error: ' + error.message;
  }


  $(document).ready(function($) {
   

   
    
   if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(GEOprocess, GEOdeclined);
    }else{
      document.getElementById('geo').innerHTML = 'Your browser sucks. Upgrade it.';
    }
    
    
    
  });
}) (jQuery);