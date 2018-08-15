// define globals
var monthly_quakes_endpoint = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson';

$.ajax({
  method: 'GET',
  url: monthly_quakes_endpoint ,

  success: onSuccess,
  error: onError

});

function onSuccess (response) {
  var quakesArray = response.features
  $.each(quakesArray , function () {
    var title = this.properties.title
    $('#info').append( `<p> ${title}</p>`)
  })
}

function onError (e1, e2, e3) {
  console.log(e1)
  console.log(e2)
  console.dir(e3)  
}

var map;
      function initMap() {
        var myLatLong = {lat: 37.78, lng: -122.44}
        map = new google.maps.Map(document.getElementById('map'), {
          center: myLatLong,
          zoom: 8
        });
        var marker = new google.maps.Marker({
          position: myLatLong,
          icon: "../images/earthquake.png",
          size: new google.maps.Size(11, 11),
          map: map
        });
      }

initMap();



