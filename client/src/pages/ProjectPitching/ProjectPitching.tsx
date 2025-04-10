import { ChangeEvent, FormEvent, useState } from "react";
import AccountLayout from "../../Layout/AccountLayout";

const ProjectPitching = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    problem: "",
    solution: "",
    goals: "",
    budget: "",
    file: null as File | null,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (e.target instanceof HTMLInputElement && e.target.type === "file") {
      setFormData({
        ...formData,
        [name]: e.target.files ? e.target.files[0] : null,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <AccountLayout>
      <div className="max-w-3xl mx-auto p-6 border border-neutral-300 rounded-lg shadow-md mt-10">
        <h2 className="text-2xl font-semibold mb-6">Pitch Your Project</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Project Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full border border-neutral-300 rounded px-4 py-2"
              placeholder="Enter project title"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full border border-neutral-300 rounded px-4 py-2"
              placeholder="e.g. Technology, Health, Finance"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Problem Statement</label>
            <textarea
              name="problem"
              value={formData.problem}
              onChange={handleChange}
              required
              className="w-full border border-neutral-300 rounded px-4 py-2"
              rows={4}
              placeholder="What problem does your project solve?"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Proposed Solution</label>
            <textarea
              name="solution"
              value={formData.solution}
              onChange={handleChange}
              required
              className="w-full border border-neutral-300 rounded px-4 py-2"
              rows={4}
              placeholder="Describe your solution"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Goals & Objectives</label>
            <textarea
              name="goals"
              value={formData.goals}
              onChange={handleChange}
              required
              className="w-full border border-neutral-300 rounded px-4 py-2"
              rows={3}
              placeholder="What are your main goals?"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Estimated Budget ($)
            </label>
            <input
              type="number"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              required
              className="w-full border rounded border-neutral-300 px-4 py-2"
              placeholder="Enter estimated budget"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Attach Supporting Document (optional)
            </label>
            <input
              type="file"
              name="file"
              onChange={handleChange}
              className="w-full"
              accept=".pdf,.doc,.docx,.ppt,.pptx"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Submit Pitch
          </button>
        </form>
      </div>
    </AccountLayout>
  );
};

export default ProjectPitching;
