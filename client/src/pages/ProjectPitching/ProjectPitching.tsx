import { ChangeEvent, FormEvent, useState } from "react";
import AccountLayout from "../../Layout/AccountLayout";
import { baseUrl } from "../../Config/Config";
import axios from "axios";

import { useSelector } from "react-redux";
import { RootState } from "../../store/redux/Store";

const ProjectPitching = () => {
  const { user, token } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    problem: "",
    solution: "",
    goals: "",
    budget: "",
    video_url: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const payload = new FormData();
      payload.append("title", formData.title);
      payload.append("category", formData.category);
      payload.append("problem", formData.problem);
      payload.append("solution", formData.solution);
      payload.append("goals", formData.goals);
      payload.append("budget", formData.budget);
      payload.append("status", "pending");

      if (formData.video_url) {
        payload.append("video_url", formData.video_url);
      }

      const response = await axios.post(`${baseUrl}projects/pitch/`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${token}`,
        },
      });

      console.log(response);

      if (response.status === 201 || response.status === 200) {
        alert("Project pitch submitted successfully!");
        setFormData({
          title: "",
          category: "",
          problem: "",
          solution: "",
          goals: "",
          budget: "",
          video_url: "",
        });
      }
    } catch (error: any) {
      console.error("Error submitting pitch:", error);
      alert("Failed to submit pitch. Please try again.");
    }
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
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full border border-neutral-300 rounded px-4 py-2"
            >
              <option value="">Select Category</option>
              <option value="Finance">Finance</option>
              <option value="Agriculture">Agriculture</option>
              <option value="Education">Education</option>
              <option value="Health">Health</option>
              <option value="Fintech">Fintech</option>
              <option value="Tech">Tech</option>
            </select>
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
              Video Pitch URL (optional)
            </label>
            <input
              type="url"
              name="video_url"
              value={formData.video_url}
              onChange={handleChange}
              className="w-full border rounded border-neutral-300 px-4 py-2"
              placeholder="https://youtube.com/your-pitch-video"
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
