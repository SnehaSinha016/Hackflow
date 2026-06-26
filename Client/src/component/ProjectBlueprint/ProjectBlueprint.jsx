import {
  AlertTriangle,
  Lightbulb,
} from "lucide-react";

import TechStack from "./TechStack";
import Features from "./Features";
import FolderStructure from "./FolderStructure";
import APIs from "./APIs";
import Roadmap from "./Roadmap";
import Tasks from "./Tasks";
import Milestones from "./Milestones";
import FutureScope from "./FutureScope";

const ProjectBlueprint = ({ project }) => {

  if (!project) {
    return (
      <div className="flex justify-center items-center py-24">
        <h2 className="text-3xl font-bold">
          Loading Project...
        </h2>
      </div>
    );
  }

  return (

    <div className="space-y-8">

      {/* Header */}

      <div className="bg-white rounded-2xl shadow-sm p-8">

        <h1 className="text-4xl font-bold text-slate-800">
          {project.title}
        </h1>

        {project.tagline && (
          <p className="text-violet-600 mt-2 text-lg font-medium">
            {project.tagline}
          </p>
        )}

        <p className="text-gray-600 mt-5 leading-8">
          {project.description}
        </p>

      </div>

      {/* Problem Statement */}

      <div className="bg-red-50 rounded-2xl shadow-sm p-6">

        <div className="flex items-center gap-3 mb-4">

          <AlertTriangle className="text-red-600"/>

          <h2 className="text-2xl font-bold">
            Problem Statement
          </h2>

        </div>

        <p className="text-gray-700 leading-8">
          {project.problemStatement}
        </p>

      </div>

      {/* Solution */}

      <div className="bg-green-50 rounded-2xl shadow-sm p-6">

        <div className="flex items-center gap-3 mb-4">

          <Lightbulb className="text-green-600"/>

          <h2 className="text-2xl font-bold">
            Proposed Solution
          </h2>

        </div>

        <p className="text-gray-700 leading-8">
          {project.solution}
        </p>

      </div>

      {/* Basic Details */}

      <div className="grid md:grid-cols-3 gap-5">

        <div className="bg-white rounded-xl shadow-sm p-5">

          <p className="text-gray-500 text-sm">
            Difficulty
          </p>

          <h3 className="text-xl font-bold mt-2">
            {project.difficulty}
          </h3>

        </div>

        <div className="bg-white rounded-xl shadow-sm p-5">

          <p className="text-gray-500 text-sm">
            Team Size
          </p>

          <h3 className="text-xl font-bold mt-2">
            {project.teamSize}
          </h3>

        </div>

        <div className="bg-white rounded-xl shadow-sm p-5">

          <p className="text-gray-500 text-sm">
            Estimated Duration
          </p>

          <h3 className="text-xl font-bold mt-2">
            {project.estimatedDuration}
          </h3>

        </div>

      </div>

      {/* Tech Stack */}

      <TechStack
        techStack={project.techStack}
      />

      {/* Features */}

      <Features
        features={project.features}
      />

      {/* Folder Structure */}

      <FolderStructure
        folders={project.folderStructure}
      />

      {/* Architecture */}

      {project.architecture && (

        <div className="bg-white rounded-2xl shadow-sm p-6">

          <h2 className="text-2xl font-bold mb-6">
            System Architecture
          </h2>

          <div className="grid md:grid-cols-2 gap-5">

            <div className="border rounded-xl p-4">
              <h3 className="font-semibold text-violet-600">
                Frontend
              </h3>
              <p className="mt-2">
                {project.architecture.frontend}
              </p>
            </div>

            <div className="border rounded-xl p-4">
              <h3 className="font-semibold text-violet-600">
                Backend
              </h3>
              <p className="mt-2">
                {project.architecture.backend}
              </p>
            </div>

            <div className="border rounded-xl p-4">
              <h3 className="font-semibold text-violet-600">
                Database
              </h3>
              <p className="mt-2">
                {project.architecture.database}
              </p>
            </div>

            <div className="border rounded-xl p-4">
              <h3 className="font-semibold text-violet-600">
                Authentication
              </h3>
              <p className="mt-2">
                {project.architecture.authentication}
              </p>
            </div>

          </div>

        </div>

      )}

      {/* Database */}

      {project.databaseSchema?.length > 0 && (

        <div className="bg-white rounded-2xl shadow-sm p-6">

          <h2 className="text-2xl font-bold mb-6">
            Database Schema
          </h2>

          <div className="space-y-5">

            {project.databaseSchema.map((table, index) => (

              <div
                key={index}
                className="border rounded-xl p-5"
              >

                <h3 className="font-bold text-violet-600 text-lg">
                  {table.collection}
                </h3>

                <table className="w-full mt-4">

                  <thead>

                    <tr className="border-b">

                      <th className="text-left py-2">
                        Field
                      </th>

                      <th className="text-left py-2">
                        Type
                      </th>

                      <th className="text-left py-2">
                        Required
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {table.fields?.map((field, i) => (

                      <tr key={i} className="border-b">

                        <td className="py-2">
                          {field.name}
                        </td>

                        <td className="py-2">
                          {field.type}
                        </td>

                        <td className="py-2">
                          {field.required ? "Yes" : "No"}
                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            ))}

          </div>

        </div>

      )}

      {/* APIs */}

      <APIs
        apis={project.apis}
      />

      {/* Roadmap */}

      {/* Milestones */}

      <Milestones
        milestones={project.milestones}
      />

      {/* Future Scope */}

      <FutureScope
        futureScope={project.futureScope}
      />

    </div>

  );

};

export default ProjectBlueprint;