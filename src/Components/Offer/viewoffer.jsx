import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function OfferList({ darkMode }) {
    const [offers, setOffers] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editedOffer, setEditedOffer] = useState({
        offerName: "",
        offerDiscount: "",
        offerDescription: "",
        startDate: "",
        endDate: "",
    });

    const fetchOffers = async () => {
        try {
            const res = await fetch("https://furbackadmin.onrender.com/api/offers");
            const data = await res.json();
            setOffers(data);
        } catch (err) {
            console.error("Error fetching offers:", err);
            toast.error("Failed to fetch offers.");
        }
    };

    useEffect(() => {
        fetchOffers();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this offer?")) {
            try {
                const res = await fetch(`https://furbackadmin.onrender.com/api/offer/${id}`, {
                    method: "DELETE",
                });
                if (res.ok) {
                    fetchOffers();
                    toast.success("Offer deleted successfully!");
                } else {
                    toast.error("Failed to delete offer.");
                }
            } catch (err) {
                console.error("Error deleting offer:", err);
                toast.error("Error deleting offer.");
            }
        }
    };

    const handleEdit = (offer) => {
        setEditingId(offer._id);
        setEditedOffer({ ...offer });
    };

    const handleUpdate = async () => {
        try {
            const res = await fetch(`https://furbackadmin.onrender.com/api/offer/${editingId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editedOffer),
            });
            if (res.ok) {
                setEditingId(null);
                setEditedOffer({
                    offerName: "",
                    offerDiscount: "",
                    offerDescription: "",
                    startDate: "",
                    endDate: "",
                });
                fetchOffers();
                toast.success("Offer updated successfully!");
            } else {
                toast.error("Failed to update offer.");
            }
        } catch (err) {
            console.error("Error updating offer:", err);
            toast.error("Error updating offer.");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedOffer((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className={`max-w-6xl mx-auto mt-10 p-6 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'} shadow-md rounded-xl border-2`}>
            <ToastContainer />
            <h2 className="text-2xl font-semibold mb-4 text-center">Offer List</h2>
            <div className="overflow-x-auto">
                <table className={`w-full border ${darkMode ? 'border-gray-600' : 'border-gray-300'} rounded-lg overflow-hidden`}>
                    <thead className={darkMode ? 'bg-gray-800' : 'bg-gray-100'}>
                        <tr>
                            <th className="py-2 px-4 border-b text-left">Offer Name</th>
                            <th className="py-2 px-4 border-b text-left">Description</th>
                            <th className="py-2 px-4 border-b text-left">Discount (%)</th>
                            <th className="py-2 px-4 border-b text-left">Start Date</th>
                            <th className="py-2 px-4 border-b text-left">End Date</th>
                            <th className="py-2 px-4 border-b text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {offers.map((offer) => (
                            <tr key={offer._id}>
                                <td className="py-2 px-4 border-b">
                                    {editingId === offer._id ? (
                                        <input
                                            type="text"
                                            name="offerName"
                                            value={editedOffer.offerName}
                                            onChange={handleChange}
                                            className={`px-2 py-1 border rounded w-full max-w-[200px] truncate ${darkMode ? "bg-gray-800 text-white border-gray-600" : "bg-white text-black"
                                                }`}
                                        />

                                    ) : (
                                        offer.offerName
                                    )}
                                </td>
                                <td className="py-2 px-4 border-b break-words max-w-xs">
                                    {editingId === offer._id ? (
                                        <input
                                            type="text"
                                            name="offerDescription"
                                            value={editedOffer.offerDescription}
                                            onChange={handleChange}
                                            className={`px-2 py-1 border rounded w-full max-w-[200px] truncate ${darkMode ? "bg-gray-800 text-white border-gray-600" : "bg-white text-black"
                                                }`}
                                        />

                                    ) : (
                                        offer.offerDescription
                                    )}
                                </td>
                                <td className="py-2 px-4 border-b">
                                    {editingId === offer._id ? (
                                        <input
                                            type="number"
                                            name="offerDiscount"
                                            value={editedOffer.offerDiscount}
                                            onChange={handleChange}
                                            className={`px-2 py-1 border rounded w-full max-w-[200px] truncate ${darkMode ? "bg-gray-800 text-white border-gray-600" : "bg-white text-black"
                                                }`}
                                        />

                                    ) : (
                                        `${offer.offerDiscount}%`
                                    )}
                                </td>
                                <td className="py-2 px-4 border-b">
                                    {editingId === offer._id ? (
                                        <input
                                            type="date"
                                            name="startDate"
                                            value={editedOffer.startDate?.slice(0, 10)}
                                            onChange={handleChange}
                                            className={`px-2 py-1 border rounded w-full max-w-[200px] truncate ${darkMode ? "bg-gray-800 text-white border-gray-600" : "bg-white text-black"
                                                }`}
                                        />

                                    ) : (
                                        offer.startDate?.slice(0, 10)
                                    )}
                                </td>

                                <td className="py-2 px-4 border-b">
                                    {editingId === offer._id ? (
                                        <input
                                            type="date"
                                            name="endDate"
                                            value={editedOffer.endDate?.slice(0, 10)}
                                            onChange={handleChange}
                                            className={`px-2 py-1 border rounded w-full max-w-[200px] truncate ${darkMode ? "bg-gray-800 text-white border-gray-600" : "bg-white text-black"
                                                }`}
                                        />

                                    ) : (
                                        offer.endDate?.slice(0, 10)
                                    )}
                                </td>

                                <td className="py-2 px-4 border-b flex gap-2">
                                    {editingId === offer._id ? (
                                        <button
                                            onClick={handleUpdate}
                                            className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                                        >
                                            Save
                                        </button>
                                    ) : (
                                        <FaEdit
                                            className="text-blue-600 cursor-pointer hover:text-blue-800"
                                            onClick={() => handleEdit(offer)}
                                        />
                                    )}
                                    <FaTrash
                                        className="text-red-600 cursor-pointer hover:text-red-800"
                                        onClick={() => handleDelete(offer._id)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
