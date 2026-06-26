import React, { useState } from "react";
import api from "../../api/axios";

import LoginImage from "../../assets/login.png";
import logo from "../../assets/Logo.png";

import { Link, useNavigate } from "react-router-dom";

import { signInWithPopup } from "firebase/auth";
import {
  auth,
  googleProvider,
  githubProvider,
} from "../../api/firebase";

import {
  Mail,
  Lock,
  Chrome,
  Github,
  LogIn,
} from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await api.post("/auth/login", {
      email,
      password,
    });

    console.log("LOGIN RESPONSE:", response.data);

    localStorage.setItem("token", response.data.token);

    localStorage.setItem(
      "user",
      JSON.stringify({
        _id: response.data._id,
        name: response.data.name,
        email: response.data.email,
      })
    );

    console.log("TOKEN AFTER SAVE:", localStorage.getItem("token"));

    alert("Login Successful!");

    navigate("/dashboard");

  } catch (error) {
    console.log(error.response?.data);
    alert("Login Failed");
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
          alt="Logo"
          className="w-10 h-10"
        />

        <h2 className="ml-2 text-2xl font-bold">
          HackFlow
        </h2>
      </div>

      {/* Main Section */}
      <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen gap-12 px-6 lg:px-16">

        {/* Left */}
        <div className="flex-1 text-center lg:text-left">

          <img
            src={LoginImage}
            alt="Login"
            className="w-full max-w-lg mx-auto"
          />

          <h1 className="text-5xl font-bold mt-6">
            Plan. Collaborate.
          </h1>

          <h1 className="text-5xl font-bold">
            Build. Win.
          </h1>

          <p className="text-xl text-gray-600 mt-4">
            Everything your hackathon team needs in one place.
          </p>

        </div>

        {/* Right */}
        <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-xl p-8">

          <h2 className="text-3xl font-bold">
            Welcome Back!
          </h2>

          <p className="text-gray-500 mt-2">
            Login to continue to your account.
          </p>

          <form
            onSubmit={handleLogin}
            className="mt-8 space-y-5"
          >

            {/* Email */}
            <div>

              <label className="text-gray-600 font-medium">
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
                  className="w-full pl-11 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-violet-500 focus:outline-none"
                  required
                />

              </div>

            </div>

            {/* Password */}
            <div>

              <div className="flex justify-between mb-2">

                <label className="text-gray-600 font-medium">
                  Password
                </label>

                <Link
                  to="/forgot-password"
                  className="text-violet-600 text-sm hover:underline"
                >
                  Forgot Password?
                </Link>

              </div>

              <div className="relative">

                <Lock
                  size={20}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  className="w-full pl-11 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-violet-500 focus:outline-none"
                  required
                />

              </div>

            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 text-white py-3 rounded-lg transition duration-300"
            >
              <LogIn size={20} />
              Login
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3">

              <hr className="flex-1" />

              <span className="text-gray-500 text-sm">
                OR
              </span>

              <hr className="flex-1" />

            </div>

            {/* Google Login */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 border rounded-lg py-3 hover:bg-gray-50 transition"
            >
              <Chrome
                size={22}
                className="text-red-500"
              />

              Continue with Google
            </button>

            {/* GitHub Login */}
            <button
              type="button"
              onClick={handleGitHubLogin}
              className="w-full flex items-center justify-center gap-3 border rounded-lg py-3 hover:bg-gray-50 transition"
            >
              <Github size={22} />

              Continue with GitHub
            </button>

            {/* Register */}
            <p className="text-center text-gray-600 mt-6">

              Don't have an account?{" "}

              <Link
                to="/signup"
                className="text-violet-600 font-semibold hover:underline"
              >
                Register here
              </Link>

            </p>

          </form>

        </div>

      </div>
    </>
  );
};

export default Login;