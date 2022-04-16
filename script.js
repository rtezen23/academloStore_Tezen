/* menu */
const menu = document.getElementById('btn-menu');
const nav = document.getElementById('navegacion');
const cerrar = document.getElementById('btn-close') 

const aHome = document.getElementById('a-home');
const aProducts = document.getElementById('a-products');

const cartIcono = document.getElementById('cart-icono');

menu.addEventListener('click', ()=>{
    nav.style.transform = "translateX(0)";
    nav.style.transition =  "transform 800ms ease"; 
    cartIcono.style.zIndex = "100";
});

const quitar = ()=>{ nav.style.transform = "translateX(100%)";};

cerrar.addEventListener('click', quitar);
aHome.addEventListener('click', quitar);
aProducts.addEventListener('click', quitar);

/* darktheme */
const body = document.getElementById('body');
const themeIcon = document.getElementById('theme-icon');
const logo = document.getElementById('logo');

themeIcon.addEventListener('click', ()=>{
    body.classList.toggle('darktheme')
    logo.src = "img/favicon.ico";
});


/* carrito */

const abrirCarrito = document.getElementById('cart-icono');
const carrito = document.getElementById('carrito');
const cerrar_carrito = document.getElementById('btn-close-cart');

abrirCarrito.addEventListener('click', ()=>{
    carrito.style.transform = "translateX(0)";
    carrito.style.transition =  "all 800ms ease";
})

cerrar_carrito.addEventListener('click', ()=>{carrito.style.transform = "translateX(100%)";})

/* FILTRAR PRODUCTOS*/
const productos = document.getElementById('section-productos'); /* CONTENEDOR DE LOS PRODUCTOS A FILTRAR */
/* CADA BOTON DE FILTRADO */
const liAll = document.getElementById('all') 
const liHoodies = document.getElementById('hoodies');
const liShirts = document.getElementById('shirts');
const liSweatshirts = document.getElementById('sweatshirts');
/* CADA CONTENEDOR DE CADA PRODUCTO */
const productosContainers = productos.children;

/* FILTRADO DE PRODUCTOS: A cada li donde están las opciones de filtrado les ponemos un data con el nombre
de c/pruducto y a los container de cada producto también les ponemos un data con el nombre que corresponda */

    /* Obtenemos cada contenedor de cada producto que tenga la class .noSelected y si la tiene se la quitamos,
    esto es para resetear los elementos cada vez que se hace un filtrado (esta clase tiene display:none)*/
    function mostrarEliminados(){
        const noElegidos = document.querySelectorAll('.noSelected2');
        noElegidos.forEach(element => {if (element) element.classList.remove('noSelected2');});
    };
    /* FUNCION PARA FILTRAR CADA CONTENEDOR DE PRODUCTO */
    const filtrarOpcion = event => {
        const eleccion = event.currentTarget.dataset.product; /* obtenemos los data del event(producto container actual)*/
        mostrarEliminados(); /* mostramos todos los elementos para comenzar a filtrar */
        for (const x of productosContainers) { /* Recorremos cada product container */
            /* si no coincide el nombre del data del contenedor con la data del <li> donde filtramos, entonces
            no lo mostramos agregando la clase noSelected2, así que solo nos mostraría los elementos que buscamos*/
            if(x.dataset.product !== eleccion && eleccion !=='all') x.classList.add('noSelected2');
        }
    };
    /* CADA BOTON LI QUE HARÁ EL FILTRADO */
    liAll.addEventListener('click', filtrarOpcion); /* li data all */
    liHoodies.addEventListener('click', filtrarOpcion); /* li data hoodie */
    liShirts.addEventListener('click', filtrarOpcion); /* li data shirt */
    liSweatshirts.addEventListener('click', filtrarOpcion); /* li data sweatshirt */

/* OBJETOS CON LA INFO DE CADA PRODUCTO QUE IRÁN CAMBIANDO MIENTRAS AVANCE EL PROGRAMA */
    const products = [{
        nombre: "hoodie",
        precio: 14,
        stock: 10,
        cantidad: 0,
        subtotal: 0
        /* imagen: 'img/featured1.png' */
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
        /* imagen: 'img/featured3.png' */
    }]


/* el div que mostramos cuando no hay ningún producto y el div que mostramos cuando añadimos productos al cart */
emptyCarrito = document.getElementById('empty-carrito');
carritoProducts = document.getElementById('carrito-products');
/* inicializamos en falso el estado del div donde se muestran los productos porque este solo se muestra
cuando añadimos algún producto*/
let estadoCart = false;

/* QUITAR EL DIV DE CARRITO VACIO Y PONER EL DIV DE PRODUCTOS Y VICESERVA, dependiendo del estado actual del cart*/
const mostrarCarritoProducts = ()=>{
    if (estadoCart == false) {
        emptyCarrito.classList.add('oculto');
        carritoProducts.classList.remove('oculto');
        estadoCart = true;
    } else {
        emptyCarrito.classList.remove('oculto');
        carritoProducts.classList.add('oculto');
        estadoCart = false;
    }
};

