
const locationImage = document.getElementById('locImg');
const locationImageSrc = document.getElementById('locImgSrc');

async function loadSplashApi(location){
    const id = '0b-70kuE4yEK3MgAkfFu3UmCL0sT90lBnqXvnq6qIZ0';
    let url=`https://api.unsplash.com/photos/random/?query=${location}&client_id=${id}`;
    try{
        let response=await fetch(url);
        let jsonData= await response.json();
        let imgUrl=jsonData.urls.regular;
        let imgSrc = jsonData.user.portfolio_url;
        locationImage.style.transition='ease-in-out 1s';
        locationImage.style.backgroundImage=`url(${imgUrl})`;
        locationImageSrc.innerText=jsonData.user.name;
        locationImageSrc.setAttribute('href',imgSrc);
    }catch(err){
        console.log(err);
    }
}

export default loadSplashApi;



