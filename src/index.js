import Project from "./Project.js";
import Todo from "./Todo.js";

let projectList = []
let todoList = []

// Each project has a todo-list
// Each Todo-list has one or more todos
// Each todo belongs to one todo-list

function createProject(projects, title = "Default Project", description = "Default Project Description"){
  let project = new Project(title, description)
  projects.push(project)
  return projects
}


projectList = createProject(projectList) // creating a default project

console.log("List of projects", projectList);

// function createTodo(todo, projectId){
//   console.log("Creating todo...")
//   let newTodo = new Todo(todo, projectId)  

//   return newTodo.save(todoList)
   
// }   

function toggleNewProjectFormDisplay(){

  let addNewProjectBtn = document.querySelector(".new-project-form");

  if( addNewProjectBtn.style.display === 'none'){
    addNewProjectBtn.style.display = '';
  }else{
    addNewProjectBtn.style.display = 'none'
  }

}


function setupEventListeners(){
 document.querySelector(".add-project-btn").addEventListener('click', toggleNewProjectFormDisplay)
}

setupEventListeners()
