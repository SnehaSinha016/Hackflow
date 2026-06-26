import { Flag, CheckCircle2, Circle } from "lucide-react";

const Milestones = ({ milestones }) => {

  if (!milestones || milestones.length === 0) {
    return null;
  }

  return (

    <div className="bg-white rounded-2xl shadow-sm p-6">

      {/* Header */}

      <div className="flex items-center gap-3 mb-8">

        <Flag
          className="text-violet-600"
          size={24}
        />

        <h2 className="text-2xl font-bold">
          Project Milestones
        </h2>

      </div>

      <div className="space-y-8">

        {milestones.map((milestone, index) => (

          <div
            key={index}
            className="flex gap-5"
          >

            {/* Timeline */}

            <div className="flex flex-col items-center">

              {milestone.completed ? (

                <CheckCircle2
                  className="text-green-500"
                  size={24}
                />

              ) : (

                <Circle
                  className="text-violet-600"
                  size={24}
                />

              )}

              {index !== milestones.length - 1 && (

                <div className="w-[2px] flex-1 bg-gray-300 mt-2"></div>

              )}

            </div>

            {/* Card */}

            <div className="flex-1 border rounded-xl p-5 hover:shadow-md transition">

              <div className="flex justify-between items-center flex-wrap gap-2">

                <h3 className="text-lg font-semibold">
                  {milestone.title}
                </h3>

                {milestone.targetWeek && (

                  <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">

                    {milestone.targetWeek}

                  </span>

                )}

              </div>

              {milestone.description && (

                <p className="text-gray-600 mt-3 leading-7">
                  {milestone.description}
                </p>

              )}

              <div className="mt-4">

                {milestone.completed ? (

                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">

                    Completed

                  </span>

                ) : (

                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold">

                    Pending

                  </span>

                )}

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

};

export default Milestones;