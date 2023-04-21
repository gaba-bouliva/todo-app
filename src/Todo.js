import { generateId } from "./helper.js"

export default class Todo {
  constructor(todo, projectId){
    this.title = todo.title,
    this.dueDate = todo.dueDate,
    this.status = 'Incomplete',
    this.projectId = projectId,
    this.id = generateId()
  }

  // edit(newTodo, todoList){
  //   // update todo
  // }
}
