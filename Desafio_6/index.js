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
    new Producto(5,"Zapatillas",800),
    new Producto(6,"Crocs",5000)
];

mostrarProductos();
productos.forEach((item)=>{

    let boton = document.getElementById(item.id);
    boton.onclick = () => agregarAlCarrito(item.id);
}) 

let botonCarrito = document.getElementById("verProductos");
botonCarrito.onclick = () => verCarrito();
   /*  boton.onclick = () => alert(boton.id) */




function mostrarProductos(){
    productos.forEach(item => {

        let contenedor = document.createElement("div");
        contenedor.className = "col-6"
        let producto = document.getElementById("productos");
        
        contenedor.innerHTML = `<div class="card" style="width: 18rem;">
                                    <div class="card-body">
                                        <h5 class="card-title">${item.tipo}</h5>
                                        <h6 class="card-subtitle mb-2 text-muted">${item.tipo}</h6>
                                        <p class="card-text">Precio: ${item.precio}</p>
                                        <button class="btn btn-primary" id="${item.id}" type="button">Agregar</button>
                                    </div>
                                </div>`;
        
        producto.appendChild(contenedor);
    })
}

function verCarrito(){

    let reset = document.getElementById("carrito");
    reset.innerHTML= "";

    if(carrito.length !== 0){
        
        
        carrito.forEach(item => {
            let contenedor = document.createElement("div");
            contenedor.className = "col-6"
            let producto = document.getElementById("carrito");
            contenedor.innerHTML = `<div class="card " style="width: 18rem;">
                                        <div class="card-body">
                                            <h5 class="card-title">${item.tipo}</h5>
                                            <h6 class="card-subtitle mb-2 text-muted">${item.tipo}</h6>
                                            <p class="card-text">Precio: ${item.precio}</p>
                                        </div>
                                    </div>`;
            
            producto.appendChild(contenedor);
        })
    console.log(carrito);
    }else{
        alert("No tiene productos en el carrito")
    }
}

function agregarAlCarrito(idProducto){
    let productoComprado = productos.find(item => item.id === parseInt(idProducto));
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