// Hoja con array de cuotas con fetch:

// Defino el grupo de cuotas para poder usar fetch
class Cuotas {
    constructor (id, value, cuotas, interesMaster, interesVisa, interesCabal, interesAmerican){
        this.id = id
        this.value = value
        this.cuotas = cuotas
        this.interesMaster = interesMaster
        this.interesVisa = interesVisa
        this.interesCabal = interesCabal
        this.interesAmerican = interesAmerican
    }
}

// Con fetch creo un array con las cuotas.
const cargarCuotas = async()=>{
    const response = await fetch("../cuotas.json")
    const data = await response.json()
    console.log(data)
    let listaCuotas = []
    for (let cuota of data){
        let cuotaNueva = new Cuotas(cuota.id, cuota.value, cuota.cuotas, cuota.interesMaster, cuota.interesVisa, cuota.interesCabal, cuota.interesAmerican)
        listaCuotas.push(cuotaNueva)
    }
}
cargarCuotas()