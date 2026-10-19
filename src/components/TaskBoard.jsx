import { useState } from "react";
import Column from "./Column";
import "./TaskBoard.css";

const nextStatus = {
  todo: "inprogress",
  inprogress: "completed",
};

const prevStatus = {
  inprogress: "todo",
  completed: "inprogress",
};

export default function TaskBoard({ tasks, setTasks }) {
  const [filters, setFilters] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newPriority, setNewPriority] = useState("medium");

  const toggleFilter = (p) => {
    setFilters(
      filters.includes(p)
        ? filters.filter((f) => f !== p)
        : [...filters, p]
    );
  };

  const filteredTasks =
    filters.length === 0
      ? tasks
      : tasks.filter((t) => filters.includes(t.priority));

  const moveTask = (id, direction = "next") => {
    const map = direction === "next" ? nextStatus : prevStatus;
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, status: map[t.status] } : t
      )
    );
  };

  const deleteTask = (id) => {
    const task = tasks.find((t) => t.id === id);
    if (!window.confirm(`Delete "${task.title}"?`)) return;
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const addTask = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    setTasks([
      ...tasks,
      { id: Date.now(), title: newTitle, status: "todo", priority: newPriority },
    ]);
    setNewTitle("");
    setNewPriority("medium");
    setShowForm(false);
  };

  return (
    <>
      <div className="filters">
        {["high", "medium", "low"].map((p) => (
          <label key={p} className="filter-check">
            <input
              type="checkbox"
              checked={filters.includes(p)}
              onChange={() => toggleFilter(p)}
            />
            {p} priority
          </label>
        ))}
      </div>

      {showForm && (
        <form className="task-form" onSubmit={addTask}>
          <input
            placeholder="Task title..."
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            autoFocus
          />

          <div className="radios">
            {["high", "medium", "low"].map((p) => (
              <label key={p} className="filter-check">
                <input
                  type="radio"
                  name="priority"
                  checked={newPriority === p}
                  onChange={() => setNewPriority(p)}
                />
                {p}
              </label>
            ))}
          </div>

          <button type="submit" className="save-btn">Save</button>
          <button type="button" className="cancel-btn" onClick={() => setShowForm(false)}>
            Cancel
          </button>
        </form>
      )}

      <div className="board">
        <Column title="To Do" status="todo" tasks={filteredTasks} onMove={moveTask} onDelete={deleteTask} />
        <Column title="In Progress" status="inprogress" tasks={filteredTasks} onMove={moveTask} onDelete={deleteTask} />
        <Column title="Completed" status="completed" tasks={filteredTasks} onMove={moveTask} onDelete={deleteTask} />
        <button className="add-btn" onClick={() => setShowForm(true)}>+ Add Task</button>
      </div>
    </>
  );
}