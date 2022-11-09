// Funcion para calular el monto final, las cuotas y los intereses.

function calculadoraInteres (monto, cuotas, interes, tarjeta){
    let montoTotal = monto+(monto*interes)
    let montoCuotas = montoTotal/cuotas
    let montoFinal = document.getElementById("montoFinal")
    let cuotasPagar = document.getElementById ("cantidadDeCuotas")
    let pagoCuota = document.getElementById("pagoPorCuota")
    let tarjetaOptada = document.getElementById("tarjetaElegida")
    montoFinal.value = montoTotal
    tarjetaOptada.value = tarjeta
    pagoCuota.value = roundToTwo(montoCuotas)
    cuotasPagar.value = cuotas
    console.log(`El monto a pagar es de $${montoTotal} dividido en ${cuotas} cuota/s de $${montoCuotas}`)                   
 }