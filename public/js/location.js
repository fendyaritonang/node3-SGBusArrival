$(function () {
    var id, target, options;
  
    function success(pos) {
      var crd = pos.coords;    
      $('.location').html(`${$('.location').html()}<div>Lat: ${crd.latitude}, lon: ${crd.longitude}</div>`)
    }
  
    function error(err) {
      console.warn('ERROR(' + err.code + '): ' + err.message);
    }
  
    target = {
      latitude: 0,
      longitude: 0,
    };
  
    options = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 0,
    };
  
    id = navigator.geolocation.watchPosition(success, error, options);
  });
  