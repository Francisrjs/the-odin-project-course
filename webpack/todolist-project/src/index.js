import { ca } from "date-fns/locale";
import "./extras.css"
import "./main.css";
import "./reset.css";
import { createExampleProject, createSupermarketProject } from "./examples";
import { selectAllProjects,selectProject, deleteAllTodo } from "./functions-project";
import { saveElement, removeSavesElement, importProjects,loadProjectsFromStorage  } from "./save";
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
      const projectName= document.getElementById("input-project-name").value.trim().toLowerCase();
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
    saveElement(element,type);
    if (type === "project") {
      div.className = "project-cart";
      div.id = element.title.trim().toLowerCase();
      button.textContent="X";
      button.className="btn-close-cart-project";
      projects.appendChild(div); // Append the new div to projects
      div.addEventListener("click",()=>{
        selectProject(div);
      });
      button.addEventListener("click",()=>{
        deleteAllTodo(div);
        removeSavesElement(element, "project");
        div.remove();
      });
      div.appendChild(button);
  
    } else {
      // Handle priority differently if needed in future versions
      div.className ="project-view-cart";
      div.id = "cart-" + element.projectName.trim().toLowerCase().replace(/\s+/g, '-');
      console.log(element.projectName.trim().toLowerCase());
      button.textContent="X";
      button.className="close-cart";  
      div.appendChild(button);
      carts.appendChild(div); // Append the new div to projects
      button.addEventListener("click",()=>{
        removeSavesElement(element,"todo");
        div.remove();
      });
      const h2ProjectName = document.createElement("h1");
      h2ProjectName.textContent=element.projectName;
      h2ProjectName.id="cart-text-project-name"
      div.appendChild(h2ProjectName);
    }
    return div;
  }
  export{createElement};
  function formAdd(element) {
    console.log("form add");
    console.log(actualProject);
    if (element && element.projectName) {
        console.log(element.projectName);
    } else {
        console.warn("El elemento no tiene projectName");
    }

    element.addEventListener("click", () => {
        if (element.id == "project") {
            projectForm.setAttribute("id", "show");
        } else {
          const normalizedTitle = projectTitle.textContent.trim().toLowerCase();

            // Compara con "title" también en minúsculas y sin espacios
            if (normalizedTitle === "title" || normalizedTitle ==="all todo") {
                alert("First create a project, please");
            }else{
              todoForm.setAttribute("id", "show");
              inputProjectAdd.value =projectTitle.textContent.trim().toLowerCase();
              console.log(inputProjectAdd);
            }
            
        }
        console.log("click");
    });
}
function saveForm(element){
  console.log(element.id);
  element.addEventListener("click",()=>{

  let project;
      if(element.id=="project"){
        projectForm.setAttribute("id", "hidden");
        const formData = extractForm("project");
        if (dataValitadionForm(formData)){
          project=createElement(formData,element.id);
          console.log(formData);
          selectProject(project);
          console.log("project");
        }
        else{alert("Error verify data entrys")};
        
      }else{
        todoForm.setAttribute("id", "hidden");
        const formData = extractForm("todo");
        if (dataValitadionForm(formData)){
        createElement(formData,element.id);
        console.log("TODO");
        }
        else{alert("Error verify data entrys")};
      }
      
  })
}
function dataValitadionForm(element) {
  if (element.title && element.date) { // Only check title and date for todo
      return true;
  } else if (element.title && element.date && element.projectName) { // Optional check for projectName
      return true;
  } else {
      return false;
  }
}
const btnMarket=document.querySelector(".supermarket-create");
btnMarket.addEventListener("click",()=>{
  createSupermarketProject();
})

formAdd(projectAdd);
formAdd(todoAdd);
saveForm(btnSaveProject);
saveForm(btnSaveTodo);
console.log(projectAdd);
//examples

selectAllProjects();
//import memory
  loadProjectsFromStorage();   // Carga los proyectos almacenados en localStorage
  importProjects();            // Importa y crea los elementos en el DOM



