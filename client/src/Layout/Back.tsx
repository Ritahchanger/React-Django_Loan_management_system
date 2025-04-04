import { ArrowBigLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Back = () => {
  const navigate = useNavigate();

  return (
    <div
      className="fixed bottom-8 left-8 z-20 w-10 h-10 bg-blue-500 rounded-full flex justify-center items-center cursor-pointer hover:bg-blue-600 transition"
      onClick={() => navigate(-1)}
    >
      <ArrowBigLeft color="white" size={20} />
    </div>
  );
};

export default Back;
