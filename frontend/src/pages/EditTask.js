// src/pages/EditTask.js
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getTask, updateTask } from "../services/taskService";

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const task = await getTask(id);
        setFormData({
          ...task,
          dueDate: task.dueDate ? new Date(task.dueDate) : null,
        });
      } catch (error) {
        console.error("Error fetching task:", error);
        navigate("/tasks");
      } finally {
        setInitialLoading(false);
      }
    };

    fetchTask();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await updateTask(id, formData);
      navigate("/tasks");
    } catch (error) {
      console.error("Error updating task:", error);
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="w-10 h-10 border-4"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <Link
          to="/tasks"
          className="inline-flex items-center"
        >
          Back to Tasks
        </Link>
      </div>

 
        <div className=" py-4 px-6">
          <h1 className="text-xl font-bold">Edit Task</h1>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <label htmlFor="name" className="form-label">
              Task Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-input w-full"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter task name"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              className="form-input w-full"
              value={formData.description || ""}
              onChange={handleChange}
              placeholder="Enter task description"
            ></textarea>
          </div>

   

          <div className="flex flex-col sm:flex-row justify-end gap-3 mt-8">
            <Link to="/tasks" className="btn ">
              Cancel
            </Link>
            <button
              type="submit"
              className="btn"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  Saving...
                </span>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
    </div>
  );
};

export default EditTask;
