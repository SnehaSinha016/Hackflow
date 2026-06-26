import mongoose from "mongoose";

const FieldSchema = new mongoose.Schema(
  {
    name: String,
    type: String,
    required: Boolean,
  },
  { _id: false }
);

const ApiFieldSchema = new mongoose.Schema(
  {
    name: String,
    type: String,
  },
  { _id: false }
);
const projectSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: String,
    tagline: String,
    description: String,
    problemStatement: String,
    solution: String,

    difficulty: String,
    estimatedDuration: String,
    teamSize: String,

    deadline: {
      type: Date,
      default: null,
    },

    status: {
      type: String,
      enum: ["Planning", "In Progress", "Completed"],
      default: "Planning",
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },

    favorite: {
      type: Boolean,
      default: false,
    },

    archived: {
      type: Boolean,
      default: false,
    },

    lastOpened: {
      type: Date,
      default: Date.now,
    },

    techStack: [String],

    features: [
      {
        title: String,
        description: String,
      },
    ],

    folderStructure: [
      {
        folder: String,
        purpose: String,
        files: [String],
      },
    ],

    architecture: {
      frontend: String,
      backend: String,
      database: String,
      authentication: String,
      deployment: String,
    },

    databaseSchema: [
      {
        collection: String,
        fields: [FieldSchema],
      },
    ],

    apis: [
      {
        name: String,
        method: String,
        endpoint: String,
        description: String,
        requestBody: [ApiFieldSchema],
        response: [ApiFieldSchema],
      },
    ],

    roadmap: [
      {
        phase: String,
        goal: String,
        estimatedDuration: String,
      },
    ],

    tasks: [
      {
        title: String,
        description: String,
        status: {
          type: String,
          default: "todo",
        },
        priority: String,
      },
    ],

    milestones: [
      {
        title: String,
        description: String,
        completed: Boolean,
        targetWeek: String,
      },
    ],

    aiSuggestions: [
      {
        title: String,
        description: String,
      },
    ],

    futureScope: [String],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Project", projectSchema);