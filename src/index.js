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


projectList = createProject([...projectList]) 
selectedProject = projectList[0];

console.log("List of projects", projectList);

// function createTodo(todo, projectId){
//   console.log("Creating todo...")
//   let newTodo = new Todo(todo, projectId)  

//   return newTodo.save(todoList)
  
// }   


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
  
  document.querySelector('.project-title').innerHTML = `<strong>${currentProject.title}</strong>`;
  document.querySelector('.project-description').innerHTML = `${currentProject.description}`;

}


function setupEventListeners(){
 document.querySelector('.add-project-btn').addEventListener('click', toggleProjectFormDisplay);
 document.querySelector('.add-todo-btn').addEventListener('click', toggleTodoFormDisplay);
 document.querySelector('.project-form').addEventListener('submit', handleAddProject);
 document.querySelector('#close-project-form').addEventListener('click', toggleProjectFormDisplay);
 document.querySelector('#close-todo-form').addEventListener('click', toggleTodoFormDisplay);

}

function handleAddProject(event){
  event.preventDefault();
  let title = event.target['projectName'].value.trim();
  let description = event.target['projectDescription'].value;
  console.log('title empty: ', title);
  if(!title || !description){
    throw "Please enter a valid title and description"
  }

  projectList = createProject([...projectList], title, description)
  console.log('New projectList: ', projectList);
  loadProjects()
  event.target['projectName'].value = '';
  event.target['projectDescription'].value = '';
}

function toggleProjectFormDisplay() {
  
  let projectForm = document.querySelector(".new-project-form");
  let todoForm = document.querySelector(".new-todo-form");

  
  if(projectForm.style.display === ''){
    projectForm.style.display = 'none'
  }else if (projectForm.style.display === 'none') {
    projectForm.style.display = ''
  }
  todoForm.style.display = 'none'

}

function toggleTodoFormDisplay() {
  let todoForm = document.querySelector(".new-todo-form");
  let projectForm = document.querySelector(".new-project-form");
  
  if(todoForm.style.display === ''){
    todoForm.style.display = 'none'
  }else if (todoForm.style.display === 'none') {
    todoForm.style.display = ''
  }
  
  projectForm.style.display = 'none'
}

setupEventListeners()
loadProjects()
setCurrentProject()
loadTodos()


