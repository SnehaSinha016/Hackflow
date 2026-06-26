import {
  Code2,
  Cpu,
  Database,
  Globe,
  Server,
  ShieldCheck,
} from "lucide-react";

const TechStack = ({ techStack }) => {

  if (!techStack || techStack.length === 0) {
    return null;
  }

  const getIcon = (tech) => {

    const value =
      typeof tech === "string"
        ? tech.toLowerCase()
        : tech.name?.toLowerCase() || "";

    if (
      value.includes("react") ||
      value.includes("html") ||
      value.includes("css") ||
      value.includes("javascript") ||
      value.includes("typescript") ||
      value.includes("next")
    ) {
      return <Globe className="text-blue-500" size={22} />;
    }

    if (
      value.includes("node") ||
      value.includes("express") ||
      value.includes("spring") ||
      value.includes("django") ||
      value.includes("flask")
    ) {
      return <Server className="text-green-500" size={22} />;
    }

    if (
      value.includes("mongo") ||
      value.includes("mysql") ||
      value.includes("postgres") ||
      value.includes("firebase") ||
      value.includes("redis")
    ) {
      return <Database className="text-orange-500" size={22} />;
    }

    if (
      value.includes("jwt") ||
      value.includes("oauth") ||
      value.includes("auth")
    ) {
      return <ShieldCheck className="text-red-500" size={22} />;
    }

    if (
      value.includes("ai") ||
      value.includes("tensorflow") ||
      value.includes("opencv") ||
      value.includes("gemini") ||
      value.includes("groq")
    ) {
      return <Cpu className="text-purple-500" size={22} />;
    }

    return <Code2 className="text-violet-600" size={22} />;
  };

  return (

    <div className="bg-white rounded-2xl shadow-sm p-6">

      {/* Header */}

      <div className="flex items-center gap-3 mb-6">

        <Code2
          className="text-violet-600"
          size={24}
        />

        <h2 className="text-2xl font-bold">
          Tech Stack
        </h2>

      </div>

      {/* Technologies */}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

        {techStack.map((tech, index) => {

          const name =
            typeof tech === "string"
              ? tech
              : tech.name;

          const description =
            typeof tech === "string"
              ? ""
              : tech.description;

          return (

            <div
              key={index}
              className="border rounded-xl p-5 hover:shadow-md hover:border-violet-400 transition bg-gradient-to-br from-white to-violet-50"
            >

              <div className="flex items-center gap-3">

                {getIcon(tech)}

                <h3 className="font-semibold text-lg">
                  {name}
                </h3>

              </div>

              {description && (

                <p className="text-gray-600 mt-3 leading-7">
                  {description}
                </p>

              )}

            </div>

          );

        })}

      </div>

    </div>

  );

};

export default TechStack;