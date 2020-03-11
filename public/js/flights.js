let flights = [];

function init() {
  fetch('/json/flightsData.json')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      flights = data;
    }).then(() => {
      renderList(flights);
    });
}

function creatList(flightsList) {
  let strHtml = '<div>';
  flightsList.forEach(flight => {
    let card = `<div class="card" style="width: 18rem;">
                    <div class="card-body">
                    <div class="card-title-box">
                      <h5 class="card-title"> ${flight.flight_number}   ${flight.airline}</h5>
                      <div class="patient-number">חולה מס': ${flight.patient_number}</div>
                    </div>
                      <div class="card-contant-box">
                        <div class="card-text">
                          <i class="material-icons">flight_takeoff</i>
                           <div class="flight-detailes"> המראה מ: ${flight["departure from"]}</div>
                        </div>
                        <div class="time-text">תאריך: ${flight["departure day"]}</div>
                      </div>
                        <div class="card-contant-box">
                        <div class="card-text">
                          <i class="material-icons">flight_land</i>
                           <div class="flight-detailes">  יעד: ${flight.destination}</div>
                        </div>
                        <div class="time-text">תאריך: ${flight["arrival day"]}</div>
                      </div>
                      <p class="card-text flight-description">תאור: ${flight.description}</p>

                      
                      `;
    if (flight.health_gov_link) {
      card += `<a href="${flight.health_gov_link}" class="card-link"> מידע נוסף מאתר משרד הבריאות</a>`;
    }

    card += `</div>
                  </div>`;
    strHtml += card;
  });
  strHtml += '</div>'
  return strHtml;
}

function heandleSearchMobile() {
  // Declare variables
  var input, filter, flightListEl, card, a, i, txtValue;
  input = document.getElementById('search-input');
  value = input.value.toUpperCase();
  let filterdFlights = filterFlights(flights, value);
  renderList(filterdFlights);
}

function heandleSearchDekstop() {
  // Declare variables
  var input, filter, flightListEl, card, a, i, txtValue;
  input = document.getElementById('search-input-dekstop');
  value = input.value.toUpperCase();
  let filterdFlights = filterFlights(flights, value);
  renderList(filterdFlights);
}

function filterFlights(flights, value) {
  value = value.trim();
  let filterdFlights = flights.filter((flight) => {
    return flight.flight_number.toString().includes(value) ||
      (flight.departure_from && flight.departure_from.toString().includes(value)) ||
      (flight.destination && flight.destination.toString().includes(value)) ||
      (flight["departure day"] && flight["departure day"].toString().includes(value))||
      (flight["arrival day"] && flight["arrival day"].toString().includes(value))||
       (flight["patient_number"] && flight["patient_number"].toString().includes(value));
  })
  return filterdFlights;
}

function renderList(flights) {
  let flightListEl = document.querySelector('.flight-list');
  let list = creatList(flights);
  flightListEl.innerHTML = list;
}

init();