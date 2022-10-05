class Producto{

    constructor(id, tipo, precio){
        this.id = id;
        this.tipo = tipo;
        this.precio = precio;
    }

}
let costoCompras = 0;
let productos = [
    new Producto(1,"Remera Nike",1000),
    new Producto(2,"Remera Puma",1500),
    new Producto(3,"Jean Wrangler",3000),
    new Producto(4,"Campera",5600),
    new Producto(5,"Zapatillas",800),
    new Producto(6,"Crocs",5000)
];
let botonEliminarCarrito = document.getElementById("eliminarCarrito");

mostrarProductos();
verCarrito();
botonEliminarCarrito.onclick = () => eliminarCarrito();







//--------------------------------------area de funciones-----------------------------------------------
function mostrarProductos(){
    productos.forEach(item => {

        let contenedor = document.createElement("div");
        contenedor.className = "col-6 p-1"
        let producto = document.getElementById("productos");
        
        contenedor.innerHTML = `<div class="card" style="width: 18rem;">
                                    <div class="card-body">
                                        <h5 class="card-title">${item.tipo}</h5>
                                        <h6 class="card-subtitle mb-2 text-muted">${item.tipo}</h6>
                                        <p class="card-text">Precio: ${item.precio}</p>
                                        <button class="btn btn-primary" id="agregar${item.id}" type="button">Agregar</button>
                                    </div>
                                </div>`;
        
        producto.appendChild(contenedor);
        let boton = document.getElementById(`agregar${item.id}`);
        boton.onclick = () => agregarAlCarrito(item.id);
    })
}

function verCarrito(){

    let reset = document.getElementById("carrito");
    let carritoLocal = JSON.parse(localStorage.getItem("carrito"));
    reset.innerHTML= "";

    if(carritoLocal.length !== 0){
        
        
        carritoLocal.forEach(item => {
            let contenedor = document.createElement("div");
            contenedor.className = "col-6 p-1"
            let producto = document.getElementById("carrito");
            contenedor.innerHTML = `<div class="card " style="width: 18rem;">
                                        <div class="card-body">
                                            <h5 class="card-title">${item.tipo}</h5>
                                            <h6 class="card-subtitle mb-2 text-muted">${item.tipo}</h6>
                                            <p class="card-text">Precio: ${item.precio}</p>
                                            <button class="btn btn-danger" id="eliminar${item.id}" type="button">Eliminar</button>
                                        </div>
                                    </div>`;
            
            producto.append(contenedor);
            let boton = document.getElementById(`eliminar${item.id}`);
            boton.onclick = () => eliminarProducto(item.id);
        })
    console.log(carrito);
    }
}

function agregarAlCarrito(idProducto){
    let productoComprado = productos.find(item => item.id === parseInt(idProducto));
    let carrito = localStorage.getItem("carrito") === null ? [] : JSON.parse(localStorage.getItem("carrito"));

    carrito.push(productoComprado);
    localStorage.setItem("carrito",JSON.stringify(carrito)) ;
    verCarrito();   
}

function eliminarCarrito(){
    let producto = document.getElementById("carrito");
    producto.innerHTML = "";
    localStorage.clear();
}

function eliminarProducto(idProducto){
    let carrito = localStorage.getItem("carrito") === null ? [] : JSON.parse(localStorage.getItem("carrito"));
    let nuevoCarrito = carrito.filter((item) => item.id !== idProducto);
    console.log(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
    verCarrito();
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