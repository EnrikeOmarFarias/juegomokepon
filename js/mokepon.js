
const sectionReiniciar = document.getElementById('boton-reiniciar')
const botonMascotaJugador = document.getElementById('boton-mascota')
const sectionSeleccionarAtaque = document.getElementById('Seleccionar-ataque')
const botonReiniciar = document.getElementById('boton-reiniciar')

const sectionSeleccionarMascota = document.getElementById('Seleccionar-mascota')
const spanMascotaJugador = document.getElementById('mascota-jugador')
const spanMascotaEnemigo = document.getElementById('mascota-enemigo')

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const sectionMensajes = document.getElementById('resultado')
const ataquesDelJugador = document.getElementById('ataques-del-jugador')
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')
const contenedorTarjetas = document.getElementById('contenedorTarjetas')
const contenedorAtaques = document.getElementById('contenedorAtaques')

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')

let mokepones = []
let ataqueJugador = []
let ataqueEnemigo = []
let botones = []
let vidasJugador = 3
let vidasEnemigo = 3
let victoriasJugador = 0
let victoriasEnemigo = 0
let opcionDeMokepones
let inputHipodoge
let inputCapipepo 
let inputRatigueya
let mascotaJugador
let ataquesMokepon
let ataquesMokeponEnemigo
let botonAgua 
let botonFuego
let botonTierra
let indexAtaqueEnemigo
let indexAtaqueJugador
let lienzo = mapa.getContext("2d")


class Mokepon {
    constructor(nombre, foto, vida) {
      this.nombre = nombre
      this.foto = foto
      this.vida = vida
      this.ataques = []
      this.x = 20
      this.y = 30
      this.ancho = 80
      this.alto = 80
      this.mapaFoto = new Image()
      this.mapaFoto.src = foto
    }

}

let hipodoge = new Mokepon('Hipodoge', '/assets/imagenes/mokepons_mokepon_capipepo_attack.png', 5)
let capipepo = new Mokepon('Capipepo', '/assets/imagenes/mokepons_mokepon_hipodoge_attack.png', 5)
let ratigueya = new Mokepon('Ratigueya', '/assets/imagenes/mokepons_mokepon_ratigueya_attack.png', 5)

hipodoge.ataques.push(
    {nombre: '💦', id: 'boton-agua'},
    {nombre: '💦', id: 'boton-agua'},
    {nombre: '💦', id: 'boton-agua'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🌎', id: 'boton-tierra'},
)

capipepo.ataques.push(
    {nombre: '🌎', id: 'boton-tierra'},
    {nombre: '🌎', id: 'boton-tierra'},
    {nombre: '🌎', id: 'boton-tierra'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '💦', id: 'boton-agua'},
)

ratigueya.ataques.push(
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '💦', id: 'boton-agua'},
    {nombre: '🌎', id: 'boton-tierra'},
)

mokepones.push(hipodoge, capipepo, ratigueya)

function iniciarJuego(){

  sectionSeleccionarAtaque.style.display = 'none'
  sectionVerMapa.style.display = 'none'

    mokepones.forEach((Mokepon) => {
        opcionDeMokepones = `<input type="radio" name="mascota" id=${Mokepon.nombre} />
        <label class="tarjeta-mokepon" for=${Mokepon.nombre} />
            <p>${Mokepon.nombre}</p>
            <img src=${Mokepon.foto} alt=${Mokepon.nombre} />
        </label>`

        contenedorTarjetas.innerHTML += opcionDeMokepones

        inputHipodoge = document.getElementById('Hipodoge')
        inputCapipepo = document.getElementById('Capipepo')
        inputRatigueya = document.getElementById('Ratigueya')
    })

    sectionReiniciar.style.display = 'none'
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
    
    botonReiniciar.addEventListener('click', reiniciarJuego)

}

function seleccionarMascotaJugador(){

  sectionSeleccionarMascota.style.display = 'none'
  //sectionSeleccionarAtaque.style.display = 'flex'
  sectionVerMapa.style.display = 'flex'
  

    if(inputHipodoge.checked){
        spanMascotaJugador.innerHTML = inputHipodoge.id
        mascotaJugador = inputHipodoge.id
    }else if(inputCapipepo.checked){
        spanMascotaJugador.innerHTML = inputCapipepo.id
        mascotaJugador = inputCapipepo.id
    }else if(inputRatigueya.checked){
        spanMascotaJugador.innerHTML = inputRatigueya.id
        mascotaJugador = inputRatigueya.id
    }else{alert('Selecciona una mascota')}

    extraerAtaques(mascotaJugador)
    seleccionarMascotaEnemigo()
}

