import { Trash2 } from "lucide-react";

export default function TaskCard({ task, onMove, onDelete }) {
  return (
    <div className="card">
      <div className="card-top">
        <h3>{task.title}</h3>
        <button className="delete-btn" onClick={() => onDelete(task.id)}>
          <Trash2 size={15} />
        </button>
      </div>

      <div className="card-bottom">
        <span className={`priority ${task.priority}`}>{task.priority}</span>

        <div className="move-group">
          {task.status !== "todo" && (
            <button className="move-btn" onClick={() => onMove(task.id, "prev")}>←</button>
          )}
          {task.status !== "completed" && (
            <button className="move-btn" onClick={() => onMove(task.id, "next")}>→</button>
          )}
        </div>
      </div>
    </div>
  );
}