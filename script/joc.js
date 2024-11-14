const body = document.body;
const puntuacioActual = document.getElementById("puntuacioActual");
const puntuacioFinal = document.getElementById("puntuacioFinal");
const btnInstrucciones = document.getElementById("verInstruccions");
const cartasContainer = document.getElementById('cartas');


const nomjugadorObj = document.getElementById("nomJugador");
const btnPartida = document.getElementById("infoPartida");
const btnCerrar = document.getElementById("borrarPartida");
const infoNavegadorObj = document.getElementById("puntuacioActual");


let finestra;

btnInstrucciones.addEventListener("click", verInstruccions);

function verInstruccions(){
    finestra = window.open("instrucciones.html", 'Instrucciones', 'width=400,height=400');
}

function generarCartas(){
    for (let i = 0; i < 20; i++) {
        const carta = document.createElement('button');
        carta.classList.add('carta');
        cartasContainer.appendChild(carta);
    }
}
generarCartas()


function esPartidaFinalitzada(punts, nomJugador) {
    const maxPunts = Number(localStorage.getItem("punts")) || 0;
    if (punts > maxPunts) {
        localStorage.setItem("punts", punts);
        localStorage.setItem("jugador", nomJugador);
    }
    carregarInformacio();
}

function carregarInformacio() {
    const maxPunts = localStorage.getItem("punts") || 0;
    const jugadorMaxPunts = localStorage.getItem("jugador") || "Cap jugador";
    btnPartida.textContent = `Jugador: ${jugadorMaxPunts} - PUNTS: ${maxPunts} punts`;
}
carregarInformacio();

function colorNavegador() {
    if (!sessionStorage.getItem("colorFons")) { 
        if (navigator.userAgent.includes("Firefox")) {
            body.style.backgroundColor = "orange";
            sessionStorage.setItem("colorFons", "orange");
        } else if (navigator.userAgent.includes("Chrome")) {
            body.style.backgroundColor = "green";
            sessionStorage.setItem("colorFons", "green");
        }
    } else {
        body.style.backgroundColor = sessionStorage.getItem("colorFons");
    }
}
colorNavegador();