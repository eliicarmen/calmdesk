import TaskBoard from "../components/TaskBoard";
import Calendar from "../components/Calendar";
import QuoteCard from "../components/QuoteCard";

export default function Home({ tasks, setTasks }) {
  return (
    <main className="home">
      <h1 className="home-title">Welcome back 👋</h1>
      <div className="home-layout">
        <div className="home-main">
          <TaskBoard tasks={tasks} setTasks={setTasks} />
        </div>
        <aside className="right-col">
          <Calendar />
          <QuoteCard />
        </aside>
      </div>
    </main>
  );
}