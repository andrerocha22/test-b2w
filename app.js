//Selectors

const addressInput = document.querySelector(".address-input");
const searchButton = document.querySelector(".search-button");

//Event Listeners
searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("click");
  let address = addressInput.value;
  let addr = address.replace(/\s/g, "+");
  console.log(addr);
  const Http = new XMLHttpRequest();
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${addr}&key=AIzaSyBycYVdSibUl5MysjjhuyZdTbyyrkqD510`;
  Http.open("GET", url);
  Http.responseType = "json";
  Http.send();

  Http.onreadystatechange = function () {
    if (Http.status == 200 && Http.readyState == 4) {
      console.log(Http.response);
      map.setCenter(Http.response.results[0].geometry.location);
      map.setZoom(18);
      marker.setPosition(Http.response.results[0].geometry.location);
    }
  };
});

//Functions
var map;
var marker;

function initMap() {
  marker = new google.maps.Marker({
    position: { lat: -34.397, lng: 150.644 },
  });
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });

  marker.setMap(map);
}
