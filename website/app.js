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

function myCountry() {
  var select = document.getElementById("country");
  var value = select.options[select.selectedIndex].value;
  var x = document.getElementById("cities");
  console.log(x.options)
    if (x.options.length > 0) {
      for (let i in x)
      x.remove(i);
        console.log(x.options.length)
    }
  fetch("./json-files/city.json")
    .then((res) => res.json())
    .then((data) => {
      var cities = data.filter(el=>
        el.country== value
      )
      for (let i in cities) {
        let item = cities[i];
        var x = document.getElementById("cities");
        var option = document.createElement("option");
        option.text = item.name;
        option.value = item.id
        x.add(option);
      }
    })
    // .then()
    .catch((err) => {
      console.log(err);
    });
}

let cityId

function myCity() {
  var select = document.getElementById("cities");
  var value = select.options[select.selectedIndex].value;
  return cityId= value
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
  if (cityId== undefined) {
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
  const lang= "&lang=en";
  const fetching= basicURL + cityId + apiKey + lang
  // const fetching= "https://api.openweathermap.org/data/2.5/weather?id=358619" + apiKey + lang
  const res = await fetch(fetching);
  try {
    const data = await res.json();
    console.log(data)
    const city= data.name;
    const temp= data.main.temp;
    const info= [temp, city]
    return info;
  } catch (error) {
    console.log("error", error);
  }
};

/* Function to POST data */
const needData = async (info) => {
  console.log(info)
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
          newDate,
          feeling: feeling,
        })
      ),
    });
    console.log(data2);
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
    console.log(lastData);
    document.getElementById("date").innerHTML = `date: ${lastData.newDate}`;
    document.getElementById(
      "temp"
    ).innerHTML = `temperature: ${lastData.temp} <sup>o</sup>C`;
    document.getElementById(
      "city"
    ).innerHTML = `your city: ${lastData.city}`;
    document.getElementById(
      "content"
    ).innerHTML = `your feeling: ${lastData.feeling}`;
  } catch (error) {
    console.log("error", error);
  }
};
