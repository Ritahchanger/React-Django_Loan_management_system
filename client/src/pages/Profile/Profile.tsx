import AccountLayout from "../../Layout/AccountLayout";
import { useAuthHeaders } from "../../Config/Config";
import { useState, useEffect } from "react";
import axios from "axios";

import { User, Mail, Tag, Phone } from "lucide-react"; // Import icons from Lucide React
import { useSelector } from "react-redux";
import { RootState } from "../../store/redux/Store";

import UserProfile from "../../assets/user.png";

const Profile = () => {
  const authHeaders = useAuthHeaders();
  const { user } = useSelector((state: RootState) => state.auth);

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
                <p className="text-gray-500">{user.role}</p>
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

              {/* Become an Investor Button */}
              <div className="mt-4 flex justify-center">
                {user.role === "borrower" && (
                  <button className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition duration-200 cursor-pointer">
                    BECOME AN INVESTOR
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
