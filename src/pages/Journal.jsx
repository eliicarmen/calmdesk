import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import "./Journal.css";

export default function Journal() {
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem("journal");
    return saved ? JSON.parse(saved) : [];
  });
  const [text, setText] = useState("");

  useEffect(() => {
    localStorage.setItem("journal", JSON.stringify(entries));
  }, [entries]);

  const addEntry = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    const entry = {
      id: Date.now(),
      text,
      date: new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };
    setEntries([entry, ...entries]);
    setText("");
  };

  const deleteEntry = (id) => {
    if (!window.confirm("Delete this entry?")) return;
    setEntries(entries.filter((en) => en.id !== id));
  };

  return (
    <main className="journal">
      <h1>Daily Journal</h1>

      <form className="journal-form" onSubmit={addEntry}>
        <textarea
          placeholder="How was your day?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
        />
        <button type="submit" className="save-btn">Save entry</button>
      </form>

      {entries.length === 0 && <p className="empty">No entries yet.</p>}

      {entries.map((en) => (
        <article key={en.id} className="entry">
          <div className="entry-top">
            <small>{en.date}</small>
            <button className="delete-btn" onClick={() => deleteEntry(en.id)}>
              <Trash2 size={15} />
            </button>
          </div>
          <p>{en.text}</p>
        </article>
      ))}
    </main>
  );
}