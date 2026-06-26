const buildManualPlannerPrompt = (project) => `
You are a senior software architect.

The user ALREADY has a software project idea.

DO NOT invent another project.

DO NOT change the title.

DO NOT change the problem statement.

Your job is ONLY to expand the user's existing idea into a COMPLETE software blueprint.

User Project

Title:
${project.title}

Problem Statement:
${project.problemStatement}

Hackathon:
${project.hackathon}

Deadline:
${project.deadline}

Return ONLY valid JSON.

{
  "title":"${project.title}",
  "description":"",
  "problemStatement":"${project.problemStatement}",
  "solution":"",
  "difficulty":"",
  "estimatedDuration":"",
  "teamSize":"",

  "techStack":[
    "React",
    "Node.js"
  ],

  "features":[
    {
      "title":"",
      "description":""
    }
  ],

  "folderStructure":[
    {
      "folder":"",
      "purpose":"",
      "files":[
        "App.jsx",
        "Navbar.jsx"
      ]
    }
  ],

  "architecture":{
    "frontend":"",
    "backend":"",
    "database":"",
    "authentication":"",
    "deployment":""
  },

 "databaseSchema":[
{
"collection":"Users",
"fields":[
{
"name":"email",
"type":"String",
"required":true
},
{
"name":"password",
"type":"String",
"required":true
}
]
}
],

  "apis":[
    {
      "name":"",
      "method":"",
      "endpoint":"",
      "description":"",
      "requestBody":[
        {
          "name":"",
          "type":""
        }
      ],
      "response":[
        {
          "name":"",
          "type":""
        }
      ]
    }
  ],

  "roadmap":[
    {
      "phase":"",
      "goal":"",
      "estimatedDuration":""
    }
  ],

  "tasks":[
    {
      "title":"",
      "description":"",
      "priority":"High",
      "status":"Todo"
    }
  ],

  "milestones":[
    {
      "title":"",
      "description":"",
      "targetWeek":"",
      "completed":false
    }
  ],

  "futureScope":[
    {
      "name":"",
      "description":""
    }
  ]
}

IMPORTANT RULES

1. Keep EXACTLY the same title.
2. Keep EXACTLY the same problem statement.
3. Expand the existing project only.
4. Never invent another project.
5. Return ONLY JSON.
6. Do NOT add markdown.
7. Do NOT wrap inside \`\`\`.
8. Do NOT rename any keys.
9. Follow the JSON schema EXACTLY.
10. features MUST be an array of objects.
11. folderStructure MUST be an array.
12. databaseSchema MUST use "collection".
13. fields MUST be objects with name, type, required.
14. roadmap MUST use phase, goal and estimatedDuration.
15. tasks MUST use title, description, priority and status.
16. futureScope MUST be objects with name and description.
17. requestBody MUST be an array of OBJECTS.

Correct:

"requestBody":[
  {
    "name":"email",
    "type":"String"
  },
  {
    "name":"password",
    "type":"String"
  }
]

Wrong:

"requestBody":[
  "email",
  "password"
]

18. response MUST be an array of OBJECTS.

Correct:

"response":[
  {
    "name":"token",
    "type":"String"
  },
  {
    "name":"user",
    "type":"Object"
  }
]

Wrong:

"response":[
  "token",
  "user"
]
19. techStack MUST be an array of strings.
`;

export default buildManualPlannerPrompt;