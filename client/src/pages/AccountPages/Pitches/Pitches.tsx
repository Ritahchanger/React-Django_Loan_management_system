import AccountLayout from "../../../Layout/AccountLayout";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { userProjectsResponse } from "../../../types/userprojects.interface";

import { RootState } from "../../../store/redux/Store";

import { baseUrl } from "../../../Config/Config";

import ProjectModal from "../../Projects/ProjectModal";

import { CheckCircle } from "lucide-react";

import { useTheme } from "../../../context/ThemeContext";

import AddInvestor from "./AddInvestor";

const AllPitches = () => {
  const [isInvestorModalOpen, setIsModalOpen] = useState(false);

  const handleModalToggle = () => setIsModalOpen(!isInvestorModalOpen);

  const { user, token } = useSelector((state: RootState) => state.auth);
  const [projects, setProjects] = useState<userProjectsResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const [projectModal, displayProjectModal] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] =
    useState<userProjectsResponse | null>(null);

  const id = parseInt(user.id);

  const openProjectModal = (project: userProjectsResponse) => {
    setSelectedProject(project);
    displayProjectModal(true);
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
    displayProjectModal(false);
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${baseUrl}projects/list/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        setProjects(response.data);
      } catch (err) {
        setError("Failed to fetch projects.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [id, token]);

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
      <div className="py-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Projects Pitches
        </h2>

        {projects.length === 0 ? (
          <div className="text-gray-500">No projects found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white border border-gray-200 rounded-sm p-4 shadow-sm hover:shadow-md transition duration-300 transform hover:scale-[1.01] flex justify-between items-center"
              >
                <div>
                  <h3 className="text-lg font-semibold text-blue-700 mb-2 truncate">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium text-gray-700">Category:</span>{" "}
                    {project.category}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium text-gray-700">Budget:</span> $
                    {project.budget}
                  </p>
                  <p className="text-sm text-gray-600 mb-3">
                    <span className="font-medium text-gray-700">Status:</span>{" "}
                    <span
                      className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium ${
                        project.status !== "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {project.status === "active" ? (
                        <>
                          Funded <CheckCircle className="ml-1 w-4 h-4" />
                        </>
                      ) : (
                        project.status
                      )}
                    </span>
                  </p>
                </div>

                <div className="flex flex-col justify-end">
                  <button
                    onClick={() => openProjectModal(project)}
                    className="mt-2 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-1.5 rounded-sm transition"
                  >
                    View
                  </button>

                  {project.status !== "funded" && (
                    <button
                      className="mt-2 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-1.5 rounded-sm transition"
                      onClick={handleModalToggle}
                    >
                      Invest
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isInvestorModalOpen && (
        <AddInvestor handleModalToggle={handleModalToggle} />
      )}

      {projectModal && selectedProject && (
        <ProjectModal
          selectedProject={selectedProject}
          closeModal={closeProjectModal}
        />
      )}
    </AccountLayout>
  );
};

export default AllPitches;
