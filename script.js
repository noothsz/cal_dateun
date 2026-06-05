// ====== MÓDULO DE OPERACIONES NORMALES ======
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

// ====== MÓDULO DE DIVISAS (API) ======
// Usaremos una URL de una API de tasas de cambio respaldada por GitHub para que siempre funcione online
const API_URL = "https://open.er-api.com/v6/latest/USD"; 

async function convertirDivisa(monto, deDivisa, aDivisa) {
    try {
        // 1. Llamamos a la API para obtener los cambios actuales basados en el Dólar (USD)
        const respuesta = await fetch(API_URL);
        const datos = await respuesta.json();
        
        if (datos.result === "success") {
            // 2. Obtenemos las tasas de cambio de las dos monedas elegidas
            const tasaDe = datos.rates[deDivisa];
            const tasaA = datos.rates[aDivisa];
            
            // 3. Convertimos el monto (Fórmula: (Monto / Tasa de origen) * Tasa de destino)
            const resultado = (monto / tasaDe) * tasaA;
            return resultado.toFixed(2); // Retorna el número con 2 decimales
        } else {
            throw new Error("No se pudieron obtener las tasas de cambio.");
        }
    } catch (error) {
        console.error("Error en la conversión:", error);
        return "Error de conexión";
    }
}

// Ejemplo de uso interno (para probar en consola):
// convertirDivisa(100, "EUR", "MXN").then(res => console.log(`100 EUR son: ${res} MXN`));
