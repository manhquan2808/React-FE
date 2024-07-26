import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";

export default function Show() {
  const { token, selectedTask, setSelectedTask } = useContext(AppContext);
  const [task, setTask] = useState(selectedTask);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    if (!task || task.id !== id) {
      fetchTaskById(id);
    }
  }, [token, id]);

  async function fetchTaskById(id) {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          navigate("/login");
        } else {
          console.error("Failed to fetch task");
        }
        return;
      }

      const data = await response.json();
      setTask(data);
      setSelectedTask(data);
    } catch (error) {
      console.error("Error fetching task:", error);
    }
  }

  if (!token) {
    navigate("/login");
    return null;
  }

  return (
    <>
      {task && task.attribute ? (
        <>
          <h1 className="title">Detail of task {task.attribute.name}</h1>
          <div className="mt-4 p-4 border rounded-md border-dashed border-slate-400">
            <div className="mb-2 flex items-start justify-between">
              <div>
                <h2 className="font-bold text-2xl">{task.attribute.name}</h2>
                <small className="text-xs text-slate-600">
                  Created by {task.relationships.user_name} on{" "}
                  {new Date(task.attribute.created_at).toLocaleDateString()}
                </small>
                <p>{task.attribute.description}</p>
              </div>
              <div className="flex items-center justify-end gap-4">
                <Link
                  to={`/tasks/update/${task.id}`}
                  className="bg-cyan-300 rounded-md border border-cyan-800 px-3 py-1 text-sm"
                >
                  Update
                </Link>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p className="title">Loading...</p>
      )}
    </>
  );
}
