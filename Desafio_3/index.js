class Producto{

    constructor(id, tipo, precio){
        this.id = id;
        this.tipo = tipo;
        this.precio = precio;
    }

}

let costoCompras = 0;
let carrito = [];

let productos = [
    new Producto(1,"Remera Nike",1000),
    new Producto(2,"Remera Puma",1500),
    new Producto(3,"Jean Wrangler",3000),
    new Producto(4,"Campera",5600),
    new Producto(5,"Zapatillas",800)
];

opcion = parseInt(prompt("Ingrese una de las siguientes opciones: \n1- Mostrar productos \n2- Sumar un producto al carrito \n3- Calcular total de compra \n4- Ver Carrito \n0- Salir"));

while (opcion !== 0) {
    
    switch (opcion) {
        case 1:
            mostrarProductos();
            break;
        case 2:
            let compra = prompt("Ingrese producto a comprar: \nMontos superiores a 10000 dan un descuento del 10%");
            agregarAlCarrito(compra); 
             break;
         case 3:
            alert("El total de su compra es: $" + calcularCompra(carrito));
            break;
        case 4:
            verCarrito();
            break; 
        case 0:
             alert("Gracias por usar nuestro servicio");
            break; 
        default:
            alert("Ingrese una opción válida");
    }

    opcion = parseInt(prompt("Ingrese una de las siguientes opciones: \n1- Mostrar productos \n2- Sumar un producto al carrito \n3- Calcular total de compra \n4- Ver Carrito \n0- Salir"));
}

alert("Gracias por usar nuestro servicio");


function mostrarProductos(){
    productos.forEach(item => {
        let mensaje = `${item.tipo} Precio: $${item.precio}`
        alert(mensaje);
    })
}

function verCarrito(){
    if(carrito.length !== 0){
        carrito.forEach(item => {
            let mensaje = `${item.tipo} Precio: $${item.precio}`
            alert(mensaje);
        })
    }else{
        alert("No tiene productos en el carrito")
    }
}

function agregarAlCarrito(compra){
    console.log(compra);
    let productoComprado = productos.find(item => item.tipo === compra);
    alert("Se agregará: " + productoComprado.tipo + " al carrito")
    alert("Precio: $"+ productoComprado.precio);
    carrito.push(productoComprado);
    
}

function calcularCompra(carrito){
    
    let total = 0;
    if(carrito.length !== 0){
        carrito.forEach(item => total += item.precio)
        
        if (total > 10000) {
            total = total*0.90
        } 
    }else{
        alert("No tiene productos en el carrito");
        return 0;
    }

    return total;
}