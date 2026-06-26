import React, { useState } from "react";
import LoginImage from "../../assets/login.png";
import logo from "../../assets/Logo.png";

import api from "../../api/axios.js";

import { Link, useNavigate } from "react-router-dom";

import { signInWithPopup } from "firebase/auth";

import {
  auth,
  googleProvider,
  githubProvider,
} from "../../api/firebase.js";

import {
  User,
  Mail,
  Lock,
  Chrome,
  Github,
  UserPlus,
} from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await api.post("/auth/signup", {
        name,
        email,
        password,
      });

     localStorage.setItem(
  "token",
  response.data.token
);

localStorage.setItem(
  "user",
  JSON.stringify({
    _id: response.data._id,
    name: response.data.name,
    email: response.data.email,
  })
);

      alert("Account Created Successfully");

      navigate("/login");

    } catch (error) {
      console.log(error.response?.data);
      alert("Signup Failed");
    }
  };

  const handleGoogleLogin = async () => {
  try {
    // Login with Firebase
    const result = await signInWithPopup(
      auth,
      googleProvider
    );

    // Get Firebase ID Token
    const firebaseToken = await result.user.getIdToken();

    // Send token to backend
    const response = await api.post("/auth/google", {
      firebaseToken,
    });

    // Save HackFlow JWT
    localStorage.setItem(
      "token",
      response.data.token
    );

    // Save User
    localStorage.setItem(
      "user",
      JSON.stringify(response.data.user)
    );

    alert("Google Login Successful!");

    navigate("/dashboard");

  } catch (error) {
    console.error(error);

    alert("Google Login Failed");
  }
};

  const handleGitHubLogin = async () => {
  try {
    const result = await signInWithPopup(
      auth,
      githubProvider
    );

    const firebaseToken = await result.user.getIdToken();

    const response = await api.post("/auth/github", {
      firebaseToken,
    });

    localStorage.setItem(
      "token",
      response.data.token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(response.data.user)
    );

    alert("GitHub Login Successful!");

    navigate("/dashboard");

  } catch (error) {
    console.error(error);

    alert("GitHub Login Failed");
  }
};

  return (
    <>
      {/* Logo */}

      <div className="flex items-center px-6 py-4">

        <img
          src={logo}
          alt="logo"
          className="w-10 h-10"
        />

        <h2 className="ml-2 text-2xl font-bold">
          HackFlow
        </h2>

      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen gap-12 px-6 lg:px-16">

        {/* Left Image */}

        <div className="hidden lg:flex flex-1 justify-center">

          <img
            src={LoginImage}
            alt="Signup"
            className="w-full max-w-lg"
          />

        </div>

        {/* Signup Card */}

        <div className="w-full max-w-md bg-white border rounded-2xl shadow-xl p-8">

          <h2 className="text-3xl font-bold">
            Welcome to HackFlow!
          </h2>

          <p className="text-gray-500 mt-2">
            Create your account to get started.
          </p>

          <form
            onSubmit={handleSignup}
            className="space-y-5 mt-8"
          >

            {/* Name */}

            <div>

              <label className="font-medium">
                Full Name
              </label>

              <div className="relative mt-2">

                <User
                  size={20}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  className="w-full pl-11 py-3 border rounded-lg focus:ring-2 focus:ring-violet-500 outline-none"
                />

              </div>

            </div>

            {/* Email */}

            <div>

              <label className="font-medium">
                Email Address
              </label>

              <div className="relative mt-2">

                <Mail
                  size={20}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  className="w-full pl-11 py-3 border rounded-lg focus:ring-2 focus:ring-violet-500 outline-none"
                />

              </div>

            </div>

            {/* Password */}

            <div>

              <label className="font-medium">
                Password
              </label>

              <div className="relative mt-2">

                <Lock
                  size={20}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  className="w-full pl-11 py-3 border rounded-lg focus:ring-2 focus:ring-violet-500 outline-none"
                />

              </div>

            </div>

            {/* Confirm Password */}

            <div>

              <label className="font-medium">
                Confirm Password
              </label>

              <div className="relative mt-2">

                <Lock
                  size={20}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  className="w-full pl-11 py-3 border rounded-lg focus:ring-2 focus:ring-violet-500 outline-none"
                />

              </div>

            </div>

            {/* Signup Button */}

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 text-white py-3 rounded-lg transition"
            >

              <UserPlus size={20} />

              Create Account

            </button>

            {/* Divider */}

            <div className="flex items-center gap-3">

              <hr className="flex-1" />

              <span className="text-gray-500 text-sm">
                OR
              </span>

              <hr className="flex-1" />

            </div>

            {/* Google */}

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 border py-3 rounded-lg hover:bg-gray-50 transition"
            >

              <Chrome
                size={22}
                className="text-red-500"
              />

              Continue with Google

            </button>

            {/* GitHub */}

            <button
              type="button"
              onClick={handleGitHubLogin}
              className="w-full flex items-center justify-center gap-3 border py-3 rounded-lg hover:bg-gray-50 transition"
            >

              <Github size={22} />

              Continue with GitHub

            </button>

            <p className="text-center text-gray-600 mt-5">

              Already have an account?{" "}

              <Link
                to="/login"
                className="text-violet-600 font-semibold hover:underline"
              >
                Login here
              </Link>

            </p>

          </form>

        </div>

      </div>
    </>
  );
};

export default Signup;