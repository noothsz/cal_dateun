// ====== LÓGICA MATEMÁTICA ======
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

// Vinculación con la pantalla web
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


// ====== LÓGICA DE DIVISAS (API TIEMPO REAL) ======
const API_URL = "https://open.er-api.com/v6/latest/USD"; 

async function convertirDivisa(monto, deDivisa, aDivisa) {
    try {
        const respuesta = await fetch(API_URL);
        const datos = await respuesta.json();
        
        if (datos.result === "success") {
            const tasaDe = datos.rates[deDivisa];
            const tasaA = datos.rates[aDivisa];
            
            // Operación de conversión indexada al USD
            const resultado = (monto / tasaDe) * tasaA;
            
            // Formateo inteligente: si es Yen o Won no usa decimales, para las demás usa 2.
            const decimales = (aDivisa === 'JPY' || aDivisa === 'KRW') ? 0 : 2;
            return resultado.toFixed(decimales);
        } else {
            throw new Error("Error en los datos de la API");
        }
    } catch (error) {
        console.error(error);
        return "Error de red";
    }
}

// Vinculación con la pantalla web
async function ejecutarConversion() {
    const monto = parseFloat(document.getElementById('monto').value);
    const de = document.getElementById('de-divisa').value;
    const a = document.getElementById('a-divisa').value;
    const pantallaResultado = document.getElementById('res-divisas');

    if (isNaN(monto) || monto <= 0) {
        pantallaResultado.innerText = "Ingresa un monto válido";
        return;
    }

    pantallaResultado.innerText = "Buscando tasas en vivo...";
    
    const resultado = await convertirDivisa(monto, de, a);
    pantallaResultado.innerText = `${monto} ${de} = ${resultado} ${a}`;
}
