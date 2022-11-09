// Se crea la clase pestañas y se forma un array para luego poder crear el navbar en index.js

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

// Creo el array correspondiente a las pestañas

const listaPestañas = [pestaña0, pestaña1, pestaña2]

// Creo cada li del navbar empleando un forEach sobre el array, junto con un getElementById y un createElement

let ulPestañas = document.getElementById("listaDeLinks")
listaPestañas.forEach((pestaña)=>{
    let nuevaPestaña = document.createElement("li")
    nuevaPestaña.innerHTML = `<li id="${pestaña.id}" class="nav-item">
    <a class="nav-link" href="${pestaña.link}">${pestaña.nombre}</a>
</li> `
ulPestañas.appendChild(nuevaPestaña)
})

// Evento para contrar el navbar una vez apretado un link.
$(document).ready(()=> {
    $(".nav-link").click(()=> {
      $(".collapse").collapse('hide');
    });
  });