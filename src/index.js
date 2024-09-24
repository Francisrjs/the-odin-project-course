import { ca } from "date-fns/locale";
import "./extras.css"
import "./main.css";
import "./reset.css";
console.log("hola web  ss");
const projectAdd= document.querySelector(".add-project");
const projectForm=document.querySelector(".project-form");
const btnSaveProject=document.querySelector(".save-form-project");
const todoAdd= document.querySelector(".add-todo");
const todoForm=document.querySelector(".todo-form");
const btnSaveTodo=document.querySelector(".save-form-todo");
function extractForm() {
    const title = document.getElementById("input-title").value;
    const date = document.getElementById("input-date").value;
    const description = document.getElementById("input-description").value;
    const priority = document.getElementById("input-priority").value;
  
    return { title, date, description, priority };
  }

  function createElement(element, type) {
    const h3 = document.createElement("h3");
    const h2 = document.createElement("h2");
    const p = document.createElement("p");
    const div = document.createElement("div");
  
    const projects = document.querySelector(".projects");
    const carts= document.querySelector(".project-view");
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
    } else {
      // Handle priority differently if needed in future versions
      div.className ="project-view-cart";
      div.id=element.title;
      carts.appendChild(div); // Append the new div to projects

    }
  }
function formAdd(element){
  console.log(element);
    element.addEventListener("click",()=>{
      if(element.id=="project"){
      projectForm.setAttribute("id", "show");
      }else{
      todoForm.setAttribute("id","show");
      }
      console.log("click");
  })
  }
function saveForm(element){
  console.log(element.id);
  element.addEventListener("click",()=>{
    console.log(document.getElementById("input-title").value);
      const formData = extractForm();
      console.log(formData.description);
      createElement(formData,element.id);
      if(element.id=="project"){
        projectForm.setAttribute("id", "hidden");
      }else{
        todoForm.setAttribute("id", "hidden");
        console.log("TODO");
      }
      
  })
}
formAdd(projectAdd);
formAdd(todoAdd);
saveForm(btnSaveProject);
saveForm(btnSaveTodo);



