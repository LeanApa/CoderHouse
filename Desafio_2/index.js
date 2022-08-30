let opcion = parseInt(prompt("Ingrese una de las siguientes opciones: \n1- Mostrar impuestos por dolar \n2- Calcular total de compra \n0- Salir"));
let impuestos = 1.75;
let precioOficial = 145;

while (opcion !== 0) {
    
    switch (opcion) {
        case 1:
            mostrarImpuestos();
            break;
    
        case 2:
            let compra = parseFloat(prompt("Ingrese monto a comprar: "));
            alert("El total de su compra es: $" + calcularCompra(compra));
            break;
        case 0:
            alert("Gracias por usar nuestro servicio");
        default:
            alert("Ingrese una opción válida");
    }
    opcion = parseInt(prompt("Ingrese una de las siguientes opciones: \n1- Mostrar impuestos por dolar \n2- Calcular total de compra \n0- Salir"));
}

alert("Gracias por usar nuestro servicio");


function mostrarImpuestos(){
    alert("Los impuestos son: \n1- 45% de impuesto PAIS \n2- 30% Impuesto RG AFIP 4815");
}

function calcularCompra(compra){
    let total = precioOficial * compra * impuestos;
    return total;
}