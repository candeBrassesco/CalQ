// ----------- NAVBAR ! ------------- //

// En esta sección del documento se plantea el navbar:

// Hago el navbar con getElement y createElement
// Primero establezco como objetos los elementos del navbar

class Pestañas {
    constructor (nombre,id, link){
        this.nombre = nombre
        this.id = id
        this.link = link
    }
}

const pestaña0 = new Pestañas ("Inicio", "enlace", "#inicio")
const pestaña1 = new Pestañas ("Calculá tus cuotas", "enlace", "#calculadora")
const pestaña2 = new Pestañas ("Qué es calQ", "enlace", "#infoCalQ")
const pestaña3 = new Pestañas ("Por qué calQ", "enlace", "#motivosCalQ")

// Creo el array correspondiente a las pestañas

const listaPestañas = [pestaña0, pestaña1, pestaña2, pestaña3]

// Creo cada li del navbar empleando un forEach sobre el array, junto con un getElementById y un createElement

let ulPestañas = document.getElementById("listaDeLinks")
listaPestañas.forEach((pestaña)=>{
    let nuevaPestaña = document.createElement("li")
    nuevaPestaña.innerHTML = `<li id="${pestaña.id}" class="nav-item">
    <a class="nav-link" href="${pestaña.link}">${pestaña.nombre}</a>
</li> `
ulPestañas.appendChild(nuevaPestaña)
})

// Jquery para cerrar el navbar al clickear algún link:

// capturo primero los links del navbar:



// $('.navbar-nav>li>a').on('click', ()=>{
//     $('.navbar-collapse').collapse('hide');
// });

// Defino el grupo de cuotas para poder usar fetch
class Cuotas {
    constructor (id, value, cuotas, interes){
        this.id = id
        this.value = value
        this.cuotas = cuotas
        this.interes = interes
    }
}

// Con fetch creo un array con las cuotas.

const cargarCuotas = async()=>{
    const response = await fetch("../cuotas.json")
    const data = await response.json()
    console.log(data)
    let listaCuotas = []
    for (let cuota of data){
        let cuotaNueva = new Cuotas(cuota.id, cuota.value, cuota.cuotas, cuota.interes)
        listaCuotas.push(cuotaNueva)
    }
}
cargarCuotas()

//oculto el resultado y el loader:
document.getElementById("resultado").style.display = "none";
document.getElementById("loader").style.display = "none";

// ------------- CALCULADORA DE CUOTAS ! -------------- //

// En esta sección se incluyen los eventos y funciones correspondientes a la sección del calculador:

// Hago un evento para cada vez que el usuario seleccione las cuotas e ingrese el monto,
// aparezca un cuadro de texto que indique como le quedan las cuotas.

// Función para redondear a dos decimales la función de 

function roundToTwo(num) {
    return +(Math.round(num + "e+2")  + "e-2");
}

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

// capturo el input de monto:

let montoAPagar = document.getElementById ("monto")

// capturo la sección del interés que se le va a sumar:

let interesSumado = document.getElementById("disabledTextInput-interes")

// capturo el botón para calcular las cuotas: 

let calculador = document.getElementById("botonCalculador")

// capturo el botón para limpiar el formulario:

let limpiar = document.getElementById("botonReset")

// capturo el botón para volver a la sección de cuotas:

let volver = document.getElementById("botonVolver")

// Para poder acceder al valor de las cuotas:

let selectCuota = document.getElementById("inputGroupSelect01-cuotas");
let selectTarjeta = document.getElementById("inputGroupSelect01-tarjeta");

$("select").change(()=> {
    let cuotaSeleccionada = selectCuota.options[selectCuota.selectedIndex];
    let tarjetaSeleccionada = selectTarjeta.options[selectTarjeta.selectedIndex];
    if ((parseInt(cuotaSeleccionada.text) == 12) && ((tarjetaSeleccionada.value == "visa") || (tarjetaSeleccionada.value == "master") || (tarjetaSeleccionada.value == "cabal"))) {
        interesSumado.value = 0.375;
        console.log(parseInt(cuotaSeleccionada.value))
        console.log(tarjetaSeleccionada.value)
        console.log(interesSumado.value)  
    } else if ((((parseInt(cuotaSeleccionada.value) == 6) || (parseInt(cuotaSeleccionada.value) == 3)) && ((tarjetaSeleccionada.value == "visa") || (tarjetaSeleccionada.value == "master")))||(parseInt(cuotaSeleccionada.value) == 1)){
        interesSumado.value = 0; 
        console.log(parseInt(cuotaSeleccionada.value))
        console.log(interesSumado.value)  
    } else if ((parseInt(cuotaSeleccionada.value) == 6) && (tarjetaSeleccionada.value == "cabal")){
        interesSumado.value = 0.16;
        console.log(interesSumado.value)  
    } else if (((parseInt(cuotaSeleccionada.value) == 6) && (tarjetaSeleccionada.value == "amex"))||((parseInt(cuotaSeleccionada.value) == 12) && ((tarjetaSeleccionada.value == "cabal")||(tarjetaSeleccionada.value == "visa") || (tarjetaSeleccionada.value == "master")))){
        interesSumado.value = 0.375;
        console.log(interesSumado.value)  
    } else if ((parseInt(cuotaSeleccionada.value) == 3) && (tarjetaSeleccionada.value == "cabal")){
        interesSumado.value = 0.16;
        console.log(interesSumado.value) 
    } else if (((parseInt(cuotaSeleccionada.value) == 6) && (tarjetaSeleccionada.value == "cabal"))||((parseInt(cuotaSeleccionada.value) == 3) && (tarjetaSeleccionada.value == "amex"))){
        interesSumado.value = 0.29;
        console.log(interesSumado.value) 
    } else {
        interesSumado.value = 0.54;
        console.log(interesSumado.value) 
    }
    localStorage.setItem("opcionTarjeta", tarjetaSeleccionada.value)
    localStorage.setItem("opcionCuota", cuotaSeleccionada.value)
  });

calculador.addEventListener("click",()=>{
    let cuotas = parseInt(localStorage.getItem("opcionCuota"))
    let tarjeta = localStorage.getItem("opcionTarjeta")
    calculadoraInteres(parseInt(montoAPagar.value), cuotas, interesSumado.value, tarjeta)
    // Al apretar el botón se muestra la sección del lodaer y se mantiene oculto el resultado.
    $("#loader").show();
    // Se esconde el formulario
    $("#formulario").hide();
    // A los 3s se muestra el resultado y se esconde el loader.
    setTimeout (()=>{
        $("#loader").hide();
        $("#resultado").show();
        alert(`url actual:` + window.location.href)
    },4000)
}) 

// Evento para volver a la sección de la calculadora:

volver.addEventListener("click", ()=>{
    // alert para confirmar que el usuario quiere volver al formulario calculador
    swal({
        className:"alerta",
        text:"¿Estás segur@ de volver al inicio?",
        buttons: {
            cancelar: {text:"cancelar", className:"alerta__boton-cancelar"},
            OK: true,    
        },
    })
    .then((value) => { 
        if(value == "OK"){className:"alerta",
           $("#resultado").hide();
           $("#formulario").show();
        }
    });
})
    
// Evento para contrar el navbar una vez apretado un link.
$(document).ready(()=> {
    $(".nav-link").click(()=> {
      $(".collapse").collapse('hide');
    });
  });






