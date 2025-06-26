// Importa los estilos CSS globales
import "./style.css";
// Importa la configuración de la aplicación (API key, URLs, etc.)
import { CONFIG } from "./config.js";

// Clase principal que gestiona la aplicación del clima
class AplicacionClima {
  constructor() {
    // Lista de países populares con información relevante para mostrar en la interfaz
    this.paisesPopulares = [
      {
        nombre: "España",
        ciudad: "Madrid",
        bandera: "🇪🇸",
        icono: "fa-church",
        tituloIcono: "Catedral de la Almudena",
        continente: "Europa",
      },
      {
        nombre: "Estados Unidos",
        ciudad: "New York",
        bandera: "🇺🇸",
        icono: "fa-city",
        tituloIcono: "Skyline de Manhattan",
        continente: "América del Norte",
      },
      {
        nombre: "Reino Unido",
        ciudad: "London",
        bandera: "🇬🇧",
        icono: "fa-clock",
        tituloIcono: "Big Ben",
        continente: "Europa",
      },
      {
        nombre: "Francia",
        ciudad: "Paris",
        bandera: "🇫🇷",
        icono: "fa-monument",
        tituloIcono: "Torre Eiffel",
        continente: "Europa",
      },
      {
        nombre: "Italia",
        ciudad: "Rome",
        bandera: "🇮🇹",
        icono: "fa-landmark-dome",
        tituloIcono: "Coliseo Romano",
        continente: "Europa",
      },
      {
        nombre: "Alemania",
        ciudad: "Berlin",
        bandera: "🇩🇪",
        icono: "fa-archway",
        tituloIcono: "Puerta de Brandeburgo",
        continente: "Europa",
      },
      {
        nombre: "Japón",
        ciudad: "Tokyo",
        bandera: "🇯🇵",
        icono: "fa-torii-gate",
        tituloIcono: "Templo Senso-ji",
        continente: "Asia",
      },
      {
        nombre: "China",
        ciudad: "Beijing",
        bandera: "🇨🇳",
        icono: "fa-tower-observation",
        tituloIcono: "Gran Muralla",
        continente: "Asia",
      },
      {
        nombre: "Brasil",
        ciudad: "Rio de Janeiro",
        bandera: "🇧🇷",
        icono: "fa-cross",
        tituloIcono: "Cristo Redentor",
        continente: "América del Sur",
      },
      {
        nombre: "Australia",
        ciudad: "Sydney",
        bandera: "🇦🇺",
        icono: "fa-building",
        tituloIcono: "Opera House",
        continente: "Oceanía",
      },
      {
        nombre: "Canadá",
        ciudad: "Toronto",
        bandera: "🇨🇦",
        icono: "fa-tower-broadcast",
        tituloIcono: "CN Tower",
        continente: "América del Norte",
      },
      {
        nombre: "México",
        ciudad: "Mexico City",
        bandera: "🇲🇽",
        icono: "fa-mountain-sun",
        tituloIcono: "Pirámides de Teotihuacán",
        continente: "América del Norte",
      },
      {
        nombre: "Argentina",
        ciudad: "Buenos Aires",
        bandera: "🇦🇷",
        icono: "fa-tree",
        tituloIcono: "Obelisco",
        continente: "América del Sur",
      },
      {
        nombre: "Chile",
        ciudad: "Santiago",
        bandera: "🇨🇱",
        icono: "fa-mountain",
        tituloIcono: "Los Andes",
        continente: "América del Sur",
      },
      {
        nombre: "Uruguay",
        ciudad: "Montevideo",
        bandera: "🇺🇾",
        icono: "fa-sun",
        tituloIcono: "Palacio Salvo",
        continente: "América del Sur",
      },
      {
        nombre: "Egipto",
        ciudad: "Cairo",
        bandera: "🇪🇬",
        icono: "fa-landmark",
        tituloIcono: "Pirámides de Giza",
        continente: "África",
      },
      {
        nombre: "Sudáfrica",
        ciudad: "Cape Town",
        bandera: "🇿🇦",
        icono: "fa-mountain-city",
        tituloIcono: "Table Mountain",
        continente: "África",
      },
    ];

    // Inicializa la interfaz de usuario
    this.inicializarInterfaz();
    // Configura los eventos de la aplicación (formularios, clics, etc.)
    this.configurarEventos();
    // Obtiene el clima de la ciudad por defecto al iniciar
    this.obtenerClima(CONFIG.DEFAULT_CITY);
  }

