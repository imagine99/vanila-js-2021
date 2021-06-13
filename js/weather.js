const weather=document.querySelector(".js-weather");
const API_KEY="fefc7281c6645eca330cfc0f6188148a";
const COORDS='coords'
const icon=document.querySelector(".today-Weather");

function saveCoords(coordsObj){
    localStorage.setItem(COORDS,JSON.stringify(coordsObj));
}
function getWeather(lat,lng){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}`
    ).then(
        (res)=>{return res.json()}
    ).then(
        (json)=>{
            const tem=Math.floor(json.main.temp-273.15);
            const place=json.name;
            const todayWeather=json.weather[0].description;
            weather.innerText= `${tem}°C / ${place}`;//display
            if (todayWeather==="mist")
            {
                icon.classList.add(`wi-day-fog`);
            }
            else if(todayWeather==="few clouds")
            {icon.classList.add(`wi-day-cloudy`);}
            else if(todayWeather==="scattered clouds")
            {
                {icon.classList.add(`wi-cloud`);}
            }
            else if(todayWeather==="broken clouds")
            {
                {icon.classList.add(`wi-cloudy`);}
            }
            else if(todayWeather==="shower rain")
            {
                {icon.classList.add(`wi-showers`);}
            }
            else if(todayWeather==="rain")
            {
                {icon.classList.add(`wi-rain`);}
            }
            else
            {
                {icon.classList.add(`wi-day-sunny`);}

            }
        }
    );
}
function handleGeoSucces(position){
    console.log(position);
    const latitude=position.coords.latitude;
    const longitude=position.coords.longitude;
    const coordsObj={
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude.longitude);
}
function handleGeoError(){
    console.log("Cant access geo location");
}
function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces,handleGeoError);
}
function loadCoords(){
    const loadedCoords=localStorage.getItem(COORDS);
    if(loadedCoords===null){
        askForCoords();
    }
    else{
        const parseCoords=JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude,parseCoords.longitude);
    }
}
function init(){
    loadCoords();
}
init();