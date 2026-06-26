const StepTwo=({

projectData,

setProjectData,

next,

back

})=>{

const handleChange=(e)=>{

setProjectData({

...projectData,

[e.target.name]:e.target.value

})

}

return(

<>

<h2 className="text-2xl font-bold">

Tell us about your idea

</h2>

<div className="mt-8 space-y-5">

<input

name="title"

placeholder="Project Name"

value={projectData.title}

onChange={handleChange}

className="w-full border rounded-xl p-3"

/>

<textarea

rows={5}

name="problemStatement"

placeholder="Describe your project..."

value={projectData.problemStatement}

onChange={handleChange}

className="w-full border rounded-xl p-3"

/>

<input

name="hackathon"

placeholder="Hackathon"

value={projectData.hackathon}

onChange={handleChange}

className="w-full border rounded-xl p-3"

/>

<input

type="date"

name="deadline"

value={projectData.deadline}

onChange={handleChange}

className="w-full border rounded-xl p-3"

/>

<div className="flex justify-between">

<button
onClick={back}
>

Back

</button>

<button
onClick={next}
>

Generate AI Plan

</button>

</div>

</div>

</>

)

}

export default StepTwo;