import Project from "../models/Project.js";
import { sendNotification } from "../services/notificationService.js";

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
if (req.body.apis) {
  req.body.apis = req.body.apis.map(api => ({
    ...api,

    requestBody: (api.requestBody || []).map(field =>
      typeof field === "string"
        ? {
            name: field,
            type: "String",
          }
        : field
    ),

    response: (api.response || []).map(field =>
      typeof field === "string"
        ? {
            name: field,
            type: "String",
          }
        : field
    ),
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
