import React, { useState, useEffect } from "react";
import { FaUserGraduate, FaSun, FaUserLock, FaMoon } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function TopNavbar({ darkMode, toggleTheme, setIsLoggedIn, forceLogin = false }) {
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [showLogin, setShowLogin] = useState(forceLogin);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 

  useEffect(() => {
    if (forceLogin) {
      setShowLogin(true);
    }
  }, [forceLogin]);

  const toggleLogoutPopup = () => {
    setShowLogoutPopup(prev => !prev);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);        // 🔓 Update app state
    setShowLogoutPopup(false);
    setShowLogin(true);          // show login modal again
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://furbackadmin.onrender.com/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message);
        setShowLogin(false);     // ✅ Hide login modal
        setUsername("");
        setPassword("");
        setIsLoggedIn(true);     // 🔐 App login success
        navigate("/dashboard");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Server error");
    }
  };

  return (
    <div>
      {/* Navbar */}
      <div
        className={`w-full h-16 flex items-center justify-between px-4 shadow-md transition-colors duration-300 ${
          darkMode
            ? "bg-[#0f172a] text-[#a5f3fc]"
            : "bg-gradient-to-r from-[#1e293b] via-[#334155] to-[#475569] text-[#f1f5f9]"
        }`}
      >
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold tracking-wide">ADMIN</h1>
          <FaUserGraduate className="text-2xl" />
        </div>
        <div className="flex items-center space-x-5 pr-2">
          {darkMode ? (
            <FaMoon
              onClick={toggleTheme}
              className="text-xl cursor-pointer hover:text-[#38bdf8] transition duration-200"
            />
          ) : (
            <FaSun
              onClick={toggleTheme}
              className="text-xl cursor-pointer hover:text-[#fb923c] transition duration-200"
            />
          )}
          <FaUserLock
            onClick={toggleLogoutPopup}
            className="text-xl cursor-pointer hover:text-[#ef4444] transition duration-200"
          />
        </div>
      </div>

      {/* Logout Popup */}
      {showLogoutPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md shadow-md max-w-sm w-full">
            <h2 className="text-xl font-bold text-center mb-4">
              Are you sure you want to logout?
            </h2>
            <div className="flex justify-between">
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Yes, Logout
              </button>
              <button
                onClick={toggleLogoutPopup}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLogin && (
  <div
    className={`fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 ${darkMode ? 'bg-black' : 'bg-white'}`}
  >
    <div
      className={`p-8 shadow-md rounded-md w-96 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <form onSubmit={handleLoginSubmit}>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={`w-full p-2 border rounded-md ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-black border-gray-300'}`}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full p-2 border rounded-md ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-black border-gray-300'}`}
          />
          <button
            type="submit"
            className={`w-full p-2 rounded-md ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
)}

    </div>
  );
}
