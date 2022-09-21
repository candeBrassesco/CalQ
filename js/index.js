// Para interactuar con el HTML creé una lista de pasos explicando como funciona la calculadora.

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
const pestaña3 = new Pestañas ("Por qué calQ", 3, "motivosCalQ")
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

