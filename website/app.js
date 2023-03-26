fetch("./json-files/countries.json")
  .then((res) => res.json())
  .then((data) => {
    for (let i in data) {
      let item = data[i];
      var x = document.getElementById("country");
      var option = document.createElement("option");
      option.text = item.name;
      option.value = item.code
      x.add(option);
    }
  })
  .catch((err) => {
    console.log(err);
  });

  // selecting loading div
const loader = document.querySelector("#loading");

  // showing loading
function displayLoading() {
  loader.classList.add("display");
}

// hiding loading 
function hideLoading() {
  loader.classList.remove("display");
}

function myCountry() {
  displayLoading()
  const select = document.getElementById("country");
  const value = select.options[select.selectedIndex].value;
  const x = document.getElementById("cities")
  .innerHTML= `<option value="select your city"></option>`;
  fetch("./json-files/city.json")
    .then((res) => res.json())
    .then((data) => {
      var cities = data.filter(el =>
        el.country == value
      )
      for (let i in cities) {
        let item = cities[i];
        var x = document.getElementById("cities");
        var option = document.createElement("option");
        option.text = item.name;
        option.value = item.id
        x.add(option);
      }
      hideLoading()
    })
    .catch((err) => {
      console.log(err);
    });
}

let cityId

function myCity() {
  var select = document.getElementById("cities");
  var value = select.options[select.selectedIndex].value;
  return cityId = value
}

// Create a new date instance dynamically with JS
let d = new Date();
let month = new Array();
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";
let newDate = month[d.getMonth()] + "." + d.getDate() + "." + d.getFullYear();

/* Global Variables */
const basicURL = "https://api.openweathermap.org/data/2.5/weather?id=";
// Personal API Key for OpenWeatherMap API
const apiKey = "&appid=041978f5d1cccac048452a949c36ce88&units=metric";
// Event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener("click", clickAction);
function clickAction() {
  // if (!zip.value) {
  //   console.log("enter zip");
  //   alert("your zip code is missing");
  // } else {
  //   const zipCode = document.getElementById("zip").value;
  if (cityId == undefined) {
    console.log("select your country and city");
    alert("select your country and city");
  } else {
    getInfo(basicURL, cityId, apiKey)
      .then((info) => {
        return needData(info);
      })
      .then((lastData) => {
        return updateUI(lastData);
      });
  }
}

/* Function to GET Web API Data*/
const getInfo = async (basicURL, cityId, apiKey) => {
  const lang = "&lang=en";
  const fetching = basicURL + cityId + apiKey + lang
  const res = await fetch(fetching);
  try {
    displayLoading();
    const data = await res.json();
    const city = data.name;
    const temp = data.main.temp;
    const icon = data.weather[0].icon
    const description = data.weather[0].description
    const wind = data.wind ? data.wind.speed : 0
    const snow = data.snow ? data.snow["1h"] : 0
    const rain = data.rain ? data.rain["1h"] : 0
    const info = [temp, city, icon, description, wind, snow, rain]
    return info;
  } catch (error) {
    console.log("error", error);
  }
};

/* Function to POST data */
const needData = async (info) => {
  const feeling = document.getElementById("feelings").value;
  try {
    const res2 = await fetch("/postinfo", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        (data2 = {
          temp: info[0],
          city: info[1],
          icon: info[2],
          description: info[3],
          wind: info[4],
          snow: info[5],
          rain: info[6],
          newDate,
          feeling: feeling,
        })
      ),
    });
    return data2;
  } catch (error) {
    console.log("error", error);
  }
};

/* Function to GET Project Data and update UI */
const updateUI = async () => {
  const req = await fetch("/store");
  try {
    const lastData = await req.json();
    document.getElementById("date").innerHTML = `<i style="color:#ffeb3b" class="fa-regular fa-calendar-days"></i> <span style="color:#ffeb3b">date:</span> ${lastData.newDate}`;
    document.getElementById(
      "temp"
    ).innerHTML = `<i style="color:#ffeb3b" class="fa-solid fa-temperature-three-quarters"></i> <span style="color:#ffeb3b"></span> ${lastData.temp} <sup>o</sup>C`;
    document.getElementById(
      "city"
    ).innerHTML = `<img src="https://openweathermap.org/img/wn/${lastData.icon}@2x.png" width=50px /> ${lastData.city}`;
    document.getElementById(
      "content"
    ).innerHTML = `<i style="color:#ffeb3b" class="fa-solid fa-person-circle-question"></i> <span style="color:#ffeb3b">your feeling:</span> ${lastData.feeling}`;
    document.getElementById(
      "description"
    ).innerHTML = `${lastData.description}`;
    document.getElementById(
      "wind"
    ).innerHTML = `<i style="color:#ffeb3b" class="fa-solid fa-wind"></i> <span style="color:#ffeb3b">wind:</span> ${lastData.wind} km/h`;
    document.getElementById(
      "rain"
    ).innerHTML = `<i style="color:#ffeb3b" class="fa-solid fa-cloud-showers-heavy"></i> <span style="color:#ffeb3b">rain:</span> ${lastData.rain} /1h`;
    document.getElementById(
      "snow"
    ).innerHTML = `<i style="color:#ffeb3b" class="fa-solid fa-snowplow"></i> <span style="color:#ffeb3b">snow:</span> ${lastData.snow} /1h`;
    hideLoading();
  } catch (error) {
    console.log("error", error);
  }
};
