// Eliminar de Local Storage
//localStorage.clear();
let productos = document.querySelector('tbody');
let botonVacio = document.querySelector('.vacio');
let botonVaciar = document.querySelector('#carrito');





//Agregar al carrito
const listaCursos = document.querySelector("#lista-cursos");

eventos()

function eventos(){

	listaCursos.addEventListener('click',agregarCurso);
	productos.addEventListener("click", borrarDelCarrito);
	botonVaciar.addEventListener('click',vaciarCarrito)
	document.addEventListener("DOMContentLoaded",localStorageCargado )
}

function agregarCurso (e) {	
	e.preventDefault()

	const card = e.target.parentElement.parentElement;

	imgProduct = card.children[0].src;
	textProducto = card.children[1].children[0].textContent;
	precioProducto = card.children[1].children[3].children[0].textContent;



	if (e.target.classList.contains('agregar-carrito')) {
		
		

		const imagen = document.createElement("img");
		const fila= document.createElement("tr");
		const columnaImg = document.createElement("td");
		const columnaTexto = document.createElement("td");
		const columnaPrecio = document.createElement("td");
		const columnaBoton = document.createElement("td");

		//Agregar la imagen
		imagen.src = imgProduct;
		imagen.classList = "imagen-curso u-full-width";
		imagen.style.width = '100px' 
		columnaImg.appendChild(imagen);

		//Agregar Texto y precio
		columnaTexto.innerHTML = textProducto;
		columnaPrecio.innerHTML = precioProducto;
		
		//Agregar y crear boton con la x
		const botonBorrar = document.createElement("a");
		botonBorrar.setAttribute('href', '#');
		botonBorrar.classList = "borrar-curso";
		botonBorrar.textContent = "X";
		columnaBoton.appendChild(botonBorrar);

		//Agregar elementos a la fila
		fila.appendChild(columnaImg);
		fila.appendChild(columnaTexto);
		fila.appendChild(columnaPrecio);
		fila.appendChild(columnaBoton);


		productos.appendChild(fila)
		
		botonVacio.textContent = "Productos en carrito: "+productos.children.length;

		agregarLocalStorage(textProducto);
		agregarLocalStorageIMG(imagen.src)
		agregarLocalStoragePrecios(precioProducto)
	}
	
	
}


//Borrar elementos del carrito con la x

function borrarDelCarrito(e){
	if (e.target.classList.contains("borrar-curso")) {
		let elemento = e.target.parentElement.parentElement;
		elemento.remove();
		botonVacio.textContent = "Productos en carrito: "+productos.children.length;
	}

	if (productos.children.length === 0) {
	 	botonVacio.textContent = `Carrito Vacio`;	
	}

}

//Vaciar Carrito
function vaciarCarrito(e){
	const prodCont = productos.children.length;
    if (e.target.id === "vaciar-carrito") {
    	for (var i = 0; i < prodCont; i++) {
    		productos.children[0].remove()
    		if (productos.children.length === 0) {
	 			botonVacio.textContent = `Carrito Vacio`;	
			}
    	}
    }
}
//Agregar al localstorage

function agregarLocalStorage(item){
	let productos;
	productos = obtenerDelLocalStorage()

	productos.push(item)

	localStorage.setItem('Productos',JSON.stringify(productos))
}

//Obtener valores del localStorage
function obtenerDelLocalStorage(){
	let productos;
	if (localStorage.getItem("Productos") === null) {
		productos = []
	}
	else{
		productos = JSON.parse(localStorage.getItem("Productos"));
	}
	return productos;
}


//Agregar al localstorage los src de las imagenes

function agregarLocalStorageIMG(img){

	let imagenes;
	imagenes = obtenerIMGDelLocalStorage()

	imagenes.push(img)

	localStorage.setItem('imagenes',JSON.stringify(imagenes))
}

//obtener al localstorage los src de las imagenes
function obtenerIMGDelLocalStorage(){
	let imagen;
	if (localStorage.getItem("imagenes") === null) {
		imagen = []
	}
	else{
		imagen = JSON.parse(localStorage.getItem("imagenes"));
	}
	return imagen;
}

//Agregar al localstorage los precios

function agregarLocalStoragePrecios(prc){

	let precios;
	precios = obtenerPreciosDelLocalStorage()

	precios.push(prc)

	localStorage.setItem('Precios',JSON.stringify(precios))
}

//obtener al localstorage los precios
function obtenerPreciosDelLocalStorage(){
	let precios;
	if (localStorage.getItem("Precios") === null) {
		precios = []
	}
	else{
		precios = JSON.parse(localStorage.getItem("Precios"));
	}
	return precios;
}






//Cargar el los elementos del local storage
function localStorageCargado(){
	let productoss = obtenerDelLocalStorage();
	let imagenes = obtenerIMGDelLocalStorage();
	let precios = obtenerPreciosDelLocalStorage();

	for (var i = 0; i < productoss.length; i++) {
			
			const imagen = document.createElement("img");
			const fila= document.createElement("tr");
			const columnaImg = document.createElement("td");
			const columnaTexto = document.createElement("td");
			const columnaPrecio = document.createElement("td");
			const columnaBoton = document.createElement("td");

			// //Agregar la imagen
			imagen.src = imagenes[i]
			imagen.classList = "imagen-curso u-full-width";
			imagen.style.width = '100px' 
			columnaImg.appendChild(imagen);

			//Agregar Texto y precio
			columnaTexto.innerHTML = productoss[i];
			columnaPrecio.innerHTML = precios[i];
			
			//Agregar y crear boton con la x
			const botonBorrar = document.createElement("a");
			botonBorrar.setAttribute('href', '#');
			botonBorrar.classList = "borrar-curso";
			botonBorrar.textContent = "X";
			columnaBoton.appendChild(botonBorrar);

			//Agregar elementos a la fila
			fila.appendChild(columnaImg);
			fila.appendChild(columnaTexto);
			fila.appendChild(columnaPrecio);
			fila.appendChild(columnaBoton);


			productos.appendChild(fila)
			
			botonVacio.textContent = "Productos en carrito: "+productos.children.length;
		
	};
}