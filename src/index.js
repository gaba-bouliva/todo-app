import Project from "./Project.js";
import Todo from "./Todo.js";
import { save, get} from './localStorage.js';



// Each project has a todo-list
// Each Todo-list has one or more todos
// Each todo belongs to one todo-list

function saveToLocalStorage(objectName, object) {
  // objectName => 'todoList' || 'projectList' || 'selectedProject'
  // object => todoList || projectList || selectedProject
  localStorage.setItem(objectName, JSON.stringify(object) );
}

function getObjectFromLocalStorage(objectName) {
  return JSON.parse(localStorage.getItem(objectName));
}

let projectList = getObjectFromLocalStorage('projectList');
let todoList = getObjectFromLocalStorage('todoList');
let selectedProject = getObjectFromLocalStorage('selectedProject');




function createProject(projects = [], title = "Default Project", description = "Default Project Description") {
  let project = new Project(title, description)
  projects.push(project)
  return projects
}

if (!projectList){ 
  // create default project if no project exists already
  projectList = createProject();
  selectedProject = projectList[0];
}

if (!todoList){
  todoList = [];
}

saveToLocalStorage('projectList', projectList);
saveToLocalStorage('selectedProject', selectedProject);

console.log("List of projects", getObjectFromLocalStorage('projectList'));

function createTodo(todoList, todo, projectId){
  
  let newTodo = new Todo(todo, projectId);
  todoList.push(newTodo);
  return todoList;
  
}   


function loadTodos() {

  document.querySelector('.todo-list').innerHTML = ''; // empty the content of the unordered todo list in HTML DOM
  let todos = getObjectFromLocalStorage('todoList');

  if (!todos) {
    return; 
  }
  todos.forEach( (todo) => {

    if (todo.projectId === selectedProject.id) {
      let todoItemDiv = document.createElement('div');
      todoItemDiv.className = 'todo-item';
      
      
      //todoItemDiv.className = 'todo';
      todoItemDiv.classList.add('todo');

      todoItemDiv.innerHTML = `<li >
                                  <input type="checkbox" class="checkbox" id='status_${todo.id}'
                                  ${ todo.completed ? "checked" : ""} />
                                  ${todo.title}                          
                                </li>

                                 <span>
                                    <a class="action edit-todo" id='edit_${todo.id}' }>Edit</a>
                                    <a class="action delete-todo" id='del_${todo.id}'>Delete</a>
                                 </span>
                                `
      document.querySelector('.todo-list').appendChild(todoItemDiv);
      document.querySelector(`#status_${todo.id}`).addEventListener('click', handleUpdateTodoStatus);

      if (todo.completed) {
        todoItemDiv.classList.add('todo-completed');
      }else{
        document.querySelector(`#edit_${todo.id}`).addEventListener('click', handleEditTodo);
        document.querySelector(`#del_${todo.id}`).addEventListener('click', handleDeleteTodo);
      } 
      
    }
    
  })
}

