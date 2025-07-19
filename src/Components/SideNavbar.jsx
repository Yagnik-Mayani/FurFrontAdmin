import React from "react";
import '../input.css';
import Admin from './Admin.JPG';
import { FiSettings } from 'react-icons/fi';
import { Link } from "react-router-dom";

export default function SideNavbar({ darkMode }) {
    return (
        <div className={`min-h-screen w-72 flex flex-col items-center py-10 space-y-6 transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-black text-white'}`}>
            <img src={Admin} alt="Admin" className="w-20 h-20 rounded-full" />

            <Link to="/setting">
                <div className="text-2xl hover:text-gray-400 cursor-pointer transition-colors duration-200">
                    <FiSettings />
                </div>
            </Link>

            <div className="w-full px-6 space-y-6">
                <div className="text-center">
                    <Link to="/dashboard">
                        <h1 className="font-bold hover:text-gray-400 cursor-pointer">Dashboard</h1>
                    </Link>
                </div>

                <div>
                    <h1 className="font-bold">Category</h1>
                    <Link to="/add-category">
                        <h2 className="text-sm ml-6 mt-1 hover:text-gray-400 cursor-pointer">Add Category</h2>
                    </Link>
                    <Link to="/view-category">
                        <h2 className="text-sm ml-6 mt-1 hover:text-gray-400 cursor-pointer">View Category</h2>
                    </Link>
                </div>

                <div>
                    <h1 className="font-bold">Product</h1>
                    <Link to="/add-product">
                        <h2 className="text-sm ml-6 mt-1 hover:text-gray-400 cursor-pointer">Add Product</h2>
                    </Link>
                    <Link to="/view-product">
                        <h2 className="text-sm ml-6 mt-1 hover:text-gray-400 cursor-pointer">View Product</h2>
                    </Link>
                </div>

                <div>
                    <h1 className="font-bold">Offer</h1>
                    <Link to="/add-offer">
                        <h2 className="text-sm ml-6 mt-1 hover:text-gray-400 cursor-pointer">Add Offer</h2>
                    </Link>
                    <Link to="/view-offer">
                        <h2 className="text-sm ml-6 mt-1 hover:text-gray-400 cursor-pointer">View Offer</h2>
                    </Link>
                </div>

                <div>
                    <h1 className="font-bold">Order</h1>
                    <Link to="/orders">
                        <h2 className="text-sm ml-6 mt-1 hover:text-gray-400 cursor-pointer">View Order</h2>
                    </Link>
                </div>
            </div>
        </div>
    );
}
