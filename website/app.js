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
const basicURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
// Personal API Key for OpenWeatherMap API
const apiKey = "&appid=041978f5d1cccac048452a949c36ce88&units=metric";
// Event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener("click", clickAction);
function clickAction() {
  if (!zip.value) {
    console.log("enter zip");
    alert("your zip code is missing");
  } else {
    const zipCode = document.getElementById("zip").value;
    getInfo(basicURL, zipCode, apiKey)
      .then((temp) => {
        return needData(temp);
      })
      .then((lastData) => {
        return updateUI(lastData);
      });
  }
}

/* Function to GET Web API Data*/
const getInfo = async (basicURL, zipCode, apiKey) => {
  const res = await fetch(basicURL + zipCode + apiKey);
  try {
    const data = await res.json();
    const temp = data.main.temp;
    console.log(temp);
    return temp;
  } catch (error) {
    console.log("error", error);
  }
};

/* Function to POST data */
const needData = async (temp) => {
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
          temp: temp,
          newDate: newDate,
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
      "content"
    ).innerHTML = `your feeling: ${lastData.feeling}`;
  } catch (error) {
    console.log("error", error);
  }
};
