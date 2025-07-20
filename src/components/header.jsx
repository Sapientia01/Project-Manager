import { useTheme } from "../store/themeContext";

export default function Header({ handleSidebarToggle, toggleTheme }) {
  const { theme } = useTheme();

  const headerStyle = {
    background: theme.headerBg,
    color: theme.text,
    borderBottom: `1px solid ${theme.border}`,
    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
  };

  const themeBtnStyle = {
    background: theme.card,
    color: theme.accent,
    border: `2px solid ${theme.accent}`,
  };

  return (
    <>
      <div className=" w-full md:h-0 h-20 fixed z-50 " style={headerStyle}>
        {/* Theme Toggle Button */}

        <button
          className="fixed top-6 right-6 z-50 px-4 py-2 rounded-full shadow-lg font-semibold text-sm transition-all duration-200 focus:outline-none"
          style={themeBtnStyle}
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme.mode === "dark" ? "🌙" : "☀️"}
        </button>
        {/* Sidebar Toggle Button (mobile) */}
        <button
          className={`fixed top-6 left-6 z-40 font-semibold text-2xl transition-all duration-200 focus:outline-none md:hidden bg-transparent  `}
          onClick={handleSidebarToggle}
          aria-label="Toggle sidebar"
        >
          ☰
        </button>
      </div>
    </>
  );
}
