import express from "express";

import {
  generateIdeas,
  generateManualProject,
  generateAIProject,
    optimizeMVP,
} from "../controllers/aiController.js";

const router = express.Router();

router.post("/ideas", generateIdeas);

router.post("/manual-project", generateManualProject);

router.post("/generated-project", generateAIProject);
router.post("/mvp-optimizer", optimizeMVP);


export default router;