import { useEffect, useState } from "react";
import { getProjectById } from "../../api/projectApi";
import { useParams } from "react-router-dom";

import ProjectHeader from "../../component/ProjectDetails/ProjectHeader";
import ProjectTabs from "../../component/ProjectDetails/ProjectTabs";
import ProjectBlueprint from "../ProjectBlueprint/ProjectBlueprint";
import Roadmap from "../ProjectBlueprint/Roadmap";
import Tasks from "../ProjectBlueprint/Tasks";
import APIs from "../ProjectBlueprint/APIS";

const ProjectDetails = () => {

 const { id } = useParams();

const [project, setProject] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchProject = async () => {
    try {
      const response = await getProjectById(id);

      setProject(response.project);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchProject();
}, [id]);
  const [activeTab, setActiveTab] = useState("overview");

  if (loading) {
  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">
        Loading Project...
      </h1>
    </div>
  );
}

  if (!project) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-3xl font-bold text-red-500">
          Project Not Found
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">

      {/* Header */}

      <ProjectHeader project={project} setProject={setProject} />

      {/* Tabs */}

      <ProjectTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Overview */}

    {activeTab === "overview" && (
  <div className="mt-8">
    <ProjectBlueprint project={project} />
  </div>
)}

      {/* Tasks */}

     {activeTab === "tasks" && (
  <div className="mt-8">
    <Tasks tasks={project.tasks} />
  </div>
)}

      {/* AI Planner */}

     {activeTab === "roadmap" && (
  <div className="mt-8">
    <Roadmap roadmap={project.roadmap} />
  </div>
)}

    </div>
  );
};

export default ProjectDetails;