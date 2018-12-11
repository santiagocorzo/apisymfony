const contenedor = document.querySelector('#cont')
const listas = document.querySelector('#lista')
const button = document.querySelector('.btn')
const cleanButton = document.querySelector('.btnLimpiar')
const searchButton = document.querySelector('.btnBuscar')
const createButton = document.querySelector('.btnCrear')
const findByNameButton = document.querySelector('.btnBuscarNombre')
const deleteButton = document.querySelector('.btnEliminar')
const updateButton = document.querySelector('.btnActualizar')
const form = document.querySelector('#form_post')

cargarEventLiteners();

function cargarEventLiteners() {
	button.addEventListener('click',consumirApi);
	cleanButton.addEventListener('click', limpiarPantalla);
	searchButton.addEventListener('click', buscarPost);
	createButton.addEventListener('click', crearPost);
	deleteButton.addEventListener('click', eliminarPost);
	updateButton.addEventListener('click',actualizarPost);
	findByNameButton.addEventListener('click',consumirPersonalisado)
}

//GET
function consumirApi() {
	fetch('http://localhost:8000/api/posts')
		.then(response =>{
			return response.json();
		})
		.then(function(data){
			mostrarData(data);
		})
}
//GET
function buscarPost() {
	const id = Number(prompt('Ingrese el id del post'));
	fetch('http://localhost:8000/api/posts/'+id)
		.then(function(response){
			if(response.status == 404){
				return mostrarData(data = []);
			}
			return response.json();
		})
		.then(function(data){
			mostrarData(data);
		})
}
//POST
function crearPost() {
	let  formData = new FormData();
	const name = String(prompt('Ingrese el nombre del post'));
	const description = String(prompt('Ingrese la descripcion del post'));
	formData.append('name',name);
	formData.append('description',description);
	fetch('http://localhost:8000/api/posts',{
		method:'POST',
		body:formData
	}).then(response=> response.json())
	.catch(error => console.error('ERROR',error))
	.then(response => mostrarData(response));

}
//PUT
function actualizarPost(){
	const id = Number(prompt('Ingrese el id del post'));
	const name = String(prompt('Ingrese el nombre del post'));
	const description = String(prompt('Ingrese la descripcion del post'));
	let data = {name: name, description: description}
	const headers = new Headers();
	headers.append('Content-type','application/json');
	
	fetch(`http://localhost:8000/api/posts/${id}`,{
		method:'PUT',
		body:JSON.stringify(data),
		headers: headers
	}).then(response=> response.json())
	.catch(error => console.error('ERROR',error))
	.then(response => mostrarData(response));
}
//DELETe
function eliminarPost(){
	const id =  Number(prompt('Ingrese el id del post a eliminar'));
	if(confirm('Esta Seguro que desea eliminar el post?')){
		fetch(`http://localhost:8000/api/posts/${id}`,{
			method: 'DELETE'
		})
		.catch(error => console.error('ERROR',error))
		consumirApi();
	}
}

function consumirPersonalisado(){
	const name = String(prompt('Ingrese el nombre del post'));
	fetch(`http://localhost:8000/api/test/${name}`)
	.then(response=> response.json())
	.catch(error => console.error('ERROR',error))
	.then(response => mostrarDataPersonalizado(response));
}
function mostrarData(data) {
	contenedor.classList="";
	let html = "";
	if(data.length >= 1){
		data.forEach(post =>{
			html +=`
				<ul id="lista">
					<li>ID: ${post.id}</li>
					<li>Name: ${post.name}</li>
					<li>Description: ${post.description}</li>
				</ul>
			`;
		});
	}else if(data.length === 0){
		html = `No se encontraron resultados :(`;
	}else{
		html = `
			<ul id="lista">
				<li>ID: ${data.id}</li>
				<li>Name: ${data.name}</li>
				<li>Description: ${data.description}</li>
			</ul>
		`;
	}
	return contenedor.innerHTML= html;
}

function mostrarDataPersonalizado(data){
	contenedor.classList="";
	let html = "";
	data.forEach(post =>{
		html +=`
			<ul id="lista">
				<li>ID: ${post.id}</li>
				<li>Name: ${post.name}</li>
				<li>Description: ${post.description}</li>
			</ul>
		`;
	});
	return contenedor.innerHTML= html;
}
function limpiarPantalla() {
	contenedor.classList="hide";
}