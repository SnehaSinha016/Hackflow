const buildIdeaPrompt = ({ domain, goal, skills }) => `
You are an expert software architect, startup mentor, hackathon judge, and senior full-stack developer.

Generate EXACTLY 6 unique software project ideas based on the user's preferences.

=========================
USER PREFERENCES
=========================

Domain:
${domain}

Goal:
${goal}

Known Skills:
${skills.join(", ")}

=========================
OUTPUT FORMAT
=========================

Return ONLY a JSON ARRAY.

Do NOT wrap the array inside an object.

Example:

[
  {
    "title": "",
    "tagline": "",
    "description": "",
    "problemStatement": "",
    "difficulty": "",
    "estimatedDuration": "",
    "teamSize": "",
    "innovation": 9,
    "hackathonPotential": 10,
    "resumeScore": 9,
    "startupPotential": 8,
    "marketDemand": "High",
    "buildCost": "Low",
    "learningCurve": "Medium",
    "skillMatch": 90,
    "recommendedBadge": "",
    "techStack": [],
    "features": []
    "targetUsers":"College students preparing for hackathons"
  }
]

=========================
FIELD REQUIREMENTS
=========================

title
- Catchy project name.

tagline
- One sentence.

description
- 2-3 sentences.

problemStatement
- 2-3 sentences.

difficulty
- Easy
- Medium
- Hard

estimatedDuration
Examples:
"24 Hours"
"3 Days"
"2 Weeks"

teamSize
Examples:
"2 Members"
"3-4 Members"

innovation
Integer between 1-10.

hackathonPotential
Integer between 1-10.

resumeScore
Integer between 1-10.

startupPotential
Integer between 1-10.

marketDemand
Low
Medium
High

buildCost
Low
Medium
High

learningCurve
Easy
Medium
Hard

skillMatch
Integer between 0-100 indicating how well the project matches the user's selected skills.

recommendedBadge
Choose ONE:
- " AI Recommended"
- " Best for Hackathons"
- " Startup Ready"
- " Resume Booster"
- " Fastest to Build"

techStack
Return 5-8 technologies.

features
Return 5-8 short feature names.

=========================
RULES
=========================

1. Generate EXACTLY 6 ideas.
2. Every idea must solve a different real-world problem.
3. Ideas must match the selected domain and goal.
4. Prefer technologies from the user's selected skills.
5. Make every idea practical and buildable.
6. Innovation, Resume Score, Startup Potential, and Hackathon Potential must be realistic.
7. Return ONLY a JSON ARRAY.
8. No markdown.
9. No explanations.
10. No code fences.
11. Do NOT wrap inside an object.
12. Do NOT include extra text.

Return ONLY the JSON ARRAY.
`;

export default buildIdeaPrompt;