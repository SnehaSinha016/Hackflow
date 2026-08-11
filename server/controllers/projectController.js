import Project from "../models/Project.js";
import { sendNotification } from "../services/notificationService.js";
import { chatWithAI } from "../services/aiService.js";
import buildMVPOptimizerPrompt from "../prompts/mvpOptimizerPrompt.js";

/* GET ALL */

export const getProjects = async (req, res) => {
  try {
    console.log("Logged in user:", req.user);

    const projects = await Project.find();

    console.log("Projects found:", projects.length);

    res.json({
      success: true,
      projects,
    });
  } catch (err) {
    console.log(err);
  }
};

/* GET ONE */

export const getProjectById = async (req, res) => {
  try {

   const project = await Project.findOne({
  _id: req.params.id,
  owner: req.user._id,
});

    if (!project) {

      return res.status(404).json({
        success: false,
        message: "Project not found",
      });

    }

    res.json({
      success: true,
      project,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};

/* CREATE */

export const createProject = async (req, res) => {
  try {
    if (req.body.databaseSchema) {
      req.body.databaseSchema = req.body.databaseSchema.map((table) => {
        if (
          typeof table.fields === "string" &&
          table.fields.startsWith("[")
        ) {
          try {
            const cleaned = table.fields
              .replace(/(\w+):/g, '"$1":')
              .replace(/'/g, '"');

            table.fields = JSON.parse(cleaned);
          } catch (err) {
            console.log("Failed to parse fields:", err);
          }
        }

        return table;
      });
    }
console.log("========== REQUEST BODY ==========");
console.log(JSON.stringify(req.body, null, 2));

console.log("========== USER ==========");
console.log(req.user);
if (Array.isArray(req.body.apis)) {
    req.body.apis = req.body.apis.map((api) => ({
        ...api,

        requestBody: Array.isArray(api.requestBody)
            ? api.requestBody.map((field) =>
                typeof field === "string"
                    ? {
                        name: field,
                        type: "String",
                    }
                    : field
            )
            : [],

        response: Array.isArray(api.response)
            ? api.response.map((field) =>
                typeof field === "string"
                    ? {
                        name: field,
                        type: "String",
                    }
                    : field
            )
            : [],
    }));
}
    const project = await Project.create({
      ...req.body,

      owner: req.user._id,

      // Defaults
      status: req.body.status || "Planning",
      priority: req.body.priority || "Medium",
      deadline: req.body.deadline || null,

     favorite: false,

archived: false,

lastOpened: new Date(),
    });
await sendNotification({
  user: req.user._id,
  title: "Project Created",
  message: `"${project.title}" has been created successfully.`,
  type: "project",
  data: {
    projectId: project._id,
  },
});
    res.status(201).json({
      success: true,
      project,
    });

  } catch (err) {
  console.error("========== CREATE PROJECT ERROR ==========");
  console.error(err);
  console.error(err.stack);

  res.status(500).json({
    success: false,
    message: err.message,
    stack: err.stack,
  });
}
};
/* UPDATE */

export const updateProject = async (req, res) => {
  try {

    const project = await Project.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

   project.title = req.body.title ?? project.title;
project.tagline = req.body.tagline ?? project.tagline;
project.description = req.body.description ?? project.description;
project.difficulty = req.body.difficulty ?? project.difficulty;
project.teamSize = req.body.teamSize ?? project.teamSize;
project.estimatedDuration =
  req.body.estimatedDuration ?? project.estimatedDuration;
project.priority = req.body.priority ?? project.priority;
project.status = req.body.status ?? project.status;
project.deadline = req.body.deadline ?? project.deadline;
project.tasks = req.body.tasks ?? project.tasks;
project.mvpPlan = req.body.mvpPlan ?? project.mvpPlan;
project.futureScope = req.body.futureScope ?? project.futureScope;
project.roadmap = req.body.roadmap ?? project.roadmap;
project.milestones = req.body.milestones ?? project.milestones;
    project.lastOpened = new Date();

    await project.save();

    res.json({
      success: true,
      project,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};

/* DELETE */

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.json({
      success: true,
      message: "Project Deleted",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


/* SAVE MVP PLAN */

export const saveMVPPlan = async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const { mvpPlan } = req.body;

    if (!mvpPlan) {
      return res.status(400).json({
        success: false,
        message: "MVP plan is required",
      });
    }

    project.mvpPlan = mvpPlan;
    project.lastOpened = new Date();

    await project.save();

    res.json({
      success: true,
      message: "MVP plan saved successfully",
      project,
    });
  } catch (err) {
    console.error("========== SAVE MVP PLAN ERROR ==========");
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
export const adaptProject = async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const { reason, availableDays } = req.body;

    if (!reason) {
      return res.status(400).json({
        success: false,
        message: "Please provide a reason for adaptation",
      });
    }

    const projectData = {
      project: project.toObject(),

      adaptationRequest: {
        reason,
        availableDays: availableDays ?? null,
      },

      currentState: {
        totalTasks: project.tasks?.length || 0,

        completedTasks:
          project.tasks?.filter(
            (task) =>
              task.status?.toLowerCase() === "completed"
          ).length || 0,

        remainingTasks:
          project.tasks?.filter(
            (task) =>
              task.status?.toLowerCase() !== "completed"
          ).length || 0,
      },
    };

    const prompt = buildMVPOptimizerPrompt(projectData);

    const response = await chatWithAI(prompt);

    const cleaned = response
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const adaptation = JSON.parse(cleaned);

    res.json({
      success: true,
      adaptation,
    });
  } catch (err) {
    console.error("========== ADAPT PROJECT ERROR ==========");
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message || "Failed to adapt project",
    });
  }
};
export const applyAdaptation = async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const { adaptation, reason } = req.body;

    if (!adaptation) {
      return res.status(400).json({
        success: false,
        message: "Adaptation data is required",
      });
    }

    /*
     * Update MVP plan
     */
    if (adaptation.mvpPlan) {
      project.mvpPlan = adaptation.mvpPlan;
    }

    /*
     * Replace tasks if AI provided optimized tasks
     */
    if (Array.isArray(adaptation.optimizedTasks)) {
      project.tasks = adaptation.optimizedTasks.map((task) => ({
        title: task.title,
        description: task.description || "",
        status: task.status || "todo",
        priority: task.priority || "Medium",
        mvpCategory: task.mvpCategory || null,
      }));
    }

    /*
     * Update future scope
     */
    if (Array.isArray(adaptation.futureScope)) {
      project.futureScope = adaptation.futureScope;
    }

    /*
     * Update roadmap
     */
    if (Array.isArray(adaptation.roadmap)) {
      project.roadmap = adaptation.roadmap;
    }

    /*
     * Store adaptation history
     */
    project.adaptationHistory.push({
      reason: reason || "Project adapted using AI",
      changes: adaptation.changes || [],
    });

    project.lastOpened = new Date();

    await project.save();

    await sendNotification({
      user: req.user._id,
      title: "Project Adapted",
      message: `"${project.title}" was successfully adapted using AI.`,
      type: "project",
      data: {
        projectId: project._id,
      },
    });

    res.json({
      success: true,
      message: "Project adapted successfully",
      project,
    });
  } catch (err) {
    console.error("========== APPLY ADAPTATION ERROR ==========");
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message || "Failed to apply adaptation",
    });
  }
};
