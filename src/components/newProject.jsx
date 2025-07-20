import { useState } from "react";
import { useTheme } from "../store/themeContext";

export default function NewProject({ handleAddition, handleSaving }) {
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    startDate: "",
    dueDate: "",
    tasks: [],
    attachments: [],
  });
  const { theme } = useTheme();

  function handleChanges(property, e) {
    setNewProject((prevData) => ({
      ...prevData,
      [property]: e.target.value,
    }));
  }

  function handleAllSaving() {
    handleAddition(newProject);
    handleSaving();
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleAllSaving();
      }}
      className="flex flex-col items-start justify-start w-full h-full pt-32 md:pt-10 px-8 md:rounded-2xl shadow-xl backdrop-blur-md"
      style={{ background: theme.glass, color: theme.text }}
    >
      <div className="flex justify-end w-full gap-4 mb-6">
        <button
          className="px-4 py-2 text-lg rounded-lg transition-all"
          style={{
            background: theme.card,
            color: theme.text,
            border: `1px solid ${theme.accent}`,
          }}
          onClick={handleSaving}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 text-lg font-semibold rounded-lg shadow transition-all"
          style={{
            background: `linear-gradient(90deg, ${theme.accent}, ${theme.mode === "dark" ? "#6366f1" : "#818cf8"})`,
            color: "#fff",
          }}
        >
          Save
        </button>
      </div>

      <label
        htmlFor="Title"
        className="mt-2 text-xl font-bold"
        style={{ color: theme.accent }}
      >
        Title
      </label>
      <input
        type="text"
        name="title"
        id="title"
        required
        className="w-full px-5 py-3 mt-2 mb-4 rounded-lg border focus:outline-none focus:ring-2 transition-all"
        style={{
          background: theme.card,
          color: theme.text,
          borderColor: theme.accent,
        }}
        onChange={(e) => handleChanges("title", e)}
        placeholder="Project title..."
      />

      <label
        htmlFor="description"
        className="mt-2 text-xl font-bold"
        style={{ color: theme.accent }}
      >
        Description
      </label>
      <textarea
        name="description"
        id="description"
        rows="4"
        required
        className="w-full px-5 py-3 mt-2 mb-4 rounded-lg border focus:outline-none focus:ring-2 transition-all"
        style={{
          background: theme.card,
          color: theme.text,
          borderColor: theme.accent,
        }}
        onChange={(e) => handleChanges("description", e)}
        placeholder="Describe your project..."
      ></textarea>

      <label
        htmlFor="startDate"
        className="mt-2 text-xl font-bold"
        style={{ color: theme.accent }}
      >
        Start Date
      </label>
      <input
        type="date"
        name="startDate"
        id="startDate"
        required
        className="w-full px-5 py-3 mt-2 mb-4 rounded-lg border focus:outline-none focus:ring-2 transition-all"
        style={{
          background: theme.card,
          color: theme.text,
          borderColor: theme.accent,
        }}
        onChange={(e) => handleChanges("startDate", e)}
      />
      <label
        htmlFor="dueDate"
        className="mt-2 text-xl font-bold"
        style={{ color: theme.accent }}
      >
        Due Date
      </label>
      <input
        type="date"
        name="dueDate"
        id="dueDate"
        required
        className="w-full px-5 py-3 mt-2 rounded-lg border focus:outline-none focus:ring-2 transition-all"
        style={{
          background: theme.card,
          color: theme.text,
          borderColor: theme.accent,
        }}
        onChange={(e) => handleChanges("dueDate", e)}
      />
    </form>
  );
}
