import "./MyTasks.css";

export default function MyTasks({ tasks, setTasks }) {
  const toggleDone = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id
          ? { ...t, status: t.status === "completed" ? "todo" : "completed" }
          : t
      )
    );
  };

  return (
    <main className="my-tasks">
      <h1>My Tasks</h1>

      {tasks.length === 0 && <p className="empty">No tasks yet.</p>}

      <ul className="task-list">
        {tasks.map((t) => (
          <li key={t.id} className="task-item">
            <input
              type="checkbox"
              checked={t.status === "completed"}
              onChange={() => toggleDone(t.id)}
            />
            <span className={t.status === "completed" ? "done" : ""}>
              {t.title}
            </span>
            <span className={`priority ${t.priority}`}>{t.priority}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}