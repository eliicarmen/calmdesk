import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./Calendar.css";

const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export default function Calendar() {
  const [current, setCurrent] = useState(new Date());

  const year = current.getFullYear();
  const month = current.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const today = new Date();
  const isToday = (d) =>
    d === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear();

  const changeMonth = (n) => setCurrent(new Date(year, month + n, 1));

  return (
    <div className="calendar">
      <p className="cal-title">CALENDAR</p>

      <div className="cal-nav">
        <button onClick={() => changeMonth(-1)}><ChevronLeft size={16} /></button>
        <span>
          {current.toLocaleString("en-US", { month: "long" })} {year}
        </span>
        <button onClick={() => changeMonth(1)}><ChevronRight size={16} /></button>
      </div>

      <div className="cal-grid">
        {days.map((d) => (
          <span key={d} className="cal-day-name">{d}</span>
        ))}
        {cells.map((d, i) => (
          <span key={i} className={`cal-cell ${d && isToday(d) ? "today" : ""}`}>
            {d}
          </span>
        ))}
      </div>
    </div>
  );
}