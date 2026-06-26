const buildGeneratedPlannerPrompt = (idea) => `
You are a senior software architect.

Generate a COMPLETE software project blueprint.

Project Idea

${JSON.stringify(idea)}

Return ONLY valid JSON.

{
"title":"",
"tagline":"",
"description":"",
"problemStatement":"",
"solution":"",
"difficulty":"",
"estimatedDuration":"",
"teamSize":"",

"techStack":[],

"features":[
{
"title":"",
"description":""
}
],

"architecture":{
"frontend":"",
"backend":"",
"database":"",
"authentication":"",
"deployment":""
},

"folderStructure":[
{
"folder":"",
"purpose":"",
"files":[]
}
],

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
]

"apis":[
{
"name":"",
"method":"",
"endpoint":"",
"description":"",
"requestBody":[],
"response":[]
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
"status":"todo"
}
],

"milestones":[
{
"title":"",
"description":"",
"completed":false,
"targetWeek":""
}
],

"futureScope":[
""],

"aiSuggestions":[
{
"title":"",
"description":""
}
]
}

Rules

Return ONLY JSON.

No markdown.

No explanation.

Generate realistic MERN architecture.

Generate 10-15 tasks.

Generate 5 milestones.

Generate 5 APIs.

Generate 5 collections.

Generate 5 future scope ideas.
`;

export default buildGeneratedPlannerPrompt;