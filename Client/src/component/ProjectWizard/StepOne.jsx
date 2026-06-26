import { useEffect, useState } from "react";
import { Lightbulb, Sparkles } from "lucide-react";
const StepOne = ({ next, ideaGenerator }) => {
  return (
    <>
      <h2 className="text-3xl font-bold">
        Create New Project
      </h2>

      <p className="text-gray-500 mt-2">
        How would you like to start?
      </p>

      <div className="mt-8 space-y-5">

        {/* Have Idea */}

        <div
          onClick={next}
          className="border rounded-xl p-6 hover:border-violet-600 cursor-pointer transition"
        >
          <div className="flex gap-4">

            <div className="bg-violet-100 p-4 rounded-xl">
              <Lightbulb className="text-violet-600" />
            </div>

            <div>

              <h3 className="font-semibold">
                I already have an idea
              </h3>

              <p className="text-gray-500">
                AI will generate roadmap, tasks and tech stack.
              </p>

            </div>

          </div>
        </div>

        {/* Don't Have Idea */}

        <div
          onClick={ideaGenerator}
          className="border rounded-xl p-6 hover:border-green-600 cursor-pointer transition"
        >
          <div className="flex gap-4">

            <div className="bg-green-100 p-4 rounded-xl">
              <Sparkles className="text-green-600" />
            </div>

            <div>

              <h3 className="font-semibold">
                I don't have an idea
              </h3>

              <p className="text-gray-500">
                Let AI suggest amazing hackathon ideas.
              </p>

            </div>

          </div>
        </div>

      </div>
    </>
  );
};

export default StepOne;