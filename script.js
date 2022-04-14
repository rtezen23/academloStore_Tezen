/* menu */
const menu = document.getElementById('btn-menu');
const nav = document.getElementById('navegacion');
const cerrar = document.getElementById('btn-close') 

const aHome = document.getElementById('a-home');
const aProducts = document.getElementById('a-products');

menu.addEventListener('click', ()=>{
    nav.style.transform = "translateX(0)";
    nav.style.transition =  "all 800ms ease"; 
});

const quitar = ()=>{
    nav.style.transform = "translateX(100%)";
    
};

cerrar.addEventListener('click', quitar);
aHome.addEventListener('click', quitar);
aProducts.addEventListener('click', quitar);

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
        emptyCarrito.classList.add('oculto');
        carritoProducts.classList.remove('oculto');
    } else {
        emptyCarrito.classList.remove('oculto');
        carritoProducts.classList.add('oculto');
    }
};

/* ACCEDEMOS A TODOS LOS CONTAINER DE LOS PRODUCTOS */

/* element es el contenedor donde haremos la suma */


/* ACCEDEMOS A LAS UNIDADES Y EL SUBTOTAL */
let unidadesTotales;
let precioTotal;

const sumarUnidades = (element,product) => {
    /* obtenemos el container donde está el texto a cambiar (texto-product)*/
    
    const infoProducto = element.lastElementChild;

    /* VAMOS AL DIV DONDE ESTA LA p de units */
     const unidades = infoProducto.lastElementChild;
     /* obtenemos la p donde se hará el cambio */
     const unitsProducto = unidades.children[1];
    const subTotalProducto = infoProducto.children[2];

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
    unidadesTotales = products.map(item => item.cantidad).reduce((prev, curr) => prev + curr, 0)
    precioTotal = products.map(item => item.subtotal).reduce((prev, curr) => prev + curr, 0)

    itemsPrecio.firstElementChild.textContent = `${unidadesTotales} items`;
    itemsPrecio.lastElementChild.textContent = `$${precioTotal}.00`;
}

/* MOSTRAR EN EL CARRITO LOS PRODUCTOS */
const carritoContainers = document.querySelectorAll('.carrito-container');
const contCarrito = document.getElementById('cont-carrito');
let contadorCarrito = 0;

const checkout = document.getElementById('checkout');
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

const itemsPrecio = document.getElementById('items-precios');



/* BOTONES MÁS, MENOS Y ELIMINAR */

const btnMenos = document.querySelectorAll('.btn-menos');

const btnMas = document.querySelectorAll('.btn-mas');
const btnBorrar = document.querySelectorAll('.btn-borrar');

const operar = event =>{
    
    /* obtenemos data para ver si es sumar o restar y qué producto es */
    const productoActual = event.target.dataset.producto;
    /* acceder al html donde esta units que es el hermano siguiente */
    let units;
    /* acceder al subtotal que es el hermano anterior al padre*/
    const subTotal = event.target.parentNode.previousElementSibling;

    const padreContainer = event.target.parentNode.parentNode.parentNode;

/* quitamos el restar- y sumar- por conflicto con nombre (shirt)*/
        let productoFinal = productoActual.slice(productoActual.indexOf('-')+1);

        for (const x in products) {
         if (productoFinal == products[x].nombre) {
             if (productoActual.includes('restar')) {
                 units = event.target.nextElementSibling;
                products[x].cantidad--;
                products[x].subtotal-=products[x].precio;
                contadorCarrito--;
                contCarrito.textContent = contadorCarrito;
                units.textContent = `${products[x].cantidad} units`;
            subTotal.textContent = `Subtotal: $${products[x].subtotal}.00`
             } else if(productoActual.includes('sumar')){
                 units = event.target.previousElementSibling;
                products[x].cantidad++;
                products[x].subtotal+=products[x].precio;
                contadorCarrito++;
                contCarrito.textContent = contadorCarrito;
                units.textContent = `${products[x].cantidad} units`;
                subTotal.textContent = `Subtotal: $${products[x].subtotal}.00`
             } else{
                padreContainer.classList.add('noSelected');
                contadorCarrito-=products[x].cantidad;
                contCarrito.textContent = contadorCarrito;
                products[x].cantidad=0;
                products[x].subtotal=0;
                
             }

            unidadesTotales = products.map(item => item.cantidad).reduce((prev, curr) => prev + curr, 0)
            precioTotal = products.map(item => item.subtotal).reduce((prev, curr) => prev + curr, 0)

            itemsPrecio.firstElementChild.textContent = `${unidadesTotales} items`;
            itemsPrecio.lastElementChild.textContent = `$${precioTotal}.00`;

            if(unidadesTotales==0){
                estadoCart = false;
                console.log(estadoCart);
                mostrarCarritoProducts();
            } else estadoCart = true;
        }      
        }  
    
};

const resetearProducto = event =>{

    /* OBTENEMOS LA UBICACION DEL OBJETO */

    /* LE HACEMOS DISPLAY NONE AL ELEMENTO */

    /* DEVOLVEMOS SUS VALORES A 0 */

    unidadesTotales = products.map(item => item.cantidad).reduce((prev, curr) => prev + curr, 0)
    precioTotal = products.map(item => item.subtotal).reduce((prev, curr) => prev + curr, 0)
    itemsPrecio.firstElementChild.textContent = `${unidadesTotales} items`;
    itemsPrecio.lastElementChild.textContent = `$${precioTotal}.00`;
}

btnMenos.forEach(x=>x.addEventListener('click', operar));
btnMas.forEach(x=>x.addEventListener('click', operar));
btnBorrar.forEach(x=>x.addEventListener('click', operar));



/* btnMenos.addEventListener('click', operar);
btnMas.addEventListener('click', operar); */




