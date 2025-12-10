import { addTask, removeTask, listTasks } from "./todo.js";

addTask("Buy food");
addTask("Study JavaScript");
addTask("Go to gym");

removeTask("Buy food");

console.log(listTasks());
