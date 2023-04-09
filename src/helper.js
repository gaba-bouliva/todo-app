

function generateId(){

  const id = Math.ceil(Math.random() * 9)+''+Date.now()
  console.log("id",id);
  return id;
}

export {
  generateId
}