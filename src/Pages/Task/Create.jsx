import { useContext, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";

export default function Create() {
  const { token } = useContext(AppContext);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    priority: "",
  });
  async function handleCreate(e) {
    e.preventDefault();
    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (!response.ok) {
      setErrors(data.errors);
    } else {
      console.log(data);
      navigate("/");
    }
    // console.log(data);
  }
  return (
    <>
      <h1 className="title">Create New A Post</h1>

      <form onSubmit={handleCreate} className="w-1/2 mx-auto space-y-4">
        <div>
          <input
            className="border border-gray-300 p-2 w-full"
            type="text"
            placeholder="Task Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          {errors.name && <p className="text-red-500">{errors.name[0]}</p>}
        </div>
        <div>
          <input
            className="border border-gray-300 p-2 w-full"
            type="text"
            placeholder="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
          {errors.description && (
            <p className="text-red-500">{errors.description[0]}</p>
          )}
        </div>
        <div>
          <select
            className="border border-gray-300 p-2 w-full"
            style={{ borderRadius: "0.375rem" }}
            value={formData.priority}
            onChange={(e) =>
              setFormData({ ...formData, priority: e.target.value })
            }
          >
            <option value="">Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          {errors.priority && <p className="text-red-500">{errors.priority[0]}</p>}
        </div>

        <button type="submit" className="primary-btn">
          Create Task
        </button>
      </form>
    </>
  );
}
