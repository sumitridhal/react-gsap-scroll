import { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import "./ThemeSelector.css";

interface Theme {
  name: string;
  displayName: string;
  colors: {
    bg: string;
    text: string;
    primary: string;
  };
}

const themes: Theme[] = [
  {
    name: "warm-beige",
    displayName: "Warm Beige",
    colors: { bg: "#E5D9D0", text: "#DBCFC6", primary: "#8B7B6B" },
  },
  {
    name: "cool-grey",
    displayName: "Cool Grey",
    colors: { bg: "#D6E3E8", text: "#C8D1D8", primary: "#6B7B8B" },
  },
  {
    name: "dark",
    displayName: "Dark Mode",
    colors: { bg: "#1A1A1A", text: "#E8E8E8", primary: "#FFFFFF" },
  },
  {
    name: "forest",
    displayName: "Forest",
    colors: { bg: "#E8F0DC", text: "#D4E0C8", primary: "#6B8B5A" },
  },
  {
    name: "sunset",
    displayName: "Sunset",
    colors: { bg: "#F8F0E8", text: "#F4E6D8", primary: "#B8835A" },
  },
  {
    name: "ocean",
    displayName: "Ocean",
    colors: { bg: "#DCE8F0", text: "#C8D8E8", primary: "#5A7B9A" },
  },
  {
    name: "lavender",
    displayName: "Lavender",
    colors: { bg: "#F0E8F4", text: "#E0D8E8", primary: "#8B6B9A" },
  },
];

const ThemeSelector = () => {
  const { currentTheme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const handleThemeChange = (themeName: string) => {
    setTheme(themeName);
    setIsOpen(false);
  };

  const currentThemeObj =
    themes.find((t) => t.name === currentTheme) || themes[0];

  return (
    <div className="theme-selector">
      <button
        className="theme-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle theme selector"
      >
        <div className="theme-preview">
          <div
            className="color-dot bg-color"
            style={{ backgroundColor: currentThemeObj.colors.bg }}
          />
          <div
            className="color-dot text-color"
            style={{ backgroundColor: currentThemeObj.colors.primary }}
          />
        </div>
        <span className="theme-name">{currentThemeObj.displayName}</span>
        <svg
          className={`chevron ${isOpen ? "open" : ""}`}
          width="16"
          height="16"
          viewBox="0 0 16 16"
        >
          <path
            d="M4 6l4 4 4-4"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="theme-dropdown">
          {themes.map((theme) => (
            <button
              key={theme.name}
              className={`theme-option ${
                theme.name === currentTheme ? "active" : ""
              }`}
              onClick={() => handleThemeChange(theme.name)}
            >
              <div className="theme-preview">
                <div
                  className="color-dot bg-color"
                  style={{ backgroundColor: theme.colors.bg }}
                />
                <div
                  className="color-dot text-color"
                  style={{ backgroundColor: theme.colors.primary }}
                />
              </div>
              <span className="theme-name">{theme.displayName}</span>
              {theme.name === currentTheme && (
                <svg
                  className="checkmark"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M13.5 4.5l-7 7-3-3"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeSelector;
