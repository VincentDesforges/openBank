// TODO: Put your JS code in here
import GMaps from 'gmaps';

const geoForm = document.getElementById("geoForm");
const titleHTML = document.getElementById("lat-long-title");
// console.log(geoForm)
console.log(titleHTML.innerHTML);

const callApi = (searchedAddress, callback) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${searchedAddress}`;
  fetch(url)
    .then(response => response.json())
    .then((data) => {
      // console.log(data)
      callback(data);
    });
};

const deleteOldSearch = () => {
  titleHTML.innerHTML = "";
};

const createNewMap = (latitude, longitude) => {
  const map = new GMaps({ el: '#map', lat: latitude, lng: longitude, zoom: 14 });
  const marker = { lat: latitude, lng: longitude };
  map.addMarkers([marker]);
};

const pushCoordinatesAndMapToDOM = (data) => {
  console.log(data);
  console.log(data.results[0].geometry.location.lat);
  const lat = data.results[0].geometry.location.lat;
  const lng = data.results[0].geometry.location.lng;
  titleHTML.innerHTML = `<h2>${lat}, ${lng}</h2>`;
  createNewMap(lat, lng);
  // geoForm.insertAdjacentHTML("afterend", `<h2>${lat}, ${lng}</h2>`);
};

geoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  callApi(event.target.requiredField.value, pushCoordinatesAndMapToDOM);
});
