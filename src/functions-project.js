const projectTitle=document.getElementById("title-project-main");
const btnSelectAll=document.querySelector(".select-all-projects");
function selectProject(element){
    const allTodos = document.querySelectorAll(".project-view-cart");
    allTodos.forEach(function (todo) {
        todo.classList.add("hidden");
    });

    // Actualizar el título del proyecto seleccionado
    const projectNewSelect = element.getAttribute('id').trim().toLowerCase().replace(/\s+/g, '-');
    projectTitle.textContent = element.getAttribute('id');

    // Mostrar todos los todos del nuevo proyecto seleccionado
    const projectTodos = document.querySelectorAll("#cart-" + projectNewSelect);
    projectTodos.forEach(function (todo) {
        todo.classList.remove("hidden");
    });
}
function selectAllProjects(){
    const allTodoSelect = document.querySelectorAll("[id^='cart-']"); 
  allTodoSelect.forEach(function (todo) {
    todo.classList.remove("hidden");
  });
  btnSelectAll.addEventListener("click", () => {
    selectAllProjects();
});
projectTitle.textContent="All todo"
}
function deleteAllTodo(project){
const todoProject=document.querySelectorAll("#cart-"+project.id);
todoProject.forEach(function (todo) {
    todo.remove();
    console.log("remuevo" + todo.id);
  });
}

export {selectAllProjects,selectProject,deleteAllTodo}