import { useState, useEffect } from "react";
import "./CheckIn.css";

const moods = [
  { emoji: "😄", label: "Great" },
  { emoji: "🙂", label: "Good" },
  { emoji: "😐", label: "Okay" },
  { emoji: "😔", label: "Low" },
  { emoji: "😫", label: "Stressed" },
];

const todayKey = () => new Date().toISOString().slice(0, 10);

export default function CheckIn() {
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("checkins");
    return saved ? JSON.parse(saved) : [];
  });
  const [selected, setSelected] = useState(null);
  const [note, setNote] = useState("");

  useEffect(() => {
    localStorage.setItem("checkins", JSON.stringify(history));
  }, [history]);

  const today = history.find((h) => h.date === todayKey());

  const save = (e) => {
    e.preventDefault();
    if (!selected) return;
    const entry = { date: todayKey(), mood: selected, note };
    // اگه امروز قبلاً ثبت شده، جایگزینش کن
    setHistory([entry, ...history.filter((h) => h.date !== todayKey())]);
    setSelected(null);
    setNote("");
  };

  return (
    <main className="checkin">
      <h1>Daily Check-In</h1>
      <p className="sub">How are you feeling today?</p>

      {today && (
        <p className="done">
          Today you felt {today.mood.emoji} {today.mood.label}. You can update it below.
        </p>
      )}

      <form onSubmit={save}>
        <div className="moods">
          {moods.map((m) => (
            <button
              type="button"
              key={m.label}
              className={`mood ${selected?.label === m.label ? "selected" : ""}`}
              onClick={() => setSelected(m)}
            >
              <span>{m.emoji}</span>
              <small>{m.label}</small>
            </button>
          ))}
        </div>

        <textarea
          placeholder="Anything you want to add? (optional)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
        />

        <button type="submit" className="save-btn" disabled={!selected}>
          Save check-in
        </button>
      </form>

      <h2>Recent days</h2>
      {history.length === 0 && <p className="empty">No check-ins yet.</p>}
      <ul className="history">
        {history.slice(0, 7).map((h) => (
          <li key={h.date}>
            <span className="h-emoji">{h.mood.emoji}</span>
            <div>
              <strong>{h.date}</strong> · {h.mood.label}
              {h.note && <p>{h.note}</p>}
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}