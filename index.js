"use strict"
const app = document.querySelector('.app')
const myKey = "1abcc517-39fd-4af4-831e-d4a8128d4d80"
const selectInputCountry = document.getElementById("country-selector")
const selectInputCity = document.getElementById('city-selector')
const globalForm = document.querySelector('form')
const btnSend = document.querySelector('button')
const sliderContent = document.querySelector('.slider-content')


const fetchDataCountry = async () => {

    const r = await fetch(`http://api.airvisual.com/v2/states?country=France&key=${myKey}`)

    if (r.ok === true) {
        return r.json();
    }

    throw new Error('impossible de contacter le serveur')

}

const fetchDataCity = async (country) => {

    const r = await fetch(`http://api.airvisual.com/v2/cities?state=${country}&country=France&key=${myKey}`)

    if (r.ok === true) {
        return r.json();
    }

    throw new Error('impossible de contacter le serveur')

}

const takeCityValue = async (city, country) => {

    const r = await fetch(`http://api.airvisual.com/v2/city?city=${city}&state=${country}&country=France&key=${myKey}`)

    if (r.ok === true) {
        return r.json();
    }

    throw new Error('impossible de contacter le serveur')
}


const stateChoise = () => {

    fetchDataCountry().then(res => {

        for (let i = 0; i < res.data.length; i++) {

            const newState = document.createElement('option')
            const choiseContent = document.createTextNode(res.data[i].state)
            newState.appendChild(choiseContent)

            selectInputCountry.appendChild(newState)

        }
    })
}

stateChoise()


selectInputCountry.addEventListener('change', async () => {

    while (selectInputCity.firstChild) {
        selectInputCity.removeChild(selectInputCity.firstChild);
    }

    try {
        const res = await fetchDataCity(selectInputCountry.value);

        for (let i = 0; i < res.data.length; i++) {
            const newState = document.createElement('option');
            const choiseContent = document.createTextNode(res.data[i].city);
            newState.appendChild(choiseContent);

            selectInputCity.appendChild(newState);
        }
    } catch (error) {
        console.error('Une erreur s\'est produite lors de la récupération des villes :', error);
    }
});


const tempDisplay = (value) => {

    const tempContainer = document.createElement('div')
    const tempContent = document.createTextNode(value);
    tempContainer.appendChild(tempContent);

    app.appendChild(tempContainer)

}

const iconDisplay = (value) => {

    const iconContainer = document.createElement('img')
    iconContainer.src = `../assets/img/${value}.png`
    app.appendChild(iconContainer)
}


globalForm.addEventListener('submit', (e) => {
    e.preventDefault()

    takeCityValue(selectInputCity.value, selectInputCountry.value)
        .then(res => {

            const dataPath = res.data.current.weather

            const currentTemp = "Température : " + dataPath.tp + " °C"
            const currentHumidity = "Taux d'humidité : " + dataPath.hu + " %"
            const currentWind = "Vitesse du vent : " + dataPath.ws + " m/s"
            const currentPressure = "Taux de préssion dans l'air : " + dataPath.pr + " hPa"
            const currentIcon = dataPath.ic

            iconDisplay(currentIcon)
            tempDisplay(currentTemp)
            tempDisplay(currentHumidity)
            tempDisplay(currentWind)
            tempDisplay(currentPressure)

        })

})