  // Renderiza la estructura HTML principal de la aplicación
  inicializarInterfaz() {
    document.querySelector("#aplicacion").innerHTML = `
            <div class="contenedor">
                <h1>Clima Actual</h1>
                <form id="formulario-busqueda">
                    <input 
                        type="text" 
                        id="entrada-ciudad" 
                        placeholder="Ingresa una ciudad..."
                        required
                    >
                    <button type="submit">
                        <i class="fas fa-search"></i>
                        Buscar
                    </button>
                </form>
                
                <div class="contenido-principal">
                    <div id="clima-info" class="clima-contenedor oculto">
                        <div class="clima-encabezado">
                            <h2 id="nombre-ciudad"></h2>
                            <img id="icono-clima" src="" alt="Clima">
                        </div>
                        <div class="info-ubicacion">
                            <p class="continente">
                                <i class="fas fa-globe-americas"></i>
                                <span id="continente"></span>
                            </p>
                        </div>
                        <div class="clima-detalles">
                            <p class="temperatura">
                                <i class="fas fa-temperature-high"></i>
                                Temperatura: <span id="temperatura"></span>°C
                            </p>
                            <p class="descripcion">
                                <i class="fas fa-cloud"></i>
                                <span id="descripcion-clima"></span>
                            </p>
                            <p>
                                <i class="fas fa-tint"></i>
                                Humedad: <span id="humedad"></span>%
                            </p>
                            <p>
                                <i class="fas fa-wind"></i>
                                Viento: <span id="viento"></span> km/h
                            </p>
                        </div>
                        <div id="pronostico" class="pronostico-contenedor"></div>
                    </div>

                    <div class="seccion-paises">
                        <div class="separador">
                            <h2>Países Populares</h2>
                        </div>
                        <div id="paises-populares"></div>
                    </div>
                </div>

                <div id="mensaje-error" class="error oculto">
                    <i class="fas fa-exclamation-circle"></i>
                    <span id="texto-error"></span>
                </div>
            </div>
        `;

    // Referencias a elementos del DOM para su uso posterior
    this.formulario = document.getElementById("formulario-busqueda");
    this.entrada = document.getElementById("entrada-ciudad");
    this.climaInfo = document.getElementById("clima-info");
    this.divError = document.getElementById("mensaje-error");
    // Renderiza la lista de países populares
    this.renderizarPaisesPopulares();
  }

  // Muestra los países populares en la interfaz
  renderizarPaisesPopulares() {
    const contenedor = document.getElementById("paises-populares");
    contenedor.innerHTML = `
            <div class="lista-paises">
                ${this.paisesPopulares
                  .map(
                    (pais) => `
                    <div class="pais-item" data-ciudad="${pais.ciudad}">
                        <div class="bandera-pais-contenedor">
                            <span class="bandera-pais">${pais.bandera}</span>
                        </div>
                        <div class="info-pais">
                            <div class="nombre-pais">
                                <h3>${pais.nombre}</h3>
                                <i class="fas ${pais.icono}" title="${pais.tituloIcono}"></i>
                            </div>
                            <span class="nombre-ciudad">
                                <i class="fas fa-map-marker-alt"></i>
                                ${pais.ciudad}
                            </span>
                            <span class="nombre-continente">
                                <i class="fas fa-globe-americas"></i>
                                ${pais.continente}
                            </span>
                        </div>
                        <div class="accion-pais">
                            <i class="fas fa-chevron-right"></i>
                        </div>
                    </div>
                `
                  )
                  .join("")}
            </div>
        `;
  }

  // Configura los eventos de la aplicación (envío de formulario y clic en países)
  configurarEventos() {
    // Evento para buscar clima al enviar el formulario
    this.formulario.addEventListener("submit", (e) => this.manejarEnvio(e));
    // Evento para seleccionar un país popular y mostrar su clima
    document
      .getElementById("paises-populares")
      .addEventListener("click", (e) => {
        const tarjeta = e.target.closest(".pais-item");
        if (tarjeta) {
          const ciudad = tarjeta.dataset.ciudad;
          this.obtenerClima(ciudad);
        }
      });
  }

  // Obtiene el clima actual y el pronóstico de una ciudad usando la API
  async obtenerClima(ciudad) {
    try {
      // Prepara los parámetros para la consulta a la API
      const parametros = new URLSearchParams({
        q: ciudad,
        appid: CONFIG.API_KEY,
        units: CONFIG.UNITS,
        lang: CONFIG.LANGUAGE,
      });

      // Consulta el clima actual
      const respuesta = await fetch(`${CONFIG.BASE_URL}/weather?${parametros}`);
      const datos = await respuesta.json();

      // Consulta el pronóstico
      const respuestaPronostico = await fetch(
        `${CONFIG.BASE_URL}/forecast?${parametros}`
      );
      const datosPronostico = await respuestaPronostico.json();

      if (respuesta.ok) {
        // Muestra el clima y el pronóstico si la respuesta es exitosa
        this.mostrarClima(datos, ciudad);
        this.mostrarPronostico(datosPronostico);
      } else {
        // Muestra un mensaje de error si la ciudad no se encuentra
        this.mostrarError(datos.message);
      }
    } catch (error) {
      // Muestra un mensaje de error si ocurre un problema en la petición
      this.mostrarError(
        "Error al obtener el clima. Por favor, intenta de nuevo."
      );
    }
  }

