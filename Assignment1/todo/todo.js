import { tasks } from "./storage.js";

export function addTask(task) {
  tasks.push(task);
}

export function removeTask(task) {
  const index = tasks.indexOf(task);
  if (index !== -1) tasks.splice(index, 1);
}

export function listTasks() {
  return tasks;
}
