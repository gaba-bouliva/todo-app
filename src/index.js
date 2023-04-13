import Project from "./Project.js";
import Todo from "./Todo.js";

let projectList = [];
let todoList = [];
let selectedProject = null;

// Each project has a todo-list
// Each Todo-list has one or more todos
// Each todo belongs to one todo-list

function createProject(projects, title = "Default Project", description = "Default Project Description"){
  let project = new Project(title, description)
  projects.push(project)
  return projects
}


projectList = createProject(projectList) 
selectedProject = projectList[0];
projectList = createProject(projectList)
projectList = createProject(projectList)

console.log("List of projects", projectList);

// function createTodo(todo, projectId){
//   console.log("Creating todo...")
//   let newTodo = new Todo(todo, projectId)  

//   return newTodo.save(todoList)
  
// }   

function toggleFormDisplay(event){
  
  const btnClassName = event.target.getAttribute('class')
  let htmlForm = null;

  if(btnClassName === 'add-project-btn' || btnClassName === 'add-project-icon'){
    console.log("add project btn clicked.");
    htmlForm = document.querySelector(".new-project-form");
    let todoForm = document.querySelector(".new-todo-form");
    todoForm.style.display = 'none'
  }

  if(btnClassName === 'add-todo-btn' || btnClassName === 'add-todo-icon'){
    console.log("add todo btn clicked.");
    htmlForm = document.querySelector(".new-todo-form");
    let projectForm = document.querySelector(".new-project-form");
    projectForm.style.display = 'none'
  }

  console.log("HtmlFormElement: ",htmlForm)
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
  
  document.querySelector('.project-list').innerHTML = ''; // empty the ul list in DOM

  projectList.forEach((project) => {
    
    
    let listItem  = document.createElement('li');
    listItem.className = 'project';
    listItem.innerText = project.title;
    listItem.addEventListener('click', () => {

      setCurrentProject(project);
      listItem.style.backgroundColor = 'rgb(28, 45, 45)';

    })

    if (selectedProject.id === project.id ){
      listItem.style.backgroundColor = 'rgb(28, 45, 45)';
    }else{
      listItem.style.backgroundColor = '';
    }

    let projectListInDOM = document.querySelector('.project-list');
    projectListInDOM.appendChild(listItem)
    
  })
}

function setCurrentProject (currentProject = projectList[0]){

  selectedProject = currentProject;
  loadProjects()
  
  document.querySelector('.project-title').innerText = currentProject.title;
  document.querySelector('.project-description').innterText = currentProject.description;

}


function setupEventListeners(){
 document.querySelector('.add-project-btn').addEventListener('click', toggleFormDisplay)
 document.querySelector('.add-todo-btn').addEventListener('click', toggleFormDisplay)

}

setupEventListeners()
loadProjects()
loadTodos()


