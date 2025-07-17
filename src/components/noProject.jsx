import NoprojectImage from "../assets/no-projects.png";

export default function NoProject({ handleAdding }) {
  return (
    <>
      <div className="flex flex-col items-center mx-auto mb-60 ">
        <img src={NoprojectImage} alt="No Project" className="w-32 mb-5" />
        <h2 className="mb-4 text-3xl font-bold">No Project Selected</h2>
        <p className="mb-6 text-xl text-gray-500 ">
          Select a project or get started with new one
        </p>

        <button
          className="px-3 py-2 text-xl text-gray-400 bg-gray-800 rounded hover:bg-gray-600"
          onClick={handleAdding}
        >
          Create New Project
        </button>
      </div>
    </>
  );
}
