import { ca } from "date-fns/locale";
import "./extras.css"
import "./main.css";
import "./reset.css";
console.log("hola web  ss");
//Forms
const projectAdd= document.querySelector(".add-project");
const projectForm=document.querySelector(".project-form");
const btnSaveProject=document.querySelector(".save-form-project");
const todoAdd= document.querySelector(".add-todo");
const todoForm=document.querySelector(".todo-form");
const btnSaveTodo=document.querySelector(".save-form-todo");
//html Project
const actualProject=document.getElementById("title-project-main").textContent;
const inputProjectAdd=document.getElementById("input-project-name");
const projectTitle=document.getElementById("title-project-main");
function extractForm(form) {
    const type= (form=="project")? "-project" : "-todo";
    const title = document.getElementById("input-title"+type).value;
    const date = document.getElementById("input-date"+type).value;
    const description = document.getElementById("input-description"+type).value;
    if (type=="-todo"){
      const priority = document.getElementById("input-priority"+type).value;
      const projectName= document.getElementById("input-project-name").value;
      return { title, date, description, priority, projectName };
    }
   else{
    return { title, date, description};
   }
    
  }

  function createElement(element, type) {
    const h3 = document.createElement("h3");
    const h2 = document.createElement("h2");
    const p = document.createElement("p");
    const div = document.createElement("div");
    const button= document.createElement("button");
    const projects = document.querySelector(".projects");
    const carts= document.querySelector(".project-carts-container");
    h2.textContent = element.title; // Use textContent for security
    h3.textContent = element.date;
    p.textContent = element.description;
    
    div.appendChild(h2);
    div.appendChild(h3);
    div.appendChild(p);
  
    if (type === "project") {
      div.className = "project-cart";
      div.id=element.title;
      projects.appendChild(div); // Append the new div to projects
      div.addEventListener("click",()=>{
        selectProject(div);
      })
    } else {
      // Handle priority differently if needed in future versions
      div.className ="project-view-cart";
      div.id="cart-"+ element.projectName;
      button.textContent="X";
      button.className="close-cart";
      div.appendChild(button);
      carts.appendChild(div); // Append the new div to projects

    }
  }
function formAdd(element){
  console.log("form add");
  console.log(element.id);
  console.log(element.projectName);
  
    element.addEventListener("click",()=>{
      if(element.id=="project"){
      projectForm.setAttribute("id", "show");
      }else{
      todoForm.setAttribute("id","show");
      }
      console.log("click");
  })
  inputProjectAdd.value=actualProject;
  }
function saveForm(element){
  console.log(element.id);
  element.addEventListener("click",()=>{
     
      if(element.id=="project"){
        projectForm.setAttribute("id", "hidden");
        const formData = extractForm("project");
        createElement(formData,element.id);
        console.log("project");
      }else{
        todoForm.setAttribute("id", "hidden");
        const formData = extractForm("todo");
        createElement(formData,element.id);
        console.log("TODO");
      }
      
  })
}
function selectProject(element){
    const allTodoSelect=document.querySelectorAll(".cart-"+actualProject);
    console.log(allTodoSelect); 
  allTodoSelect.forEach(function (todo) {
    todo.classList.add("hidden");
  });
    const projectNewSelect=element.getAttribute('id');
    projectTitle.textContent=projectNewSelect;
    const allTodoHidden = document.querySelectorAll(".cart-" + projectNewSelect);
    allTodoHidden.forEach(function (todo) {
      todo.classList.remove("hidden");
    });
}
formAdd(projectAdd);
formAdd(todoAdd);
saveForm(btnSaveProject);
saveForm(btnSaveTodo);
console.log(projectAdd);



