import { generateId } from "./helper.js"

export default class Todo {
  constructor(todo, projectId){
    this.title = todo.title,
    this.dueDate = todo.dueDate,
    this.status = todo.status,
    this.projectId = projectId,
    this.id = generateId()
  }

  save(todoList){
    todoList.push(this)
    return todoList
  }

  // edit(newTodo, todoList){
  //   // update todo
  // }
}
