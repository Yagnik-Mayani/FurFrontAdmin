import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CategoryList({ darkMode }) {
    const [categories, setCategories] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editedName, setEditedName] = useState("");

    // Fetch categories from the backend API
    const fetchCategories = async () => {
        try {
            const res = await fetch("https://furbackadmin.onrender.com/api/categories");
            const data = await res.json();
            setCategories(data);
        } catch (err) {
            console.error("Error fetching categories:", err);
            toast.error("Failed to fetch categories.");
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    // Handle category deletion
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            try {
                const res = await fetch(`https://furbackadmin.onrender.com/api/category/${id}`, {
                    method: "DELETE",
                });
                if (res.ok) {
                    fetchCategories();
                    toast.success("Category deleted successfully!");
                } else {
                    toast.error("Failed to delete category.");
                }
            } catch (err) {
                console.error("Error deleting category:", err);
                toast.error("Error deleting category.");
            }
        }
    };

    // Handle edit operation
    const handleEdit = (id, name) => {
        setEditingId(id);
        setEditedName(name);
    };

    // Handle updating category name
    const handleUpdate = async () => {
        try {
            const res = await fetch(`https://furbackadmin.onrender.com/api/category/${editingId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ categoryName: editedName }),
            });
            if (res.ok) {
                setEditingId(null);
                setEditedName("");
                fetchCategories();
                toast.success("Category updated successfully!");
            } else {
                toast.error("Failed to update category.");
            }
        } catch (err) {
            console.error("Error updating category:", err);
            toast.error("Error updating category.");
        }
    };

    return (
        <div className={`max-w-3xl mx-auto mt-10 p-6 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'} shadow-md rounded-xl border-2`}>
            <ToastContainer />
            <h2 className="text-2xl font-semibold mb-4 text-center">Category List</h2>

            <table className={`w-full border ${darkMode ? 'border-gray-600' : 'border-gray-300'} rounded-lg overflow-hidden`}>
                <thead className={darkMode ? 'bg-gray-800' : 'bg-gray-100'}>
                    <tr>
                        <th className="py-2 px-4 border-b text-left">Category ID</th>
                        <th className="py-2 px-4 border-b text-left">Category Name</th>
                        <th className="py-2 px-4 border-b text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((cat) => (
                        <tr key={cat._id}>
                            <td className="py-2 px-4 border-b">{cat._id}</td>
                            <td className="py-2 px-4 border-b">
                                {editingId === cat._id ? (
                                    <input
                                        type="text"
                                        value={editedName}
                                        onChange={(e) => setEditedName(e.target.value)}
                                        className={`px-2 py-1 border rounded w-full ${darkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-white text-black border-gray-300'
                                            }`}
                                    />
                                ) : (
                                    cat.categoryName
                                )}
                            </td>

                            <td className="py-2 px-4 border-b">
                                <div className="flex gap-3 items-center">
                                    {editingId === cat._id ? (
                                        <button
                                            onClick={handleUpdate}
                                            className="px-3 py-1 text-sm bg-green-600  hover:bg-green-700"
                                        >
                                            Save
                                        </button>
                                    ) : (
                                        <FaEdit
                                            className="text-blue-600 cursor-pointer hover:text-blue-800"
                                            onClick={() => handleEdit(cat._id, cat.categoryName)}
                                        />
                                    )}
                                    <FaTrash
                                        className="text-red-600 cursor-pointer hover:text-red-800"
                                        onClick={() => handleDelete(cat._id)}
                                    />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
