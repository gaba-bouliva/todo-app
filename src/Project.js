import { generateId } from "./helper.js"

export default class Project {
  constructor(title = "Default Project", description = "Default Project Descrioption"){
    this.id = generateId(),
    this.title = title,
    this.description = description
  
  }

  // addTodo(todo){
  //   this.todos.push(todo)
  //   return this.todos
  // }

  // removeTodo(todo){
  //   this.todos = this.todos.filter( currentTodo => currentTodo.id !== todo.id )
  //   return this.todos
  // }

}