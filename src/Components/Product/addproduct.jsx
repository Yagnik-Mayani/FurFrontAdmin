import React, { useState, useEffect, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddProduct({ darkMode }) {
    const [formData, setFormData] = useState({
        productName: "",
        productPrice: "",
        productQty: "",
        category: "",
        productOffer: "",
        description: "",
        productImage: null,
    });
    const fileInputRef = useRef(null);

    const [categories, setCategories] = useState([]);
    const [offers, setOffers] = useState([]);
    const [categorySuggestions, setCategorySuggestions] = useState([]);
    const [offerSuggestions, setOfferSuggestions] = useState([]);

    useEffect(() => {
        fetch("https://furbackadmin.onrender.com/api/categories")
            .then((res) => res.json())
            .then((data) => setCategories(data));

        fetch("https://furbackadmin.onrender.com/api/offers")
            .then((res) => res.json())
            .then((data) => setOffers(data));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        const input = value.trim().toLowerCase();
        if (name === "category") {
            setCategorySuggestions(
                input ? categories.filter(c => c?.categoryName?.toLowerCase().includes(input)) : []
            );
        } else if (name === "productOffer") {
            setOfferSuggestions(
                input ? offers.filter(o => o?.offerName?.toLowerCase().includes(input)) : []
            );
        }
    };

    const handleSelect = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (field === "category") setCategorySuggestions([]);
        if (field === "productOffer") setOfferSuggestions([]);
    };

    const handleFileChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            productImage: e.target.files[0],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (value) data.append(key, value);
        });

        try {
            const res = await fetch("https://furbackadmin.onrender.com/api/products", {
                method: "POST",
                body: data,
            });

            if (res.ok) {
                toast.success("Product added successfully!");
                setFormData({
                    productName: "",
                    productPrice: "",
                    productQty: "",
                    category: "",
                    productOffer: "",
                    description: "",
                    productImage: null,
                });
                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                }            
            } else {
                const errorData = await res.json();
                toast.error(`Failed: ${errorData.message || "Unknown error"}`);
            }
        } catch (err) {
            console.error("Error:", err);
            toast.error("An error occurred while adding the product.");
        }
    };

    const inputClass = `w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
        darkMode ? 'bg-gray-800 text-white placeholder-gray-400 border-gray-600' : 'bg-white text-black border-gray-300'
    }`;

    const dropdownClass = `absolute shadow-md mt-1 w-full max-h-40 overflow-y-auto z-10 border rounded-lg ${
        darkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-white text-black border-gray-300'
    }`;

    const listItemClass = `px-4 py-2 cursor-pointer ${
        darkMode ? 'hover:bg-gray-700' : 'hover:bg-blue-100'
    }`;

    return (
        <div className={`max-w-xl mx-auto mt-10 p-6 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'} shadow-md rounded-xl border-2`}>
            <h2 className="text-2xl font-semibold mb-4 text-center">Add Product</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="grid grid-cols-1 gap-4">
                <input
                    type="text"
                    name="productName"
                    placeholder="Product Name"
                    value={formData.productName}
                    onChange={handleChange}
                    className={inputClass}
                    required
                />
                <input
                    type="number"
                    name="productPrice"
                    placeholder="Product Price"
                    value={formData.productPrice}
                    onChange={handleChange}
                    className={inputClass}
                    required
                />
                <input
                    type="number"
                    name="productQty"
                    placeholder="Product Quantity"
                    value={formData.productQty}
                    onChange={handleChange}
                    className={inputClass}
                    required
                />
                <div className="relative">
                    <input
                        type="text"
                        name="category"
                        placeholder="Category"
                        value={formData.category}
                        onChange={handleChange}
                        className={inputClass}
                    />
                    {categorySuggestions.length > 0 && (
                        <ul className={dropdownClass}>
                            {categorySuggestions.map((cat) => (
                                <li
                                    key={cat.id}
                                    onClick={() => handleSelect("category", cat.categoryName)}
                                    className={listItemClass}
                                >
                                    {cat.categoryName}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="relative">
                    <input
                        type="text"
                        name="productOffer"
                        placeholder="Product Offer"
                        value={formData.productOffer}
                        onChange={handleChange}
                        className={inputClass}
                    />
                    {offerSuggestions.length > 0 && (
                        <ul className={dropdownClass}>
                            {offerSuggestions.map((offer) => (
                                <li
                                    key={offer.id}
                                    onClick={() => handleSelect("productOffer", offer.offerName)}
                                    className={listItemClass}
                                >
                                    {offer.offerName}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className={inputClass}
                ></textarea>
                <input
                    type="file"
                    name="productImage"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full"
                    ref={fileInputRef}
                />
                <button
                    type="submit"
                    className="w-full mt-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    Add Product
                </button>
            </form>
            <ToastContainer />
        </div>
    );
}
