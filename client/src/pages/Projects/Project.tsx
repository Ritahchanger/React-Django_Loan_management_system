import AccountLayout from "../../Layout/AccountLayout";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { userProjectsResponse } from "../../types/userprojects.interface";
import { RootState } from "../../store/redux/Store";
import { baseUrl } from "../../Config/Config";

const Project = () => {
  const { user, token } = useSelector((state: RootState) => state.auth);
  const [projects, setProjects] = useState<userProjectsResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const id = parseInt(user.id);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}projects/user-projects/${id}/`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        console.log(response.data);
        setProjects(response.data);
      } catch (err) {
        setError("Failed to fetch projects.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [id]);

  if (loading) {
    return (
      <AccountLayout>
        <div className="text-center py-10 text-gray-600 text-lg">
          Loading...
        </div>
      </AccountLayout>
    );
  }

  if (error) {
    return (
      <AccountLayout>
        <div className="text-center py-10 text-red-600">{error}</div>
      </AccountLayout>
    );
  }

  return (
    <AccountLayout>
      <div className="px-4 py-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Projects</h2>
        {projects.length === 0 ? (
          <div className="text-gray-500">No projects found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white shadow-md border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="text-xl font-semibold text-blue-600 mb-2">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Category:</strong> {project.category}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Status:</strong> {project.status}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Budget:</strong> ${project.budget}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Problem:</strong> {project.problem}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Solution:</strong> {project.solution}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Goals:</strong> {project.goals}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </AccountLayout>
  );
};

export default Project;
