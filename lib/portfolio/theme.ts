export const themeStorageKey = "arzen-theme";

export type Theme = "dark" | "light";

export function readTheme(): Theme {
  try {
    return localStorage.getItem(themeStorageKey) === "light" ? "light" : "dark";
  } catch {
    return "dark";
  }
}

export function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.style.colorScheme = theme;
  try {
    localStorage.setItem(themeStorageKey, theme);
  } catch {
    // Ignore blocked storage.
  }
}
