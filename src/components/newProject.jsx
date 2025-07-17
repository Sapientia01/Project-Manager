import { useState } from "react";

export default function NewProject({ handleAddition, handleSaving }) {
  const [newProject, setNewProject] = useState({
    title: "",
    discription: "",
    date: "",
    tasks: [],
  });

  function handleChanges(property, e) {
    setNewProject((prevData) => ({
      ...prevData,
      [property]: e.target.value,
    }));
  }

  function handleAllSaving() {
    console.log("cccccc");
    handleAddition(newProject);
    handleSaving();
  }

  return (
    <>
      <div className="flex flex-col items-start justify-start w-full h-full pt-16 mx-auto">
        <div className="flex justify-end w-full gap-5 pr-5 ">
          <p
            className="px-3 py-2 text-xl hover:text-gray-500"
            onClick={handleSaving}
          >
            Cancel
          </p>{" "}
          <p
            className="px-3 py-2 text-xl text-white bg-gray-800 rounded-md hover:bg-gray-600"
            onClick={handleAllSaving}
          >
            Save
          </p>
        </div>

        <label
          htmlFor="Title"
          className="mt-4 text-2xl font-bold text-gray-600"
        >
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          required
          className="w-full px-5 py-3 mt-3 bg-gray-200 rounded"
          onChange={(e) => {
            handleChanges("title", e);
          }}
        />

        <label
          htmlFor="discription"
          className="mt-4 text-2xl font-bold text-gray-600 "
        >
          Discription
        </label>

        <textarea
          name="discription"
          id="discription"
          rows="5"
          required
          className="w-full px-5 py-3 mt-3 bg-gray-200 border-b-2 rounded border-b-gray-600"
          onChange={(e) => {
            handleChanges("discription", e);
          }}
        ></textarea>

        <label
          htmlFor="date"
          className="mt-4 text-2xl font-bold text-gray-600 "
        >
          Due Date
        </label>
        <input
          type="date"
          name="date"
          id="date"
          required
          className="w-full p-3 px-5 mt-3 bg-gray-200 rounded"
          onChange={(e) => {
            handleChanges("date", e);
          }}
        />
      </div>
    </>
  );
}
