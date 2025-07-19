import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Settings({ darkMode }) {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch("https://furbackadmin.onrender.com/api/user"); // Update with your actual endpoint
        const data = await res.json();
        setFormData({
          username: data.username || "",
          email: data.email || "",
          password: "" // don't prefill password
        });
        setLoading(false);
      } catch (error) {
        console.error("Failed to load user data", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://furbackadmin.onrender.com/api/user/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const result = await res.json();
      toast.success(result.message || "Updated successfully");
    } catch (err) {
      console.error("Update failed", err);
      toast.error("An error occurred while updating.");
    }
  };

  if (loading) {
    return (
      <div className={`p-5 ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'}`}>
        Loading...
      </div>
    );
  }

  return (
    <div className={`p-5 transition-colors duration-300 ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <h1 className="text-2xl font-bold mb-4">Profile Settings</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className={`w-full p-2 rounded border ${darkMode ? 'bg-gray-900 text-white border-gray-700' : 'bg-white text-black border-gray-300'}`}
            placeholder="Your username"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-2 rounded border ${darkMode ? 'bg-gray-900 text-white border-gray-700' : 'bg-white text-black border-gray-300'}`}
            placeholder="Your email"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full p-2 rounded border ${darkMode ? 'bg-gray-900 text-white border-gray-700' : 'bg-white text-black border-gray-300'}`}
            placeholder="New password"
          />
        </div>
        <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200">
          Save Changes
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}
