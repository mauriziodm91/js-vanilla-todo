//DEFINIENDO VARIABLES
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//EVENT LISTENERS
loadEventListeners();

function loadEventListeners() {
    //DOM LOAD EVENT
    document.addEventListener('DOMContentLoaded', getTasks);
    //AGREGA ENTRADAS A LA LISTA
    form.addEventListener('submit', addTask);
    //ELIMINA ENTRADAS DE LA LISTA
    taskList.addEventListener('click', removeTask);
    //ELIMINA TODAS LAS ENTRADAS DE LA LISTA
    clearBtn.addEventListener('click', clearTasks);
    //FILTRA ENTRADAS DE LA LISTA
    filter.addEventListener('keyup', filterTask);
}

//GET TASKS FROM LS

function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(task));
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-remove"></i>'
        li.appendChild(link);
        taskList.appendChild(li);
    });
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

    //GUARDAR EL LOCAL STORAGE
    storeTaskInLocalStorage(taskInput.value);
    
    
    //BORRAR ENTRADA DE TAREAS
    taskInput.value = '';



    e.preventDefault();
}

function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Estas seguro que desea quitar la tarea?')){
            e.target.parentElement.parentElement.remove();
            //remove from ls
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task){
        if(taskItem.textContent ===  )
    });
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