function extraerAtaques(extraerAtaques) {

    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques
        }
    }
    
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques){

    ataques.forEach((ataque)=>{
        ataquesMokepon = `
        <button id=${ataque.id} class="boton-ataque Bataque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesMokepon
    })

    botonFuego = document.getElementById('boton-fuego')
    botonAgua = document.getElementById('boton-agua')
    botonTierra = document.getElementById('boton-tierra')

    botones=document.querySelectorAll('.Bataque')

}

function secuenciaDeAtaques () {

    botones.forEach((boton) => {

        boton.addEventListener('click', (e) => {
            if (e.target.textContent === '🔥') {
                ataqueJugador.push('Fuego')
                console.log(ataqueJugador)
              boton.style.background = '#112f58'
              boton.disabled = true;
            } else if (e.target.textContent === '💦') {
                ataqueJugador.push('Agua')
                console.log(ataqueJugador)
              boton.style.background = '#112f58'
              boton.disabled = true;
            } else {
                ataqueJugador.push('Tierra')
                console.log(ataqueJugador)
              boton.style.background = '#112f58'
              boton.disabled = true;
            }
            ataqueAleatorioEnemigo()
        })
    })
    
}

function seleccionarMascotaEnemigo() {

    let mascotaAletoria = aleatorio(0, mokepones.length - 1)
    
    spanMascotaEnemigo.innerHTML = mokepones[mascotaAletoria].nombre
    ataquesMokeponEnemigo = mokepones[mascotaAletoria].ataques
    secuenciaDeAtaques()
}

function ataqueAleatorioEnemigo(){

    let ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length - 1)

    if (ataqueAleatorio ==0 ||ataqueAleatorio == 1 ) {
        ataqueEnemigo.push('Fuego')
    } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4){
        ataqueEnemigo.push('Agua')
    } else {
        ataqueEnemigo.push('Tierra')
    }
    console.log(ataqueEnemigo)
    iniciarPelea()
}

function iniciarPelea() {
    if (ataqueJugador.length === 5) {
        Combate()
    }
}

function indexAmbosOponentes(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function Combate() {

  for (let index = 0; index < ataqueJugador.length; index++) {
    if (ataqueJugador[index] === ataqueEnemigo[index]) {
      indexAmbosOponentes(index, index);
      crearMensaje("EMPATE");
    } else if (
      ataqueJugador[index] === "Fuego" &&
      ataqueEnemigo[index] === "Tierra"
    ) {
      indexAmbosOponentes(index, index);
      crearMensaje("GANASTE");
      victoriasJugador++;
      spanVidasJugador.innerHTML = victoriasJugador;
    } else if (
      ataqueJugador[index] === "Agua" &&
      ataqueEnemigo[index] === "Fuego"
    ) {
      indexAmbosOponentes(index, index);
      crearMensaje("GANASTE");
      victoriasJugador++;
      spanVidasJugador.innerHTML = victoriasJugador;
    } else if (
      ataqueJugador[index] === "Tierra" &&
      ataqueEnemigo[index] === "Agua"
    ) {
      indexAmbosOponentes(index, index);
      crearMensaje("GANASTE");
      victoriasJugador++;
      spanVidasJugador.innerHTML = victoriasJugador;
    } else {
      indexAmbosOponentes(index, index);
      crearMensaje("PERDISTE");
      victoriasEnemigo++;
      spanVidasEnemigo.innerHTML = vidasEnemigo
    }
  }
  revisarVidas();
}

function revisarVidas() {

    if (victoriasJugador === victoriasEnemigo) {
      crearMensajeFinal('Esto fue un empate!')
    } else if (victoriasJugador > victoriasEnemigo) {
      crearMensajeFinal('Ganaste! :)')
    } else {crearMensajeFinal('Perdiste perrito!')

    }
    
}

function crearMensaje(resultado) {

    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)

}

function crearMensajeFinal(resultadoFinal) {
    sectionMensajes.innerHTML = resultadoFinal

    sectionReiniciar.style.display = 'block'
}

function reiniciarJuego() {

    location.reload()
}

function aleatorio(min, max){
        return Math.floor(Math.random() * (max - min + 1) + min)

}
    
function pintarPersonaje() {
  lienzo.clearRect(0,0, mapa.Width, mapa.height )
  lienzo.drawImage(capipepo.mapaFoto, capipepo.x, capipepo.y, capipepo.ancho, capipepo.alto);

}

function moverCapipepo() {
  capipepo.x = capipepo.x + 5
  pintarPersonaje()
}

window.addEventListener('load', iniciarJuego)