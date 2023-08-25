"use strict"

const sliderContainer = document.querySelector('.slider-container')
const sliders = [

    {
        image: "01d.png"
    },
    {
        image: "09d.png"
    },
    {
        image: "02d.png"
    },
    {
        image: "11d.png"
    },

]
let sliderIndex = 0


// Création container img
const weatherIconContainer = document.createElement('img')
weatherIconContainer.classList.add("slider-img")
sliderContainer.insertAdjacentElement('afterbegin', weatherIconContainer)


// Création fonction injection de l'image
const imgAppears = (sliderIndex) => {
    weatherIconContainer.src = `./assets/img/${sliders[sliderIndex].image}`

}
imgAppears(sliderIndex)


//Création fonction défilement images 
const imgSwipe = () => {
    if (sliderIndex < sliders.length) {

        imgAppears(sliderIndex)
        sliderIndex++

    } else {
        sliderIndex = 0
    }
}

setInterval(imgSwipe, 2000)
