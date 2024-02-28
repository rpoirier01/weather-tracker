import { getWeatherForZip } from "./weatherFetch.js";

const totalDays = 6; //3 is free API limit


const searchButton = document.getElementById('search-button');
const zipInput = document.getElementById('zip-input');


searchButton.addEventListener('click',async ()=>updateForecast());

const titleCard = document.querySelector('h1');
const alertBanner = document.querySelector('.alert');
const dayCards = document.querySelectorAll('.row .card-body')



async function getCleanWeatherData(){
    const weatherData = await getWeatherForZip(zipInput.value)
    // console.log(weatherData)
    let forecast = [];
    for(let i=0;i<totalDays;i++){
        const fd = weatherData.forecast.forecastday[i];
        let day = {alerts:weatherData.alerts, date:fd.date, minTempC:fd.day.mintemp_c, maxTempC:fd.day.maxtemp_c, minTempF:fd.day.mintemp_f, maxTempF:fd.day.maxtemp_f,
                   chanceRain:fd.day.daily_chance_of_rain, chanceSnow:fd.day.daily_chance_of_snow, precipIn:fd.day.totalprecip_in, location:weatherData.location.name};
        forecast.push(day)
    }
    // console.log(forecast)
    return forecast;
}

async function updateForecast(){
    const weather = await getCleanWeatherData();

    //could make this into a modal
    if(weather[0].alerts.length!=0 && 'headline' in weather[0].alerts){
        alertBanner.innerHTML = '<b>'+ weather[0].headline +'</b>';
    }
    else if(weather[1].alerts.length!=0 && 'headline' in weather[1].alerts){
        alertBanner.innerHTML = '<b>'+ weather[1].headline +'</b>';
    }

    titleCard.innerHTML = '<b>' + weather[0].location + " Weather Forecast" +'</b>'
    for(let cardIndex in dayCards){
        dayCards[cardIndex].innerHTML = '<b>' +  weather[cardIndex].date.slice(5,10) +  '</b>' + ': ' +
                            '<span>High: ' + Math.round(weather[cardIndex].maxTempF) + '</span>' +
                            '<span> Low: ' + Math.round(weather[cardIndex].minTempF) + '<br>' +
                            'Precip Chance: ' + weather[cardIndex].chanceRain + ' Amt: ' + weather[cardIndex].precipIn;
        
    }
}


export{
    totalDays
}