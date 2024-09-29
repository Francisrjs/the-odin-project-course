import { createElement } from "./index";
function createExampleProject(titleProject) {
  // 1. Crear el proyecto principal
  const projectData = {
    title: titleProject,
    date: "2024-09-15",
    description: "Este es un proyecto de ejemplo."
  };
  const project = createElement(projectData, "project");
  console.log("Proyecto creado: ", project.id);

  // 2. Crear los todos (tareas) asociados a este proyecto
  const todos = [
    {
      title: "Tarea 1",
      date: "2024-09-16",
      description: "Que tengo que hacer?",
      priority: "Alta",
      projectName: projectData.title
    },
    {
      title: "Tarea 2",
      date: "2024-09-17",
      description: "Creamos nuestro proyecto.",
      priority: "Media",
      projectName: projectData.title
    }
  ];

  // 3. Crear y agregar cada "todo" (tarea) al DOM
  todos.forEach((todoData) => {
    createElement(todoData, "todo");
    console.log("Tarea añadida: ", todoData.title);
  });
}
export{createExampleProject};