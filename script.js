const grantAcesscontainer = document.querySelector(".grant-access-container");
const grantAcessBtn = document.querySelector("[grant-access-btn]");
const userWeather = document.querySelector("[user-weather]");
const searchForm = document.querySelector("[form-container]");
const grantAccessBtn = document.querySelector("[grant-access-btn]");
const searchBtn = document.querySelector("[searchbtn]");
const cityName = document.querySelector("[data-cityName]");
const countryFlag = document.querySelector("[country-flag]");
const tempDesc = document.querySelector("[temp-desc]");
const weatherIcon = document.querySelector("[weatherIcon]");
const tempdata = document.querySelector("[temp-data]");
const windspeed = document.querySelector("[data-windspeed]");
const humidity = document.querySelector("[data-humidity]");
const cloudiness = document.querySelector("[data-clouds]");
const weatherInfo = document.querySelector(".weather-info");
const loadingContainer = document.querySelector(".loading-container");
const API_KEY = '919c7f00c01bfb7e953aa7622e577663';

getSessionStorage();

// switch tab
const userTab = document.querySelector("[user-weather]");
userTab.classList.add("curr-tab");

let currtab = userTab;
const searchTab = document.querySelector("[search-weather]");

function switchTab(newTab) {
    if (newTab != currtab) {
        currtab.classList.remove("curr-tab");
        currtab = newTab;
        currtab.classList.add("curr-tab");
    }
    if (!searchForm.classList.contains('active')) {
        // mai pahle userweather me tha ab search weather me jana chahhta hoon
        grantAcesscontainer.classList.remove("active");
        weatherInfo.classList.remove('active');
        searchForm.classList.add('active');

    }
    else {
        // grantAcesscontainer.classList.remove("active");
        searchForm.classList.remove('active');
        weatherInfo.classList.remove('active');
        // ab weather v to visible karna hai
        getSessionStorage()


    }

}

userTab.addEventListener('click', () => {
    switchTab(userTab);
});
searchTab.addEventListener('click', () => {
    switchTab(searchTab);
});

// Get location
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
        alert("Geolocation not supported");

    }
}

function getSessionStorage() {
    const localCoordinates = sessionStorage.getItem("user-coordinates");
    if (!localCoordinates) {
        grantAcesscontainer.classList.add('active');

    }
    else {
        const coordinates = JSON.parse(localCoordinates);
        fetchUserInfo(coordinates);
    }
}

function showPosition(position) {
    const usercoordinates = {
        lat: position.coords.latitude,
        long: position.coords.longitude,
    }

    sessionStorage.setItem("user-coordinates", JSON.stringify(usercoordinates))
    fetchUserInfo(usercoordinates);
}


async function fetchUserInfo(usercoordinates) {
    const lat = usercoordinates.lat;
    const lon = usercoordinates.long;

    // const { lat, lon } = usercoordinates;
    console.log(lat);
    console.log(lon);
    grantAcesscontainer.classList.remove("active");
    loadingContainer.classList.add("active");

    // API CALL
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        if (!response.ok) {
            throw new Error(`API is not working:${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        loadingContainer.classList.remove("active");
        weatherInfo.classList.add("active");
        errorImg.classList.remove("active");

        renderWeatherInfo(data);
    }
    catch (e) {
        console.log("Error hua hai", e);
    }

}

function renderWeatherInfo(data) {
    cityName.innerHTML = data.name;
    countryFlag.src = `https://flagcdn.com/144x108/${data?.sys?.country.toLowerCase()}.png`;
    tempDesc.innerHTML = data?.weather[0]?.description;
    weatherIcon.src = `http://openweathermap.org/img/w/${data?.weather?.[0]?.icon}.png`;
    tempdata.innerHTML = data?.main?.temp;
    windspeed.innerHTML = data?.wind?.speed;
    humidity.innerHTML = data?.main?.humidity;
    cloudiness.innerHTML = data.clouds?.all;

}

grantAccessBtn.addEventListener('click', getLocation);

const searchInput = document.querySelector("[searchInput]");
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let city = searchInput.value;
    // console.log(city);
    if (city === "")
        return;
    else {
        city = searchInput.value;
        fetchSearchInfo(city);
    }
})

const errorImg = document.querySelector(".error");
async function fetchSearchInfo(city) {
    loadingContainer.classList.add("active");
    weatherInfo.classList.remove("active");
    grantAcesscontainer.classList.remove("remove");

    try {

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        if (!response.ok) {
            // alert("City Name Not found");
            loadingContainer.classList.remove("active");
            weatherInfo.classList.remove("active");
            errorImg.classList.add("active");
            throw new Error("City not Found", response.status);
        }
        const data2 = await response.json();
        loadingContainer.classList.remove("active");
        weatherInfo.classList.add("active");



    } catch (error) {
        console.log("Error occur at search funcn", error);
    }
}

