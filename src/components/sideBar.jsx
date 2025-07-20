import { useState } from "react";
import { useTheme } from "../store/themeContext";

export default function SideBar({
  selectedTitle,
  projects,
  handleAdding,
  handleActiveProject,
  handleSidebarToggle,
  sidebarOpen,
}) {
  //   const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme } = useTheme();

  const sideBarStyle = {
    background: theme.glass,
    color: theme.text,
    borderRight: `2px solid ${theme.border}`,
    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
  };

  return (
    <>
      <div
        className={`fixed z-50 md:static top-0 left-0 bottom-0 w-72 md:w-80 pt-20 md:pt-16 px-6 shadow-2xl flex flex-col border-r transition-all duration-300
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
            bg-white/70 dark:bg-[rgba(35,41,70,0.7)] backdrop-blur-lg
          `}
        style={sideBarStyle}
      >
        <button
          className={`absolute top-6 right-6  font-semibold text-2xl focus:outline-none md:hidden `}
          onClick={handleSidebarToggle}
          aria-label="Toggle sidebar"
        >
          ✖
        </button>

        <h1
          className="text-4xl font-extrabold mb-8 tracking-tight"
          style={{ color: theme.text }}
        >
          Your Projects
        </h1>
        <button
          className="w-full py-3 mb-8 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold rounded-xl shadow-lg hover:from-purple-600 hover:to-indigo-600 transition-all duration-200"
          onClick={handleAdding}
        >
          + Add Project
        </button>
        <ul className="flex flex-col gap-2 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-400 scrollbar-track-purple-100 pr-2">
          {projects.length === 0 && (
            <li className="text-gray-400 italic text-center py-8">
              No projects yet
            </li>
          )}
          {projects.map((project, index) => (
            <li
              key={index}
              onClick={() => handleActiveProject(project.title)}
              className={`cursor-pointer px-3 py-1 rounded-lg transition-all duration-150 font-medium text-lg border border-transparent ${
                selectedTitle === project.title
                  ? "bg-gradient-to-r from-purple-200 to-indigo-400 text-black shadow-md border-purple-400"
                  : "text-gray-700 dark:text-gray-600 hover:bg-purple-100 dark:hover:bg-purple-900 hover:text-purple-700 dark:hover:text-white"
              }`}
            >
              {project.title}
            </li>
          ))}
        </ul>
      </div>
      {/* Overlay for sidebar on mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={handleSidebarToggle}
        ></div>
      )}
    </>
  );
}
