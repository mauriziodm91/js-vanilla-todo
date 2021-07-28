//DEFINIENDO VARIABLES
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//EVENT LISTENERS
loadEventListeners();

function loadEventListeners() {
    //AGREGA ENTRADAS A LA LISTA
    form.addEventListener('submit', addTask);
    //ELIMINA ENTRADAS DE LA LISTA
    taskList.addEventListener('click', removeTask);
    //ELIMINA TODAS LAS ENTRADAS DE LA LISTA
    clearBtn.addEventListener('click', clearTasks);
    //FILTRA ENTRADAS DE LA LISTA
    filter.addEventListener('keyup', filterTask);
}

//ADDTASK FUNCTION

function addTask(e){
    if(taskInput.value === ''){
        alert('Agregue una tarea');
    }

    //CREANDO ELEMENTOS LI
    const li = document.createElement('li');
    li.className = 'collection-item';
    //CREANDO NODO DE TEXTO Y ENLACE A LI
    li.appendChild(document.createTextNode(taskInput.value));
    //CREAR NUEVO ELEMENTO LINK
    const link = document.createElement('a');
    //AGREGAR SUS RESPECTIVAS CLASES A LINK
    link.className = 'delete-item secondary-content';
    //AGREGAR ICONO POR HTML
    link.innerHTML = '<i class="fa fa-remove"></i>'
    //AGREGAR LINK A ELEMENTO LI
    li.appendChild(link);
    //AGREGAR LI A UL
    taskList.appendChild(li);
    //BORRAR ENTRADA DE TAREAS
    taskInput.value = '';



    e.preventDefault();
}

function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Estas seguro que desea quitar la tarea?')){
            e.target.parentElement.parentElement.remove();
        }
    }
}

function clearTasks(e){
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
}

function filterTask(e){
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(
        function (task){
            const item = task.firstChild.textContent;
            if(item.toLowerCase().indexOf(text) != -1){
                task.style.display = 'block';
            } else {
                task.style.display = 'none';
            }
        }
    );
}