
function save(objectName, object) {
  // objectName => 'todoList' || 'projectList' || 'selectedProject'
  // object => todoList || projectList || selectedProject
  localStorage.setItem(objectName, JSON.stringify(object) );
}

function get(objectName) {
  return JSON.parse(localStorage.getItem(objectName));
}

export {
  save,
  get
}