import AccountLayout from "../../Layout/AccountLayout";
import { useAuthHeaders, baseUrl } from "../../Config/Config";
import { useState } from "react";
import axios from "axios";

import { User, Mail, Tag, Phone } from "lucide-react"; // Icons
import { useSelector } from "react-redux";
import { RootState } from "../../store/redux/Store";

import UserProfile from "../../assets/user.png";

import { useNavigate } from "react-router-dom";

const Profile = () => {
  const authHeaders = useAuthHeaders();
  const { user } = useSelector((state: RootState) => state.auth);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChangeRole = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const response = await axios.patch(
        `${baseUrl}users/change/${user.id}/change-role/`,
        {},
        { headers: authHeaders }
      );

      if (response.status === 200) {
        navigate("/login");
      }
      console.log("Role changed:", response.data);
    } catch (error) {
      console.error("Error changing role:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AccountLayout>
      <div className="px-4 sm:px-8 py-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center tracking-wider">
          My Profile
        </h1>

        {user ? (
          <div className="max-w-4xl mx-auto bg-white p-6 border border-neutral-300 rounded-lg shadow-sm">
            {/* Profile Image */}
            <div className="flex items-center justify-center mb-6">
              <img
                src={UserProfile || "/default-profile.png"}
                alt="Profile"
                className="rounded-full w-24 h-24 object-cover border-2 border-gray-200"
              />
            </div>

            <div className="space-y-4">
              {/* Username */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <User className="text-gray-600 mr-3" size={20} />
                  <p className="font-medium text-gray-700">Username:</p>
                </div>
                <p className="text-gray-500">{user.username}</p>
              </div>

              {/* Email */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Mail className="text-gray-600 mr-3" size={20} />
                  <p className="font-medium text-gray-700">Email:</p>
                </div>
                <p className="text-gray-500">{user.email}</p>
              </div>

              {/* Role */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Tag className="text-gray-600 mr-3" size={20} />
                  <p className="font-medium text-gray-700">Role:</p>
                </div>
                <p className="text-gray-500 capitalize">{user.role}</p>
              </div>

              {/* Phone */}
              {user.phone && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Phone className="text-gray-600 mr-3" size={20} />
                    <p className="font-medium text-gray-700">Phone:</p>
                  </div>
                  <p className="text-gray-500">{user.phone}</p>
                </div>
              )}

              {/* Toggle Role Button */}
              <div className="mt-4 flex justify-center">
                {(user.role === "borrower" || user.role === "investor") && (
                  <button
                    onClick={handleChangeRole}
                    disabled={isLoading}
                    className={`${
                      user.role === "borrower"
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-red-600 hover:bg-red-700"
                    } text-white py-2 px-6 rounded-full transition duration-200 cursor-pointer`}
                  >
                    {isLoading
                      ? "Updating..."
                      : user.role === "borrower"
                      ? "BECOME AN INVESTOR"
                      : "BECOME A BORROWER"}
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">Loading profile...</p>
        )}
      </div>
    </AccountLayout>
  );
};

export default Profile;
