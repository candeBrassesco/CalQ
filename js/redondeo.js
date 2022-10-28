// Función para redondear a dos decimales.

function roundToTwo(num) {
    return +(Math.round(num + "e+2")  + "e-2");
}