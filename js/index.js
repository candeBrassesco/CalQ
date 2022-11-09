
// ------------- CALCULADORA DE CUOTAS ! -------------- //

// En esta sección se incluyen los eventos y funciones correspondientes a la sección del calculador:

// Hago un evento para cada vez que el usuario seleccione las cuotas e ingrese el monto,
// aparezca un cuadro de texto que indique como le quedan las cuotas.

//oculto el resultado y el loader:
document.getElementById("resultado").style.display = "none";
document.getElementById("loader").style.display = "none";

// capturo el input de monto y lo guardo en el local Storage:

let montoAPagar = document.getElementById ("monto")

localStorage.setItem("montoFinal", montoAPagar.value)

// capturo la sección del interés que se le va a sumar:

let interesSumado = document.getElementById("disabledTextInput-interes")

// capturo el botón para calcular las cuotas: 

let calculador = document.getElementById("botonCalculador")

// capturo el botón para volver a la sección de cuotas:

let volver = document.getElementById("botonVolver")

// Para poder acceder al valor de las cuotas y a la tarjeta seleccionada:

let selectCuota = document.getElementById("inputGroupSelect01-cuotas");
let selectTarjeta = document.getElementById("inputGroupSelect01-tarjeta");

$("select").change(()=> {
    let cuotaSeleccionada = selectCuota.options[selectCuota.selectedIndex];
    let tarjetaSeleccionada = selectTarjeta.options[selectTarjeta.selectedIndex];
    if ((cuotaSeleccionada.text == 12) && ((tarjetaSeleccionada.value == "visa") || (tarjetaSeleccionada.value == "master") || (tarjetaSeleccionada.value == "cabal"))) {
        interesSumado.value = 0.375;
        console.log(cuotaSeleccionada.value)
        console.log(tarjetaSeleccionada.value)
        console.log(interesSumado.value)  
    } else if (((cuotaSeleccionada.value == 6) || (cuotaSeleccionada.value == 3)) && ((tarjetaSeleccionada.value == "visa") || (tarjetaSeleccionada.value == "master"))||(cuotaSeleccionada.value == 1)){
        interesSumado.value = 0; 
        console.log(cuotaSeleccionada.value)
        console.log(tarjetaSeleccionada.value)
        console.log(interesSumado.value)   
    } else if (((cuotaSeleccionada.value == 6) && (tarjetaSeleccionada.value == "amex"))||((cuotaSeleccionada.value == 12) && ((tarjetaSeleccionada.value == "cabal")||(tarjetaSeleccionada.value == "visa") || (tarjetaSeleccionada.value == "master")))){
        interesSumado.value = 0.375;
        console.log(cuotaSeleccionada.value)
        console.log(tarjetaSeleccionada.value)
        console.log(interesSumado.value)  
    } else if ((cuotaSeleccionada.value == 3) && (tarjetaSeleccionada.value == "cabal")){
        interesSumado.value = 0.16;
        console.log(cuotaSeleccionada.value)
        console.log(tarjetaSeleccionada.value)
        console.log(interesSumado.value) 
    } else if (((cuotaSeleccionada.value == 6) && (tarjetaSeleccionada.value == "cabal"))||((parseInt(cuotaSeleccionada.value) == 3) && (tarjetaSeleccionada.value == "amex"))){
        interesSumado.value = 0.29;
        console.log(cuotaSeleccionada.value)
        console.log(tarjetaSeleccionada.value)
        console.log(interesSumado.value) 
    } else if ((cuotaSeleccionada.value == 12) && (tarjetaSeleccionada.value == "amex")){
        interesSumado.value = 0.47;
        console.log(cuotaSeleccionada.value)
        console.log(tarjetaSeleccionada.value)
        console.log(interesSumado.value) 
    } else if ((cuotaSeleccionada.value == "null") || (tarjetaSeleccionada.value == "null")){
        interesSumado.value = ""
        console.log(cuotaSeleccionada.value)
        console.log(tarjetaSeleccionada.value)
        console.log(interesSumado.value)
    } else {
        interesSumado.value = 0.54;
        console.log(cuotaSeleccionada.value)
        console.log(tarjetaSeleccionada.value)
        console.log(interesSumado.value) 
    }
    localStorage.setItem("opcionTarjeta", tarjetaSeleccionada.value)
    localStorage.setItem("opcionCuota", cuotaSeleccionada.value)
    localStorage.setItem("interesSumado", interesSumado.value)
  });

calculador.addEventListener("click",()=>{
    let cuotas = localStorage.getItem("opcionCuota")
    let tarjeta = localStorage.getItem("opcionTarjeta")
    if ( (montoAPagar.value == "") || (cuotas == "null" ) || (tarjeta == "null" )) {
        $("#errorEnvio").show();
    } else {
         $("#errorEnvio").hide();
         calculadoraInteres(montoAPagar.value, cuotas, interesSumado.value, tarjeta)
         // Al apretar el botón se muestra la sección del lodaer y se mantiene oculto el resultado.
         $("#loader").show();
         // Se esconde el formulario
         $("#formulario").hide();
         // A los 3s se muestra el resultado y se esconde el loader.
         setTimeout (()=>{
             $("#loader").hide();
             $("#resultado").show();
         },4000)
     }
}) 

// capturo el botón para limpiar el formulario:

let limpiar = document.getElementById("botonReset")

// al apretar el botón de limpiar el formulario se borra el local storage.
limpiar.addEventListener("click", ()=>{
    localStorage.clear();
    $("#errorEnvio").hide();
    $("#errorSelects2").hide();
    $("#errorSelects1").hide();
    document.getElementById("grupoCuotas").classList.remove("formulario__campo-incorrecto")
    document.getElementById("grupoTarjeta").classList.remove("formulario__campo-incorrecto")
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
    
// Sección de consulta de intereses: 
 
let botonConsulta = document.getElementById("botonIntereses")

botonConsulta.addEventListener("click", ()=>{
    Swal.fire({
        className: "infoInteres",
        background: "#000",
        html: `<img id="alertInteres" class="infoInteres__cartel" src=".././img/intereses.png">`,
        showClass: {
            popup: 'animate__animated animate__fadeInDown',
        },
          hideClass: {
            popup: `animate__animated animate__fadeOutDown`, 
          }
    })
})

