import loadWeatherUI from "./loadWeather";

const seInp = document.getElementById('search-sec');
const se = document.getElementById('se-inp');
const err = document.getElementById('se-error');


function loadError(){
    if (err.classList.contains('error-msg-show')) return;
    err.classList.replace('hide','error-msg-show');
}
function hideError(){
    if (err.classList.contains('error-msg-show'))
        err.classList.replace('error-msg-show','hide');
}


async function loadApi(cityName){
    let url=`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?&key=J2BDR7FBKT3YE359V2F556PSQ&unitGroup=uk&lang=en`;
    try{
        let response = await fetch(url);
        let json = await response.json();
        hideError();
        loadWeatherUI(json);
    }catch{
        console.log('Error');
        loadError();
    }
}

seInp.onsubmit=(e)=>{
    e.preventDefault();
    loadApi(se.value);
}

loadApi('London');


