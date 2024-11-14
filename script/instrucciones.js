const btnCerrarInst = document.getElementById("cerrarInstrucciones");
btnCerrarInst.addEventListener("click", cerrarInstrucciones);

let finestra;

function cerrarInstrucciones(){  
    finestra = window.close("instrucciones.html")
}