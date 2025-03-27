// src/pages/TaskList.js
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getTasks, updateTask, deleteTask } from "../services/taskService";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchTasks();
  }, [filter]);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      let statusFilter = "";
      if (filter === "pending") statusFilter = "pending";
      if (filter === "in-progress") statusFilter = "in progress";

      const data = await getTasks(statusFilter);
      // Filter out completed tasks (they have their own page)
      const filteredTasks = data.filter((task) => task.status !== "completed");
      setTasks(filteredTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateTask(id, { status: newStatus });
      if (newStatus === "completed") {
        setTasks(tasks.filter((task) => task._id !== id));
      } else {
        fetchTasks();
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };



  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1>All Tasks</h1>

        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 text-sm font-medium `}
          >
            All
          </button>
          <button
            onClick={() => setFilter("pending")}
            className={`px-4 py-2 text-sm font-medium`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilter("in-progress")}
            className={`px-4 py-2 text-sm font-medium`}
          >
            In Progress
          </button>

          <Link
            to="/tasks/new"
            className="btn inline-flex items-center justify-center w-full sm:w-auto"
          >
            Add New Task
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <div>loading...</div>
        </div>
      ) : tasks.length === 0 ? (
        <div>
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            No tasks found
          </h3>
          <p className="mt-2 text-gray-500">
            Get started by creating a new task.
          </p>
         
        </div>
      ) : (
        <div>
          {tasks.map((task) => (
            <div className="p-5">
              <div className="flex flex-col sm:flex-row justify-between">
                <div className="mb-3 sm:mb-0">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {task.name}
                  </h3>
                  {task.description && (
                    <p className="mt-1 text-gray-600 line-clamp-2">
                      {task.description}
                    </p>
                  )}
              
                </div>

                <div className="flex items-center gap-2">
                  {task.status !== "completed" && (
                    <button
                      onClick={() => handleStatusChange(task._id, "completed")}
                      className="p-2 "
                      title="Mark as completed"
                    >
                     complete
                    </button>
                  )}

                  <Link
                    to={`/tasks/edit/${task._id}`}
                    className="p-2 "
                    title="Edit task"
                  >
                   edit
                  </Link>

                  <button
                    onClick={() => handleDeleteTask(task._id)}
                    className="p-2 "
                    title="Delete task"
                  >
                   delete 
                  </button>

                  {task.status === "pending" && (
                    <button
                      onClick={() =>
                        handleStatusChange(task._id, "in progress")
                      }
                      className="px-3 py-1 "
                    >
                      Start
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
