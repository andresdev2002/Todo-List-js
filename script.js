// OBTENER los elementos del HTML
const input = document.getElementById('taskInput');
const button = document.getElementById('addButton');
const lista = document.getElementById('taskList');

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
    
    // 4. Poner texto en el <li>
    nuevoLi.textContent = textoTarea;
    
    // 5. Crear botón eliminar
    const botonEliminar = document.createElement('button');
    botonEliminar.textContent = 'Eliminar';
    botonEliminar.style.marginLeft = '10px';
    botonEliminar.style.padding = '5px 10px';
    botonEliminar.style.cursor = 'pointer';
    
    // 6. Cuando click en eliminar, borrar tarea
    botonEliminar.onclick = function() {
        nuevoLi.remove();
    };
    
    // 7. Agregar botón dentro del <li>
    nuevoLi.appendChild(botonEliminar);
    
    // 8. Agregar <li> a la lista
    lista.appendChild(nuevoLi);
    
    // 9. Limpiar input
    input.value = '';
}

// CONECTAR botón con la función
button.addEventListener('click', agregarTarea);

// BONUS: Funciona con Enter también
input.addEventListener('keypress', function(evento) {
    if (evento.key === 'Enter') {
        agregarTarea();
    }
});