import {
  FolderKanban,
  Users,
  Clock,
  Flag,
  MoreVertical,
  ArrowRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();

  const tasks = project.tasks || [];

  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  ).length;

  const progress =
    tasks.length === 0
      ? 0
      : Math.round((completedTasks / tasks.length) * 100);

  const progressColor =
    progress >= 80
      ? "bg-green-500"
      : progress >= 40
      ? "bg-amber-500"
      : "bg-red-500";

  const status =
    progress === 100
      ? "Completed"
      : progress >= 40
      ? "In Progress"
      : "Planning";

  const statusColor =
    progress === 100
      ? "bg-green-100 text-green-700"
      : progress >= 40
      ? "bg-yellow-100 text-yellow-700"
      : "bg-blue-100 text-blue-700";

  return (
    <div className="group bg-white rounded-3xl border border-gray-200 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">

      {/* Header */}

      <div className="p-6">

        <div className="flex justify-between items-start">

          <div className="flex gap-4">

            <div className="w-14 h-14 rounded-2xl bg-violet-600 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">

              <FolderKanban
                size={28}
                className="text-white"
              />

            </div>

            <div>

              <h2 className="text-xl font-bold text-gray-900">

                {project.title}

              </h2>

              <p className="text-gray-500 text-sm mt-1">

                {project.tagline || "AI Generated Project"}

              </p>

            </div>

          </div>

          <button className="p-2 rounded-lg hover:bg-gray-100">

            <MoreVertical
              size={18}
              className="text-gray-500"
            />

          </button>

        </div>

        {/* Description */}

        <p className="text-gray-600 text-sm leading-6 mt-5 line-clamp-3">

          {project.description || "No description available."}

        </p>

        {/* Tech Stack */}

        <div className="flex flex-wrap gap-2 mt-5">

          {project.techStack?.length ? (

            <>
              {project.techStack.slice(0, 4).map((tech, index) => (

                <span
                  key={index}
                  className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-xs font-medium"
                >
                  {typeof tech === "string"
                    ? tech
                    : tech.name}
                </span>

              ))}

              {project.techStack.length > 4 && (

                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs">

                  +{project.techStack.length - 4}

                </span>

              )}

            </>

          ) : (

            <span className="text-gray-400 text-sm">

              No tech stack available

            </span>

          )}

        </div>

      </div>

      {/* Progress */}

      <div className="px-6">

        <div className="flex justify-between mb-2">

          <span className="text-sm text-gray-500">

            Progress

          </span>

          <span className="font-semibold">

            {progress}%

          </span>

        </div>

        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">

          <div
            className={`h-2 rounded-full transition-all duration-700 ${progressColor}`}
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

      </div>

      {/* Stats */}

      <div className="grid grid-cols-3 gap-4 p-6">

        <div className="flex items-center gap-2 text-gray-600">

          <Users size={16} />

          <span className="text-sm">

            {project.teamSize || "-"}

          </span>

        </div>

        <div className="flex items-center gap-2 text-gray-600">

          <Clock size={16} />

          <span className="text-sm">

            {project.estimatedDuration || "-"}

          </span>

        </div>

        <div className="flex items-center gap-2 text-gray-600">

          <Flag size={16} />

          <span className="text-sm">

            {project.difficulty || "-"}

          </span>

        </div>

      </div>

      {/* Footer */}

      <div className="flex justify-between items-center px-6 py-5 border-t bg-gray-50">

        <div>

          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor}`}
          >

            {status}

          </span>

          <p className="text-xs text-gray-500 mt-2">

            {completedTasks}/{tasks.length} Tasks Completed

          </p>

        </div>

        <button
          onClick={() => navigate(`/projects/${project._id}`)}
          className="bg-violet-600 hover:bg-violet-700 text-white px-5 py-2 rounded-xl flex items-center gap-2 transition-all duration-300 hover:scale-105"
        >

          View Project

          <ArrowRight size={18} />

        </button>

      </div>

    </div>
  );
};

export default ProjectCard;