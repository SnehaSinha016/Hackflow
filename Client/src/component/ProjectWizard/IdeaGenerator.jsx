import { useState } from "react";
import { generateIdeas } from "../../api/aiApi";

const domains = [
  "AI",
  "Healthcare",
  "Education",
  "Finance",
  "Agriculture",
  "Environment",
  "Cybersecurity",
  "IoT",
];

const skills = [
  "React",
  "Node.js",
  "Python",
  "Java",
  "MongoDB",
  "Flutter",
  "Firebase",
  "C++",
];

const goals = [
  "Hackathon",
  "Resume",
  "Learning",
  "Startup",
];

const IdeaGenerator = ({ next, back }) => {
  const [selectedDomain, setSelectedDomain] = useState("");
  const [selectedGoal, setSelectedGoal] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggleSkill = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(
        selectedSkills.filter((item) => item !== skill)
      );
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

 const handleGenerateIdeas = async () => {
  if (!selectedDomain) {
    alert("Please select a domain.");
    return;
  }

  if (!selectedGoal) {
    alert("Please select your goal.");
    return;
  }

  if (selectedSkills.length === 0) {
    alert("Please select at least one skill.");
    return;
  }

  try {
    setLoading(true);

   const response = await generateIdeas({
  domain: selectedDomain,
  skills: selectedSkills,
  goal: selectedGoal,
});

console.log("========== AI RESPONSE ==========");
console.log(response);
console.log("success:", response.success);
console.log("ideas:", response.ideas);
console.log("isArray:", Array.isArray(response.ideas));
console.log("================================");
    next({
    ideas: response.ideas,
    preferences: {
        domain: selectedDomain,
        skills: selectedSkills,
        goal: selectedGoal,
    },
});

  }catch (error) {
  console.error("FULL ERROR:", error);

  if (error.response) {
    console.log("Response:", error.response);
    console.log("Response Data:", error.response.data);
  }

  alert(error.message);
}
};

  return (
    <div>

      <h2 className="text-3xl font-bold">
        Let's Find Your Project
      </h2>

      <p className="text-gray-500 mt-2">
        Tell us a little about yourself.
      </p>

      {/* Domain */}

      <div className="mt-8">

        <h3 className="font-semibold mb-4">
          Choose a Domain
        </h3>

        <div className="flex flex-wrap gap-3">

          {domains.map((domain) => (

            <button
              key={domain}
              onClick={() => setSelectedDomain(domain)}
              className={`px-4 py-2 rounded-full border transition
              ${
                selectedDomain === domain
                  ? "bg-violet-600 text-white border-violet-600"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {domain}
            </button>

          ))}

        </div>

      </div>

      {/* Skills */}

      <div className="mt-8">

        <h3 className="font-semibold mb-4">
          Technologies You Know
        </h3>

        <div className="flex flex-wrap gap-3">

          {skills.map((skill) => (

            <button
              key={skill}
              onClick={() => toggleSkill(skill)}
              className={`px-4 py-2 rounded-full border transition
              ${
                selectedSkills.includes(skill)
                  ? "bg-violet-600 text-white border-violet-600"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {skill}
            </button>

          ))}

        </div>

      </div>

      {/* Goal */}

      <div className="mt-8">

        <h3 className="font-semibold mb-4">
          Your Goal
        </h3>

        <div className="flex flex-wrap gap-3">

          {goals.map((goal) => (

            <button
              key={goal}
              onClick={() => setSelectedGoal(goal)}
              className={`px-4 py-2 rounded-full border transition
              ${
                selectedGoal === goal
                  ? "bg-violet-600 text-white border-violet-600"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {goal}
            </button>

          ))}

        </div>

      </div>

      {/* Buttons */}

      <div className="flex justify-between mt-10">

        <button
          onClick={back}
          className="border px-5 py-2 rounded-lg hover:bg-gray-100"
        >
          Back
        </button>

        <button
          onClick={handleGenerateIdeas}
          disabled={loading}
          className="bg-violet-600 hover:bg-violet-700 disabled:bg-violet-400 text-white px-6 py-2 rounded-lg transition"
        >
          {loading ? "Generating..." : "Generate AI Ideas"}
        </button>

      </div>

    </div>
  );
};

export default IdeaGenerator;