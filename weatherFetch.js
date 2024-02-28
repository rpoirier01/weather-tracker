import { totalDays } from "./main.js";

async function getAPIKey(){
    
    const configData = await (await fetch('config.json')).json();
    const API_KEY = configData.API_KEY;
    return API_KEY;

}

async function getWeatherForZip(zip){
    const weatherKey = await getAPIKey();
    let weatherData = null;
    try{
        weatherData = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${weatherKey}&q=${zip}&days=${totalDays}&aqi=no&alerts=yes`);
        weatherData = await weatherData.json();
    }
    catch(err){
        console.log("Error fetching weather data:\n" + err);
    }

    return weatherData;
}




export{
    getWeatherForZip
}