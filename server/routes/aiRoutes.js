import express from "express";

import {
  generateIdeas,
  generateManualProject,
  generateAIProject,
} from "../controllers/aiController.js";

const router = express.Router();

router.post("/ideas", generateIdeas);

router.post("/manual-project", generateManualProject);

router.post("/generated-project", generateAIProject);

export default router;