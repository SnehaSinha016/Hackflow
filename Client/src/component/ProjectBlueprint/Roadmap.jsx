import { CalendarDays, CheckCircle2 } from "lucide-react";

const Roadmap = ({ roadmap }) => {

  if (!roadmap || roadmap.length === 0) {
    return null;
  }

  return (

    <div className="bg-white rounded-2xl shadow-sm p-6">

      {/* Header */}

      <div className="flex items-center gap-3 mb-8">

        <CalendarDays
          className="text-violet-600"
          size={24}
        />

        <h2 className="text-2xl font-bold">
          Development Roadmap
        </h2>

      </div>

      <div className="space-y-8">

        {roadmap.map((phase, index) => (

          <div
            key={index}
            className="flex gap-5"
          >

            {/* Timeline */}

            <div className="flex flex-col items-center">

              <div className="w-10 h-10 rounded-full bg-violet-600 text-white flex items-center justify-center font-bold">

                {index + 1}

              </div>

              {index !== roadmap.length - 1 && (

                <div className="w-[3px] flex-1 bg-violet-200 mt-2"></div>

              )}

            </div>

            {/* Card */}

            <div className="flex-1 border rounded-xl p-5 hover:shadow-md transition">

              <div className="flex justify-between items-center flex-wrap gap-3">

                <h3 className="text-xl font-semibold text-slate-800">

                  {phase.phase || `Phase ${index + 1}`}

                </h3>

                {phase.estimatedDuration && (

                  <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">

                    {phase.estimatedDuration}

                  </span>

                )}

              </div>

              <p className="text-gray-600 mt-4 leading-7">

                {phase.goal}

              </p>

              {phase.tasks?.length > 0 && (

                <div className="mt-5">

                  <h4 className="font-semibold mb-3">
                    Tasks
                  </h4>

                  <div className="space-y-2">

                    {phase.tasks.map((task, i) => (

                      <div
                        key={i}
                        className="flex items-start gap-3"
                      >

                        <CheckCircle2
                          size={18}
                          className="text-green-500 mt-1"
                        />

                        <span className="text-gray-700">

                          {typeof task === "string"
                            ? task
                            : task.title}

                        </span>

                      </div>

                    ))}

                  </div>

                </div>

              )}

            </div>

          </div>

        ))}

      </div>

    </div>

  );

};

export default Roadmap;