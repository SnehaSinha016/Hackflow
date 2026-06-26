import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./navbar";
import Loginpageimage from "../assets/Loginpageimage.png";

import {
  BrainCircuit,
  Users,
  Clock3,
  BarChart3,
} from "lucide-react";

const features = [
  {
    icon: BrainCircuit,
    title: "AI Task Breakdown",
    description: "Turn ideas into actionable tasks in seconds.",
    bg: "bg-violet-100",
    color: "text-violet-600",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Work together in real-time and stay aligned.",
    bg: "bg-blue-100",
    color: "text-blue-600",
  },
  {
    icon: Clock3,
    title: "Deadline Tracking",
    description: "Never miss a deadline with smart reminders.",
    bg: "bg-orange-100",
    color: "text-orange-600",
  },
  {
    icon: BarChart3,
    title: "Progress Analytics",
    description: "Visualize progress and improve productivity.",
    bg: "bg-green-100",
    color: "text-green-600",
  },
];

const LandingPage = () => {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row items-center px-6 lg:px-12 py-12">

        {/* Left Content */}
        <div className="flex-1">

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold">
            AI-Powered
          </h1>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-violet-600 mt-2">
            Hackathon Project Manager
          </h1>

          <h3 className="text-xl font-semibold mt-6">
            Plan smarter, Build faster, Win together.
          </h3>

          <p className="text-lg text-gray-500 mt-3 max-w-xl">
            Manage ideas, tasks, deadlines, and collaboration effortlessly
            with AI-powered project planning.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">

            <Link to="/signup">
              <button className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-xl transition duration-300 shadow-lg">
                Get Started Free
              </button>
            </Link>

            <Link to="/login">
              <button className="border border-gray-300 hover:bg-gray-100 px-6 py-3 rounded-xl transition duration-300">
                Watch Demo
              </button>
            </Link>

          </div>

        </div>

        {/* Right Image */}
        <div className="flex-1 mt-10 lg:mt-0 flex justify-center">

          <img
            src={Loginpageimage}
            alt="HackFlow Dashboard"
            className="w-full max-w-lg"
          />

        </div>

      </div>

      {/* Features Section */}

      <section className="px-6 md:px-12 py-10">

        <div className="text-center mb-10">

          <h2 className="text-3xl font-bold">
            Everything You Need to Win Hackathons
          </h2>

          <p className="text-gray-500 mt-3">
            AI-powered tools to help your team plan, build, and deliver faster.
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-300"
              >

                <div
                  className={`w-14 h-14 ${feature.bg} rounded-xl flex items-center justify-center mb-5`}
                >
                  <Icon
                    size={30}
                    className={feature.color}
                  />
                </div>

                <h3 className="text-xl font-bold mb-3">
                  {feature.title}
                </h3>

                <p className="text-gray-600 leading-6">
                  {feature.description}
                </p>

              </div>
            );
          })}

        </div>

      </section>
    </>
  );
};

export default LandingPage;