/* Declaramos variables para el total de unidades de los productos (suma de cantidad) seleccionados y su precio total
(suma de subtotales), esto lo obtendremos al manipular los objetos de cada producto*/
let unidadesTotales;
let precioTotal;
/* CONTENEDOR DONDE ESTÁN LAS UNIDADES TOTALES Y EL PRECIO TOTAL */
const itemsPrecio = document.getElementById('items-precios');

/* SUMAMOS LAS UNIDADES, como parámetros tenemos el contenedor que queremos agregar y el data, osea el nombre del producto */
const sumarUnidades = (element,product) => {
    /* obtenemos el container donde está el texto a cambiar (texto-product), en este están los datos del producto*/
    const infoProducto = element.lastElementChild;
    /* Obtenemos el p donde está el subtotal */
    const subTotalProducto = infoProducto.children[2];
    /* VAMOS AL DIV DONDE ESTA LA p de units (unidades), el está junto a los íconos de - y + */
    const unidades = infoProducto.lastElementChild;
    /* obtenemos la p donde se hará el cambio de unidades*/
    const unitsProducto = unidades.children[1];
    
    for (const x in products) { /* Recorremos nuestro arreglo de objetos con la info de c/producto */
        if(products[x].nombre === product){ /* si el nombre del objeto coincide con la data del btn ... */
            products[x].cantidad++; /* Aumentamos sus valores y los ponemos en el html */
            products[x].subtotal+=products[x].precio;
            unitsProducto.textContent = `${products[x].cantidad} units`;
            subTotalProducto.textContent = `Subtotal: $${products[x].subtotal}.00`
        };
    };
    /* SUMAMOS LAS CANTIDADES Y SUBTOTALES PARA PONER LOS VALORES TOTALES DE LOS PRODUCTOS EN EL HTML ABAJO */
    unidadesTotales = products.map(item => item.cantidad).reduce((prev, curr) => prev + curr, 0)
    precioTotal = products.map(item => item.subtotal).reduce((prev, curr) => prev + curr, 0)
    itemsPrecio.firstElementChild.textContent = `${unidadesTotales} items`;
    itemsPrecio.lastElementChild.textContent = `$${precioTotal}.00`;
}

/* MOSTRAR EN EL DIV DEL CARRITO LOS PRODUCTOS SELECCIONADOS */
const carritoContainers = document.querySelectorAll('.carrito-container'); /* Lista de cada contenedor de product */
const contCarrito = document.getElementById('cont-carrito'); /* contador del icono de carrito en la nav */
    let contadorCarrito = 0; /* variable que será la que asignemos al contador del icono de carrito */
const checkout = document.getElementById('checkout'); /* boton para realizar la compra */

const añadirElemento = event => {
    if (estadoCart==false) { /* si no está activa el div de los productos mostrarlo y activar el boton de compra */
        mostrarCarritoProducts();
        checkout.classList.add('btn-checkout');
    }
    contadorCarrito++; /* sumamos 1 al contador del ícono de cart */
    contCarrito.textContent = contadorCarrito; /* cambiamos el valor en el html */
    const productoActual = event.target.dataset.cartproduct; /* data del producto seleccionado(hoddie, shirt,etc) */
    for (const x of carritoContainers) { /* recorremos cada contenedor de productos */
    /* si su data y la del producto que queremos agregar son iguales entonces lo muestra al quitarle el
    noSelected, porque pusimos que todos así (osea que no se muestren)) */
        if(x.dataset.cartproduct == productoActual){ 
            x.classList.remove('noSelected');
            sumarUnidades(x, productoActual); /* le pasamos el contenedor del producto y el data del btn que coincide */
        }
    }
    
}
/* CADA BOTON DE CADA PRODUCTO PARA AGREGAR AL CARRITO */
btnHoodie = document.getElementById('btn-hoodie');
btnShirt = document.getElementById('btn-shirt');
btnSweatshirt = document.getElementById('btn-sweatshirt');
/* función a cada btn */
btnHoodie.addEventListener('click', añadirElemento);
btnShirt.addEventListener('click', añadirElemento);
btnSweatshirt.addEventListener('click', añadirElemento);

/* BOTONES MÁS, MENOS Y ELIMINAR */
const btnMenos = document.querySelectorAll('.btn-menos');
const btnMas = document.querySelectorAll('.btn-mas');
const btnBorrar = document.querySelectorAll('.btn-borrar');

