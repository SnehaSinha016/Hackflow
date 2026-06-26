import { chatWithAI } from "../services/aiService.js";

import buildIdeaPrompt from "../prompts/ideaPrompt.js";
import buildManualPlannerPrompt from "../prompts/manualPlannerPrompt.js";
import buildGeneratedPlannerPrompt from "../prompts/generatedPlannerPrompt.js";

const cleanJSON = (text) => {
  return text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
};


export const generateIdeas = async (req, res) => {
  try {
    const prompt = buildIdeaPrompt(req.body);

    const response = await chatWithAI(prompt);

    let ideas = JSON.parse(cleanJSON(response));

    if (ideas.ideas) {
      ideas = ideas.ideas;
    }

    if (!Array.isArray(ideas)) {
      ideas = [ideas];
    }

    res.json({
      success: true,
      ideas,
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: "Failed to generate ideas",
    });

  }
};

export const generateManualProject = async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const prompt = buildManualPlannerPrompt(req.body);

    console.log("PROMPT:", prompt);

    const response = await chatWithAI(prompt);

console.log("========== RAW RESPONSE ==========");
console.log(response);

let ideas = JSON.parse(cleanJSON(response));

console.log("========== PARSED IDEAS ==========");
console.log(ideas);
console.log("Ideas count:", Array.isArray(ideas) ? ideas.length : "Not an array");

    console.log("RAW AI RESPONSE:");
    console.log(response);

    const cleaned = cleanJSON(response);

    console.log("CLEANED RESPONSE:");
    console.log(cleaned);

    const project = JSON.parse(cleaned);

    res.json({
      success: true,
      project,
    });

  } catch (err) {
    console.error("========== ERROR ==========");
    console.error(err);
    console.error(err.stack);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};



export const generateAIProject = async (req, res) => {
  try {

    const prompt = buildGeneratedPlannerPrompt(req.body.idea);

    const response = await chatWithAI(prompt);

    const project = JSON.parse(cleanJSON(response));

    res.json({
      success: true,
      project,
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: "Failed to generate AI project",
    });

  }
};