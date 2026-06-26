import { useState } from "react";
import { X } from "lucide-react";
import { updateProject } from "../../api/projectApi";

const EditProjectModal = ({
  project,
  setProject,
  onClose,
}) => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: project.title || "",
    tagline: project.tagline || "",
    description: project.description || "",
    difficulty: project.difficulty || "Medium",
    teamSize: project.teamSize || "",
    estimatedDuration: project.estimatedDuration || "",
    priority: project.priority || "Medium",
    status: project.status || "Planning",
    deadline: project.deadline
      ? project.deadline.slice(0, 10)
      : "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      const updated = await updateProject(
        project._id,
        formData
      );

      setProject(updated);

      onClose();
    } catch (err) {
      console.log(err);
      alert("Failed to update project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-30">

     <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 relative shadow-2xl">

        {/* Close */}

        <button
          onClick={onClose}
          className="absolute top-5 right-5"
        >
          <X size={22} />
        </button>

        <h2 className="text-2xl font-bold mb-6">
          Edit Project
        </h2>

       <div className="grid grid-cols-2 gap-4">

          {/* Title */}

          <div className="col-span-2">

            <label className="font-medium">
              Project Title
            </label>

            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
             className="mt-1.5 w-full border rounded-lg px-3 py-2.5"
            />

          </div>

          {/* Tagline */}

          <div className="col-span-2">

            <label className="font-medium">
              Tagline
            </label>

            <input
              name="tagline"
              value={formData.tagline}
              onChange={handleChange}
             className="mt-1.5 w-full border rounded-lg px-3 py-2.5"
            />

          </div>

          {/* Description */}

          <div className="col-span-2">

            <label className="font-medium">
              Description
            </label>

            <textarea
              rows={4}
              name="description"
              value={formData.description}
              onChange={handleChange}
            className="mt-1.5 w-full border rounded-lg px-3 py-2.5"
            />

          </div>

          {/* Difficulty */}

          <div>

            <label>Difficulty</label>

            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
             className="mt-1.5 w-full border rounded-lg px-3 py-2.5"
            >
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>

          </div>

          {/* Team */}

          <div>

            <label>Team Size</label>

            <input
              name="teamSize"
              value={formData.teamSize}
              onChange={handleChange}
              className="mt-1.5 w-full border rounded-lg px-3 py-2.5"
            />

          </div>

          {/* Duration */}

          <div>

            <label>Estimated Duration</label>

            <input
              name="estimatedDuration"
              value={formData.estimatedDuration}
              onChange={handleChange}
             className="mt-1.5 w-full border rounded-lg px-3 py-2.5"
            />

          </div>

          {/* Deadline */}

          <div>

            <label>Deadline</label>

            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              className="mt-1.5 w-full border rounded-lg px-3 py-2.5"
            />

          </div>

          {/* Priority */}

          <div>

            <label>Priority</label>

            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
             className="mt-1.5 w-full border rounded-lg px-3 py-2.5"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>

          </div>

          {/* Status */}

          <div>

            <label>Status</label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-1.5 w-full border rounded-lg px-3 py-2.5"
            >
              <option>Planning</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>

          </div>

        </div>

        {/* Footer */}

        <div className="sticky bottom-0 bg-white pt-4 mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
           className="px-5 py-2.5 border rounded-xl"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={handleSave}
            className="px-5 py-2.5 bg-violet-600 text-white rounded-xl hover:bg-violet-700"
          >
            {loading
              ? "Saving..."
              : "Save Changes"}
          </button>

        </div>

      </div>

    </div>
  );
};

export default EditProjectModal;