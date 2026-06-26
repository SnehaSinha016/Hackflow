import { useEffect, useState , useRef} from "react";
import {
  Brain,
  CheckCircle2,
  LoaderCircle,
} from "lucide-react";

import {
  generateAIProject,
  generateManualProject,
} from "../../api/aiApi";

const AIAnalysis = ({
  idea,
  projectData,
  setGeneratedProject,
  next,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const hasRun = useRef(false);

  const steps = [
    "Understanding your project...",
    "Finding the best tech stack...",
    "Designing database & APIs...",
    "Generating roadmap & tasks...",
    "Preparing final project blueprint...",
  ];

  useEffect(() => {
    if (hasRun.current) return;
  hasRun.current = true;
  let interval;
    const analyze = async () => {
      try {
        let response;

        // User selected an AI-generated idea
        if (idea) {
          response = await generateAIProject(idea);
        }
        // User entered their own idea
        else {
          response = await generateManualProject(projectData);
        }

        console.log("AI Analysis:", response);

        let i = 0;

        const interval = setInterval(() => {
          i++;

          setCurrentStep(i);

          if (i === steps.length) {
            clearInterval(interval);

            setLoading(false);

            setGeneratedProject(response.project);

            setTimeout(() => {
              next();
            }, 700);
          }
        }, 900);

      } catch (err) {
        console.error("AI Analysis Error:", err);
      }
    };

    analyze();
    return()=>{
      if(interval)clearInterval(interval);
    }
  }, [idea, projectData, setGeneratedProject]);

  return (
    <div className="flex flex-col items-center justify-center py-12">

      <div className="bg-violet-100 p-6 rounded-full">
        <Brain
          size={55}
          className="text-violet-600 animate-pulse"
        />
      </div>

      <h2 className="text-3xl font-bold mt-6">
        AI is Building your Project
      </h2>

      <p className="text-gray-500 mt-2">
        Generating a complete software blueprint...
      </p>

      <div className="w-full max-w-lg mt-10 space-y-5">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex items-center gap-4"
          >
            {index < currentStep ? (
              <CheckCircle2
                className="text-green-500"
                size={22}
              />
            ) : index === currentStep && loading ? (
              <LoaderCircle
                className="animate-spin text-violet-600"
                size={22}
              />
            ) : (
              <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
            )}

            <span>{step}</span>
          </div>
        ))}
      </div>

    </div>
  );
};

export default AIAnalysis;