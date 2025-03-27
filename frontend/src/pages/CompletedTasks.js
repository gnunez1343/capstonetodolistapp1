// src/pages/CompletedTasks.js
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getTasks,deleteTask } from "../services/taskService";

const CompletedTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompletedTasks();
  }, []);

  const fetchCompletedTasks = async () => {
    setLoading(true);
    try {
      const data = await getTasks("completed");
      setTasks(data);
    } catch (error) {
      console.error("Error fetching completed tasks:", error);
    } finally {
      setLoading(false);
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
      <h1>Completed Tasks</h1>

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <div>loading....</div>
        </div>
      ) : tasks.length === 0 ? (
        <div>
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            No completed tasks yet
          </h3>
          <p className="mt-2 text-gray-500">
            Tasks that you mark as completed will appear here.
          </p>
          <div className="mt-6">
            <Link to="/tasks" className="btn inline-flex items-center">
              Go to Tasks
            </Link>
          </div>
        </div>
      ) : (
        <>
          {tasks.map((task) => (
            <div className="p-5">
              <div className="flex flex-col sm:flex-row justify-between">
                <div className="mb-3 sm:mb-0">
                  <h3 className="text-lg text-gray-900">{task.name}</h3>
                  {task.description && (
                    <p className="mt-1 text-gray-500 line-clamp-2">
                      {task.description}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDeleteTask(task._id)}
                    className="p-2"
                    title="Delete task"
                  >
                    delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default CompletedTasks;
