import AccountLayout from "../../Layout/AccountLayout";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { userProjectsResponse } from "../../types/userprojects.interface";
import { RootState } from "../../store/redux/Store";
import { baseUrl } from "../../Config/Config";

import ProjectModal from "./ProjectModal";
import { CheckCircle } from "lucide-react";

import { getYouTubeId } from "../../utils/GetYouTube";

const Project = () => {
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
        const response = await axios.get(
          `${baseUrl}projects/user-projects/${id}/`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );

        setProjects(response.data);
      } catch (err) {
        setError("Failed to fetch projects.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [id, token]);

 

  const renderVideo = (url: string) => {
    // Check if the URL is from YouTube
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const videoId = getYouTubeId(url); // YouTube video ID extraction
      return (
        <iframe
          width="100%"
          height="250"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="Project Video"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      );
    }

    // Check if the URL is from Vimeo
    if (url.includes("vimeo.com")) {
      const videoId = url.split("vimeo.com/")[1];
      return (
        <iframe
          width="100%"
          height="250"
          src={`https://player.vimeo.com/video/${videoId}`}
          title="Project Video"
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
        ></iframe>
      );
    }

    // Handle Google Drive video URL (assuming it's a shared file link)
    if (url.includes("drive.google.com")) {
      const fileId = url.split("/d/")[1]?.split("/")[0];
      return (
        <iframe
          width="100%"
          height="250"
          src={`https://drive.google.com/file/d/${fileId}/preview`}
          title="Project Video"
          frameBorder="0"
          allow="autoplay; fullscreen"
        ></iframe>
      );
    }

    return <p>Unsupported video source.</p>; // For unsupported URLs
  };

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
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Projects</h2>

        {projects.length === 0 ? (
          <div className="text-gray-500">No projects found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white border border-gray-200 rounded-sm p-4 shadow-sm hover:shadow-md transition duration-300 transform hover:scale-[1.01] "
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-blue-700 mb-2 truncate">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-1">
                      <span className="font-medium text-gray-700">
                        Category:
                      </span>{" "}
                      {project.category}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      <span className="font-medium text-gray-700">Budget:</span>{" "}
                      ${project.budget}
                    </p>
                    {project.total_invested && (
                      <p className="text-sm text-gray-600 mb-1">
                        <span className="font-medium text-green-700">
                          Total invested:
                        </span>{" "}
                        ${project.total_invested}
                      </p>
                    )}
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

                  <div className="flex justify-end">
                    <button
                      onClick={() => openProjectModal(project)}
                      className="mt-2 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-1.5 rounded-sm transition"
                    >
                      View
                    </button>
                  </div>
                </div>
                {project.video_url && renderVideo(project.video_url)}
              </div>
            ))}
          </div>
        )}
      </div>

      {projectModal && selectedProject && (
        <ProjectModal
          selectedProject={selectedProject}
          closeModal={closeProjectModal}
        />
      )}
    </AccountLayout>
  );
};

export default Project;
