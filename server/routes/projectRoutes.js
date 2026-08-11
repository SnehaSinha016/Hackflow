import express from "express";

import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  saveMVPPlan,
  adaptProject,
  applyAdaptation,
} from "../controllers/projectController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();


router.get("/",protect, getProjects);

router.get("/:id",protect, getProjectById);

router.post("/",protect, createProject);

router.put("/:id",protect, updateProject);

router.delete("/:id",protect, deleteProject);

router.put("/:id/mvp-plan", protect, saveMVPPlan);
router.post("/:id/adapt", protect, adaptProject);

router.post(
  "/:id/apply-adaptation",
  protect,
  applyAdaptation
);


export default router;