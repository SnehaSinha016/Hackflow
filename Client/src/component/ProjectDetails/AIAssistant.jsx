import { useState } from "react";
import {
  Sparkles,
  Send,
  Loader2,
  Clock3,
  CheckCircle2,
  ListTodo,
} from "lucide-react";

const AIAssistant = ({ project }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const suggestions = [
    "I only have 2 days left. What should I cut?",
    "What should I work on next?",
    "Analyze my current progress.",
    "Which tasks are most important for my MVP?",
  ];

  const totalTasks = project?.tasks?.length || 0;

  const completedTasks =
    project?.tasks?.filter(
      (task) => task.status?.toLowerCase() === "completed"
    ).length || 0;

  const sendMessage = async (text = message) => {
    const userMessage = text.trim();

    if (!userMessage || loading) return;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: userMessage,
      },
    ]);

    setMessage("");
    setLoading(true);

    // AI backend connection comes next
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I'm ready to analyze your project. The AI backend will be connected next.",
        },
      ]);

      setLoading(false);
    }, 800);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-violet-100 flex items-center justify-center">
            <Sparkles
              size={23}
              className="text-violet-600"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              Project Copilot
            </h1>

            <p className="text-gray-500 mt-1">
              Ask questions about your project, tasks, MVP and
              timeline.
            </p>
          </div>
        </div>
      </div>

      {/* Project Context */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5">
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <ListTodo size={17} />
            Total Tasks
          </div>

          <p className="text-2xl font-bold mt-2">
            {totalTasks}
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5">
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <CheckCircle2 size={17} />
            Completed
          </div>

          <p className="text-2xl font-bold mt-2">
            {completedTasks}
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5">
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Clock3 size={17} />
            Duration
          </div>

          <p className="text-xl font-bold mt-2">
            {project?.estimatedDuration || "Not set"}
          </p>
        </div>
      </div>

      {/* Chat */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="min-h-[420px] max-h-[550px] overflow-y-auto p-6">
          {messages.length === 0 ? (
            <div className="min-h-[370px] flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-violet-100 flex items-center justify-center">
                <Sparkles
                  size={30}
                  className="text-violet-600"
                />
              </div>

              <h2 className="text-2xl font-semibold mt-5">
                How can I help with your project?
              </h2>

              <p className="text-gray-500 max-w-xl mt-2">
                I can help you understand your tasks, reduce
                scope, prioritize work and adapt your project
                timeline.
              </p>

              <div className="flex flex-wrap justify-center gap-3 mt-6">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => sendMessage(suggestion)}
                    className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 hover:border-violet-300 hover:bg-violet-50 transition"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.role === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                      msg.role === "user"
                        ? "bg-violet-600 text-white rounded-br-md"
                        : "bg-slate-100 text-slate-800 rounded-bl-md"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-slate-100 px-4 py-3 rounded-2xl flex items-center gap-2">
                    <Loader2
                      size={18}
                      className="animate-spin text-violet-600"
                    />

                    <span className="text-gray-500">
                      Analyzing your project...
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Input */}
        <div className="border-t border-gray-200 p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="flex gap-3"
          >
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask anything about your project..."
              className="flex-1 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-violet-500"
            />

            <button
              type="submit"
              disabled={!message.trim() || loading}
              className="bg-violet-600 hover:bg-violet-700 text-white px-4 rounded-xl disabled:opacity-50"
            >
              {loading ? (
                <Loader2
                  size={20}
                  className="animate-spin"
                />
              ) : (
                <Send size={20} />
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;