import React from "react";
import { Link } from "react-router-dom";
import Projects from "../ProjectPage/Projects"

import {
  LayoutDashboard,
  Compass,
  Bookmark,
  ClipboardList,
  FileSearch,
  BrainCircuit,
  Map,
  Bell,
  Settings,
} from "lucide-react";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-white shadow-lg ">

      <div className="p-6 text-2xl font-bold text-violet-600">
        HackFlow
      </div>

      <nav className="flex flex-col gap-2 px-3">

        <Link
          to="/dashboard"
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-violet-100 hover:text-violet-700 transition"
        >
          <LayoutDashboard size={20} />
          Dashboard
        </Link>
        <Link
          to="/Projects"
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-violet-100 hover:text-violet-700 transition"
        >
          <Bell size={20} />
          Projects
        </Link>

      </nav>
    </div>
  );
};

export default Sidebar;