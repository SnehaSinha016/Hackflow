import { useState } from "react";
import {
  Target,
  Sparkles,
  Clock3,
  Users,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Loader2,
  RotateCcw,
} from "lucide-react";
import { optimizeMVP } from "../../api/aiApi";
import { updateProject } from "../../api/projectApi";

const Section = ({ title, icon: Icon, items, tone }) => {
  const styles = {
    green: "border-green-200 bg-green-50 text-green-800",
    yellow: "border-yellow-200 bg-yellow-50 text-yellow-800",
    red: "border-red-200 bg-red-50 text-red-800",
  };

  return (
    <div className={`rounded-2xl border p-5 ${styles[tone]}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 font-semibold">
          <Icon size={20} />
          <span>{title}</span>
        </div>
        <span className="text-sm font-bold">{items.length}</span>
      </div>

      {items.length === 0 ? (
        <p className="text-sm opacity-70">No tasks in this category.</p>
      ) : (
        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={`${item.title}-${index}`} className="bg-white/80 rounded-xl p-4">
              <p className="font-semibold text-slate-800">{item.title}</p>
              <p className="text-sm text-slate-600 mt-1">{item.reason}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const MVPOptimizer = ({ project, setProject }) => {
  const [plan, setPlan] = useState(project.mvpPlan || null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(Boolean(project.mvpPlan));

  const runOptimizer = async () => {
    try {
      setLoading(true);
      setError("");
      setSaved(false);

      const response = await optimizeMVP(project);
      setPlan(response.plan);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          "Could not optimize this project. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const applyPlan = async () => {
    if (!plan) return;

    try {
      setSaving(true);
      setError("");

      const mustHave = new Set((plan.mustHave || []).map((item) => item.title));
      const shouldHave = new Set((plan.shouldHave || []).map((item) => item.title));
      const cutForNow = new Set((plan.cutForNow || []).map((item) => item.title));

      const optimizedTasks = (project.tasks || []).map((task) => ({
        ...task,
        mvpCategory: mustHave.has(task.title)
          ? "Must Have"
          : shouldHave.has(task.title)
          ? "Should Have"
          : cutForNow.has(task.title)
          ? "Cut for Now"
          : task.mvpCategory || null,
      }));

      const updatedProject = await updateProject(project._id, {
        mvpPlan: plan,
        tasks: optimizedTasks,
      });

      setProject(updatedProject);
      setPlan(updatedProject.mvpPlan);
      setSaved(true);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          "Could not save the MVP plan. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm p-8">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-violet-100 text-violet-700 flex items-center justify-center">
              <Target size={25} />
            </div>
            <div>
              <h1 className="text-3xl font-bold">MVP Optimizer</h1>
              <p className="text-gray-500 mt-1">
                Reduce your scope to what can realistically be built during the hackathon.
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          {plan && (
            <button
              onClick={runOptimizer}
              disabled={loading || saving}
              className="border border-gray-200 px-4 py-3 rounded-xl hover:bg-gray-50 flex items-center gap-2 disabled:opacity-50"
            >
              <RotateCcw size={17} />
              Re-analyze
            </button>
          )}
          <button
            onClick={runOptimizer}
            disabled={loading || saving}
            className="bg-violet-600 hover:bg-violet-700 text-white px-5 py-3 rounded-xl flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
            {loading ? "Analyzing..." : plan ? "Optimize Again" : "Optimize for Hackathon"}
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mt-8">
        <div className="bg-slate-50 rounded-2xl p-5">
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Target size={17} /> Current tasks
          </div>
          <p className="text-3xl font-bold mt-2">{project.tasks?.length || 0}</p>
        </div>
        <div className="bg-slate-50 rounded-2xl p-5">
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Users size={17} /> Team size
          </div>
          <p className="text-xl font-bold mt-2">{project.teamSize || "Not set"}</p>
        </div>
        <div className="bg-slate-50 rounded-2xl p-5">
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Clock3 size={17} /> Hackathon duration
          </div>
          <p className="text-xl font-bold mt-2">{project.estimatedDuration || "Not set"}</p>
        </div>
      </div>

      {error && (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 text-red-700 p-4">
          {error}
        </div>
      )}

      {!plan && !loading && (
        <div className="mt-8 rounded-2xl border border-dashed border-violet-200 bg-violet-50/50 p-10 text-center">
          <Target className="mx-auto text-violet-600" size={42} />
          <h2 className="text-2xl font-semibold mt-4">Is your scope too big?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mt-2">
            HackFlow will analyze your existing tasks, features, team size and time limit,
            then separate the work into Must Have, Should Have and Cut for Now.
          </p>
          <button
            onClick={runOptimizer}
            className="mt-6 bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-xl font-medium"
          >
            Analyze My MVP
          </button>
        </div>
      )}

      {loading && (
        <div className="mt-8 rounded-2xl bg-slate-50 p-12 text-center">
          <Loader2 className="mx-auto text-violet-600 animate-spin" size={42} />
          <p className="font-semibold mt-4">Analyzing your project...</p>
          <p className="text-sm text-gray-500 mt-1">
            Comparing your scope with your team size and hackathon time.
          </p>
        </div>
      )}

      {plan && !loading && (
        <>
          <div className="mt-8 rounded-2xl bg-violet-50 border border-violet-100 p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-violet-700">AI Recommendation</p>
                <p className="text-lg font-medium text-slate-800 mt-1">{plan.summary}</p>
              </div>
              <div className="flex flex-wrap gap-3 text-sm">
                <span className="bg-white px-3 py-2 rounded-lg">
                  {plan.currentTaskCount ?? project.tasks?.length ?? 0} current
                </span>
                <span className="bg-white px-3 py-2 rounded-lg">
  {(plan.mustHave?.length || 0) + (plan.shouldHave?.length || 0)} MVP tasks
</span>

<span className="bg-red-50 text-red-700 px-3 py-2 rounded-lg">
  {plan.cutForNow?.length || 0} cut for now
</span>
                <span className="bg-white px-3 py-2 rounded-lg">
                  {plan.availableDays || "—"} days
                </span>
                <span className={`px-3 py-2 rounded-lg font-semibold ${
                  plan.risk === "High"
                    ? "bg-red-100 text-red-700"
                    : plan.risk === "Medium"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700"
                }`}>
                  {plan.risk} risk
                </span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-5 mt-6">
            <Section title="Must Have" icon={CheckCircle2} items={plan.mustHave || []} tone="green" />
            <Section title="Should Have" icon={AlertTriangle} items={plan.shouldHave || []} tone="yellow" />
            <Section title="Cut for Now" icon={XCircle} items={plan.cutForNow || []} tone="red" />
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t pt-6">
            <p className="text-sm text-gray-500">
              Applying this plan saves the recommendation to this project so the team can use it while building.
            </p>
            <button
              onClick={applyPlan}
              disabled={saving}
              className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 disabled:opacity-50"
            >
              {saving && <Loader2 size={18} className="animate-spin" />}
              {saved ? "Optimization Applied" : "Apply Optimization"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MVPOptimizer;
