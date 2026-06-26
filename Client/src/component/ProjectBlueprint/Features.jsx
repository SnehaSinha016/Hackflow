import { Sparkles, CheckCircle2 } from "lucide-react";

const Features = ({ features }) => {

  if (!features || features.length === 0) {
    return null;
  }

  return (

    <div className="bg-white rounded-2xl shadow-sm p-6">

      {/* Header */}

      <div className="flex items-center gap-3 mb-6">

        <Sparkles
          className="text-violet-600"
          size={24}
        />

        <h2 className="text-2xl font-bold">
          Key Features
        </h2>

      </div>

      {/* Features Grid */}

      <div className="grid md:grid-cols-2 gap-5">

        {features.map((feature, index) => {

          const title =
            typeof feature === "string"
              ? feature
              : feature.title;

          const description =
            typeof feature === "string"
              ? ""
              : feature.description;

          return (

            <div
              key={index}
              className="border rounded-xl p-5 hover:border-violet-400 hover:shadow-md transition duration-300 bg-gradient-to-br from-white to-violet-50"
            >

              <div className="flex items-start gap-3">

                <CheckCircle2
                  className="text-green-500 mt-1"
                  size={20}
                />

                <div>

                  <h3 className="font-semibold text-lg text-slate-800">
                    {title}
                  </h3>

                  {description && (

                    <p className="text-gray-600 mt-2 leading-7">
                      {description}
                    </p>

                  )}

                </div>

              </div>

            </div>

          );

        })}

      </div>

    </div>

  );

};

export default Features;