const operar = event =>{
    /* obtenemos la data de los botones para saber qué producto y acción es.
    Podemos saber estas 2 cosas porque el formato es (ejem: data='restar-hoodie') */
    const productoActual = event.target.dataset.producto;
    /* acceder al html donde están las unidades, no le damos valor,
    porque esto cambia dependiendo la posición del botón donde nos
    encontramos (está después del boton restar, antes de sumar). */
    let units;
    /* acceder al html del subtotal que es el hermano anterior al padre*/
    const subTotal = event.target.parentNode.previousElementSibling;
    /* accedemos al padre del padre del padre jaja que es el carrito-container*/
    const padreContainer = event.target.parentNode.parentNode.parentNode;

    /* quitamos el restar- y sumar- por conflicto con nombre (shirt), porque
    el sweatshirt se sumaba 2 veces al contener la palabra shirt también */
        let productoFinal = productoActual.slice(productoActual.indexOf('-')+1);

        for (const x in products) { /* recorremos los objetos */
         if (productoFinal == products[x].nombre) { /* si coincide la data con el nombre del objeto */
             if (productoActual.includes('restar')) {
                 if (products[x].cantidad ==1) {
                    padreContainer.classList.add('noSelected');
                 }
                /* ubicamos el html de units y le restamos los valores */
                units = event.target.nextElementSibling;
                products[x].cantidad--;
                products[x].subtotal-=products[x].precio;
                /* restamos los valores del ícono de cart */
                contadorCarrito--;
                contCarrito.textContent = contadorCarrito;
                /* actualizamos los valores en el html de unidades y subtotal*/
                units.textContent = `${products[x].cantidad} units`;
                subTotal.textContent = `Subtotal: $${products[x].subtotal}.00`
             } else if(productoActual.includes('sumar')){
                 /* igual que el restar pero acá sumamos */
                units = event.target.previousElementSibling;
                products[x].cantidad++;
                products[x].subtotal+=products[x].precio;
                contadorCarrito++;
                contCarrito.textContent = contadorCarrito;
                units.textContent = `${products[x].cantidad} units`;
                subTotal.textContent = `Subtotal: $${products[x].subtotal}.00`
             } else{ /* operación eliminar */
                /* quitamos el producto agregando la clase de display none*/
                padreContainer.classList.add('noSelected');
                /* restamos la cantidad actual de unidades en el ícono del carrito*/
                contadorCarrito-=products[x].cantidad;
                contCarrito.textContent = contadorCarrito;
                products[x].cantidad=0; /* devolvemos los valores del objeto a 0*/
                products[x].subtotal=0;
             }
             /* luego de realizar c/operacion, sumamos las unidades y subtotales de c/u
             para obtener el total de unidades y el precio total */
            unidadesTotales = products.map(item => item.cantidad).reduce((prev, curr) => prev + curr, 0)
            precioTotal = products.map(item => item.subtotal).reduce((prev, curr) => prev + curr, 0)
             /* mostramos en el html estos valores */
            itemsPrecio.firstElementChild.textContent = `${unidadesTotales} items`;
            itemsPrecio.lastElementChild.textContent = `$${precioTotal}.00`;
            /* si ya no hay productos que mostrar, entonces volvemos al
            div del empty-card y ocultamos este div de productos */
            if(unidadesTotales==0){
                mostrarCarritoProducts();
                checkout.classList.remove('btn-checkout'); /* desactivamos el boton */
            }
         }      
        }  
};
/* recorremos todos los botones de sumar restar y eliminar y a todos
les aplicamos el evento listener al hacerles click para que operen*/
btnMenos.forEach(x=>x.addEventListener('click', operar));
btnMas.forEach(x=>x.addEventListener('click', operar));
btnBorrar.forEach(x=>x.addEventListener('click', operar));

/* FUNCION AL PRESIONAR EL BOTON DE CHECKOUT, OSEA AL SIMULAR LA COMPRA */
const resetearCarrito = event =>{
    /* reseteamos el contador y el icono de carrito */
    contadorCarrito=0;
    contCarrito.textContent = contadorCarrito;

    let i = 0; /* contador para los objetos, para que se reinicie a la par de c/container */
    for (const x of carritoContainers) { /* container de c/producto */
        x.classList.add('noSelected'); /* display none al contenedor */
        /* Accedemos a las unidades y subTotal del html*/
        const infoProducto = x.lastElementChild;
        const unidades = infoProducto.lastElementChild;
        const unitsProducto = unidades.children[1];
        const subTotalProducto = infoProducto.children[2];
        /* valores de objetos a 0 y lo mostramos en el html */
        products[i].cantidad=0;
        products[i].subtotal=0;
        unitsProducto.textContent = `${products[i].cantidad} units`;
        subTotalProducto.textContent = `Subtotal: $${products[i].subtotal}.00`
        i++;
    }
    
    /* PONEMOS LOS VALORES GENERALES EN 0 */
    unidadesTotales = products.map(item => item.cantidad).reduce((prev, curr) => prev + curr, 0)
    precioTotal = products.map(item => item.subtotal).reduce((prev, curr) => prev + curr, 0)
    itemsPrecio.firstElementChild.textContent = `${unidadesTotales} items`;
    itemsPrecio.lastElementChild.textContent = `$${precioTotal}.00`;

    /* OCULTAMOS EL CARRITO, DESACTIVAMOS BOTON Y MOSTRAMOS EL EMPTY */
    mostrarCarritoProducts();
    checkout.classList.remove('btn-checkout');
    alert('Compra realizada con éxito');
}

checkout.addEventListener('click', resetearCarrito);




