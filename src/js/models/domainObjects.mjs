import { taskListHTMLSelector } from "./defines.mjs";
import { updateTasksHTML } from "../controllers/tasks.mjs";

export const tasksStorageKey = "tasks"

export function getTasks () {
    const stringData = localStorage.getItem(tasksStorageKey) || "[]";
    return JSON.parse(stringData);
}

export function addTask(taskObject) {
    const tasks = getTasks();
    tasks.push(taskObject);
    saveTasks(tasks);
}

export function saveTasks(newTasksArray) {
    const stringData = JSON.stringify(newTasksArray)
    localStorage.setItem(tasksStorageKey, stringData);
    updateTasksHTML(taskListHTMLSelector, newTasksArray)
}


