import { addTask, saveTasks, getTasks, tasksStorageKey } from "../models/domainObjects.mjs";
import { taskListHTMLSelector, addTaskInputSelector, completedCSSClass } from "../models/defines.mjs"

export function task2HTMLElement (taskIndex, taskObject) {
    // Creo los elementos HTML
    const listHTMLItem = document.createElement("li");
    const pHTMLItem = document.createElement("p");
    const inputCheckboxHTMLItem = document.createElement("input");
    
    const inputEraseButtonHTMLItem = document.createElement ("button");

    
    // Les proporciono valores 
    inputCheckboxHTMLItem.type = "checkbox";
    inputCheckboxHTMLItem.checked = taskObject.completed;
    pHTMLItem.innerHTML = taskObject.taskName
    //Enzo:Añado el boton para borrar el elemento del array
    inputEraseButtonHTMLItem.type = "button"
    inputEraseButtonHTMLItem.className = "erasebutton"

    // Los anido. 
    //Enzo:Anido tambien el boton para borrar inputEraseButtonHTMLItem
    listHTMLItem.append(pHTMLItem, inputCheckboxHTMLItem, inputEraseButtonHTMLItem);
    // Aplico estilos si está completada
    if (taskObject.completed) {
        listHTMLItem.classList.add(completedCSSClass);
    } else {
        listHTMLItem.classList.remove(completedCSSClass);
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
        (event) => {
            const tasks = getTasks();            
            tasks.splice(taskIndex,1);           
            saveTasks(tasks);
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
