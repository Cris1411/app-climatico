# Aplicación del Clima 🌤️

Esta es una aplicación web que permite consultar el clima actual y el pronóstico de diferentes ciudades alrededor del mundo, con un enfoque especial en ciudades populares y sus puntos de referencia más conocidos.

## Características Principales ✨

- Búsqueda de clima por ciudad
- Visualización del clima actual y pronóstico de 5 días
- Visualización de ciudades populares con sus banderas y monumentos característicos
- Información detallada del clima incluyendo:
  - Temperatura actual y sensación térmica
  - Descripción del clima
  - Humedad
  - Velocidad del viento
  - Ubicación geográfica (continente)
  - Pronóstico diario con iconos y temperaturas

## Tecnologías Utilizadas 🛠️

- HTML5
- CSS3
- JavaScript (ES6+)
- API de OpenWeatherMap
- Axios para peticiones HTTP
- Font Awesome para iconos

## Estructura del Proyecto 📁

```
app-climatico/
├── src/
│   ├── main.js        # Lógica principal de la aplicación y UI
│   ├── weather.js     # Funcionalidad de clima y pronóstico
│   ├── style.css      # Estilos de la aplicación
│   └── config.js      # Configuración y constantes
├── index.html         # Punto de entrada HTML
└── README.md          # Este archivo
```

## Cómo Funciona 🚀

### 1. Inicialización
La aplicación se inicia cuando el DOM está completamente cargado. Se crea una instancia de la clase `WeatherApp` que:
- Define una lista de países populares con sus ciudades y monumentos característicos
- Inicializa la interfaz de usuario
- Configura los event listeners
- Carga el clima de la ciudad por defecto

### 2. Funcionalidad del Clima (weather.js)
El módulo `weather.js` maneja toda la funcionalidad relacionada con el clima:

#### Búsqueda y Obtención de Datos
- Permite buscar ciudades mediante un formulario
- Realiza peticiones a la API de OpenWeatherMap para:
  - Clima actual
  - Pronóstico de 5 días
- Maneja errores y muestra mensajes apropiados

#### Visualización del Clima
Muestra información detallada del clima actual:
- Nombre de la ciudad y país
- Temperatura actual y sensación térmica
- Icono representativo del clima
- Descripción del clima
- Humedad
- Velocidad del viento

#### Pronóstico del Clima
Muestra el pronóstico para los próximos 5 días:
- Día de la semana
- Icono del clima
- Temperatura máxima
- Descripción del clima

### 3. Interfaz de Usuario
La interfaz incluye:
- Un formulario de búsqueda con campo de texto y botón
- Una sección para mostrar la información del clima actual
- Una sección para el pronóstico de 5 días
- Una lista de países populares con sus respectivas tarjetas

### 4. Países Populares
- Muestra una lista de países con sus ciudades más importantes
- Cada tarjeta incluye:
  - Bandera del país
  - Nombre del país
  - Ciudad principal
  - Monumento característico
  - Continente

## Configuración 🔧

Para usar la aplicación, necesitas:
1. Obtener una API key de OpenWeatherMap
2. Configurar las constantes en `config.js`:
   - API_KEY: Tu clave de API de OpenWeatherMap
   - BASE_URL: URL base de la API
   - DEFAULT_CITY: Ciudad por defecto
   - UNITS: Unidades de medida (metric para Celsius)
   - LANGUAGE: Idioma de las respuestas
   - ICON_URL: URL base para los iconos del clima

## Uso 💻

1. Clona el repositorio
2. Configura tu API key en `config.js`
3. Instala las dependencias:
   ```bash
   npm install
   ```
4. Abre `index.html` en tu navegador
5. ¡Listo! Puedes comenzar a buscar el clima de cualquier ciudad

## Manejo de Errores ⚠️

La aplicación incluye manejo de errores para:
- Ciudades no encontradas
- Problemas de conexión
- Errores de la API
- Validación de entrada de usuario

## Contribuir 🤝

Las contribuciones son bienvenidas. Por favor:
1. Haz un fork del proyecto
2. Crea una rama para tu feature
3. Haz commit de tus cambios
4. Push a la rama
5. Abre un Pull Request

## Licencia 📄

Este proyecto está bajo la Licencia MIT. 