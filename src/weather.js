import axios from 'axios'
import { CONFIG } from './config'

export function setupWeather() {
    const searchInput = document.querySelector('#searchCity')
    const searchButton = document.querySelector('#searchButton')
    const weatherInfo = document.querySelector('#weatherInfo')
    const errorMessage = document.querySelector('#errorMessage')

    // Eventos
    searchButton.addEventListener('click', () => searchWeather())
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchWeather()
        }
    })

    // Cargar ciudad por defecto
    searchInput.value = CONFIG.DEFAULT_CITY
    searchWeather()

    async function searchWeather() {
        const city = searchInput.value.trim()
        if (!city) return

        try {
            const weatherData = await getWeatherData(city)
            const forecastData = await getForecastData(city)
            displayWeather(weatherData)
            displayForecast(forecastData)
            showWeatherInfo()
        } catch (error) {
            showError('No se pudo encontrar la ciudad. Por favor, intenta de nuevo.')
        }
    }

    async function getWeatherData(city) {
        const response = await axios.get(`${CONFIG.BASE_URL}/weather`, {
            params: {
                q: city,
                appid: CONFIG.API_KEY,
                units: CONFIG.UNITS,
                lang: CONFIG.LANGUAGE
            }
        })
        return response.data
    }

    async function getForecastData(city) {
        const response = await axios.get(`${CONFIG.BASE_URL}/forecast`, {
            params: {
                q: city,
                appid: CONFIG.API_KEY,
                units: CONFIG.UNITS,
                lang: CONFIG.LANGUAGE
            }
        })
        return response.data
    }

    function displayWeather(data) {
        document.querySelector('#cityName').textContent = `${data.name}, ${data.sys.country}`
        document.querySelector('#temperature').textContent = `${Math.round(data.main.temp)}°C`
        document.querySelector('#weatherIcon').src = `${CONFIG.ICON_URL}/${data.weather[0].icon}@2x.png`
        document.querySelector('#weatherDescription').textContent = capitalizeFirstLetter(data.weather[0].description)
        document.querySelector('#feelsLike').textContent = `${Math.round(data.main.feels_like)}°C`
        document.querySelector('#humidity').textContent = `${data.main.humidity}%`
        document.querySelector('#windSpeed').textContent = `${Math.round(data.wind.speed * 3.6)} km/h`
    }

    function displayForecast(data) {
        const forecastContainer = document.querySelector('#forecast')
        forecastContainer.innerHTML = ''
        
        const dailyForecasts = groupForecastsByDay(data.list)
        Object.values(dailyForecasts).slice(1, 6).forEach(day => {
            const forecastCard = createForecastCard(day)
            forecastContainer.appendChild(forecastCard)
        })
    }

    function groupForecastsByDay(forecastList) {
        return forecastList.reduce((days, forecast) => {
            const date = new Date(forecast.dt * 1000).toLocaleDateString()
            if (!days[date]) {
                days[date] = forecast
            }
            return days
        }, {})
    }

    function createForecastCard(forecast) {
        const date = new Date(forecast.dt * 1000)
        const dayName = date.toLocaleDateString('es-ES', { weekday: 'short' })
        
        const col = document.createElement('div')
        col.className = 'col'
        col.innerHTML = `
            <div class="forecast-card">
                <h5>${dayName}</h5>
                <img src="${CONFIG.ICON_URL}/${forecast.weather[0].icon}@2x.png" alt="Clima">
                <p class="mb-0">${Math.round(forecast.main.temp)}°C</p>
                <small>${capitalizeFirstLetter(forecast.weather[0].description)}</small>
            </div>
        `
        return col
    }

    function showWeatherInfo() {
        weatherInfo.classList.remove('d-none')
        errorMessage.classList.add('d-none')
    }

    function showError(message) {
        weatherInfo.classList.add('d-none')
        errorMessage.textContent = message
        errorMessage.classList.remove('d-none')
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }
}
