import { useState, useEffect, useRef } from "react";
import { useTheme } from "../store/themeContext";

export default function Project({ project, handleTasks, removeProject }) {
  const [tasks, setTasks] = useState(project.tasks);
  useEffect(() => {
    setTasks(project.tasks || []);
  }, [project]);
  const [newTask, setNewTask] = useState({
    text: "",
    priority: "medium",
    completed: false,
    dueDate: "",
    attachments: [],
  });
  const taskInput = useRef();
  const { theme } = useTheme();

  function handleChange(property, e) {
    setNewTask((prev) => ({
      ...prev,
      [property]: e.target.value,
    }));
  }
  function handleAdding() {
    setTasks((prev) => {
      const newTasks = [...prev, newTask];
      handleTasks(newTasks, project.title);
      return newTasks;
    });
    setNewTask({
      text: "",
      priority: "medium",
      completed: false,
      dueDate: "",
      attachments: [],
    });
    taskInput.current.value = "";
  }

  function removeTask(index) {
    setTasks((prevTasks) => {
      const newTasks = prevTasks.filter((_, i) => i !== index);
      handleTasks(newTasks, project.title);
      return newTasks;
    });
  }

  return (
    <div
      className={`flex relative flex-col items-start justify-start pb-20 w-screen  md:w-full h-full pt-32 md:pt-10 px-8 md:rounded-2xl md:shadow-xl md:backdrop-blur-md `}
      style={{
        background: theme.glass,
        color: theme.text,
        overflowX: "hidden",
      }}
    >
      <h1
        className="text-4xl font-extrabold mb-2 tracking-tight"
        style={{ color: theme.text }}
      >
        {project.title}
      </h1>
      <p className="mb-1 text-lg" style={{ color: theme.accent }}>
        Starting Date:{" "}
        <span style={{ color: theme.text }}>{project.startDate}</span>
      </p>
      <p className="mb-4  text-lg" style={{ color: theme.accent }}>
        Due Date: <span style={{ color: theme.text }}>{project.dueDate}</span>
      </p>
      <pre
        className="text-lg w-full mb-6"
        style={{
          color: theme.text,
          whiteSpace: "pre-wrap",
          overflowX: "scroll",
        }}
      >
        {project.description}
      </pre>
      <div
        className="w-full my-5 border-t"
        style={{ borderColor: theme.accent }}
      ></div>

      <h2 className="text-2xl font-bold mb-4" style={{ color: theme.accent }}>
        Tasks
      </h2>

      <div className="flex flex-col items-center w-full">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAdding();
          }}
          className="flex flex-wrap justify-between mb-6 w-full gap-3"
        >
          <input
            ref={taskInput}
            type="text"
            required
            value={newTask.text}
            onChange={(e) => handleChange("text", e)}
            className="flex-1 px-5 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all"
            style={{
              background: theme.card,
              color: theme.text,
              borderColor: theme.accent,
              boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)",
            }}
            placeholder="Add a new task..."
          />
          <select
            value={newTask.priority}
            onChange={(e) => handleChange("priority", e)}
            className="px-3 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all"
            style={{
              background: theme.card,
              color: theme.text,
              borderColor: theme.accent,
            }}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <input
            type="date"
            required
            value={newTask.dueDate}
            onChange={(e) => handleChange("dueDate", e)}
            className="px-3 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all"
            style={{
              background: theme.card,
              color: theme.text,
              borderColor: theme.accent,
            }}
          />
          <button
            type="submit"
            className="px-5 ml-auto py-3 font-semibold rounded-lg shadow transition-all"
            style={{
              background: `linear-gradient(90deg, ${theme.accent}, ${theme.mode === "dark" ? "#6366f1" : "#818cf8"})`,
              color: "#fff",
            }}
          >
            Add Task
          </button>
        </form>
        <ul
          className="flex flex-col w-full gap-2 p-5 rounded-xl shadow-inner"
          style={{ background: theme.card }}
        >
          {tasks.map((task, index) => (
            <li
              key={index}
              className={`flex justify-between items-center w-full px-4 py-2 rounded-lg transition-all ${task.completed ? "line-through opacity-60" : ""}`}
              style={{
                background: theme.mode === "dark" ? "#1e293b99" : "#e2e8f099",
                color: theme.text,
                borderLeft:
                  task.priority === "high"
                    ? "4px solid #ef4444"
                    : task.priority === "medium"
                      ? "4px solid #f59e42"
                      : "4px solid #22c55e",
              }}
            >
              <div className="flex flex-col">
                <span>{task.text}</span>
                {task.dueDate && (
                  <span className="text-xs text-gray-400">
                    Due: {task.dueDate}
                  </span>
                )}
              </div>
              <div className="flex gap-2 items-center">
                <button
                  onClick={() => {
                    setTasks((prev) => {
                      const newTasks = prev.map((t, i) =>
                        i === index ? { ...t, completed: !t.completed } : t
                      );
                      handleTasks(newTasks, project.title);
                      return newTasks;
                    });
                  }}
                  className="text-sm font-semibold px-3 py-1 rounded transition-all"
                  style={{ color: task.completed ? "#22c55e" : theme.accent }}
                >
                  {task.completed ? "Undo" : "Complete"}
                </button>
                <button
                  onClick={() => removeTask(index)}
                  className="text-sm font-semibold px-3 py-1 rounded transition-all"
                  style={{ color: "#f87171" }}
                >
                  Clear
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={() => removeProject(project)}
        className="px-4 py-2 text-lg font-semibold absolute bottom-6 right-6"
        style={{ color: "#f87171" }}
      >
        Delete
      </button>
    </div>
  );
}
