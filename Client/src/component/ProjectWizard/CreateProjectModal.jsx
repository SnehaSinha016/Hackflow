import { useState } from "react";

import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import IdeaGenerator from "./IdeaGenerator";
import AIAnalysis from "./AIAnalysis";
import StepThree from "./StepThree";
import IdeaSelection from "./IdeaSelection";

const CreateProjectModal = ({ close }) => {
  const [step, setStep] = useState(1);

  // AI Generated Ideas
  const [ideas, setIdeas] = useState([]);

  // User Preferences
  const [preferences, setPreferences] = useState({});

  // Selected AI Idea
  const [selectedIdea, setSelectedIdea] = useState(null);

  // Final AI Generated Project
  const [generatedProject, setGeneratedProject] = useState(null);

  // Manual Project Data
  const [projectData, setProjectData] = useState({
    title: "",
    problemStatement: "",
    hackathon: "",
    deadline: "",
  });

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8 shadow-xl">

        {/* STEP 1 */}
        {step === 1 && (
          <StepOne
  next={() => {
    setSelectedIdea(null);
    setStep(2);
  }}
  ideaGenerator={() => {
    setGeneratedProject(null);
    setStep(5);
  }}
/>
        )}

        {/* STEP 2 : User already has an idea */}
        {step === 2 && (
          <StepTwo
            next={() => setStep(3)}
            back={() => setStep(1)}
            projectData={projectData}
            setProjectData={setProjectData}
          />
        )}

        {/* STEP 5 : AI Idea Generator */}
        {step === 5 && (
          <IdeaGenerator
            back={() => setStep(1)}
            next={(data) => {
               console.log("========== CREATE MODAL ==========");
  console.log("Full data:", data);
  console.log("data.ideas:", data.ideas);
  console.log("Array?", Array.isArray(data.ideas));
  console.log("==================================");

              setIdeas(data.ideas);
              setPreferences(data.preferences);
              setStep(6);
            }}
          />
        )}

        {/* STEP 6 : Show AI Ideas */}
        {step === 6 && (
          <IdeaSelection
            ideas={ideas}
            back={() => setStep(5)}
            onSelect={(idea) => {
  setSelectedIdea(idea);
  setGeneratedProject(null);
  setStep(3);
}}
          />
        )}

        {/* STEP 3 : AI analyzes selected idea */}
        {step === 3 && (
          <AIAnalysis
  idea={selectedIdea}
  projectData={projectData}
  setGeneratedProject={setGeneratedProject}
  next={() => setStep(4)}
/>
        )}

        {/* STEP 4 : Final Review */}
        {step === 4 && (
         <StepThree
    project={generatedProject}
    back={() => {

        if(selectedIdea){

            setStep(6);

        }

        else{

            setStep(2);

        }

    }}
    close={close}
/>
        )}
      </div>
    </div>
  );
};

export default CreateProjectModal;