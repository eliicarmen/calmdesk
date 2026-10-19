import { NavLink } from "react-router-dom";
import { Home, Smile, CheckCircle, PenLine, Settings } from "lucide-react";
import "./Sidebar.css";

const items = [
  { label: "Home", icon: Home, to: "/" },
  { label: "Daily Check-In", icon: Smile, to: "/check-in" },
  { label: "My Tasks", icon: CheckCircle, to: "/tasks" },
  { label: "Daily Journal", icon: PenLine, to: "/journal" },
  { label: "Settings", icon: Settings, to: "/settings" },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="logo">CalmDesk</h2>
      <nav>
        {items.map(({ label, icon: Icon, to }) => (
          <NavLink
            key={label}
            to={to}
            end
            className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}