import { set } from "date-fns";
import { createElement } from "./index";
let allProjects=[];
function loadProjectsFromStorage() {
    const storedProjects = localStorage.getItem('allProjects');
    if (storedProjects) {
        allProjects = JSON.parse(storedProjects); 
    }
}
function saveProjectsToStorage() {
    localStorage.setItem('allProjects', JSON.stringify(allProjects));  
    console.log("saved");
}
function saveElement(element,type){
    let projectObject;
    if (type=="project"){
         projectObject={
            title: element.title,
            date: element.date,
            description: element.description,
            type: "project"
          };
    }
    else{
            projectObject={
                title: element.title,
                date: element.date,
                description: element.description,
                priority: element.priority,
                projectName: element.projectName,
                type: "todo"
          };
    }
    const exists = allProjects.some(project => 
        project.title === projectObject.title && project.type === projectObject.type
    );

    if (!exists) {
        allProjects.push(projectObject);
        saveProjectsToStorage();
    } else {
        console.log("El proyecto ya existe, no se agrega duplicado.");
    }
}
function removeSavesElement(element,type){
    if (type === "todo") {
        allProjects = allProjects.filter(todo => !(todo.title === element.title && todo.type === "todo"));
       
    } else if (type === "project") {
        allProjects = allProjects.filter(project => !(project.title === element.title && project.type === "project"));
        allProjects = allProjects.filter(todo => todo.projectName !== element.title);
    }
    console.log(allProjects);
    saveProjectsToStorage();
}
function importProjects(){
    allProjects.forEach((element)=>{
        createElement(element,element.type);
    });
    console.log("imported");
    console.log(allProjects);
}

export{allProjects,saveElement,removeSavesElement,loadProjectsFromStorage,importProjects};