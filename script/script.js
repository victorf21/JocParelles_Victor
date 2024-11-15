const nomjugadorObj = document.getElementById("nomJugador");
const btnPartida = document.getElementById("comencarPartida");
const btnCerrar = document.getElementById("borrarPartida");
const infoNavegadorObj = document.getElementById("infoNavegador");
const infoUrlObj = document.getElementById("infoUrl");
const infoPartidaObj = document.getElementById("InfoPartidaActual");

const canal = new BroadcastChannel("joc_canal");
let finestra;
let puntsActuals = 0;
let estatPartida = "No hi ha cap partida en joc";

// Mostrar información del navegador y URL
infoNavegadorObj.textContent = navigator.userAgent;
infoUrlObj.textContent = window.location.href;

// Listeners para los botones
btnPartida.addEventListener("click", comencarPartida);
btnCerrar.addEventListener("click", borrarPartida);

function comencarPartida() {
    if (nomjugadorObj.value) {
        document.cookie = `nomJugador=${nomjugadorObj.value};path=/`;

        if (sessionStorage.getItem("partidaIniciada")) {
            alert("Hi ha una partida començada");
            return;
        }

        sessionStorage.setItem("partidaIniciada", true);
        finestra = window.open("joc.html");

        estatPartida = "En joc";
        actualitzarInfoPartida();
    } else {
        alert("Has d'informar el nom d'un jugador");
    }
}

function borrarPartida() {
    sessionStorage.removeItem("partidaIniciada");
    estatPartida = "No hi ha cap partida en joc";
    puntsActuals = 0;
    actualitzarInfoPartida();

    if (finestra) {
        finestra.close();
    }
    canal.postMessage({ accio: "tancarPartida" });
}

function actualitzarInfoPartida() {
    const nomJugador = document.cookie.split("; ").find(row => row.startsWith("nomJugador=")).split("=")[1];
    infoPartidaObj.textContent = `NOM: ${nomJugador}, PUNTS: ${puntsActuals}, ESTAT PARTIDA: ${estatPartida}`;
}

// Recibir la puntuación actualizada desde el juego
canal.onmessage = (event) => {
    if (event.data.punts !== undefined) {
        puntsActuals = event.data.punts;
        actualitzarInfoPartida();
    }
};

actualitzarInfoPartida();
