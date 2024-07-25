import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";

export default function Show() {
  const { token } = useContext(AppContext);
  const [tasks, setTasks] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  if (!token) {
    navigate("/login");
  }
  async function getTasks() {
    const response = await fetch(`/api/tasks/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        console.error("Unauthorized! Redirecting to login.");
      }
      throw new Error("Failed to fetch tasks");
    }

    const data = await response.json();
    setTasks(data.tasks);
  }

  useEffect(() => {
    getTasks();
  }, [id]);

  return (
    <>
    {tasks ? (
      <div className="mb-4 p-4 border rounded-md border-dashed border-slate-400">
        <h1 className="title">{tasks.name}</h1>
        <div className="mb-2 flex items-start justify-between">
          <div>
            <h2 className="font-bold text-2xl">{tasks.attribute.name}</h2>
            <small className="text-xs text-slate-600">
              Created by {tasks.relationships.user_name} on{" "}
              {new Date(tasks.attribute.created_at).toLocaleTimeString()}
            </small>
          </div>
        </div>
        <p>{tasks.attribute.description}</p>
      </div>
    ) : (
      <p className="title">Loading...</p>
    )}
  </>
  );
}
