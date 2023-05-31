const apiKey="52f44a3608166bab8a8ee770eff581aa";  // api key has been generated from openweather api website
const weatherDataEl=document.getElementById("weather-data");
const cityInputEl= document.getElementById("city-input")
const formEl= document.querySelector("form");

formEl.addEventListener("submit",(event)=>{
    event.preventDefault();  // prevents default refresh while submitting
    const cityValue=cityInputEl.value;  // here we get the city that is entered into the input box
    // console.log(cityValue);
    getWeatherData(cityValue);
});


async function getWeatherData(cityValue){
    try {
        const response= await fetch("https://api.openweathermap.org/data/2.5/weather?q="+ cityValue +"&appid="+ apiKey+ "&units=metric")  // awaits waits for sometime for response to come. This is not a usable information so we need to parse it as json

        if(!response.ok){
            throw new Error("Network response was not ok");
        } 

        const data =await response.json();  // parse resposnse as a json to get the data and wait for some time till the response is converted into valuable info
        console.log(data);

        const temperature= Math.round(data.main.temp);
        const description= data.weather[0].description ;
        const icon= data.weather[0].icon;
        // console.log(icon);
        const details = [
            `Feels like: ${Math.round(data.main.feels_like)}`,
            `Humidity: ${data.main.humidity}%`,
            `Wind speed: ${data.wind.speed} m/s`,
          ];
      
          weatherDataEl.querySelector(
            ".icon"
          ).innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`;
          
        weatherDataEl.querySelector(".temperature").textContent=temperature+'°C';
        weatherDataEl.querySelector(".description").textContent=description;
        weatherDataEl.querySelector(".details").innerHTML=details.map((detail)=>`<div>${detail}</div>`).join("");
    } catch (error) {

        weatherDataEl.querySelector(".icon").innerHTML = "";
        weatherDataEl.querySelector(".temperature").textContent="";
        weatherDataEl.querySelector(".description").textContent="An error occured, please try again later";
        weatherDataEl.querySelector(".details").innerHTML="";
    }
}



//Note:for string interpolation, use backtick(``) instead of single quotes.
