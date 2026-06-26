import { Rocket, ArrowRightCircle } from "lucide-react";

const FutureScope = ({ futureScope }) => {

  if (!futureScope || futureScope.length === 0) {
    return null;
  }

  return (

    <div className="bg-white rounded-2xl shadow-sm p-6">

      {/* Header */}

      <div className="flex items-center gap-3 mb-6">

        <Rocket
          className="text-violet-600"
          size={24}
        />

        <h2 className="text-2xl font-bold">
          Future Scope
        </h2>

      </div>

      <div className="grid md:grid-cols-2 gap-5">

        {futureScope.map((item, index) => {

          const title =
            typeof item === "string"
              ? item
              : item.title || item.name;

          const description =
            typeof item === "string"
              ? ""
              : item.description;

          return (

            <div
              key={index}
              className="border rounded-xl p-5 hover:shadow-md hover:border-violet-400 transition bg-gradient-to-br from-white to-violet-50"
            >

              <div className="flex items-start gap-3">

                <ArrowRightCircle
                  className="text-violet-600 mt-1"
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

export default FutureScope;