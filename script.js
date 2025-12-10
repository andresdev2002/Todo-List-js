// OBTENER los elementos del HTML
const input = document.getElementById('taskInput');
const button = document.getElementById('addButton');
const lista = document.getElementById('taskList');
const contador = document.getElementById('contador');


// FUNCIÓN que agrega tareas
function agregarTarea() {
    // 1. Obtener texto del input
    const textoTarea = input.value;
    
    // 2. Validar que no esté vacío
    if (textoTarea === '') {
        alert('¡Escribe algo primero!');
        return;
    }
    
    // 3. Crear nuevo <li>
    const nuevoLi = document.createElement('li');
    //Creando el checkbox
    const checkbox = document.createElement('input');
    checkbox.type = "checkbox";

    checkbox.addEventListener('change', function(){
        if(checkbox.checked){
            textoSpan.style.textDecoration = 'line-through';
        }else{
            textoSpan.style.textDecoration = 'none';
        }
    })
   
    
    // 4. Poner texto en el <li>
    const textoSpan = document.createElement('span')
    textoSpan.textContent = textoTarea;

    nuevoLi.appendChild(checkbox);
    nuevoLi.appendChild(textoSpan);
    
    // 5. Crear botón eliminar
    const botonEliminar = document.createElement('button');
    botonEliminar.textContent = 'Eliminar';
    botonEliminar.style.marginLeft = '10px';
    botonEliminar.style.padding = '5px 10px';
    botonEliminar.style.cursor = 'pointer';
    
    // 6. Cuando click en eliminar, borrar tarea  
    botonEliminar.onclick = function() {
        nuevoLi.remove();//Elimina elemento del DOM
        actualizarContador();
        guardarTareas();
    };
    
    // 7. Agregar botón dentro del <li>
    nuevoLi.appendChild(botonEliminar);
    
    // 8. Agregar <li> a la lista
    lista.appendChild(nuevoLi);
    actualizarContador()
    guardarTareas();
    // 9. Limpiar input
    input.value = '';
}
//Contador de tareas
function actualizarContador(){

    const numeroTareas = lista.children.length ;
    contador.textContent = "Total: " + numeroTareas + " tareas";
}
// CONECTAR botón con la función
button.addEventListener('click', agregarTarea);

// Funciona con Enter también
input.addEventListener('keypress', function(evento) {
    if (evento.key === 'Enter') {
        agregarTarea();
    }
});

//Guardar tareas

function guardarTareas(){
    const tareas = [];

    //obtener todos los <li>
    const items = lista.children;
    //recorrer cada <li>
    for(let i = 0; i < items.length; i++){
       //obtener el texto del Span
        const texto = items[i].querySelector('span');
        const eltexto = texto.textContent;
        tareas.push(eltexto);

    }
    //Guardar array
    localStorage.setItem('tareas', JSON.stringify(tareas));
    
}

function cargarTarea(){
    //Obtener del localStorage
    const tareasGuardadas = localStorage.getItem('tareas');
    //Si no hay nada salir
    if(!tareasGuardadas)return;
    //convertir de JSON a array
    const tareas = JSON.parse(tareasGuardadas);
    tareas.forEach(function(textoTarea){

    const nuevoLi = document.createElement('li');
        const checkbox = document.createElement('input');
            checkbox.type = "checkbox";
            checkbox.addEventListener('change', function(){
    if(checkbox.checked){
        textoSpan.style.textDecoration = 'line-through';
    }else{
        textoSpan.style.textDecoration = 'none';
    }
});
            // 4. Poner texto en el <li>
    const textoSpan = document.createElement('span')
    textoSpan.textContent = textoTarea;

    const botonEliminar = document.createElement('button');
    botonEliminar.textContent = 'Eliminar';
    botonEliminar.style.marginLeft = '10px';
    botonEliminar.style.padding = '5px 10px';
    botonEliminar.style.cursor = 'pointer';
    botonEliminar.onclick = function() {
    nuevoLi.remove();
    actualizarContador();
    guardarTareas();
};

     // 7. Agregar botón dentro del <li>
    nuevoLi.appendChild(botonEliminar);
    nuevoLi.appendChild(checkbox);
nuevoLi.appendChild(textoSpan);
    
    // 8. Agregar <li> a la lista
    lista.appendChild(nuevoLi);
    
    })
}
cargarTarea();