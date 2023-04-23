import Project from "./Project.js";
import Todo from "./Todo.js";

let projectList = [];
let todoList = [];
let selectedProject = null;

// Each project has a todo-list
// Each Todo-list has one or more todos
// Each todo belongs to one todo-list

function createProject(projects, title = "Default Project", description = "Default Project Description") {
  let project = new Project(title, description)
  projects.push(project)
  return projects
}


projectList = createProject([...projectList]) 
selectedProject = projectList[0];

console.log("List of projects", projectList);

function createTodo(todoList, todo, projectId){
  
  let newTodo = new Todo(todo, projectId);
  todoList.push(newTodo);
  return todoList;
  
}   


function loadTodos() {

  document.querySelector('.todo-list').innerHTML = ''; // empty the content of the unodered todo list in HTML DOM
  
  todoList.forEach( (todo) => {

    if (todo.projectId === selectedProject.id) {
      let todoItemDiv = document.createElement('div');
      todoItemDiv.className = 'todo';
      
      todoItemDiv.innerHTML = `<li ><input type="checkbox" id="checkbox" />
                                 ${todo.title}</li>
                                 <span>
                                  <a class="action" href="/">Edit</a>
                                  <a class="action" href="/">Delete</a>
                                 </span>
                                `
  
      document.querySelector('.todo-list').appendChild(todoItemDiv);      
      
    }
    
  })
}

function loadProjects() {
  
  document.querySelector('.project-list').innerHTML = ''; // empty the ul list in DOM

  projectList.forEach((project) => {
    
    
    let listItem  = document.createElement('li');
    listItem.className = 'project';
    listItem.innerText = project.title;
    listItem.addEventListener('click', () => {

      setCurrentProject(project);
      listItem.style.backgroundColor = 'rgb(28, 45, 45)';

    })

    if (selectedProject.id === project.id ) {
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
  loadProjects();
  loadTodos();
  
  document.querySelector('.project-title').innerHTML = `<strong>${currentProject.title}</strong>`;
  document.querySelector('.project-description').innerHTML = `${currentProject.description}`;

}


function setupEventListeners(){
 document.querySelector('.add-project-btn').addEventListener('click', toggleProjectFormDisplay);
 document.querySelector('.add-todo-btn').addEventListener('click', toggleTodoFormDisplay);
 document.querySelector('.project-form').addEventListener('submit', handleAddProject);
 document.querySelector('.todo-form').addEventListener('submit', handleAddTodo);
 document.querySelector('#close-project-form').addEventListener('click', toggleProjectFormDisplay);
 document.querySelector('#close-todo-form').addEventListener('click', toggleTodoFormDisplay);
 document.querySelector('.edit-project-btn').addEventListener('click', handleEditProject);

}

function handleAddTodo(event){
  event.preventDefault();
  let title = event.target['todoName'].value;
  let dueDate = event.target['dueDate'].value;
  let todo = { title, dueDate};
  todoList = createTodo([...todoList], todo, selectedProject.id);
  console.log('New todoList: ', todoList);
  loadTodos();
  event.target['todoName'].value = '';
  event.target['dueDate'].value = '';


}

function handleAddProject(event){
  event.preventDefault();
  let title = event.target['projectName'].value.trim();
  let description = event.target['projectDescription'].value;

  if(!title || !description){
    throw "Please enter a valid title and description"
  }

  projectList = createProject([...projectList], title, description)
  console.log('New projectList: ', projectList);
  loadProjects()
  event.target['projectName'].value = '';
  event.target['projectDescription'].value = '';
}

function editProject(e) {
  e.preventDefault();
  let editedProjectForm = document.querySelector('.project-form');
  
  selectedProject.title =  editedProjectForm['projectName'].value;
  selectedProject.description = editedProjectForm['projectDescription'].value;

  setCurrentProject(selectedProject);
  changeEditProjectFormToAddForm();
  editedProjectForm.projectName.value = '';
  editedProjectForm.projectDescription.value = '';
  document.querySelector('.new-project-form').style.display = 'none'; // hide the form after editing project
}

function handleEditProject(){

  let newProjectForm = document.querySelector('.project-form');
  changeAddProjectFormToEditForm();
  
  newProjectForm['projectName'].value = selectedProject.title;
  newProjectForm['projectDescription'].value = selectedProject.description;
  
}

function changeAddProjectFormToEditForm() {
  // setting the project form to edit currently selected project when submited

  let newProjectForm = document.querySelector('.project-form');
  document.querySelector('#project-form-title').innerText = 'Edit Project';

  let btn = document.querySelector('#project-save-btn');

  btn.innerText = 'Update';
  newProjectForm.removeEventListener('submit', handleAddProject);
  newProjectForm.addEventListener('submit', editProject);

  document.querySelector('.new-project-form').style.display = ''; // show the add project form
  document.querySelector('.new-todo-form').style.display = 'none'; // hide the todo form just in case it's open
}

function changeEditProjectFormToAddForm() {
  // setting back the project form to it's default behavior(saving project when submited)

  document.querySelector('#project-form-title').innerText = 'Save Project';
  let btn = document.querySelector('#project-save-btn');
  btn.innerText = 'Save';

  let editedProjectForm = document.querySelector('.project-form');
  editedProjectForm.removeEventListener('submit', editProject);
  editedProjectForm.addEventListener('submit', handleAddProject);
  editedProjectForm.projectName.value = '';
  editedProjectForm.projectDescription.value = '';
 

}


function toggleProjectFormDisplay() {
  
  let projectForm = document.querySelector(".new-project-form");
  let todoForm = document.querySelector(".new-todo-form");

  // if project form has been changed to edit a project reset it back 
  // to it's default behavior (creating new projects)
  
  
  if(projectForm.style.display === ''){
    projectForm.style.display = 'none'
  }else if (projectForm.style.display === 'none') {
    projectForm.style.display = ''
  }
  todoForm.style.display = 'none'
  
  if (document.querySelector('#project-form-title').innerText = 'Edit Project') {
    changeEditProjectFormToAddForm();
  }
  
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
