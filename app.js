//Selectors
const addressInput = document.querySelector(".address-input");
const searchButton = document.querySelector(".search-button");
const resultsContainer = document.querySelector(".results-container");
const mapBkWall = document.querySelector(".map-bk-wall");

//Event Listeners
searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  let address = addressInput.value;
  let addr = address.replace(/\s/g, "+");
  const Http = new XMLHttpRequest();
  //Adiconar key para utilizar a API
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${addr}&key=YOUR_KEY_HERE`;
  Http.open("GET", url);
  Http.responseType = "json";
  Http.send();

  Http.onreadystatechange = function () {
    if (Http.status == 200 && Http.readyState == 4) {
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

function setMapData(location) {
  map.setCenter(location.geometry.location);
  map.setZoom(18);
  marker.setPosition(location.geometry.location);
}

function handleClick(result, id) {
  if (!mapBkWall.classList.contains("disabled")) {
    mapBkWall.classList.toggle("disabled");
  }

  //Do not exist before search an address
  const results = document.querySelector(".results");

  results.childNodes.forEach((child) => {
    if (child.id != id) {
      if (child.classList.contains("choosed"))
        child.classList.toggle("choosed");
    } else {
      if (!child.classList.contains("choosed"))
        child.classList.toggle("choosed");
    }
  });

  setMapData(result);
}

function addAddress(results) {
  resultsContainer.innerHTML = "";

  if (mapBkWall.classList.contains("disabled")) {
    mapBkWall.classList.toggle("disabled");
  }

  const resultsDiv = document.createElement("div");
  resultsDiv.classList.add("results");

  const resultsQuant = document.createElement("h2");
  resultsQuant.classList.add("results-quant");
  resultsQuant.innerText = `Resultados encontrados: ${results.length}`;
  resultsDiv.appendChild(resultsQuant);

  results.forEach((result, index) => {
    const resultCard = document.createElement("div");
    resultCard.id = index;
    resultCard.classList.add("result-card");

    const addressFormatted = document.createElement("h3");
    addressFormatted.innerText = result.formatted_address;
    addressFormatted.classList.add("address-formatted");

    const buttonShowOnMap = document.createElement("button");
    buttonShowOnMap.innerText = "Ver no mapa";
    buttonShowOnMap.classList.add("button-show");
    buttonShowOnMap.id = index;
    buttonShowOnMap.addEventListener("click", () => handleClick(result, index));

    resultCard.appendChild(addressFormatted);
    resultCard.appendChild(buttonShowOnMap);
    resultsDiv.appendChild(resultCard);
  });

  if (results.length === 1) {
    resultsDiv.childNodes[1].classList.toggle("choosed");

    if (!mapBkWall.classList.contains("disabled")) {
      mapBkWall.classList.toggle("disabled");
    }
    setMapData(results[0]);
  }

  resultsContainer.appendChild(resultsDiv);
}
