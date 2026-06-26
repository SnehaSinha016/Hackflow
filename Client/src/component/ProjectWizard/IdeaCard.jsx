import {
  Lightbulb,
  Trophy,
  Sparkles,
  Clock3,
  Users,
  Brain,
  DollarSign,
  TrendingUp,
  Award,
  Cpu,
  CheckCircle2,
} from "lucide-react";

const StatCard = ({ icon: Icon, title, value, color }) => (
  <div className={`rounded-xl p-4 ${color}`}>
    <div className="flex items-center gap-2 text-sm font-medium">
      <Icon size={18} />
      {title}
    </div>

    <p className="text-xl font-bold mt-2">
      {value}
    </p>
  </div>
);

const IdeaCard = ({ idea, onSelect }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-3xl shadow-md hover:shadow-2xl hover:border-violet-500 transition-all duration-300 overflow-hidden">

      {/* Badge */}

      <div className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-6 py-3 flex justify-between items-center">

        <span className="font-semibold">
          {idea.recommendedBadge}
        </span>

        <Award size={22} />

      </div>

      <div className="p-6">

        {/* Header */}

        <div className="flex gap-4">

          <div className="w-16 h-16 rounded-2xl bg-violet-100 flex items-center justify-center">

            <Lightbulb
              size={30}
              className="text-violet-600"
            />

          </div>

          <div>

            <h2 className="text-2xl font-bold">
              {idea.title}
            </h2>

            <p className="text-violet-600 font-medium mt-1">
              {idea.tagline}
            </p>

          </div>

        </div>

        {/* Description */}

        <p className="mt-6 text-gray-600 leading-7">
          {idea.description}
        </p>

        {/* Problem */}

        <div className="bg-red-50 rounded-xl p-4 mt-6">

          <h3 className="font-semibold mb-2">
            Problem Statement
          </h3>

          <p className="text-gray-600 text-sm leading-6">
            {idea.problemStatement}
          </p>

        </div>

        {/* Scores */}

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-6">

          <StatCard
            icon={Sparkles}
            title="Innovation"
            value={`${idea.innovation}/10`}
            color="bg-violet-50 text-violet-700"
          />

          <StatCard
            icon={Trophy}
            title="Hackathon"
            value={`${idea.hackathonPotential}/10`}
            color="bg-yellow-50 text-yellow-700"
          />

          <StatCard
            icon={Award}
            title="Resume"
            value={`${idea.resumeScore}/10`}
            color="bg-blue-50 text-blue-700"
          />

          <StatCard
            icon={TrendingUp}
            title="Startup"
            value={`${idea.startupPotential}/10`}
            color="bg-green-50 text-green-700"
          />

          <StatCard
            icon={Brain}
            title="Skill Match"
            value={`${idea.skillMatch}%`}
            color="bg-pink-50 text-pink-700"
          />

          <StatCard
            icon={Clock3}
            title="Build Time"
            value={idea.estimatedDuration}
            color="bg-orange-50 text-orange-700"
          />

        </div>

        {/* Additional Info */}

        <div className="grid grid-cols-2 gap-4 mt-6">

          <div className="bg-gray-50 rounded-xl p-4">

            <div className="flex items-center gap-2">

              <Users
                size={18}
                className="text-violet-600"
              />

              <span className="font-medium">
                Team Size
              </span>

            </div>

            <p className="mt-2">
              {idea.teamSize}
            </p>

          </div>

          <div className="bg-gray-50 rounded-xl p-4">

            <div className="flex items-center gap-2">

              <Cpu
                size={18}
                className="text-violet-600"
              />

              <span className="font-medium">
                Difficulty
              </span>

            </div>

            <p className="mt-2">
              {idea.difficulty}
            </p>

          </div>

          <div className="bg-gray-50 rounded-xl p-4">

            <div className="flex items-center gap-2">

              <TrendingUp
                size={18}
                className="text-violet-600"
              />

              <span className="font-medium">
                Market
              </span>

            </div>

            <p className="mt-2">
              {idea.marketDemand}
            </p>

          </div>

          <div className="bg-gray-50 rounded-xl p-4">

            <div className="flex items-center gap-2">

              <DollarSign
                size={18}
                className="text-violet-600"
              />

              <span className="font-medium">
                Build Cost
              </span>

            </div>

            <p className="mt-2">
              {idea.buildCost}
            </p>

          </div>

        </div>

        {/* Tech Stack */}

        <div className="mt-8">

          <h3 className="font-semibold mb-3">
            Tech Stack
          </h3>

          <div className="flex flex-wrap gap-2">

            {idea.techStack?.map((tech) => (

              <span
                key={tech}
                className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium"
              >
                {tech}
              </span>

            ))}

          </div>

        </div>

        {/* Features */}

        <div className="mt-8">

          <h3 className="font-semibold mb-3">
            Key Features
          </h3>

          <div className="grid grid-cols-2 gap-3">

            {idea.features?.map((feature, index) => (

              <div
                key={index}
                className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2"
              >

                <CheckCircle2
                  size={18}
                  className="text-green-500"
                />

                <span className="text-sm">
                  {feature}
                </span>

              </div>

            ))}

          </div>

        </div>

        {/* Button */}

        <button
          onClick={() => {onSelect(idea)}}
          className="w-full mt-8 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white py-4 rounded-2xl font-semibold text-lg transition"
        >
           Generate Complete Project
        </button>

      </div>

    </div>
  );
};

export default IdeaCard;