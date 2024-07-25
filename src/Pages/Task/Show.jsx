import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";

export default function Show() {
  const { token, selectedTask, setSelectedTask } = useContext(AppContext);
  const [task, setTask] = useState(selectedTask);
  const [loading, setLoading] = useState(!selectedTask); // State to manage loading
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
    setLoading(true);
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
        setLoading(false);
        return;
      }

      const data = await response.json();
      setTask(data); // Update the local state
      setSelectedTask(data); // Also update the context
    } catch (error) {
      console.error("Error fetching task:", error);
    } finally {
      setLoading(false);
    }
  }

  if (!token) {
    navigate("/login");
    return null;
  }

  return (
    <>
      {loading ? (
        <p className="title">Loading...</p>
      ) : (
        task &&
        task.attribute && (
          <>
            <h1 className="title">{task.attribute.name}</h1>
            <div className="mb-2 flex items-start justify-between">
              <div>
                <h2 className="font-bold text-2xl">{task.attribute.name}</h2>
                <small className="text-xs text-slate-600">
                  Created by {task.relationships.user_name} on{" "}
                  {new Date(task.attribute.created_at).toLocaleDateString()}
                </small>
              </div>
            </div>
            <p>{task.attribute.description}</p>
          </>
        )
      )}
    </>
  );
}
