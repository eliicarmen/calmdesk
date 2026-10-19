import { Search, Bell, Moon, Sun, LogOut } from "lucide-react";
import "./Header.css";

export default function Header({ theme, onToggleTheme }) {
  return (
    <header className="header">
      <div className="search">
        <Search size={16} />
        <input placeholder="Search..." />
      </div>

      <div className="header-right">
        <button className="icon-btn"><Bell size={18} /></button>
        <button className="icon-btn" onClick={onToggleTheme}>
          {theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
        </button>
        <div className="user">
          <strong>Josseyreign</strong>
          <small>STUDENT</small>
        </div>
        <button className="icon-btn"><LogOut size={18} /></button>
      </div>
    </header>
  );
}