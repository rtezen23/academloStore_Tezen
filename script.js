/* menu */
const menu = document.getElementById('btn-menu');
const nav = document.getElementById('navegacion');
const cerrar = document.getElementById('btn-close') 

menu.addEventListener('click', ()=>{
    nav.style.transform = "translateX(0)";
    nav.style.transition =  "all 800ms ease";
})

cerrar.addEventListener('click', ()=>{
    nav.style.transform = "translateX(100%)";
    /* nav.style.transition =  "all 800ms ease"; */
})

/* carrito */

const abrirCarrito = document.getElementById('cart');
const carrito = document.getElementById('carrito');
const cerrar_carrito = document.getElementById('btn-close-cart');

abrirCarrito.addEventListener('click', ()=>{
    carrito.style.transform = "translateX(0)";
    carrito.style.transition =  "all 800ms ease";
})

cerrar_carrito.addEventListener('click', ()=>{
    carrito.style.transform = "translateX(100%)";
    /* nav.style.transition =  "all 800ms ease"; */
})

/* FILTRO */
const productos = document.getElementById('section-productos');
const liAll = document.getElementById('all')
const liHoodies = document.getElementById('hoodies');
const liShirts = document.getElementById('shirts');
const liSweatshirts = document.getElementById('sweatshirts');
/* CADA PRODUCTO */
const productosContainers = productos.children;

/* NODELIST FOR IN PARA RECORRER*/
    /* const productosContainers = document.querySelectorAll(".productos-container");
    console.log(productosContainers); */
    /* HTML COLLECTION FOR OF*/
    
    function mostrarEliminados(){
        const noElegidos = document.querySelectorAll('.noSelected');
        /* if (selected) selected.classList.remove('noSelected'); */
        noElegidos.forEach(element => {
            if (element) element.classList.remove('noSelected');
        });
        
    }

const filtrarOpcion = event => {
    /* target hacía referencia a su hijo h3, así que puse current */
    const eleccion = event.currentTarget.dataset.product;
    mostrarEliminados();
    
    for (const x of productosContainers) {
        if(x.dataset.product !== eleccion && eleccion !=='all'){
            x.classList.add('noSelected');
        }
    }
};

    liAll.addEventListener('click', filtrarOpcion);
    liHoodies.addEventListener('click', filtrarOpcion);
    liShirts.addEventListener('click', filtrarOpcion);
    liSweatshirts.addEventListener('click', filtrarOpcion);


/* ADICIONAR ELEMENTOS */

    const products = [{
        nombre: "hoodie",
        precio: 14,
        stock: 10,
        cantidad: 0,
        subtotal: 0
        /* imagen: 'img/featured2.png' */
    },
    {
        nombre: "shirt",
        precio: 24,
        stock: 15,
        cantidad: 0,
        subtotal: 0
        /* imagen: 'img/featured2.png' */
    },
    {
        nombre: "sweatshirt",
        precio: 23,
        stock: 20,
        cantidad: 0,
        subtotal: 0
        /* imagen: 'img/featured2.png' */
    }]

btnHoodie = document.getElementById('btn-hoodie');
btnShirt = document.getElementById('btn-shirt');
btnSweatshirt = document.getElementById('btn-sweatshirt');

emptyCarrito = document.getElementById('empty-carrito');
carritoProducts = document.getElementById('carrito-products');

let estadoCart = false;

/* QUITAR EL DIV DE CARRITO VACIO Y PONER EL DIV DE PRODUCTOS */
const mostrarCarritoProducts = ()=>{
    if (estadoCart == false) {
        emptyCarrito.classList.toggle('oculto');
        carritoProducts.classList.toggle('oculto');
        estadoCart = true;
    } 
};

/* ACCEDEMOS A TODOS LOS CONTAINER DE LOS PRODUCTOS */

/* element es el contenedor donde haremos la suma */

const sumarUnidades = (element,product) => {
    /* obtenemos el container donde está el texto a cambiar (texto-product)*/
    const infoProducto = element.lastElementChild;

    /* obtenemos la p donde se hará el cambio */
    const unitsProducto = infoProducto.lastElementChild;
    const subTotalProducto = infoProducto.children[2];
    
    //cantidad = 2
    //cantTotal = 2
  
    for (const x in products) {
        if(products[x].nombre === product){
            products[x].cantidad++;
            cantidadActual = products[x].cantidad;
            products[x].subtotal+=products[x].precio;
            subTotalActual = products[x].subtotal;
            unitsProducto.textContent = `${products[x].cantidad} units`;
            subTotalProducto.textContent = `Subtotal: $${products[x].subtotal}.00`
        };
    };
    /* SUMAMOS LAS CANTIDADES Y SUBTOTALES PARA PONER LOS TOTALES ABAJO */
    const unidadesTotales = products.map(item => item.cantidad).reduce((prev, curr) => prev + curr, 0)
    const precioTotal = products.map(item => item.subtotal).reduce((prev, curr) => prev + curr, 0)

    itemsPrecio.firstElementChild.textContent = `${unidadesTotales} items`;
    itemsPrecio.lastElementChild.textContent = `$${precioTotal}.00`;
}

/* MOSTRAR EN EL CARRITO LOS PRODUCTOS */
const carritoContainers = document.querySelectorAll('.carrito-container');
const contCarrito = document.getElementById('cont-carrito');
let contadorCarrito = 0;

const añadirElemento = event => {
    /*QUITAR SECCION DE VACIO Y MOSTRAR SECCION DE PRODUCTOS */
    mostrarCarritoProducts();
    contadorCarrito++;
    contCarrito.textContent = contadorCarrito;
    /* MOSTRAR PRODUCTO ELEGIDO */
    const productoActual = event.target.dataset.cartproduct;
    for (const x of carritoContainers) {
        if(x.dataset.cartproduct == productoActual){
            x.classList.remove('noSelected');
            sumarUnidades(x, productoActual);
        }
    }
    
}

btnHoodie.addEventListener('click', añadirElemento);
btnShirt.addEventListener('click', añadirElemento);
btnSweatshirt.addEventListener('click', añadirElemento);

/* CAMBIAR LOS ITEMS Y EL TOTAL */

itemsPrecio = document.getElementById('items-precios');
