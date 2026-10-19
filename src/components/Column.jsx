import TaskCard from "./TaskCard";

export default function Column({ title, status, tasks, onMove, onDelete }) {
  const columnTasks = tasks.filter((t) => t.status === status);

  return (
    <div className="column">
      <h2>{title} <span>{columnTasks.length}</span></h2>
      {columnTasks.map((t) => (
        <TaskCard key={t.id} task={t} onMove={onMove} onDelete={onDelete} />
      ))}
    </div>
  );
}