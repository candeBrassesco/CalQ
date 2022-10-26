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

const pestaña1 = new Pestañas ("Calculá tus cuotas", 1, "#calculadora")
const pestaña2 = new Pestañas ("Qué es calQ", 2, "#infoCalQ")
const pestaña3 = new Pestañas ("Por qué calQ", 3, "#motivosCalQ")

// Creo el array correspondiente a las pestañas

const listaPestañas = [pestaña1, pestaña2, pestaña3]

// Creo cada li del navbar empleando un forEach sobre el array, junto con un getElementById y un createElement

let ulPestañas = document.getElementById("listaDeLinks")
listaPestañas.forEach((pestaña)=>{
    let nuevaPestaña = document.createElement("li")
    nuevaPestaña.innerHTML = `<li id="${pestaña.id}" class="nav-item">
    <a class="nav-link" href="${pestaña.link}">${pestaña.nombre}</a>
</li> `
ulPestañas.appendChild(nuevaPestaña)
})

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

// Defino la función que va a calcular las cuotas.

// let selectorCuotas = document.getElementById("inputGroupSelect01-cuotas");
// let opcionSelected = document.getElementById("opcionSeleccionada")
// listaCuotas.forEach((opcion)=>{
//     let nuevoOption = document.createElement("option")
//     nuevoOption.innerHTML = `<option value:"${opcion.value}">${opcion.cuotas}</option>`
//     selectorCuotas.appendChild(nuevoOption)
//     nuevoOption.after(opcionSelected)
// })

function calculadoraInteres (monto, cuotas, interes){
    let montoTotal = monto+(monto*interes)
    let montoCuotas = montoTotal/cuotas 
    let montoFinal = document.getElementById("montoFinal")
    let cuotasPagar = document.getElementById ("cantidadDeCuotas")
    let pagoCuota = document.getElementById("pagoPorCuota")
    montoFinal.value = montoTotal
    pagoCuota.value = roundToTwo(montoCuotas)
    cuotasPagar.value = cuotas
    // console.log(`El monto a pagar es de $${montoTotal} dividido en ${cuotas} cuota/s de $${montoCuotas}`)                   
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

let select = document.getElementById("inputGroupSelect01-cuotas");
select.addEventListener('change',()=> {
    let cuotaSeleccionada = select.options[select.selectedIndex];
    if (parseInt(cuotaSeleccionada.text) == 12) {
        interesSumado.value = 0.15;
        console.log(parseInt(cuotaSeleccionada.value))
        console.log(interesSumado.value)  
    } else if (parseInt(cuotaSeleccionada.value) == 18){
        interesSumado.value = 0.18; 
        console.log(parseInt(cuotaSeleccionada.value))
        console.log(interesSumado.value)  
    } else {
        interesSumado.value = 0;
        console.log(interesSumado.value)  
    } 
    localStorage.setItem("opcionCuota", cuotaSeleccionada.value)
  });

// Evento para calcular las cuotas al apretar el botón "calcular" y mostrar la sección "resultado":

calculador.addEventListener("click",()=>{
    let cuotas = parseInt(localStorage.getItem("opcionCuota"))
    calculadoraInteres(parseInt(montoAPagar.value), cuotas, interesSumado.value)
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
    







