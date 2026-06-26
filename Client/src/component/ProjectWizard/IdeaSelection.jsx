import IdeaCard from "./IdeaCard";

const IdeaSelection = ({
  ideas,
  back,
  onSelect,
}) => {
    console.log("IDEAS PROP:", ideas);
  console.log("TYPE:", typeof ideas);
  console.log("IS ARRAY:", Array.isArray(ideas));

  return (
    <div>

      <h2 className="text-3xl font-bold">
        Choose Your Favorite Idea
      </h2>

      <p className="text-gray-500 mt-2">
        AI generated these ideas based on your interests.
      </p>

      <div className="grid lg:grid-cols-2 gap-8 mt-10">

        {Array.isArray(ideas) ? (
             ideas.map((idea, index) => (
              <IdeaCard
                key={index}
                   idea={idea}
                   onSelect={onSelect}
             />
          ))
        ) : (
         <pre className="bg-red-100 p-4 rounded">
               {JSON.stringify(ideas, null, 2)}
         </pre>
        )}

      </div>

      <div className="mt-10">

        <button
          onClick={back}
          className="border px-6 py-3 rounded-xl hover:bg-gray-100"
        >
          ← Generate Again
        </button>

      </div>

    </div>
  );
};

export default IdeaSelection;