import { useState } from "react";
import SideBar from "./components/sideBar.jsx";
import Header from "./components/header.jsx";
import NoProject from "./components/noProject.jsx";
import NewProject from "./components/newProject.jsx";
import Project from "./components/project.jsx";
import { ThemeProvider, useTheme } from "./store/themeContext.jsx";

//
//
function selectProject(projects, title) {
  let selectedproject;
  for (const project of projects) {
    if (project.title === title) {
      selectedproject = project;
    }
  }
  return selectedproject;
}

function AppContent() {
  // getting the data
  const storedProjects = JSON.parse(
    localStorage.getItem("storedProjects" || [])
  );
  const StoredSelectedTitle = JSON.parse(
    localStorage.getItem("selectedTitle" || "")
  );

  // active data

  const [selectedTitle, setSelectedTitle] = useState(StoredSelectedTitle || "");
  const [isAdding, setIsAdding] = useState();
  const [projects, setProjects] = useState(storedProjects || []);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  // storing the data
  localStorage.setItem("storedProjects", JSON.stringify(projects));
  localStorage.setItem("selectedTitle", JSON.stringify(selectedTitle));

  // styles

  const mainContentStyle = {
    background:
      theme.mode === "dark" ? "rgba(24,28,42,0.85)" : "rgba(244,244,245,0.85)",
  };

  //
  //  functions

  function handleActiveProject(title) {
    setSelectedTitle(title);
    setSidebarOpen(false);
  }

  function handleSaving() {
    setIsAdding(false);
  }

  function handleAdding() {
    setIsAdding(true);
    setSidebarOpen(false);
  }

  function handleSidebarToggle() {
    setSidebarOpen((open) => !open);
  }

  function handleAddingProject(newProject) {
    setProjects((prevProjects) => [...prevProjects, newProject]);
  }

  function handleRemovingProject(curProject) {
    setProjects((prevProjects) =>
      prevProjects.filter((project) => curProject !== project)
    );
    setSelectedTitle("");
  }

  function handleTasks(newTasks, title) {
    let updatedProjects = [...projects];
    updatedProjects.forEach((project) => {
      if (project.title === title) {
        project.tasks = newTasks;
      }
    });

    setProjects(updatedProjects);

    return selectProject(projects, selectedTitle);
  }
  function handleTheme() {
    toggleTheme();
  }

  return (
    <>
      <Header
        handleSidebarToggle={handleSidebarToggle}
        toggleTheme={handleTheme}
      />

      <div
        className={`flex flex-row w-full min-h-screen transition-colors duration-300`}
        style={{ background: theme.background }}
      >
        {/* Sidebar */}

        <SideBar
          selectedTitle={selectedTitle}
          projects={projects}
          handleAdding={handleAdding}
          handleActiveProject={handleActiveProject}
          handleSidebarToggle={handleSidebarToggle}
          sidebarOpen={sidebarOpen}
        />

        {/* Main Content Area */}
        <div
          className="flex items-center justify-center flex-1 min-h-screen  md:p-16 transition-colors duration-300 max-w-6xl mx-auto"
          style={mainContentStyle}
        >
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
            <Project
              project={selectProject(projects, selectedTitle)}
              handleTasks={handleTasks}
              removeProject={handleRemovingProject}
            />
          )}
        </div>
      </div>
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
