//--------------------------------------Inicio declaración de funciones-----------------------------------------------
const mostrarProductos = async () => {

    const response = await fetch("./productos.json");
    const productos = await response.json();
    let contadorCarrito = document.getElementById("contador_carrito");
    const carritoLocal = JSON.parse(localStorage.getItem("carrito"));
    carritoLocal !== null ? contadorCarrito.innerHTML = `${carritoLocal.length}` : "";

    productos.forEach(item => {

        let contenedor = document.createElement("div");
        contenedor.className = "col-6 p-1"
        let producto = document.getElementById("productos");
        
        contenedor.innerHTML = `<div class="card" style="width: 18rem;">
                                    <div class="card-body">
                                        <img src="${item.img}" class="card-img-top card-img" alt="imagen de producto">
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

const verCarrito = () => {

    let reset = document.getElementById("productos");
    reset.innerHTML= "";

    let carritoLocal = JSON.parse(localStorage.getItem("carrito"));
    

    if(carritoLocal !== null){
        
        
        carritoLocal.forEach(item => {
            let contenedor = document.createElement("div");
            contenedor.className = "col-6 p-1"
            let producto = document.getElementById("productos");
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
    }
    calcularCompra(carritoLocal);
}

const agregarAlCarrito = async (idProducto) =>{
    const response = await fetch("./productos.json");
    const productos = await response.json();
    let contadorCarrito = document.getElementById("contador_carrito");

    let productoComprado = productos.find(item => item.id === parseInt(idProducto));
    let carrito = localStorage.getItem("carrito") === null ? [] : JSON.parse(localStorage.getItem("carrito"));
    let seEncuentraEnCarrito = false;
    //reviso que no se encuentre el producto ya agregado
    carrito.forEach((item)=>{
       if( item.id === productoComprado.id){
        seEncuentraEnCarrito = true;
       } 
    });
    if(!seEncuentraEnCarrito){
        carrito.push(productoComprado);
        contadorCarrito.innerHTML = `${carrito.length}`
        Toastify({
            text: "Producto agregado al carrito",
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top",
            position: "right", 
            stopOnFocus: true,
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
            onClick: function(){} 
          }).showToast();
    }else{
        Toastify({
            text: "El producto ya se encuentra en el carrito",
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top",
            position: "right", 
            stopOnFocus: true, 
            style: {
              background: "linear-gradient(to right, #ff5050, #ff8080)",
            },
            onClick: function(){} 
          }).showToast();
    }
    console.log(carrito);
    localStorage.setItem("carrito",JSON.stringify(carrito)) ;  
}

const eliminarCarrito = () =>{
    let producto = document.getElementById("productos");
    producto.innerHTML = "";
    let contadorCarrito = document.getElementById("contador_carrito");
    localStorage.clear();
    contadorCarrito.innerHTML = `0`;
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Se ha vaciado el carrito',
        showConfirmButton: false,
        timer: 1000
      });
    verCarrito();
}

const eliminarProducto = (idProducto) =>{
    let carrito = localStorage.getItem("carrito") === null ? [] : JSON.parse(localStorage.getItem("carrito"));
    let nuevoCarrito = carrito.filter((item) => item.id !== idProducto);
    let contadorCarrito = document.getElementById("contador_carrito");
    contadorCarrito.innerHTML = `${nuevoCarrito.length}`;
    console.log(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
    verCarrito();
    Toastify({
        text: "Se elimino el producto del carrito",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right", 
        stopOnFocus: true, 
        style: {
          background: "linear-gradient(to right, #ff5050, #ff8080)",
        },
        onClick: function(){} 
      }).showToast();
}

const calcularCompra = (carrito) =>{
    
    let divCarrito = document.getElementById("totalCarrito");
    let total = 0;
    let cantProductos = 0;
    
    
    if(carrito !== null){
        carrito.forEach(item => {
                            total += item.precio;
                            cantProductos++;
                        });
        
        if (total > 10000) {
            total = total*0.90
        } 
        divCarrito.innerHTML = `
                            <div class="card p- ms-5 mt-1" style="width: 18rem;">
                                <div class="card-body">
                                <h5 class="card-title">Total Carrito</h5>
                                <small class="card-subtitle my-2 text-muted">Compras superiores a $10000 tienen un descuento del 10%.</small>
                                <h6 class="card-text">Precio total de compra: $${total}</h6>
                                <h6 class="card-text">Cantidad de productos: ${cantProductos}</h6>
                                <button class="btn btn-primary m-2" id="eliminarCarrito" type="button">Vaciar Carrito</button>
                                </div>
                            </div>`
    }else{
        divCarrito.innerHTML = `
                            <div class="card p- ms-5 mt-1" style="width: 18rem;">
                                <div class="card-body">
                                <h5 class="card-title">Total Carrito</h5>
                                <small class="card-subtitle my-2 text-muted">Compras superiores a $10000 tienen un descuento del 10%.</small>
                                <h6 class="card-text">Precio total de compra: $0</h6>
                                <h6 class="card-text">Cantidad de productos: ${cantProductos}</h6>
                                </div>
                            </div>`
    }
    const botonEliminarCarrito = document.getElementById("eliminarCarrito");
    botonEliminarCarrito.onclick = () => eliminarCarrito();  
}

/* ---------------------------------------------------------- fin declaración de funciones------------------------------------------------------------------------ */
let costoCompras = 0;
const botonCarrito = document.getElementById("botonCarrito");

mostrarProductos();
botonCarrito.onclick = () => verCarrito();


