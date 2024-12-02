import './style.css'
import { CONFIG } from './config.js';

class WeatherApp {
    constructor() {
        this.popularCountries = [
            { name: 'España', city: 'Madrid', flag: '🇪🇸', icon: 'fa-church', iconTitle: 'Catedral de la Almudena', continent: 'Europa' },
            { name: 'Estados Unidos', city: 'New York', flag: '🇺🇸', icon: 'fa-city', iconTitle: 'Skyline de Manhattan', continent: 'América del Norte' },
            { name: 'Reino Unido', city: 'London', flag: '🇬🇧', icon: 'fa-clock', iconTitle: 'Big Ben', continent: 'Europa' },
            { name: 'Francia', city: 'Paris', flag: '🇫🇷', icon: 'fa-monument', iconTitle: 'Torre Eiffel', continent: 'Europa' },
            { name: 'Italia', city: 'Rome', flag: '🇮🇹', icon: 'fa-landmark-dome', iconTitle: 'Coliseo Romano', continent: 'Europa' },
            { name: 'Alemania', city: 'Berlin', flag: '🇩🇪', icon: 'fa-archway', iconTitle: 'Puerta de Brandeburgo', continent: 'Europa' },
            { name: 'Japón', city: 'Tokyo', flag: '🇯🇵', icon: 'fa-torii-gate', iconTitle: 'Templo Senso-ji', continent: 'Asia' },
            { name: 'China', city: 'Beijing', flag: '🇨🇳', icon: 'fa-tower-observation', iconTitle: 'Gran Muralla', continent: 'Asia' },
            { name: 'Brasil', city: 'Rio de Janeiro', flag: '🇧🇷', icon: 'fa-cross', iconTitle: 'Cristo Redentor', continent: 'América del Sur' },
            { name: 'Australia', city: 'Sydney', flag: '🇦🇺', icon: 'fa-building', iconTitle: 'Opera House', continent: 'Oceanía' },
            { name: 'Canadá', city: 'Toronto', flag: '🇨🇦', icon: 'fa-tower-broadcast', iconTitle: 'CN Tower', continent: 'América del Norte' },
            { name: 'México', city: 'Mexico City', flag: '🇲🇽', icon: 'fa-mountain-sun', iconTitle: 'Pirámides de Teotihuacán', continent: 'América del Norte' },
            { name: 'Argentina', city: 'Buenos Aires', flag: '🇦🇷', icon: 'fa-tree', iconTitle: 'Obelisco', continent: 'América del Sur' },
            { name: 'Chile', city: 'Santiago', flag: '🇨🇱', icon: 'fa-mountain', iconTitle: 'Los Andes', continent: 'América del Sur' },
            { name: 'Uruguay', city: 'Montevideo', flag: '🇺🇾', icon: 'fa-sun', iconTitle: 'Palacio Salvo', continent: 'América del Sur' },
            { name: 'Egipto', city: 'Cairo', flag: '🇪🇬', icon: 'fa-landmark', iconTitle: 'Pirámides de Giza', continent: 'África' },
            { name: 'Sudáfrica', city: 'Cape Town', flag: '🇿🇦', icon: 'fa-mountain-city', iconTitle: 'Table Mountain', continent: 'África' }
        ];
        
        this.initializeUI();
        this.setupEventListeners();
        this.getWeather(CONFIG.DEFAULT_CITY);
    }

