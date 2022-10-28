// Hoja con array de cuotas con fetch:

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