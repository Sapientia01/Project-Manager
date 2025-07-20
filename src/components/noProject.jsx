import NoprojectImage from "../assets/no-projects.png";
import { useTheme } from "../store/themeContext";

export default function NoProject({ handleAdding }) {
  const { theme } = useTheme();

  return (
    <div
      className="flex flex-col items-center justify-center mx-auto mb-40  p-12"
      style={{ color: theme.text }}
    >
      <img
        src={NoprojectImage}
        alt="No Project"
        className="w-32 mb-6 opacity-80"
      />
      <h2
        className="mb-3 text-3xl font-extrabold tracking-tight"
        style={{ color: theme.text }}
      >
        No Project Selected
      </h2>
      <p
        className="mb-8 text-lg text-center max-w-xs"
        style={{ color: theme.text }}
      >
        Select a project or get started with a new one.
      </p>
      <button
        className="px-6 py-3 text-lg font-semibold rounded-xl shadow transition-all"
        style={{
          background: `linear-gradient(90deg, ${theme.accent}, ${theme.mode === "dark" ? "#6366f1" : "#818cf8"})`,
          color: "#fff",
        }}
        onClick={handleAdding}
      >
        Create New Project
      </button>
    </div>
  );
}
