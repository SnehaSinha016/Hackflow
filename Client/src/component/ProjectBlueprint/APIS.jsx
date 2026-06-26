import { Globe, ArrowRight } from "lucide-react";

const APIs = ({ apis }) => {
  if (!apis || apis.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">

      <div className="flex items-center gap-3 mb-6">

        <Globe className="text-violet-600" />

        <h2 className="text-2xl font-bold">
          API Endpoints
        </h2>

      </div>

      <div className="space-y-6">

        {apis.map((api, index) => (

          <div
            key={index}
            className="border rounded-xl p-6 hover:shadow-md transition"
          >

            {/* Header */}

            <div className="flex items-center gap-3 flex-wrap">

              <span
                className={`
                  px-3 py-1 rounded-full text-white text-sm font-semibold
                  ${
                    api.method === "GET"
                      ? "bg-green-500"
                      : api.method === "POST"
                      ? "bg-blue-500"
                      : api.method === "PUT"
                      ? "bg-yellow-500"
                      : api.method === "DELETE"
                      ? "bg-red-500"
                      : "bg-violet-600"
                  }
                `}
              >
                {api.method}
              </span>

              <code className="bg-gray-100 px-3 py-1 rounded text-sm font-mono">
                {api.endpoint}
              </code>

            </div>

            {/* Name */}

            {api.name && (

              <h3 className="font-bold text-lg mt-5">
                {api.name}
              </h3>

            )}

            {/* Description */}

            <p className="text-gray-600 mt-2 leading-7">
              {api.description}
            </p>

            {/* Request Body */}

            {api.requestBody?.length > 0 && (

              <div className="mt-6">

                <h4 className="font-semibold text-violet-700 mb-3">
                  Request Body
                </h4>

                <div className="overflow-x-auto">

                  <table className="w-full border rounded-lg">

                    <thead className="bg-violet-50">

                      <tr>

                        <th className="text-left p-3">
                          Field
                        </th>

                        <th className="text-left p-3">
                          Type
                        </th>

                      </tr>

                    </thead>

                    <tbody>

                      {api.requestBody.map((field, i) => (

                        <tr
                          key={i}
                          className="border-t"
                        >

                          <td className="p-3 font-medium">
                            {typeof field === "string"
                              ? field
                              : field.name}
                          </td>

                          <td className="p-3 text-gray-600">
                            {typeof field === "string"
                              ? "-"
                              : field.type}
                          </td>

                        </tr>

                      ))}

                    </tbody>

                  </table>

                </div>

              </div>

            )}

            {/* Response */}

            {api.response?.length > 0 && (

              <div className="mt-6">

                <h4 className="font-semibold text-green-700 mb-3">
                  Response
                </h4>

                <div className="overflow-x-auto">

                  <table className="w-full border rounded-lg">

                    <thead className="bg-green-50">

                      <tr>

                        <th className="text-left p-3">
                          Field
                        </th>

                        <th className="text-left p-3">
                          Type
                        </th>

                      </tr>

                    </thead>

                    <tbody>

                      {api.response.map((field, i) => (

                        <tr
                          key={i}
                          className="border-t"
                        >

                         <td className="p-3 font-medium">
  {field
    ? (typeof field === "string" ? field : field.name)
    : "-"}
</td>

                          <td className="p-3 text-gray-600">
  {typeof field === "string"
    ? "-"
    : field?.type || "-"}
</td>

                        </tr>

                      ))}

                    </tbody>

                  </table>

                </div>

              </div>

            )}

            {/* Flow */}

            <div className="mt-6 flex items-center gap-3 text-violet-600">

              <ArrowRight size={18} />

              <span className="font-medium">
                Endpoint Ready for Integration
              </span>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default APIs;