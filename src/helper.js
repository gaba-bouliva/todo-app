

function generateId(){
  
  const id = Math.ceil(Math.random() * 999)+'-'+Date.now()
  console.log("id",id);
  return id;
}

export {
  generateId
}