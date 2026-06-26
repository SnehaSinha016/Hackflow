import { useEffect, useState } from "react";
import { Search, Plus } from "lucide-react";

import { getProjects } from "../../api/projectApi";
import ProjectCard from "../../component/ProjectCard";
import CreateProjectModal from "../../component/ProjectWizard/CreateProjectModal";

const Projects = () => {
  const [showModal, setShowModal] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
    const projects = await getProjects();

console.log(projects);

setProjects(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-xl">
        Loading Projects...
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Projects
          </h1>

          <p className="text-gray-500 mt-1">
            Manage all your AI projects in one place.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-5 py-3 rounded-xl shadow-md"
        >
          <Plus size={18} />
          New Project
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <CreateProjectModal
          close={() => {
            setShowModal(false);

            // Refresh project list after creating project
            fetchProjects();
          }}
        />
      )}

      {/* Search */}
      <div className="flex gap-4 mt-8">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-3 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search Projects..."
            className="pl-10 border rounded-lg px-4 py-2 w-72"
          />
        </div>

        <select className="border rounded-lg px-4 py-2">
          <option>All Status</option>
          <option>On Track</option>
          <option>At Risk</option>
          <option>Completed</option>
        </select>
      </div>

      {/* Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
        {projects.length > 0 ? (
          projects.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
            />
          ))
        ) : (
          <div className="text-gray-500 text-lg">
            No projects found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;