#  Multi-Calculadora Pro (Dashboard Web Style)

¡Bienvenido al repositorio de la **Multi-Calculadora Pro**! 

Este proyecto es una aplicación web responsiva con diseño de **Dashboard** (Single Page Application simulada) construida con tecnologías web estándar. Inspirada en la estética minimalista y elegante del ecosistema de Apple (iOS/macOS), esta herramienta va más allá de las matemáticas básicas para convertirse en un panel interactivo y educativo de finanzas.

---

## ✨ Características Principales

La aplicación está estructurada en 4 módulos lógicos e independientes:

1. **🧮 Calculadora de Operaciones Básicas:** 
   * Ejecuta sumas, restas, multiplicaciones y divisiones desde una interfaz limpia.
   * Manejo de errores en tiempo de ejecución (como el control de división entre cero).

2. **💱 Conversor Múltiple Automatizado (Matriz de Divisas):**
   * Conexión directa a la API pública `ExchangeRate-API` para descargar las tasas de cambio en vivo indexadas al Dólar (USD).
   * **Experiencia de Usuario (UX) Fluida:** Eliminación total de botones de conversión. Al digitar un monto en *cualquier* campo, JavaScript recalcula en milisegundos los valores equivalentes para todas las demás monedas activas en la pantalla.
   * Flexibilidad para agregar o remover filas de divisas dinámicamente mediante la manipulación del DOM.

3. **📈 Análisis de Mercado:**
   * Panel informativo que explica detalladamente el comportamiento macroeconómico, los riesgos y el contexto histórico de las monedas seleccionadas.

4. **🌍 Poder Adquisitivo y Economía Real:**
   * Motor comparativo que toma un salario mensual personalizado, lo dolariza usando las tasas de cambio del día y calcula de forma gráfica a cuántos salarios mínimos locales equivale en diferentes países del mundo.
   * Indicadores de estado visuales (Verde/Rojo) basados en el nivel de poder adquisitivo frente al costo de vida de cada nación.

---

## 🛠️ Stack Tecnológico

El proyecto se diseñó bajo la filosofía *Zero Dependencies* (sin librerías externas), garantizando un rendimiento óptimo y carga instantánea:

* **HTML5:** Estructuración semántica del Dashboard, menús de navegación y contenedores dinámicos.
* **CSS3:** Estilos avanzados mediante *CSS Grid* y *Flexbox*, animaciones de transición fluidas y efectos de *Glassmorphism* (cristal esmerilado) usando la propiedad `backdrop-filter`.
* **Vanilla JavaScript (ES6+):** 
  * Consumo asíncrono de APIs mediante `fetch` y `async/await`.
  * Escucha activa de eventos `oninput` y `onchange` para lograr el cálculo omnidireccional e inmediato.
  * Gestión del estado de la interfaz (mostrar/ocultar secciones) sin recargar la página.

---

## 📁 Estructura del Proyecto

Para el correcto funcionamiento local o despliegue en plataformas como **GitHub Pages**, los siguientes archivos deben mantenerse en la raíz del mismo directorio:

```text
├── index.html      # Estructura e interfaz de usuario (UI)
├── style.css       # Estilos, tipografía Apple y diseño adaptativo
├── script.js       # Lógica matemática, control de navegación y consumo de API
└── README.md       # Documentación general del proyecto
