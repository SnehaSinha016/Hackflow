import {
  LayoutDashboard,
  CheckSquare,
  Route,
  Database,
  FolderTree,
  Plug,
  Sparkles,
  BarChart3,
} from "lucide-react";

const ProjectTabs = ({
  activeTab,
  setActiveTab,
  project,
}) => {

  const tabs = [
    {
      id: "overview",
      label: "Overview",
      icon: LayoutDashboard,
    },
    {
      id: "tasks",
      label: "Tasks",
      icon: CheckSquare,
      count: project?.tasks?.length || 0,
    },
    {
      id: "roadmap",
      label: "Roadmap",
      icon: Route,
      count: project?.roadmap?.length || 0,
    },
    {
      id: "planner",
      label: "AI Assistant",
      icon: Sparkles,
    },
  ];

  return (
    <div className="mt-8 bg-white rounded-2xl shadow-sm px-6">

      <div className="flex gap-2 overflow-x-auto scrollbar-hide">

        {tabs.map((tab) => {

          const Icon = tab.icon;

          const active = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-4 transition-all rounded-t-xl whitespace-nowrap

              ${
                active
                  ? "border-b-4 border-violet-600 text-violet-700 bg-violet-50 font-semibold"
                  : "text-gray-500 hover:text-violet-600 hover:bg-gray-50"
              }`}
            >

              <Icon size={18} />

              <span>{tab.label}</span>

              {tab.count !== undefined && (
                <span
                  className={`text-xs px-2 py-1 rounded-full

                  ${
                    active
                      ? "bg-violet-600 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {tab.count}
                </span>
              )}

            </button>
          );

        })}

      </div>

    </div>
  );
};

export default ProjectTabs;