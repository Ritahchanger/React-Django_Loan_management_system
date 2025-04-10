import { X } from "lucide-react";
const ProjectModal = ({
  selectedProject,
  closeModal,
}: {
  selectedProject: any;
  closeModal: () => void;
}) => {
  if (!selectedProject) return null;
  return (
    <div className="bg-black/60 fixed inset-0 z-40 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg max-w-xl w-full p-6 relative shadow-lg overflow-y-auto max-h-[90vh]">
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
        >
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">
          {selectedProject.title}
        </h2>

        <div className="space-y-3 text-sm text-gray-700">
          <p>
            <strong>Category:</strong> {selectedProject.category}
          </p>
          <p>
            <strong>Status:</strong> {selectedProject.status}
          </p>
          <p>
            <strong>Budget:</strong> ${selectedProject.budget}
          </p>
          {selectedProject.problem && (
            <p>
              <strong>Problem:</strong> {selectedProject.problem}
            </p>
          )}
          {selectedProject.solution && (
            <p>
              <strong>Solution:</strong> {selectedProject.solution}
            </p>
          )}
          {selectedProject.goals && (
            <p>
              <strong>Goals:</strong> {selectedProject.goals}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
