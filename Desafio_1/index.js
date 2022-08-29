let numero = parseInt(prompt("Ingrese numero a evaluar o 0 para salir:: "));

while (numero != 0) {
    
    if (numero % 2 == 0) {
        alert("Su numero es par");
    } else {
        alert("Su numero es impar");
    }
    numero = parseInt(prompt("Ingrese numero a evaluar o 0 para salir: "));
}