  // Muestra la información del clima actual en la interfaz
  mostrarClima(datos, ciudadBuscada) {
    const climaInfo = document.getElementById("clima-info");
    const divError = document.getElementById("mensaje-error");
    // Busca el país en la lista de populares para mostrar el continente
    const pais = this.paisesPopulares.find(
      (pais) => pais.ciudad.toLowerCase() === ciudadBuscada.toLowerCase()
    );

    // Actualiza los elementos del DOM con la información del clima
    document.getElementById("nombre-ciudad").textContent = datos.name;
    document.getElementById("temperatura").textContent = Math.round(
      datos.main.temp
    );
    document.getElementById("descripcion-clima").textContent =
      datos.weather[0].description;
    document.getElementById("humedad").textContent = datos.main.humidity;
    document.getElementById("viento").textContent = Math.round(
      datos.wind.speed * 3.6
    );
    document.getElementById(
      "icono-clima"
    ).src = `https://openweathermap.org/img/wn/${datos.weather[0].icon}@2x.png`;

    // Muestra el continente si la ciudad es de un país popular
    const elementoContinente = document.getElementById("continente");
    if (pais) {
      elementoContinente.textContent = pais.continente;
      elementoContinente.parentElement.classList.remove("oculto");
    } else {
      elementoContinente.parentElement.classList.add("oculto");
    }

    climaInfo.classList.remove("oculto");
    divError.classList.add("oculto");
  }

  // Muestra un mensaje de error en la interfaz
  mostrarError(mensaje) {
    const divError = document.getElementById("mensaje-error");
    const climaInfo = document.getElementById("clima-info");
    divError.querySelector("#texto-error").textContent = mensaje;
    divError.classList.remove("oculto");
    climaInfo.classList.add("oculto");
  }

  // Oculta el mensaje de error
  ocultarError() {
    this.divError.classList.add("oculto");
  }

  // Maneja el envío del formulario de búsqueda
  manejarEnvio(e) {
    e.preventDefault();
    const ciudad = this.entrada.value.trim();
    if (ciudad) {
      this.obtenerClima(ciudad);
    }
  }

  // Muestra el pronóstico de los próximos 5 días
  mostrarPronostico(datos) {
    const contenedorPronostico = document.getElementById("pronostico");
    if (!contenedorPronostico) return;
    contenedorPronostico.innerHTML = "<h3>Pronóstico 5 días</h3>";
    // Agrupa los pronósticos por día y muestra solo los próximos 5
    const pronosticosDiarios = this.agruparPronosticosPorDia(datos.list);
    Object.values(pronosticosDiarios)
      .slice(1, 6)
      .forEach((dia) => {
        const tarjetaPronostico = this.crearTarjetaPronostico(dia);
        contenedorPronostico.appendChild(tarjetaPronostico);
      });
  }

  // Agrupa los datos del pronóstico por día
  agruparPronosticosPorDia(listaPronostico) {
    return listaPronostico.reduce((dias, pronostico) => {
      const fecha = new Date(pronostico.dt * 1000).toLocaleDateString();
      if (!dias[fecha]) {
        dias[fecha] = pronostico;
      }
      return dias;
    }, {});
  }

  // Crea una tarjeta visual para mostrar el pronóstico de un día
  crearTarjetaPronostico(pronostico) {
    const fecha = new Date(pronostico.dt * 1000);
    const nombreDia = fecha.toLocaleDateString("es-ES", { weekday: "short" });
    const col = document.createElement("div");
    col.className = "tarjeta-pronostico";
    col.innerHTML = `
            <h5>${nombreDia}</h5>
            <img src="${CONFIG.ICON_URL}/${
      pronostico.weather[0].icon
    }@2x.png" alt="Clima">
            <p class="mb-0">${Math.round(pronostico.main.temp)}°C</p>
            <small>${this.capitalizarPrimeraLetra(
              pronostico.weather[0].description
            )}</small>
        `;
    return col;
  }

  // Capitaliza la primera letra de una cadena
  capitalizarPrimeraLetra(cadena) {
    return cadena.charAt(0).toUpperCase() + cadena.slice(1);
  }
}

// Inicializa la aplicación cuando el DOM está listo
// eslint-disable-next-line no-undef
// eslint-disable-next-line no-unused-vars
document.addEventListener("DOMContentLoaded", () => {
  new AplicacionClima();
});
