import { useState, useRef } from "react";

export default function Project({ project, handleTasks }) {
  const [tasks, setTasks] = useState(project.tasks);
  const [newTask, setNewTask] = useState("");
  const taskInput = useRef();

  function handleChange(e) {
    setNewTask(e.target.value);
  }

  function handleAdding() {
    setTasks((prevTasks) => [...prevTasks, newTask]);
    handleTasks(tasks, project.title);
    taskInput.current.target.value = "";
  }

  function removeTask(index) {
    setTasks((prevTasks) => {
      prevTasks.pop(index);

      return [...prevTasks];
    });

    handleTasks(tasks, project.title);
  }

  return (
    <>
      <div className="flex flex-col items-start justify-start w-full h-full pt-16 mx-auto">
        <h1 className="text-5xl font-bold">{project.title}</h1>
        <p className="mt-4 mb-6 text-xl text-gray-500">{project.date}</p>
        <p className="text-xl"> {project.discription}</p>
        <div className="w-full my-5 border-2 border-black"></div>

        <h1 className="text-4xl font-bold text-gray-700">Tasks</h1>

        <div className="flex flex-col items-center mt-6">
          <div className="flex mb-5">
            <input
              ref={taskInput}
              type="text"
              onChange={(e) => {
                handleChange(e);
              }}
              className="px-5 py-2 mr-3 bg-gray-200 rounded w-96"
            />
            <button
              onClick={() => {
                handleAdding();
              }}
              className="text-xl font-bold text-gray-500 "
            >
              Add Task
            </button>
          </div>
          <ul className="flex flex-col w-full gap-1 p-5 text-black bg-gray-200 rounded ">
            {project.tasks.map((task, index) => (
              <li key={index} className="flex justify-between w-full px-2">
                {task} <button onClick={() => removeTask(index)}>Clear</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
