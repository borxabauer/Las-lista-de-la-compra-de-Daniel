import { addTask, saveTasks, getTasks, tasksStorageKey } from "../models/domainObjects.mjs";
import { taskListHTMLSelector, addTaskInputSelector, completedCSSClass } from "../models/defines.mjs"

export function task2HTMLElement (taskIndex, taskObject) {
    // Creo los elementos HTML
    const listHTMLItem = document.createElement("li");
    const pHTMLItem = document.createElement("p");
    const inputCheckboxHTMLItem = document.createElement("input");
    //Enzo:Creo boton para borrar tareas
    const inputEraseButtonHTMLItem = document.createElement ("button");
   
    const inputEditButtonHTMLItem = document.createElement ("button");
    const inputEditBox = document.createElement("input")
    const inputConfirmEdit = document.createElement ("button")

    
    // Les proporciono valores 
    inputCheckboxHTMLItem.type = "checkbox";
    inputCheckboxHTMLItem.checked = taskObject.completed;
    pHTMLItem.innerHTML = taskObject.taskName
    //Enzo:Añado el boton para borrar el elemento del array
    inputEraseButtonHTMLItem.type = "button"  
    inputEraseButtonHTMLItem.innerHTML = "Borrar"
    inputEditButtonHTMLItem.innerHTML = "Edit"
    inputEditButtonHTMLItem.className = "editButton"
    inputEditButtonHTMLItem.type="button"
    inputEditBox.type = "text"
    inputConfirmEdit.innerHTML = "confirmar"
    inputConfirmEdit.type="button"

    // Los anido. 
    //Enzo:Anido tambien el boton para borrar inputEraseButtonHTMLItem
    listHTMLItem.append(pHTMLItem, inputCheckboxHTMLItem, inputEraseButtonHTMLItem,inputEditButtonHTMLItem);
    // Aplico estilos si está completada
    if (taskObject.completed) {
        listHTMLItem.classList.add(completedCSSClass);
        inputEditButtonHTMLItem.style.display = "none"
    } else {
        listHTMLItem.classList.remove(completedCSSClass);
        inputEditButtonHTMLItem.style.display = "block"
    }
    
    // Añado el manejador de eventos
    inputCheckboxHTMLItem.addEventListener(
        "click",
        (event) => {
            const tasks = getTasks();
            tasks[taskIndex].completed = event.target.checked;
            saveTasks(tasks);
        }
    
    );
    //Enzo:Añado manejador de eventos para cuando se haga 
    //click en boton se borre el objeto del array.
    inputEraseButtonHTMLItem.addEventListener(
        "click",
        () => {
            updateClock();
            var totalTime = 10;
            console.log(totalTime);
            function updateClock() {
                inputEraseButtonHTMLItem.innerHTML = totalTime;
                if(totalTime==0){
                    const tasks = getTasks();           
                    tasks.splice(taskIndex,1);           
                    saveTasks(tasks);
                }else{
                    totalTime-=1;
                    setTimeout("updateClock()",1000);
                }
            }
        }   
    );
    //Crea el recuadro del editor, el boton y
    //añade el texto de la tarea existente en el recuadro del editor
    inputEditButtonHTMLItem.addEventListener(
        "click",
        (event)=>{
            event.preventDefault();
            const tasks = getTasks();
            listHTMLItem.append(inputEditBox, inputConfirmEdit);
            inputEditBox.value = tasks[taskIndex].taskName;
        }

    );
    // Intruduce los cambio con enter
    inputEditBox.addEventListener(
        "keypress",
        (event)=>{
            const tasks = getTasks();
            if(event.key === 'Enter'){
                if (window.confirm("Quieres cambiarlo realmente?")) {
                    tasks[taskIndex].taskName = inputEditBox.value;
                    saveTasks(tasks);
                } 
            }
        }
    );
    //Coge el contenido nuevo del recuadro del editor y
    //sustituye el antiguo por el nuevo al hacer click en el boton
    inputConfirmEdit.addEventListener(
        "click",
        (event)=>{
            if (window.confirm("Quieres cambiarlo realmente?")) {
                const tasks = getTasks();
                tasks[taskIndex].taskName = inputEditBox.value;
                saveTasks(tasks);    
            }
        }
    );


    return listHTMLItem
}

export function updateTasksHTML (CSSselector, tasksArray) {
    const listHTMLElement = document.querySelector(CSSselector);
    listHTMLElement.innerText = ""
    if (tasksArray.length > 0) {
        for ( let index in tasksArray ) {
            listHTMLElement.appendChild(task2HTMLElement(index, tasksArray[index]))
        }
    } else {
        listHTMLElement.innerText = "Add your first task..."
    }
}

export function taskAddButtonClickHandler (event) {
    //console.log(event)
    const input = document.querySelector(addTaskInputSelector);
    event.preventDefault()
    const newTask = {
        taskName: input.value,
        completed: false,
    };
    addTask(newTask);
    updateTasksHTML(taskListHTMLSelector,getTasks());
}
export function searchTask(){
    const searchInput = document.querySelector("#search");
    const tasksList = document.querySelector("#tasksList")
    for(let item of tasksList.children){
        let result = item.children[0].innerText.indexOf(searchInput.value);
        if (result >= 0){
            item.classList.remove("hidden")
        } else {
            item.classList.add("hidden")
        }
    }    
}
//Funcion borrar completadas. Solo borra 2 de las seleccionadas, revisar.
export function quitCompletedTaskHandler(event){
    const tasks = getTasks();
    event.preventDefault()
    for (let idx=0; idx < tasks.length; idx++){
        if (tasks[idx].completed === true){
            tasks.splice(idx,1)
        }
    }  
saveTasks(tasks)
}
//Crear Funcion Ocultar
export function hideFunction (){
    const lista =document.querySelector("#tasksList");
    for (let item of lista.children) {
        if (item.children[1].checked) item.classList.add("hidden")
    }
    }
    
    //Crear Funcion Mostrar
 export function showFunction (){
        const lista =document.querySelector("#tasksList");
    for (let item of lista.children) {
        if (item.children[1].checked) item.classList.remove("hidden")
    }
    }
