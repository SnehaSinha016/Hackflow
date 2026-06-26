import React from "react";
import { Camera, Pencil, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../api/firebase"; 
import { useEffect } from "react";

const Profile = () => {
 const navigate = useNavigate();

useEffect(() => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  if (!token || !user) {
    navigate("/login",{replace:true});
  }
}, [navigate]);

const userData = localStorage.getItem("user");
const user = userData ? JSON.parse(userData) : null;

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.log(err);
    }

    localStorage.removeItem("token");
    localStorage.removeItem("user");

   navigate("/login", { replace: true });
  };
  const handleChangePhoto = () => {
  alert("Coming Soon!");
};

  return (
    <div className="min-h-screen bg-slate-50 flex justify-center items-center p-8">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8">

        {/* Heading */}

        <h1 className="text-3xl font-bold text-center mb-8">
          My Profile
        </h1>

        {/* Avatar */}

        <div className="flex flex-col items-center">

          <div className="relative">

            <img
              src={
                user?.avatar ||
                "https://ui-avatars.com/api/?name=User&background=7C3AED&color=fff"
              }
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-violet-100"
            />

           <button
  onClick={handleChangePhoto}
  className="absolute bottom-0 right-0 bg-violet-600 text-white p-2 rounded-full hover:bg-violet-700 transition"
>
  <Camera size={18} />
</button>

          </div>

          <h2 className="text-2xl font-semibold mt-5">
            {user?.name}
          </h2>

          <p className="text-gray-500 mt-1">
            {user?.email}
          </p>

        </div>

        {/* Account Info */}

        <div className="mt-10 space-y-5">

          <div className="flex justify-between border-b pb-3">

            <span className="text-gray-500">
              Login Method
            </span>

            <span className="font-medium capitalize">
              {user?.provider === "google"
  ? "Google"
  : user?.provider === "github"
  ? "GitHub"
  : "Email"}
            </span>

          </div>

          <div className="flex justify-between border-b pb-3">

            <span className="text-gray-500">
              Member Since
            </span>

            <span className="font-medium">
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })
                : "Recently"}
            </span>

          </div>

        </div>

        {/* Buttons */}

        <div className="mt-10 space-y-4">

          <button className="w-full flex items-center justify-center gap-2 border border-violet-600 text-violet-600 py-3 rounded-xl hover:bg-violet-50 transition">

            <Pencil size={18} />

            Edit Profile

          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl transition"
          >

            <LogOut size={18} />

            Logout

          </button>

        </div>

      </div>

    </div>
  );
};

export default Profile;