import { getTasks } from "./models/domainObjects.mjs";
import { updateTasksHTML, taskAddButtonClickHandler, searchTask, quitCompletedTaskHandler } from "./controllers/tasks.mjs";
import { taskListHTMLSelector, addTaskButtonSelector } from "./models/defines.mjs"

/**
 * Punto de entrada al programa.
 * Al ser importado desde index.html como módulo
 * la ejecución se ve diferido al momento en que se
 * termine de cargar el documento HTML.
 */
updateTasksHTML(taskListHTMLSelector,getTasks());

document.querySelector("#search").addEventListener("input", searchTask);
document.querySelector("#removeCompletedTasks").addEventListener("click",quitCompletedTaskHandler)
document.querySelector(
    addTaskButtonSelector
).addEventListener(
    "click",
    taskAddButtonClickHandler
);
//Crear boton Ocultar
document.querySelector(
    "#hide"
).addEventListener(
    "click",
    hideFunction
);
//Crear boton Mostrar
document.querySelector(
    "#show"
).addEventListener(
    "click",
    showFunction
);

//Crear Funcion Ocultar
function hideFunction (){
const lista =document.querySelector("#tasklist");
for (item of lista.children) {
    if (item.children[1].checked) item.classList.add("hidden")
}
}

//Crear Funcion Mostrar
function showFunction (){
    const lista =document.querySelector("#tasklist");
for (item of lista.children) {
    if (item.children[1].checked) item.classList.remove("hidden")
}
}





















/*
for ( let idx = 0 ; idx < tasks.length ; idx ++ ) {
    tasks[idx].taskName
}
*/

//const taskHTML1 = '<li>' + taskName + '</p><input type="checkbox" name="completed" id=""' + completed + '></li>';

/*
const mappedTask = tasks.map(
    (task) => `
        <li>
            <p>${task.taskName}</p>
            <input
                type="checkbox"
                name="completed"
                id="" ${task.completed ? "checked" : ""}>
        </li>`
)

console.log("With map:", JSON.stringify(mappedTask))
*/