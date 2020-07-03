//Selectors

const addressInput = document.querySelector(".address-input");
const searchButton = document.querySelector(".search-button");
const resultsContainer = document.querySelector(".results-container");
// const userAddress = navigator.geolocation.getCurrentPosition((e) => {
//   console.log(e.coords);
// });

//Event Listeners
searchButton.addEventListener("click", (e) => {
  e.preventDefault();
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
      addAddress(Http.response.results);
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

function addAddress(results) {
  resultsContainer.innerHTML = "";

  const resultsDiv = document.createElement("div");
  resultsDiv.classList.add("results");

  results.forEach((result) => {
    const addressFormatted = document.createElement("h3");
    addressFormatted.innerText = result.formatted_address;
    addressFormatted.classList.add("address-formatted");

    const buttonShowOnMap = document.createElement("button");
    buttonShowOnMap.innerText = "Ver no mapa";
    buttonShowOnMap.classList.add("button-show");
    buttonShowOnMap.addEventListener("click", (e) => {
      map.setCenter(result.geometry.location);
      map.setZoom(18);
      marker.setPosition(result.geometry.location);
    });

    resultsDiv.appendChild(addressFormatted);
    resultsDiv.appendChild(buttonShowOnMap);
  });

  resultsContainer.appendChild(resultsDiv);
}
