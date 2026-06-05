// ====================================================================
// 1. ESTADO GLOBAL Y DATOS
// ====================================================================
let tasasDeCambio = {}; // Aquí guardaremos los precios de la API temporalmente
const API_URL = "https://open.er-api.com/v6/latest/USD";

// Base de datos interna para el Análisis de Mercado (Inflación/Deflación)
const infoMonedas = {
    "USD": { nombre: "Dólar EE.UU.", analisis: "Actúa como moneda base global. Su inflación impacta a todas las demás monedas. Controlada por la Reserva Federal (FED)." },
    "COP": { nombre: "Peso Colombiano", analisis: "Moneda emergente. Suele ser sensible a los precios del petróleo y tiende a devaluarse frente al dólar en épocas de crisis global." },
    "MXN": { nombre: "Peso Mexicano", analisis: "Fuertemente ligada a la economía de EE.UU. Ha mostrado resiliencia, pero sufre volatilidad por cambios en exportaciones." },
    "GBP": { nombre: "Libra Esterlina", analisis: "Moneda de alto valor. Su comportamiento actual depende de la inflación en Reino Unido y las políticas post-Brexit." },
    "INR": { nombre: "Rupia India", analisis: "Economía en crecimiento masivo. El banco central interviene frecuentemente para evitar volatilidad extrema." },
    "TRY": { nombre: "Lira Turca", analisis: "Históricamente sufre de hiperinflación y devaluación severa debido a políticas monetarias no convencionales." },
    "CNY": { nombre: "Yuan Chino", analisis: "Estrictamente controlada por el gobierno chino para mantener competitividad en sus exportaciones." },
    "JPY": { nombre: "Yen Japonés", analisis: "Considerada un 'refugio seguro'. Japón históricamente lucha más contra la deflación que contra la inflación." },
    "KRW": { nombre: "Won Surcoreano", analisis: "Altamente dependiente de la industria tecnológica y la exportación de manufactura." }
};

// ====================================================================
// 2. INICIALIZACIÓN (Se ejecuta al abrir la página)
// ====================================================================
async function inicializarApp() {
    try {
        const respuesta = await fetch(API_URL);
        const datos = await respuesta.json();
        
        if (datos.result === "success") {
            tasasDeCambio = datos.rates; // Guardamos todas las tasas en memoria
            console.log("¡Tasas actualizadas descargadas con éxito!");
            
            // Creamos las dos primeras filas de divisas por defecto al cargar
            agregarFilaDivisa('COP');
            agregarFilaDivisa('USD');
        }
    } catch (error) {
        console.error("Error al conectar con la API:", error);
        alert("No se pudieron cargar los precios actualizados de las monedas.");
    }
}

// Ejecutar la inicialización cuando la ventana termine de cargar
window.onload = inicializarApp;


// ====================================================================
// 3. MÓDULO MATEMÁTICO (Operaciones Normales)
// ====================================================================
function calcular(operacion, num1, num2) {
    switch (operacion) {
        case 'suma': return num1 + num2;
        case 'resta': return num1 - num2;
        case 'multiplicar': return num1 * num2;
        case 'dividir': 
            if (num2 === 0) return "Error: Div entre 0";
            return num1 / num2;
        default: return 0;
    }
}

function ejecutarOperacion() {
    const n1 = parseFloat(document.getElementById('num1').value);
    const n2 = parseFloat(document.getElementById('num2').value);
    const op = document.getElementById('operacion').value;
    const pantallaResultado = document.getElementById('res-mates');

    if (isNaN(n1) || (isNaN(n2))) {
        pantallaResultado.innerText = "Escribe ambos números";
        return;
    }

    const resultado = calcular(op, n1, n2);
    pantallaResultado.innerText = `Resultado: ${resultado}`;
}


// ====================================================================
// 4. MÓDULO DE MATRIZ DE DIVISAS (Conversión Automática)
// ====================================================================

// Añade una nueva fila de divisa a la pantalla
function agregarFilaDivisa(monedaPorDefecto = 'USD') {
    const contenedor = document.getElementById('contenedor-matriz-divisas');
    const idFila = Date.now(); // Creamos un ID único usando la hora exacta
    
    const fila = document.createElement('div');
    fila.className = 'fila-divisa';
    fila.id = `fila-${idFila}`;

    // Generar opciones de la lista desplegable basadas en nuestra infoMonedas
    let opcionesHTML = '';
    for (let codigo in infoMonedas) {
        const seleccionado = codigo === monedaPorDefecto ? 'selected' : '';
        opcionesHTML += `<option value="${codigo}" ${seleccionado}>${codigo} - ${infoMonedas[codigo].nombre}</option>`;
    }

    // oninput="recalcularTodo(this)" es la magia que calcula al escribir
    fila.innerHTML = `
        <select class="selector-moneda" onchange="recalcularTodo(this)">
            ${opcionesHTML}
        </select>
        <input type="number" class="input-monto" placeholder="0.00" oninput="recalcularTodo(this)">
        <button class="btn-eliminar" onclick="eliminarFila(${idFila})">X</button>
    `;

    contenedor.appendChild(fila);
}

// Elimina una fila si el usuario presiona la 'X'
function eliminarFila(id) {
    document.getElementById(`fila-${id}`).remove();
}

// La función principal: convierte todas las monedas cuando escribes en una
function recalcularTodo(elementoModificado) {
    // 1. Identificar en qué fila se está escribiendo
    const filaActiva = elementoModificado.closest('.fila-divisa');
    const monedaOrigen = filaActiva.querySelector('.selector-moneda').value;
    const montoIngresado = parseFloat(filaActiva.querySelector('.input-monto').value);

    // Si el usuario borra todo, limpiamos los demás campos
    if (isNaN(montoIngresado)) {
        document.querySelectorAll('.input-monto').forEach(input => input.value = '');
        return; 
    }

    // 2. Convertir el monto ingresado a USD (Moneda Base) para facilitar cálculos
    const tasaOrigen = tasasDeCambio[monedaOrigen];
    const valorEnUSD = montoIngresado / tasaOrigen;

    // 3. Recorrer todas las filas de la pantalla y actualizar sus valores
    const todasLasFilas = document.querySelectorAll('.fila-divisa');
    todasLasFilas.forEach(fila => {
        if (fila !== filaActiva) { // No sobreescribir la fila donde el usuario está escribiendo
            const monedaDestino = fila.querySelector('.selector-moneda').value;
            const tasaDestino = tasasDeCambio[monedaDestino];
            const inputDestino = fila.querySelector('.input-monto');
            
            let resultadoCalculado = valorEnUSD * tasaDestino;
            
            // Si es moneda asiática, no mostrar decimales
            const decimales = (monedaDestino === 'JPY' || monedaDestino === 'KRW') ? 0 : 2;
            inputDestino.value = resultadoCalculado.toFixed(decimales);
        }
    });
}


// ====================================================================
// 5. MÓDULO DE ANÁLISIS DE MERCADO
// ====================================================================
function mostrarAnalisisMercado() {
    const divisa1 = document.getElementById('analisis-moneda-1').value;
    const divisa2 = document.getElementById('analisis-moneda-2').value;
    const cajaTexto = document.getElementById('texto-analisis');

    const analisis1 = `<strong>${divisa1}:</strong> ${infoMonedas[divisa1].analisis}`;
    const analisis2 = `<strong>${divisa2}:</strong> ${infoMonedas[divisa2].analisis}`;

    cajaTexto.innerHTML = `<p>${analisis1}</p><p>${analisis2}</p>`;
}
