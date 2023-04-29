import { generateId } from "./helper.js"

export default class Todo {
  constructor(todo, projectId){
    this.title = todo.title,
    this.dueDate = todo.dueDate,
    this.completed = false,
    this.projectId = projectId,
    this.id = generateId()
  }

  // edit(newTodo, todoList){
  //   // update todo
  // }

  updateStatus(oldTodo, todoList){
    console.log('Update todo...');
  }
}
