class Seguro{
    constructor(id,tipo,precio){
        this.id = id;
        this.tipo = tipo;
        this.precio = precio
    }

}


let segurosContratados = [];


let opcion = parseInt(prompt("Ingrese la opcion del producto que desea asegurar: \n1- Celular \n2- Bolso \n3- Salir del programa \n4- Ver seguros contratados"));
const iva = 1.21;

while(opcion !== 3){
    switch (opcion) {
        case 1:
            let celular = parseInt(prompt("Ingrese la suma que desee asegurar: entre $50.000 y $200.000"));
            if (celular >= 50000 && celular <= 200000) {
                if(segurosContratados.length === 0){
                    segurosContratados.push(new Seguro(0,"celular",calcularPrecioAPagar(celular)))
                }else{
                    segurosContratados.push(new Seguro(segurosContratados.length + 1,"celular",calcularPrecioAPagar(celular)))
                }
                alert("El valor que debe abonar es: $ " + calcularPrecioAPagar(celular));
            }else {
                alert("Ingrese una suma correcta");
            }
            break;
        case 2:
            let bolso = parseInt(prompt("Ingrese la suma que desee asegurar: entre $10.000 y $80.000 "));
            if (bolso >= 10000 && bolso <= 80000) {
                if(segurosContratados.length === 0){
                    segurosContratados.push(new Seguro(0,"bolso",calcularPrecioAPagar(bolso)))
                }else{
                    segurosContratados.push(new Seguro(segurosContratados.length + 1,"bolso",calcularPrecioAPagar(bolso)))
                }
                alert("El valor que debe abonar es: $ " + calcularPrecioAPagar(bolso));
            }else {
                alert("Ingrese una suma correcta");
            }
            break;
        case 3:
                alert("Gracias por utilizar nuestro cotizador");
            break;
        
        case 4:
            verSegurosContratados(segurosContratados);

        default:
            alert("Ingrese una opcion valida");
            break;
    }

    opcion = parseInt(prompt("Ingrese la opcion del producto que desea asegurar: \n1- Celular \n2- Bolso \n3- Salir del programa \n4- Ver seguros contratados"));
}

function verSegurosContratados(segurosContratados){
    segurosContratados.forEach(item => {
        let mensaje = `Tipo de seguro ${item.tipo} - Precio: $${item.precio}`
        alert(mensaje);
    });
}

function calcularPrecioAPagar(celular) {
    let premio = (celular*0.05) * iva;
        return premio;
}

function calcularPrecioAPagar(bolso) {
    let premio = (bolso*0.05) * iva;
        return premio;
}