import loadSplashApi from "./splashApi";

let wdays = undefined;
const currentLocation = document.getElementById('loc-value');
const wtemp = document.getElementById('wtemp');
const wstate = document.getElementById('wstate');
const wdate = document.getElementById('wdate');
const wDetails = document.getElementById('weatherinfo');
const wicon = document.getElementById('wstateicon');
const wdaily = document.getElementById('daily-weather');
const dtemp = document.getElementById('dtemp');
const scrollLeftBtn = document.getElementById('leftarrow');
const scrollRightBtn = document.getElementById('rightarrow');


scrollRightBtn.onclick=(e)=>{
    let x=wdaily.scrollLeft;
    x+=200;
    wdaily.scroll({
        left: x,
        behavior:'smooth'
    })
}
scrollLeftBtn.onclick=(e)=>{
    let x=wdaily.scrollLeft;
    x-=200;
    wdaily.scroll({
        left: x,
        behavior:'smooth'
    })
}

function getDate(date,type){
    let dte= new Date(date);
    let day= dte.toLocaleDateString('en-us',{ weekday:"long"});
    let m=dte.toLocaleDateString('en-us',{ month:"long"});
    let d=dte.getDate();
    let y=dte.getFullYear().toString().substring(2);
    
    if(type == 'short')
        return `${day.substring(0,3)} ${d}, ${m.substring(0,3)} '${y}`;
    return `${day} ${d}, ${m} '${y}`;
}


function handleCardClick(e){
    let c=e.target;
    while(c.className!='dailycard-wrapper')
        c=c.parentNode;
    loadCurrentCard(wdays[c.id]);
}

function loadCurrentCard(d){
    wtemp.innerText=Math.ceil(d.temp)+'°';
    wdate.innerText = getDate(d.datetime);
    wstate.innerText=`${d.conditions.split(',',1)}`;    
    wicon.className= `weather-icon ${d.icon}`
    wDetails.children[0].children[2].innerText=`${Math.ceil(d.feelslike)}°`;
    wDetails.children[1].children[2].innerText=`${d.precipprob} %`;
    wDetails.children[2].children[2].innerText=`${d.humidity} %`;
    wDetails.children[3].children[2].innerText=`${d.windspeed} km`;
}

function loadDailyCards(d){
    wdaily.innerHTML='';
    wdays=d;
    for(const i in d){
        const dCard = dtemp.cloneNode(true);
        dCard.id=i;
        dCard.className='dailycard-wrapper';
        dCard.children[0].children[0].children[0].innerText=Math.ceil(d[i].temp)+'°';
        dCard.children[0].children[1].innerText=d[i].conditions.split(',',1);
        dCard.children[0].children[0].children[1].classList.add(`${d[i].icon}`);
        dCard.children[0].children[2].innerText=getDate(d[i].datetime,'short');
        
        dCard.onclick=handleCardClick;
        wdaily.appendChild(dCard);
    }
}

function loadWeatherUI(d){

    loadSplashApi(d.resolvedAddress);
    currentLocation.textContent=d.resolvedAddress;    
    loadCurrentCard(d.days[0],d.timezone);
    loadDailyCards(d.days);
    
}

export default loadWeatherUI;
