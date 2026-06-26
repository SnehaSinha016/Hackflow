import {
  ClipboardList,
  Flag,
  CheckCircle2,
  Circle,
  Plus,
} from "lucide-react";

const Tasks = ({ tasks = [] }) => {
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

  return (
    <div className="bg-white rounded-3xl shadow-sm p-8">

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-3xl font-bold">
            Tasks
          </h1>

          <p className="text-gray-500 mt-1">
            Manage all AI generated tasks for this project.
          </p>

        </div>

        <button className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-5 py-3 rounded-xl">

          <Plus size={18} />

          Add Task

        </button>

      </div>

      {/* Empty */}

      {tasks.length === 0 && (
        <div className="text-center py-16">

          <ClipboardList
            size={60}
            className="mx-auto text-gray-300"
          />

          <h2 className="text-2xl font-semibold mt-4">
            No Tasks Found
          </h2>

          <p className="text-gray-500 mt-2">
            AI generated tasks will appear here.
          </p>

        </div>
      )}

      {/* Tasks */}

      <div className="space-y-5">

        {tasks.map((task, index) => (

          <div
            key={index}
            className="border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition"
          >

            <div className="flex justify-between items-start">

              <div>

                <h2 className="text-xl font-semibold">

                  {task.title}

                </h2>

                <p className="text-gray-500 mt-2">

                  {task.description}

                </p>

              </div>

              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(
                  task.priority
                )}`}
              >
                {task.priority}
              </span>

            </div>

            <div className="flex items-center gap-6 mt-6">

              <div className="flex items-center gap-2">

                <Flag
                  size={18}
                  className="text-gray-500"
                />

                <span className="text-gray-600">

                  {task.priority}

                </span>

              </div>

              <div className="flex items-center gap-2">

                {task.status === "completed" ? (
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
                  {task.status}
                </span>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default Tasks;