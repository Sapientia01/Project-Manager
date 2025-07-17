import { useState } from "react";
import NoProject from "./components/noProject.jsx";
import NewProject from "./components/newProject.jsx";
import Project from "./components/project.jsx";

function selectProject(projects, title) {
  let selectedproject;
  for (const project of projects) {
    if (project.title === title) {
      selectedproject = project;
    }
  }
  return selectedproject;
}

function App() {
  const [selectedTitle, setSelectedTitle] = useState("");
  const [isAdding, setIsAdding] = useState();
  const [projects, setProjects] = useState([]);

  function handleActiveProject(title) {
    setSelectedTitle(title);
  }
  function handleSaving() {
    setIsAdding(false);
  }
  function handleAdding() {
    setIsAdding(true);
  }

  function handleAddingProject(newProject) {
    setProjects((prevProjects) => [...prevProjects, newProject]);
  }
  function handleTasks(newTasks, title) {
    let updatedProjects = [...projects];

    for (const project of updatedProjects) {
      if (project.title === title) {
        project.tasks = newTasks;
      }
    }
    setProjects(updatedProjects);
  }

  let selectedProject = selectProject(projects, selectedTitle);

  return (
    <>
      <div className="flex flex-row w-full gap-10 pt-12 pr-12 mx-auto ">
        <div className="w-1/3 h-screen pt-16 text-white bg-black rounded-tr-3xl">
          <h1 className="w-full text-4xl font-bold px-7 "> Your Projects</h1>

          <button
            className="px-3 py-2 mx-16 bg-gray-700 rounded mt-7 hover:bg-gray-500"
            onClick={handleAdding}
          >
            + Add Projects
          </button>

          <ul className="flex flex-col w-full gap-1 mx-16 mt-5 text-xl text-gray-400">
            {projects.map((project, index) => (
              <li
                key={index}
                onClick={() => handleActiveProject(project.title)}
                className={
                  selectedTitle === project.title
                    ? "text-white"
                    : "text-gray-400"
                }
              >
                {project.title}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center content-center w-2/3 h-screen ">
          {selectedTitle === "" && !isAdding && (
            <NoProject handleAdding={handleAdding} />
          )}
          {isAdding && (
            <NewProject
              handleAddition={handleAddingProject}
              handleSaving={handleSaving}
            />
          )}
          {selectedTitle !== "" && !isAdding && (
            <Project project={selectedProject} handleTasks={handleTasks} />
          )}
        </div>
      </div>
    </>
  );
}

export default App;

// {
//     title: "learn react",
//     date: "Dec 24, 2025",
//     discription: "star with the basic and to the advance concepts.",
//     tasks: ["learn the first", "learn the first", "learn the first"],
//   },
//   {
//     title: "run all the way",
//     date: "Jan 13, 2050",
//     discription: "star with the basic and to the advance concepts.",
//     tasks: ["learn the second", "learn the second", "learn the second"],
//   }
