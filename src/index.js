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

function toggleFormDisplay(event){
  
  const btnClassName = event.target.getAttribute('class')
  let htmlForm = null;

  if(btnClassName === 'add-project-btn'){
    htmlForm = document.querySelector(".new-project-form");
    let todoForm = document.querySelector(".new-todo-form");
    todoForm.style.display = 'none'
  }

  if(btnClassName === 'add-todo-btn'){
    htmlForm = document.querySelector(".new-todo-form");
    let projectForm = document.querySelector(".new-project-form");
    projectForm.style.display = 'none'
  }

  if( htmlForm.style.display === 'none'){
    htmlForm.style.display = '';
  }else{
    htmlForm.style.display = 'none'
  }

}

function loadTodos(){
  // <div class="todo">
  //   <li ><input type="checkbox" id="checkbox" />Example todo </li>
  //     <a class="action" href="/">Edit</a>
  // </div>
  todoList.forEach( (todo) => {

    let todoItemDiv = document.createElement('div');
    todoItemDiv.className = 'todo';

    todoItemDiv.innerHTML = `<li ><input type="checkbox" id="checkbox" />
                               ${todo.title}
                               <a class="action" href="/">Edit</a>
                               <a class="action" href="/">Delete</a>
                               </li>`

  })
}

function loadProjects(){

  projectList.forEach((project) => {

    let listItem  = document.createElement('li');
    listItem.className = 'project';
    listItem.innerText = project.title;
    let projectList = document.querySelector('.project-list');
    projectList.appendChild(listItem)
    
  })
}


function setupEventListeners(){
 document.querySelector(".add-project-btn").addEventListener('click', toggleFormDisplay)
 document.querySelector(".add-todo-btn").addEventListener('click', toggleFormDisplay)
}

setupEventListeners()
loadProjects()
loadTodos()