function loadProjects() {
  
  document.querySelector('.project-list').innerHTML = ''; // empty the ul list in DOM
  let projects = getObjectFromLocalStorage('projectList');
  projects.forEach((project) => {
    
    
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
  
  saveToLocalStorage('selectedProject', currentProject);
  selectedProject = getObjectFromLocalStorage('selectedProject');
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

  let newTodoList = createTodo([...todoList], todo, selectedProject.id);
  saveToLocalStorage('todoList', newTodoList);
  todoList = getObjectFromLocalStorage('todoList');
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

  let newProjectList = createProject([...projectList], title, description);
  saveToLocalStorage('projectList', newProjectList);
  projectList = getObjectFromLocalStorage('projectList');
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

  let projects = getObjectFromLocalStorage('projectList');
  let updatedProjects = projects.map( project => {

    if (project.id === selectedProject.id ) {
      project = {...selectedProject};
    }
    return project;
  })
 
  saveToLocalStorage('projectList', updatedProjects);
  loadProjects()

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

function editTodo(e){
  e.preventDefault()

  let todoId = e.target.todoId.value;
  let title = e.target.todoName.value;
  let dueDate = e.target.dueDate.value;
  let todos = getObjectFromLocalStorage('todoList');

  if(todoId) {
    
    for (let i = 0; i < todos.length; i++) {
      let currentTodo = todos[i];

      if ( currentTodo.id === todoId){
        currentTodo.title = title;
        currentTodo.dueDate = dueDate;
      }
      
    }
  
  }else {
    throw 'Invalid todo ID';
  }

  saveToLocalStorage('todoList', todos)
  loadTodos();
  changeEditTodoFormToAddTodoForm();
}


function handleEditTodo(event) {

  let id = event.target.getAttribute('id').split('_')[1] // remove 'edit_' from id
  let todo = todoList.find( todo => id === todo.id );

  if (todo) {
    changeAddTodoFormToEditForm(todo);
  }else{
    throw 'Invalid todo Id';
  }
  
}

function handleDeleteTodo(event) {
  let id = event.target.getAttribute('id').split('_')[1]; // remove 'del_' from id

  let newTodoList = todoList.filter( todo => todo.id !== id)
  saveToLocalStorage('todoList', newTodoList);
  todoList = getObjectFromLocalStorage('todoList');
  loadTodos()
}

function handleUpdateTodoStatus(event) {
  // update todo status
  
  let id = event.target.getAttribute('id').split('_')[1]; // remove 'status_' from id
  let completed = event.target.checked;
  todoList = getObjectFromLocalStorage('todoList');
  let todo = todoList.find( todo => id === todo.id );

  if (todo) {
    todoList.forEach( todo => {

      if (todo.id === id) {
        todo.completed = completed;
      }

    })
  }else{
    throw 'Invalid todo Id';
  }

  saveToLocalStorage('todoList', todoList);
  loadTodos();
}

function changeEditTodoFormToAddTodoForm() {

  // setting back the todo form to it's default behavior(saving todo when submitted)

  document.querySelector('#todo-form-title').innerText = 'Save Todo';
  let btn = document.querySelector('#todo-save-btn');
  btn.innerText = 'Save';

  let editedTodoForm = document.querySelector('.todo-form');
  editedTodoForm.removeEventListener('submit', editTodo);
  editedTodoForm.addEventListener('submit', handleAddTodo);
  editedTodoForm.todoId.value = '';
  editedTodoForm.todoName.value = '';
  editedTodoForm.dueDate.value = '';
  

}

function changeAddTodoFormToEditForm(todo){
  
  let newTodoForm = document.querySelector('.todo-form');
  document.querySelector('#todo-form-title').innerText = 'Edit Todo';
  
  let btn = document.querySelector('#todo-save-btn');

  btn.innerText = 'Update';

  // verify if the form used to edit the todo has an input with name todoId
  // prevents multiple inputs with name todoId added to the dom
  if (!newTodoForm.todoId) {
    
    let todoIdInput =  document.createElement('input');
    todoIdInput.setAttribute('name', 'todoId');
    todoIdInput.value = todo.id;
    todoIdInput.style.display = 'none';
    newTodoForm.appendChild(todoIdInput);

  }else {
    newTodoForm.todoId.value = todo.id
  }


  newTodoForm.todoName.value = todo.title;
  newTodoForm.dueDate.value = todo.dueDate;

  newTodoForm.removeEventListener('submit', handleAddTodo);
  newTodoForm.addEventListener('submit', editTodo);

  document.querySelector('.new-todo-form').style.display = ''; // show the add new todo form
  document.querySelector('.new-project-form').style.display = 'none'; // hide the project form just in case it's displayed
}


function changeAddProjectFormToEditForm() {
  // setting the project form to edit currently selected project when submitted

  let newProjectForm = document.querySelector('.project-form');
  document.querySelector('#project-form-title').innerText = 'Edit Project';

  let btn = document.querySelector('#project-save-btn');

  btn.innerText = 'Update';
  newProjectForm.removeEventListener('submit', handleAddProject);
  newProjectForm.addEventListener('submit', editProject);
  
  document.querySelector('.new-project-form').style.display = ''; // show the add new project form
  document.querySelector('.new-todo-form').style.display = 'none'; // hide the todo form just in case it's open
}

function changeEditProjectFormToAddForm() {
  // setting back the project form to it's default behavior(saving project when submitted)

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

loadProjects()
if(!selectedProject){
  // set current project to default project if non is selected
  setCurrentProject()
}
loadTodos()
setupEventListeners()
