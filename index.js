const fs = require('fs')

const archivo = (nombre, delimitador) => {
  const contenido = fs.readFileSync(nombre).toString()
  return contenido.split(delimitador)
}

const equipoA = archivo('basket/equipo-A.txt', '\n')
const equipoB = archivo('basket/equipo-B.txt', '\n')
const partido = archivo('basket/partido.log', '\n')

const puntosEquipo = (registro, equipo) => {
  const registroEquipo = registroFiltrado(registro, equipo)
  const total = tantos(registroEquipo).total
  const puntos = tantos(registroEquipo).puntos
  return {
    total,
    puntos
  }
}

const registroFiltrado = (partido, equipo) => {
  const nombres = partido.filter(anotacion =>{
    let apellido = anotacion.split(",")[0]
    let apellidos = equipo.map(nombreCompleto => nombreCompleto.split(" ")[1])
    return apellidos.includes(apellido)
  })
  return nombres
}

const tantos = (registroEquipo) => {
  let puntos = {};
  let total = 0;
  registroEquipo.forEach(anotacion => {
    const apellido = anotacion.split(",")[0] 
    let tanto = anotacion.split(",")[1]
    tanto = (tanto === 'DOBLE') ? 2 : 3
    puntos[apellido] = puntos[apellido] || 0
    puntos[apellido] += tanto // puntos[apellido] = puntos[apellido] + tanto
    total += tanto
  })
  return {
    total, puntos
  }
}

const resultadoFinal = (puntosEquipoA,puntosEquipoB) => {
  console.log("Resultado Final: ")
  return {
    primerEquipo: puntosEquipoA,
    segundoEquipo: puntosEquipoB
  }
};

const goleador = (puntosEquipoA,puntosEquipoB) => {
let maxGol = 0; let goleador;
let goleadorA = buscarGoleador(puntosEquipoA).goleador;
let goleadorB = buscarGoleador(puntosEquipoB).goleador;
let maxGolA = buscarGoleador(puntosEquipoA).maxGol;
let maxGolB = buscarGoleador(puntosEquipoB).maxGol;
if (maxGolA > maxGolB) {
  goleador = nombreCompleto(goleadorA,equipoA)
  maxGol = maxGolA
} else {
  goleador = nombreCompleto(goleadorB,equipoB)
  maxGol = maxGolB
}
console.log(`Jugador con mas puntos: \n${goleador}: ${maxGol}`)
return {
  goleador,
  maxGol
}
}

const nombreCompleto = (nombre, equipo) => {
  equipo.forEach(nombreCompleto => {
    if (nombre == nombreCompleto.split(" ")[1]) {
      nombre = nombreCompleto
    }
  })
  return nombre
}

const buscarGoleador = (puntosEquipo) => {
  let maxGol = 0;let goleador;
  for (const jugador in puntosEquipo.puntos) {
    if (maxGol < puntosEquipo.puntos[jugador]) {
      maxGol = puntosEquipo.puntos[jugador]
      goleador = jugador;
    }
  }
  return {
    goleador,
    maxGol
  }
}

const distribucionDePuntaje = (partido) => {
  let contDoble = 0;let contTriple = 0;let acumDoble = 0;let acumTriple = 0;
  partido.forEach(puntaje => {
    let punto = puntaje.split(",")[1]
    if (punto == "DOBLE") {
      contDoble++;
      acumDoble+=2;
    } else if (punto == "TRIPLE") {
      contTriple++;
      acumTriple+=3;
    }
  })
  console.log("Distribucion de puntos:")
  return{
    cantidadDobles: contDoble,
    puntosDobles: acumDoble,
    cantidadTriples: contTriple,
    puntosTriples: acumTriple,
  }
}

const puntosEquipoA = puntosEquipo(partido, equipoA)
const puntosEquipoB = puntosEquipo(partido, equipoB)
console.log(resultadoFinal(puntosEquipoA,puntosEquipoB))
goleador(puntosEquipoA,puntosEquipoB)
console.log(distribucionDePuntaje(partido))

