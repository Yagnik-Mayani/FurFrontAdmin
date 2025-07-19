import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddCategory({ darkMode }) {
    const [category, setCategory] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("https://furbackadmin.onrender.com/api/category", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ categoryName: category })
            });

            const data = await res.json();

            if (res.ok) {
                toast.success(data.message || "Category added successfully");
                setCategory(""); // Clear input
            } else {
                toast.error(data.message || "Failed to add category");
            }
        } catch (error) {
            console.error("Error adding category:", error);
            toast.error("Server error");
        }
    };

    return (
        <div className={`max-w-md mx-auto mt-10 p-6 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'} shadow-md rounded-xl border-2`}>
            <h2 className="text-2xl font-semibold mb-4 text-center">Add Category</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className={`block font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} htmlFor="category">
                        Category Name
                    </label>
                    <input
                        id="category"
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="Enter category name"
                        className={`w-full px-4 py-2 border ${darkMode ? 'border-gray-600 text-white bg-gray-800 placeholder-gray-400' : 'border-gray-300 text-black'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className={`w-full py-2 rounded-lg transition duration-200 ${darkMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                >
                    Add Category
                </button>
            </form>

            {/* ✅ Toast Container */}
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
        </div>
    );
}
