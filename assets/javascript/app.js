$(document).ready(function() {

  $(document).on("click", "#add-superhero", displaySuperhero);
  $(document).on("click", "#add-zipcode", updateMap);

});

function displaySuperhero(event) {

  event.preventDefault();

  var superhero = $('#superhero-input').val().trim().toLowerCase();

  var queryURL = "https://superheroapi.com/api/10220044790216467/search/" + superhero;

  $.ajaxPrefilter(function(options) {
    if (options.crossDomain && $.support.cors) {
        options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
    }
});
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {

    for (let index = 0; index < response.results.length; index++) {
      if(response.results[index].name.toLowerCase() === superhero){
        $("#mainimage").empty();
        $("#mainimage").attr("src", response.results[index].image.url);
        $("#superhero-basic-info").empty();
        var name = response.results[index].name;
        var displayName = $("<p>").text("Name: " + name);
        $("#superhero-basic-info").append(displayName);
        var birthplace = response.results[index].biography["place-of-birth"];
        var displaybirthplace = $("<p>").text("Place of Birth: " + birthplace);
        $("#superhero-basic-info").append(displaybirthplace);
        var fullname = response.results[index].biography["full-name"];
        var displayfullname = $("<p>").text("Full Name: " + fullname);
        $("#superhero-basic-info").append(displayfullname);
        var aliases = response.results[index].biography.aliases;
        var displayaliases = $("<p>").text("Aliases: " + aliases);
        $("#superhero-basic-info").append(displayaliases);
        var race = response.results[index].appearance.race;
        var displayrace = $("<p>").text("Race: " + race);
        $("#superhero-attributes").empty();
        $("#superhero-attributes").append(displayrace);
        var alignment = response.results[index].biography.alignment;
        var displayalignment = $("<p>").text("Alignment: " + alignment);
        $("#superhero-attributes").append(displayalignment);
        var work = response.results[index].work.occupation;
        var displaywork = $("<p>").text("Occupation: " + work);
        $("#superhero-attributes").append(displaywork);
        var publisher = response.results[index].biography.publisher;
        var displaypublisher = $("<p>").text("Publisher: " + publisher);
        $("#superhero-attributes").append(displaypublisher);
        var combat = response.results[index].powerstats.combat;
        var displaycombat = $("<p>").text("Combat: " + combat);
        $("#superhero-powers-first-appearance").empty();
        $("#superhero-powers-first-appearance").append(displaycombat);
        var durability = response.results[index].powerstats.durability;
        var displaydurability = $("<p>").text("Durability: " + durability);
        $("#superhero-powers-first-appearance").append(displaydurability);
        var intelligence = response.results[index].powerstats.intelligence;
        var displayintelligence = $("<p>").text("Intelligence: " + intelligence);
        $("#superhero-powers-first-appearance").append(displayintelligence);
        var power = response.results[index].powerstats.power;
        var displaypower = $("<p>").text("Power: " + power);
        $("#superhero-powers-first-appearance").append(displaypower);
        var speed = response.results[index].powerstats.speed;
        var displayspeed = $("<p>").text("Speed: " + speed);
        $("#superhero-powers-first-appearance").append(displayspeed);
        var strength = response.results[index].powerstats.strength;
        var displaystrength = $("<p>").text("Strength: " + strength);
        $("#superhero-powers-first-appearance").append(displaystrength);
        var firstappearance = response.results[index].biography["first-appearance"];
        var displayfirstappearance = $("<p>").text("First Appearance: " + firstappearance);
        $("#superhero-powers-first-appearance").append(displayfirstappearance);
        var groupaffiliation = response.results[index].connections["group-affiliation"];
        var displaygroup = $("<p>").text("Group Affiliations: " + groupaffiliation);
        $("#group-affiliations").empty();
        $("#group-affiliations").append(displaygroup);
        var relatives = response.results[index].connections.relatives;
        var displayrelatives = $("<p>").text("Relatives: " + relatives);
        $("#relatives").empty();
        $("#relatives").append(displayrelatives);

      }
    }
  });

}

var map
var geocoder

function initMap() {
  geocoder = new google.maps.Geocoder();
  map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP
  });
  var marker = new google.maps.Marker({
      position: new google.maps.LatLng(-34.397, 150.644),
      map: map
  })
}

function updateMap(event) {
  event.preventDefault();
  var zip = $('#zip-code-input').val()
  var lat = ''
  var long = ''
  geocoder.geocode({ 'address': zip }, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
          //Got result, center the map and put it out there
          map.setCenter(results[0].geometry.location);
          lat = String(results[0].geometry.location.lat())
          long = String(results[0].geometry.location.lng())
          var marker = new google.maps.Marker({
              map: map,
              position: results[0].geometry.location
          });
          var queryURL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat + ',' + long}&radius=16000&type=book_store&keyword=comic&key=AIzaSyD20NIWf6ypY2ycKxgB_pCVUPWYwP8F2Gs`;
          $.ajax({
              url: queryURL,
              dataType: 'jsonp',
              method: "GET"
          })
              .then(function (response) {
                  console.log('PLACES RESULTS!!!', response)
                  // Storing an array of results in the results variable
                  var results = response.data;

                  // var store = new google.maps.
              })
      } else {
          console.log("Geocode was not successful for the following reason: " + status);
      }
      var request = {
          location: map.getCenter(),
          radius: 20000,
          types: ['comic','book store']
      };

      var service = new google.maps.places.PlacesService(map);

      function createMarker(result) {
          var marker = new google.maps.Marker({
              position: result.geometry.location,
              map: map,
              title: 'Comics!'
          });
      }

      function createMarkers(results, status) {
          if (status == google.maps.places.PlacesServiceStatus.OK) {
              console.log('got into if statement')
              for (var i = 0; i < results.length; i++) {
                  console.log('processing a result', results[i]);
                  var place = results[i];
                  createMarker(results[i]);
                  console.log('created a marker');
              }
          }
      }

      service.nearbySearch(request, createMarkers);
  });
}