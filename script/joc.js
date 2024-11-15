const body = document.body;
const puntuacioActual = document.getElementById("puntuacioActual");
const btnInstrucciones = document.getElementById("verInstruccions");
const cartasContainer = document.getElementById("cartas");
const infoPartida = document.getElementById("infoPartida");
const canal = new BroadcastChannel("joc_canal");

let puntsActuals = 0;
let nomJugador = document.cookie.split("; ").find(row => row.startsWith("nomJugador="))?.split("=")[1] || "Desconocido";
const parelles = ["A", "A", "B", "B", "C", "C", "D", "D", "E", "E", "F", "F", "G", "G", "H", "H", "I", "I", "J", "J"];
let cartesActives = [];
let endevinades = [];
let millorPuntuacio = JSON.parse(localStorage.getItem("millorPuntuacio"));

document.getElementById("nomJugador").textContent = nomJugador;

// Botón de instrucciones
btnInstrucciones.addEventListener("click", verInstruccions);

function verInstruccions() {
    window.open("instrucciones.html", 'Instrucciones', 'width=400,height=400');
}

// Mostrar la mejor puntuación en el inicio
function mostrarMillorPuntuacio() {
    infoPartida.textContent = `JUGADOR: ${millorPuntuacio.nom} - PUNTS: ${millorPuntuacio.punts}`;
}

// Actualizar la puntuación en pantalla
function actualitzarPuntuacio() {
    puntuacioActual.textContent = `Punts: ${puntsActuals}`;
    canal.postMessage({ punts: puntsActuals, jugador: nomJugador });

    // Si el jugador supera la mejor puntuación, actualizarla
    if (puntsActuals > millorPuntuacio.punts) {
        millorPuntuacio = { nom: nomJugador, punts: puntsActuals };
        localStorage.setItem("millorPuntuacio", JSON.stringify(millorPuntuacio));
    }

    // Mostrar la mejor puntuación actualizada
    mostrarMillorPuntuacio();
}

// Función para sumar puntos cuando se acierta una pareja
function sumarPunts() {
    puntsActuals += 10;
    actualitzarPuntuacio();
}

// Función para restar puntos cuando no se acierta una pareja
function restarPunts() {
    puntsActuals = Math.max(0, puntsActuals - 3); // Evitar puntuación negativa
    actualitzarPuntuacio();
}

// Generar cartas de manera dinámica
function generarCartas() {
    parelles.sort(() => 0.5 - Math.random());
    parelles.forEach(valor => {
        const carta = document.createElement("button");
        carta.classList.add("carta");
        carta.dataset.valor = valor;
        carta.addEventListener("click", mostrarCarta);
        cartasContainer.appendChild(carta);
    });
}

// Mostrar la carta seleccionada y verificar si es pareja
function mostrarCarta(event) {
    const carta = event.target;

    if (cartesActives.length < 2 && !cartesActives.includes(carta) && !endevinades.includes(carta)) {
        carta.textContent = carta.dataset.valor;
        cartesActives.push(carta);

        if (cartesActives.length === 2) {
            verificarParella();
        }
    }
}

// Verificar si las dos cartas seleccionadas forman una pareja
function verificarParella() {
    const [carta1, carta2] = cartesActives;

    if (carta1.dataset.valor === carta2.dataset.valor) {
        sumarPunts();
        endevinades.push(carta1, carta2);
        cartesActives = [];

        if (endevinades.length === parelles.length) {
            esPartidaFinalitzada();
        }
    } else {
        setTimeout(() => {
            carta1.textContent = "";
            carta2.textContent = "";
            carta1.disabled = false;
            carta2.disabled = false;
            restarPunts();
            cartesActives = [];
        }, 1000);
    }
}

// Redirigir a la pantalla de finalización de partida
function esPartidaFinalitzada() {
    window.location.href = "partidafinalitzada.html";
}


// Color de fondo según el navegador
function colorNavegador() {
    let color;
    if (navigator.userAgent.includes("Firefox")) {
        color = "orange";
    } else if (navigator.userAgent.includes("Chrome")) {
        color = "green";
    }
    sessionStorage.setItem("colorFons", color);
    body.style.backgroundColor = color;
}

colorNavegador();
generarCartas();
mostrarMillorPuntuacio();