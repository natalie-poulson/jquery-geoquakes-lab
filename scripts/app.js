// define globals
var monthly_quakes_endpoint = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson';

$.ajax({
  method: 'GET',
  url: monthly_quakes_endpoint ,

  success: onSuccess,
  error: onError

});

function onSuccess (response) {
  console.log(response);
  initMap();
  //markerMaker();
  var quakesArray = response.features
  $.each(quakesArray , function () {
    markerMaker(this.geometry.coordinates);
    var title = this.properties.title 

    var dt = new Date();
    var time = Math.floor((((dt.getTime() - this.properties.time)/1000) / 60) / 60 ) ;
    $('#info').append( `<p> ${title}, ${time} hours ago </p>`)
  })  
}

function onError (e1, e2, e3) {
  console.log(e1)
  console.log(e2)
  console.dir(e3)  
}



var map;
      function initMap() {
        var myLatLong = {lat:33.4771667 , lng: -116.8033333}
        map = new google.maps.Map(document.getElementById('map'), {
          center: myLatLong,
          zoom: 8
        });
      }


function markerMaker(coord) {
  var lat = coord[1];
  var long = coord[0];
  //console.log(typeOf(coord[0]));
  //console.log(coord[0]);
 // var myLatLong = {lat: lat, lng: long}
 var myLatLong = {lat: lat , lng: long}
  //console.log(myLatLong);
  var image = {
    url: "../images/earthquake.png",
    size: new google.maps.Size(71, 71),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(17, 34),
    scaledSize: new google.maps.Size(25, 25)
  };
  var marker = new google.maps.Marker({
    position: myLatLong,
    icon: image,
    map: map
  });
}


