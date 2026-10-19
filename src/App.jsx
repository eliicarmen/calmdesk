import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Home from "./pages/Home";
import MyTasks from "./pages/MyTasks";
import Journal from "./pages/Journal";
import Settings from "./pages/Settings";
import CheckIn from "./pages/CheckIn";

const defaultTasks = [
  { id: 1, title: "Modification of project", status: "inprogress", priority: "high" },
  { id: 2, title: "Learn React", status: "todo", priority: "medium" },
];

const defaultSettings = {
  font: "Inter, sans-serif",
  fontScale: 1,
  compact: false,
  showHandles: true,
};

export default function App() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "dark"
  );

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : defaultTasks;
  });

  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem("settings");
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings));
    document.body.style.fontFamily = settings.font;
    document.documentElement.style.fontSize = `${settings.fontScale * 16}px`;
    document.documentElement.setAttribute("data-compact", settings.compact);
  }, [settings]);

  const toggleTheme = () =>
    setTheme(theme === "dark" ? "light" : "dark");

  return (
    <div className="app">
      <Sidebar />
      <div className="content">
        <Header theme={theme} onToggleTheme={toggleTheme} />
        <Routes>
          <Route path="/" element={<Home tasks={tasks} setTasks={setTasks} />} />
          <Route path="/tasks" element={<MyTasks tasks={tasks} setTasks={setTasks} />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/check-in" element={<CheckIn />} />
          <Route
            path="/settings"
            element={
              <Settings
                settings={settings}
                setSettings={setSettings}
                defaults={defaultSettings}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}