    initializeUI() {
        document.querySelector('#app').innerHTML = `
            <div class="container">
                <h1>Clima Actual</h1>
                <form id="search-form">
                    <input 
                        type="text" 
                        id="city-input" 
                        placeholder="Ingresa una ciudad..."
                        required
                    >
                    <button type="submit">
                        <i class="fas fa-search"></i>
                        Buscar
                    </button>
                </form>
                
                <div class="content-wrapper">
                    <div id="weather-info" class="weather-container hidden">
                        <div class="weather-header">
                            <h2 id="city-name"></h2>
                            <img id="weather-icon" src="" alt="Clima">
                        </div>
                        <div class="location-info">
                            <p class="continent">
                                <i class="fas fa-globe-americas"></i>
                                <span id="continent"></span>
                            </p>
                        </div>
                        <div class="weather-details">
                            <p class="temperature">
                                <i class="fas fa-temperature-high"></i>
                                Temperatura: <span id="temperature"></span>°C
                            </p>
                            <p class="description">
                                <i class="fas fa-cloud"></i>
                                <span id="weather-description"></span>
                            </p>
                            <p>
                                <i class="fas fa-tint"></i>
                                Humedad: <span id="humidity"></span>%
                            </p>
                            <p>
                                <i class="fas fa-wind"></i>
                                Viento: <span id="wind-speed"></span> km/h
                            </p>
                        </div>
                    </div>

                    <div class="countries-section">
                        <div class="separator">
                            <h2>Países Populares</h2>
                        </div>
                        <div id="popular-countries"></div>
                    </div>
                </div>

                <div id="error-message" class="error hidden">
                    <i class="fas fa-exclamation-circle"></i>
                    <span id="error-text"></span>
                </div>
            </div>
        `;

        this.renderPopularCountries();
        this.form = document.getElementById('search-form');
        this.input = document.getElementById('city-input');
        this.weatherInfo = document.getElementById('weather-info');
        this.errorDiv = document.getElementById('error-message');
    }

    renderPopularCountries() {
        const container = document.getElementById('popular-countries');
        container.innerHTML = `
            <div class="countries-list">
                ${this.popularCountries.map(country => `
                    <div class="country-item" data-city="${country.city}">
                        <div class="country-flag-wrapper">
                            <span class="country-flag">${country.flag}</span>
                        </div>
                        <div class="country-info">
                            <div class="country-name">
                                <h3>${country.name}</h3>
                                <i class="fas ${country.icon}" title="${country.iconTitle}"></i>
                            </div>
                            <span class="city-name">
                                <i class="fas fa-map-marker-alt"></i>
                                ${country.city}
                            </span>
                            <span class="continent-name">
                                <i class="fas fa-globe-americas"></i>
                                ${country.continent}
                            </span>
                        </div>
                        <div class="country-action">
                            <i class="fas fa-chevron-right"></i>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    setupEventListeners() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Agregar evento click a las tarjetas de países
        document.getElementById('popular-countries').addEventListener('click', (e) => {
            const card = e.target.closest('.country-item');
            if (card) {
                const city = card.dataset.city;
                this.getWeather(city);
            }
        });
    }

    async getWeather(city) {
        try {
            const params = new URLSearchParams({
                q: city,
                appid: CONFIG.API_KEY,
                units: CONFIG.UNITS,
                lang: CONFIG.LANGUAGE
            });

            const response = await fetch(`${CONFIG.BASE_URL}/weather?${params}`);
            const data = await response.json();

            if (response.ok) {
                this.displayWeather(data, city);
            } else {
                this.showError(data.message);
            }
        } catch (error) {
            this.showError('Error al obtener el clima. Por favor, intenta de nuevo.');
        }
    }

    displayWeather(data, searchedCity) {
        const weatherInfo = document.getElementById('weather-info');
        const errorDiv = document.getElementById('error-message');
        
        // Encontrar el país correspondiente a la ciudad buscada
        const country = this.popularCountries.find(country => 
            country.city.toLowerCase() === searchedCity.toLowerCase()
        );

        document.getElementById('city-name').textContent = data.name;
        document.getElementById('temperature').textContent = Math.round(data.main.temp);
        document.getElementById('weather-description').textContent = data.weather[0].description;
        document.getElementById('humidity').textContent = data.main.humidity;
        document.getElementById('wind-speed').textContent = Math.round(data.wind.speed * 3.6); // Convertir m/s a km/h
        document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        
        // Mostrar el continente si encontramos el país
        const continentElement = document.getElementById('continent');
        if (country) {
            continentElement.textContent = country.continent;
            continentElement.parentElement.classList.remove('hidden');
        } else {
            continentElement.parentElement.classList.add('hidden');
        }

        weatherInfo.classList.remove('hidden');
        errorDiv.classList.add('hidden');
    }

    showError(message) {
        const errorDiv = document.getElementById('error-message');
        const weatherInfo = document.getElementById('weather-info');
        
        errorDiv.querySelector('#error-text').textContent = message;
        errorDiv.classList.remove('hidden');
        weatherInfo.classList.add('hidden');
    }

    hideError() {
        this.errorDiv.classList.add('hidden');
    }

    handleSubmit(e) {
        e.preventDefault();
        const city = this.input.value.trim();
        if (city) {
            this.getWeather(city);
        }
    }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new WeatherApp();
});
