import {
  Pencil,
  MoreVertical,
  FolderKanban,
  Users,
  Calendar,
  Flag,
  Clock,
} from "lucide-react";

import { useState } from "react";
import EditProjectModal from "./EditProjectModal";

const ProjectHeader = ({ project, setProject }) => {

  const [showEdit, setShowEdit] = useState(false);
  if (!project) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm p-8">

      <div className="flex flex-col lg:flex-row justify-between gap-6">

        {/* Left */}

        <div className="flex gap-5">

          <div className="w-16 h-16 rounded-2xl bg-violet-600 flex items-center justify-center shadow-lg">

            <FolderKanban
              className="text-white"
              size={30}
            />

          </div>

          <div>

            <h1 className="text-3xl font-bold">
              {project.title}
            </h1>

            <p className="text-gray-500 mt-2">
              {project.tagline || project.subtitle || "AI Generated Project"}
            </p>

            <div className="flex flex-wrap gap-3 mt-4">

              <span className="px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-sm">
                {project.difficulty || "Medium"}
              </span>

              <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                {project.teamSize || "2-3 Members"}
              </span>

              <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-sm">
                {project.estimatedDuration || "24 Hours"}
              </span>

            </div>

          </div>

        </div>

        {/* Right Buttons */}

        <div className="flex gap-3 self-start">

         <button
  onClick={() => setShowEdit(true)}
  className="border px-5 py-2 rounded-xl hover:bg-violet-50 flex items-center gap-2 transition"
>

  <Pencil size={18} />

  Edit

</button>

          <button className="border p-3 rounded-xl hover:bg-gray-100 transition">

            <MoreVertical size={20} />

          </button>

        </div>

      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-4 gap-4 mt-8">

        <div className="bg-slate-50 rounded-xl p-4 flex items-center gap-3">

          <Users className="text-violet-600" />

          <div>

            <p className="text-xs text-gray-500">
              Team Size
            </p>

            <p className="font-semibold">
              {project.teamSize || "Not Assigned"}
            </p>

          </div>

        </div>

        <div className="bg-slate-50 rounded-xl p-4 flex items-center gap-3">

          <Clock className="text-violet-600" />

          <div>

            <p className="text-xs text-gray-500">
              Duration
            </p>

            <p className="font-semibold">
              {project.estimatedDuration || "N/A"}
            </p>

          </div>

        </div>

        <div className="bg-slate-50 rounded-xl p-4 flex items-center gap-3">

          <Flag className="text-violet-600" />

          <div>

            <p className="text-xs text-gray-500">
              Difficulty
            </p>

            <p className="font-semibold">
              {project.difficulty || "Medium"}
            </p>

          </div>

        </div>

        <div className="bg-slate-50 rounded-xl p-4 flex items-center gap-3">

          <Calendar className="text-violet-600" />

          <div>

  <p className="text-xs text-gray-500">
    Deadline
  </p>

  <p className="font-semibold">
    {project.deadline
      ? new Date(project.deadline).toLocaleDateString(
          "en-IN",
          {
            day: "numeric",
            month: "short",
            year: "numeric",
          }
        )
      : "Not Set"}
  </p>

</div>

        </div>

      </div>
      {showEdit && (
  <EditProjectModal
    project={project}
    setProject={setProject}
    onClose={() => setShowEdit(false)}
  />
)}

    </div>
  );
};

export default ProjectHeader;