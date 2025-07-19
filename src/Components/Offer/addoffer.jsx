import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddOffer({ darkMode }) {
    const [formData, setFormData] = useState({
        offerName: "",
        offerDiscount: "",
        offerDescription: "",
        startDate: "",
        endDate: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("https://furbackadmin.onrender.com/api/offers", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                toast.success("Offer added successfully!");
                setFormData({
                    offerName: "",
                    offerDiscount: "",
                    offerDescription: "",
                    startDate: "",
                    endDate: "",
                });
            } else {
                const errorData = await res.json();
                toast.error(`Failed to add offer: ${errorData.message || "Unknown error"}`);
            }
        } catch (err) {
            console.error("Error:", err);
            toast.error("An error occurred while adding the offer.");
        }
    };

    return (
        <div className={`max-w-xl mx-auto mt-10 p-6 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'} shadow-md rounded-xl border-2`}>
            <h2 className="text-2xl font-semibold mb-4 text-center">Add Offer</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
                <input
                    type="text"
                    name="offerName"
                    placeholder="Offer Name"
                    value={formData.offerName}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
                    required
                />
                <input
                    type="number"
                    name="offerDiscount"
                    placeholder="Offer Discount (%)"
                    value={formData.offerDiscount}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
                    required
                />
                <textarea
                    name="offerDescription"
                    placeholder="Offer Description"
                    value={formData.offerDescription}
                    onChange={handleChange}
                    rows={3}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
                ></textarea>
                <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
                    required
                />
                <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
                    required
                />
                <button
                    type="submit"
                    className="w-full mt-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    Add Offer
                </button>
            </form>
            <ToastContainer />
        </div>
    );
}
