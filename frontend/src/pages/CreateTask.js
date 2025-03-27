// src/pages/CreateTask.js
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createTask } from "../services/taskService";
import "../App.css";

const CreateTask = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    dueDate: null,
    priority: "medium",
  });

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
      await createTask(formData);
      navigate("/tasks");
    } catch (error) {
      console.error("Error creating task:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <Link
          to="/tasks"
          className="inline-flex items-center text-gray-600"
        >
          Back to Tasks
        </Link>
      </div>
        <div className="py-4 px-6">
          <h1 className="text-xl font-bold">Create a New Task</h1>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6 flex flex-col gap-2 justify-start items-start">
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
             
            />
          </div>

          <div className="mb-6 flex flex-col items-start gap-2">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              className="form-input w-full "
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter task description"
            ></textarea>
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-3 mt-8">
            <Link to="/tasks" className="btn btn-secondary">
              Cancel
            </Link>
            <button
              type="submit"
              className="btn "
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  Creating...
                </span>
              ) : (
                "Create Task"
              )}
            </button>
          </div>
        </form>
    </div>
  );
};

export default CreateTask;
