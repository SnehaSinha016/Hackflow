import { useState } from "react";
import {
  ClipboardList,
  Flag,
  CheckCircle2,
  Circle,
  Plus,
  X,
} from "lucide-react";

const Tasks = ({ tasks = [] }) => {
  const [showModal, setShowModal] = useState(false);
  const [localTasks, setLocalTasks] = useState(tasks);

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "Medium",
    status: "pending",
    mvpCategory: "Must Have",
  });

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-600";
      case "medium":
        return "bg-yellow-100 text-yellow-700";
      case "low":
        return "bg-green-100 text-green-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-700";
      case "in progress":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddTask = (e) => {
    e.preventDefault();

    if (!newTask.title.trim()) return;

    const task = {
      ...newTask,
      title: newTask.title.trim(),
      description: newTask.description.trim(),
    };

    setLocalTasks((prev) => [...prev, task]);

    setNewTask({
      title: "",
      description: "",
      priority: "Medium",
      status: "pending",
      mvpCategory: "Must Have",
    });

    setShowModal(false);
  };

  const toggleTaskStatus = (index) => {
    setLocalTasks((prev) =>
      prev.map((task, i) =>
        i === index
          ? {
              ...task,
              status:
                task.status?.toLowerCase() === "completed"
                  ? "pending"
                  : "completed",
            }
          : task
      )
    );
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Tasks</h1>

          <p className="text-gray-500 mt-1">
            Manage all AI generated tasks for this project.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-5 py-3 rounded-xl transition"
        >
          <Plus size={18} />
          Add Task
        </button>
      </div>

      {/* Empty State */}
      {localTasks.length === 0 && (
        <div className="text-center py-16">
          <ClipboardList
            size={60}
            className="mx-auto text-gray-300"
          />

          <h2 className="text-2xl font-semibold mt-4">
            No Tasks Found
          </h2>

          <p className="text-gray-500 mt-2">
            Add a task to get started.
          </p>
        </div>
      )}

      {/* Tasks */}
      <div className="space-y-5">
        {localTasks.map((task, index) => (
          <div
            key={task._id || index}
            className="border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition"
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2
                    className={`text-xl font-semibold ${
                      task.status?.toLowerCase() === "completed"
                        ? "line-through text-gray-400"
                        : ""
                    }`}
                  >
                    {task.title}
                  </h2>

                  {task.mvpCategory && (
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        task.mvpCategory === "Must Have"
                          ? "bg-green-100 text-green-700"
                          : task.mvpCategory === "Should Have"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {task.mvpCategory}
                    </span>
                  )}
                </div>

                <p className="text-gray-500 mt-2">
                  {task.description || "No description provided."}
                </p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(
                  task.priority
                )}`}
              >
                {task.priority || "Medium"}
              </span>
            </div>

            <div className="flex items-center justify-between mt-6">
              <div className="flex items-center gap-6">
                {/* Priority */}
                <div className="flex items-center gap-2">
                  <Flag size={18} className="text-gray-500" />

                  <span className="text-gray-600">
                    {task.priority || "Medium"}
                  </span>
                </div>

                {/* Status */}
                <div className="flex items-center gap-2">
                  {task.status?.toLowerCase() === "completed" ? (
                    <CheckCircle2
                      size={18}
                      className="text-green-500"
                    />
                  ) : (
                    <Circle
                      size={18}
                      className="text-gray-400"
                    />
                  )}

                  <span
                    className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                      task.status
                    )}`}
                  >
                    {task.status || "Pending"}
                  </span>
                </div>
              </div>

              {/* Complete */}
              <button
                onClick={() => toggleTaskStatus(index)}
                className="px-4 py-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 text-sm font-medium"
              >
                {task.status?.toLowerCase() === "completed"
                  ? "Mark Pending"
                  : "Mark Complete"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Task Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold">
                  Add New Task
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Create a task for this project.
                </p>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddTask} className="space-y-5">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Task Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={newTask.title}
                  onChange={handleChange}
                  placeholder="Enter task title"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-violet-500"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Description
                </label>

                <textarea
                  name="description"
                  value={newTask.description}
                  onChange={handleChange}
                  placeholder="Enter task description"
                  rows="3"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>

              {/* Priority */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Priority
                </label>

                <select
                  name="priority"
                  value={newTask.priority}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              {/* MVP Category */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  MVP Category
                </label>

                <select
                  name="mvpCategory"
                  value={newTask.mvpCategory}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3"
                >
                  <option value="Must Have">Must Have</option>
                  <option value="Should Have">Should Have</option>
                  <option value="Could Have">Could Have</option>
                </select>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-3 border border-gray-300 rounded-xl hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-xl"
                >
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;