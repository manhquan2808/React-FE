import { useContext, useEffect, useState } from "react";
import { AppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { token, setSelectedTask } = useContext(AppContext);
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  async function getTasks() {
    const response = await fetch("/api/tasks", {
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (response.ok) {
      setTasks(data.data);
    }
  }
  useEffect(() => {
    getTasks();
  }, []);

  function handleTaskClick(task) {
    setSelectedTask(task);
    navigate(`tasks/${task.id}`);
  }
  return (
    <>
      <h1 className="title">List Of Tasks</h1>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div
            key={task.id}
            className="mb-4 p-4 border rounded-md border-dashed border-slate-400"
            onClick={() => handleTaskClick(task)}
          >
            <div className="mb-2 flex items-start justify-between">
              <div>
                <h2 className="font-bold text-2xl">{task.attribute.name}</h2>
                <small className="text-xs text-slate-600">
                  Created by {task.relationships.user_name} on{" "}
                  {new Date(task.attribute.created_at).toLocaleTimeString()}
                </small>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="title">There are no tasks</p>
      )}
    </>
  );
}
