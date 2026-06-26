import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import ProjectCard from "../../component/ProjectCard";
import { getProjects } from "../../api/projectApi";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../context/SocketContext";
import NotificationBell from "../../component/Notification/NotificationBell";

import {
  Search,
  Bell,
  UserCircle,
  FolderKanban,
  Rocket,
  CheckCircle2,
  Flag,
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const socket = useSocket();
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {

  socket.on(
    "notification",
    (data) => {

      console.log(
        "New Notification",
        data
      );

    }
  );

  return () => {

    socket.off(
      "notification"
    );

  };

}, [socket]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProjects();
  }, []);

  const totalProjects = projects.length;

  const activeProjects = projects.filter(
    (project) => project.tasks?.length > 0
  ).length;

  const totalTasks = projects.reduce(
    (total, project) => total + (project.tasks?.length || 0),
    0
  );

  const totalMilestones = projects.reduce(
    (total, project) => total + (project.milestones?.length || 0),
    0
  );
  const user = JSON.parse(
  localStorage.getItem("user")
);

const userName = user?.name || "User";

const filteredProjects = projects.filter(project => {

    const q = search.toLowerCase();

    return (
        project.title?.toLowerCase().includes(q) ||
        project.tagline?.toLowerCase().includes(q) ||
        project.description?.toLowerCase().includes(q) ||
        project.techStack?.some(tech =>
            tech.toLowerCase().includes(q)
        )
    );

});

  return (
    <div className="flex min-h-screen bg-[#F8F9FC]">

      {/* Sidebar */}

      <Sidebar />

      {/* Main */}

      <div className="flex-1 p-8">

        {/* Top Bar */}
        {/* Top Bar */}

<div className="flex justify-between items-start">

  {/* Search */}

  <div className="relative w-full max-w-lg">

    <Search
      size={20}
      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
    />

    <input
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search projects, technologies..."
      className="
        w-full
        bg-white
        border
        border-gray-200
        rounded-2xl
        pl-12
        pr-20
        py-3.5
        shadow-sm
        transition-all
        duration-300
        placeholder:text-gray-400
        focus:outline-none
        focus:ring-4
        focus:ring-violet-100
        focus:border-violet-500
      "
    />

    {/* Clear Button */}

    {search && (
      <button
        onClick={() => setSearch("")}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
      >
        ✕
      </button>
    )}

    {/* Search Suggestions */}

    {search.trim() !== "" && (
      <div className="absolute left-0 top-full mt-2 w-full bg-white rounded-2xl shadow-xl border border-gray-200 z-50 max-h-80 overflow-y-auto">

        {filteredProjects.length > 0 ? (

          filteredProjects.map((project) => (

            <div
              key={project._id}
              onClick={() => {
                setSearch("");
                navigate(`/projects/${project._id}`);
              }}
              className="p-4 hover:bg-violet-50 cursor-pointer border-b last:border-none transition"
            >

              <div className="flex justify-between items-center">

                <div>

                  <h3 className="font-semibold text-gray-800">
                    {project.title}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {project.tagline}
                  </p>

                  <div className="flex gap-2 mt-2 flex-wrap">

                    {project.techStack?.slice(0, 3).map((tech) => (

                      <span
                        key={tech}
                        className="px-2 py-1 text-xs bg-violet-100 text-violet-700 rounded-full"
                      >
                        {tech}
                      </span>

                    ))}

                  </div>

                </div>

                <Search
                  size={18}
                  className="text-gray-300"
                />

              </div>

            </div>

          ))

        ) : (

          <div className="p-5 text-gray-500">

            No projects found

          </div>

        )}

      </div>
    )}

  </div>

  {/* Right Icons */}

  <div className="flex items-center gap-6">

   <NotificationBell />

    <UserCircle
      className="text-gray-600 cursor-pointer hover:text-violet-600 transition"
      size={36}
      onClick={() => navigate("/profile")}
    />

  </div>

</div>
       

        {/* Greeting */}

        <div className="mt-10">

          <h1 className="text-4xl font-bold">
  Good Morning, {userName}!
</h1>

          <p className="text-gray-500 mt-2">
            Continue building your hackathon projects.
          </p>

        </div>

        {/* Stats */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">

          {/* Total Projects */}

          <div className="bg-white rounded-3xl shadow-sm p-6">

            <FolderKanban
              className="text-violet-600"
              size={34}
            />

            <h2 className="text-4xl font-bold mt-5">
              {totalProjects}
            </h2>

            <p className="text-gray-500 mt-2">
              Total Projects
            </p>

          </div>

          {/* Active */}

          <div className="bg-white rounded-3xl shadow-sm p-6">

            <Rocket
              className="text-blue-600"
              size={34}
            />

            <h2 className="text-4xl font-bold mt-5">
              {activeProjects}
            </h2>

            <p className="text-gray-500 mt-2">
              Active Projects
            </p>

          </div>

          {/* Tasks */}

          <div className="bg-white rounded-3xl shadow-sm p-6">

            <CheckCircle2
              className="text-green-600"
              size={34}
            />

            <h2 className="text-4xl font-bold mt-5">
              {totalTasks}
            </h2>

            <p className="text-gray-500 mt-2">
              Total Tasks
            </p>

          </div>

          {/* Milestones */}

          <div className="bg-white rounded-3xl shadow-sm p-6">

            <Flag
              className="text-orange-500"
              size={34}
            />

            <h2 className="text-4xl font-bold mt-5">
              {totalMilestones}
            </h2>

            <p className="text-gray-500 mt-2">
              Milestones
            </p>

          </div>

        </div>

        {/* My Projects */}

        <div className="mt-12">

          <div className="flex justify-between items-center mb-6">

            <div>

              <h2 className="text-3xl font-bold">
                My Projects
              </h2>

              <p className="text-gray-500 mt-1">
                Continue working on your AI-generated projects.
              </p>

            </div>

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">

           {projects.length > 0 ? (
  (search.trim() === "" ? projects : filteredProjects).length > 0 ? (
    (search.trim() === "" ? projects : filteredProjects).map((project) => (
      <ProjectCard
        key={project._id}
        project={project}
      />
    ))
  ) : (
    <div className="text-center py-20 col-span-full">
      <Search
        size={60}
        className="mx-auto text-gray-300 mb-4"
      />

      <h3 className="text-2xl font-semibold">
        No matching projects
      </h3>

      <p className="text-gray-500 mt-2">
        Try searching with another keyword.
      </p>
    </div>
  )
) : (
  <div className="text-gray-500">
    No projects found.
  </div>
)}

          </div>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;