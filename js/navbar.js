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