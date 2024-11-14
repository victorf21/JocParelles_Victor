const nomjugadorObj = document.getElementById("nomJugador");
const btnPartida = document.getElementById("comencarPartida");
const btnCerrar = document.getElementById("borrarPartida");
const infoNavegadorObj = document.getElementById("infoNavegador");
const infoUrlObj = document.getElementById("infoUrl");
const infoPartidaObj = document.getElementById("InfoPartidaActual");

let finestra;
let estatPartida = "No hi ha cap partida en joc";

// Mostrar automáticamente la información del navegador y la URL
infoNavegadorObj.textContent = navigator.userAgent;
infoUrlObj.textContent = window.location.href;

btnPartida.addEventListener("click", comencarPartida);
btnCerrar.addEventListener("click", borrarPartida);

function comencarPartida() {
    if (nomjugadorObj.value) {
        // Guardar el nombre del jugador en una cookie
        document.cookie = `nomJugador=${nomjugadorObj.value};path=/`;

        // Verificar si ya hay una partida abierta usando sessionStorage
        if (sessionStorage.getItem("partidaIniciada")) {
            alert("Hi ha un partida començada");
            return;
        }

        // Guardar la partida iniciada en sessionStorage
        sessionStorage.setItem("partidaIniciada", true);

        // Abrir la ventana del juego
        finestra = window.open("joc.html");

        // Actualizar la puntuación de la partida
        estatPartida = `NOM: ${nomjugadorObj.value}`;
        infoPartidaObj.textContent = estatPartida;

    } else {
        alert("Has d'informar el nom d'un jugador");
    }
}

function borrarPartida() {
    // Eliminar la información de la partida de sessionStorage
    sessionStorage.removeItem("partidaIniciada");

    // Restablecer el estado de la partida
    estatPartida = "No hi ha cap partida en joc";
    infoPartidaObj.textContent = estatPartida;

    // Si hay una ventana abierta, cerrarla
    if (finestra) {
        finestra.close();
    }
}
