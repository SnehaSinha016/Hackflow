import {
  Calendar,
  Code2,
  Users,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { createProject } from "../../api/projectApi";
import ProjectBlueprint from "../ProjectBlueprint/ProjectBlueprint";

const StepThree = ({ back, close, project }) => {

  const handleCreate = async () => {
  try {

    const response = await createProject(project);

    console.log("Created Project:", response);

    alert("Project Created Successfully!");

    close();

  } catch (err) {

    console.error(err);
console.log(err.response?.data);

    alert("Failed to create project.");

  }
};

  if (!project) {

    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">
          Loading Project...
        </h2>
      </div>
    );

  }

  return (

    <div className="space-y-6">

     <ProjectBlueprint project={project} />

<div className="flex justify-between mt-8">

    <button
        onClick={back}
        className="border px-6 py-2 rounded-lg"
    >
        Back
    </button>

    <button
        onClick={handleCreate}
        className="bg-violet-600 text-white px-6 py-2 rounded-lg"
    >
        Create Project
    </button>

</div>
</div>
  );
};

export default StepThree;