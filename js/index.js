// Para interactuar con el HTML creé una lista de pasos explicando como funciona la calculadora.


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
const pestaña4 = new Pestañas ("Testimonios", 4, "#testimonio")

// Creo el array correspondiente a las pestañas

const listaPestañas = [pestaña1, pestaña2, pestaña3, pestaña4]

// Creo cada li del navbar empleando un forEach sobre el array, junto con un getElementById y un createElement

let ulPestañas = document.getElementById("listaDeLinks")
listaPestañas.forEach((pestaña)=>{
    let nuevaPestaña = document.createElement("li")
    nuevaPestaña.innerHTML = `<li id="${pestaña.id}" class="nav-item">
    <a class="nav-link" href="${pestaña.link}">${pestaña.nombre}</a>
</li> `
ulPestañas.appendChild(nuevaPestaña)
})


// ------------- CALCULADORA DE CUOTAS ! -------------- //

// En esta sección se incluyen los eventos y funciones correspondientes a la sección del calculador:

// Hago un evento para cada vez que el usuario seleccione las cuotas e ingrese el monto,
// aparezca un cuadro de texto que indique como le quedan las cuotas.

// Defino la función que va a calcular las cuotas.

function calculadoraInteres (monto, cuotas, interes){
    let montoTotal = monto+(monto*interes)
    let montoCuotas = montoTotal/cuotas
    alert(`El monto a pagar es de $${montoTotal} dividido en ${cuotas} cuota/s de $${montoCuotas}`)                        
 }

let montoAPagar = document.getElementById ("monto")

let interesSumado = document.getElementById("disabledTextInput-interes")

let calculador = document.getElementById("botonCalculador")

// Para poder acceder al valor de las cuotas:

let select = document.getElementById("inputGroupSelect01-cuotas");
select.addEventListener('change',()=> {
    let cuotaSeleccionada = select.options[select.selectedIndex];
    if (parseInt(cuotaSeleccionada.text) == 12) {
        interesSumado.value = 0.15;
        console.log(parseInt(cuotaSeleccionada.text))
        console.log(interesSumado.value)  
    } else if (parseInt(cuotaSeleccionada.text) == 18){
        interesSumado.value = 0.18; 
        console.log(parseInt(cuotaSeleccionada.text))
        console.log(interesSumado.value)  
    } else {
        interesSumado.value = 0;
        console.log(interesSumado.value)  
    } 
    localStorage.setItem("opcionCuota", cuotaSeleccionada.text)
  });



calculador.addEventListener("click",()=>{
    let cuotas = parseInt(localStorage.getItem("opcionCuota"))
    calculadoraInteres(parseInt(montoAPagar.value), cuotas, interesSumado.value)
})