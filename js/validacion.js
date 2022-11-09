// En esta sección se desarrolla la validación del formulario antes de calcular las cuotas.
let formulario = document.getElementById("formulario");
let inputs = document.querySelectorAll("#formulario input");
let selects = document.querySelectorAll("#formulario select");

const expresiones = {
    // para el monto se permiten solo números
    monto: /^([0-9])*$/ 
} 

// dejo oculto el error que va a mostrarse si el usuario ingresa mal el monto:

$("#errorMonto").hide()

// Planteo la función para validar los inputs y los selects

let validarInput = (e) => {
    if (e.target.name == "monto") {
            if (expresiones.monto.test(e.target.value)){
               document.getElementById("grupoMonto").classList.remove("formulario__incorrecto");
               $("#errorMonto").hide();
            } else {
               document.getElementById("grupoMonto").classList.add("formulario__incorrecto");
               $("#errorMonto").show();
            }
    }
}

inputs.forEach((input)=>{
    input.addEventListener("keyup", validarInput);
    input.addEventListener("blur", validarInput)
})

// oculto los errores que se van a mostrar al seleccionar la opción null:
$("#errorSelects1").hide();
$("#errorSelects2").hide();

// función para validar los selectores:
let validarSelects = (e) => {
    if (e.target.name == "selectorTarjeta"){
        if (e.target.value == "null"){
            document.getElementById("grupoTarjeta").classList.add("formulario__campo-incorrecto")
            $("#errorSelects1").show();
        } else {
            document.getElementById("grupoTarjeta").classList.remove("formulario__campo-incorrecto")
            $("#errorSelects1").hide();
        }
    }
    if (e.target.name == "selectorCuotas"){
        if(e.target.value == "null"){
            document.getElementById("grupoCuotas").classList.add("formulario__campo-incorrecto")
            $("#errorSelects2").show();
        } else {
            document.getElementById("grupoCuotas").classList.remove("formulario__campo-incorrecto")
            $("#errorSelects2").hide();
        }
    }
}

selects.forEach((select)=>{
    select.addEventListener("change", validarSelects);
    select.addEventListener("blur", validarSelects);
})

// oculto el error que se va a mostrar si no se completa un campo:
$("#errorEnvio").hide();

