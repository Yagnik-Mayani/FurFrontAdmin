import React, { useEffect, useState } from "react";

export default function OrderList({ darkMode }) {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch("https://furbackadmin.onrender.com/api/confirm")
            .then((response) => response.json())
            .then((data) => setOrders(data))
            .catch((error) => console.error("Error fetching orders:", error));
    }, []);

    return (
        <div className={`max-w-4xl mx-auto mt-10 p-6 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'} shadow-md rounded-xl border-2`}>
            <h2 className="text-2xl font-semibold mb-4 text-center">Order List</h2>
            <div className="overflow-x-auto">
                <table className={`w-full border ${darkMode ? 'border-gray-600' : 'border-gray-300'} rounded-lg overflow-hidden`}>
                    <thead className={darkMode ? 'bg-gray-800' : 'bg-gray-100'}>
                        <tr>
                            <th className="py-2 px-4 border-b text-left">User ID</th>
                            <th className="py-2 px-4 border-b text-left">Address</th>
                            <th className="py-2 px-4 border-b text-left">Payment</th>
                            <th className="py-2 px-4 border-b text-left">Total Price</th>
                            <th className="py-2 px-4 border-b text-left">Phone No</th>
                            <th className="py-2 px-4 border-b text-left">Date</th>
                            <th className="py-2 px-4 border-b text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id} className="hover:bg-gray-50">
                                <td className={`py-2 px-4 border-b ${darkMode ? 'text-gray-300' : 'text-black'}`}>{order.userId}</td>
                                <td className={`py-2 px-4 border-b ${darkMode ? 'text-gray-300' : 'text-black'}`}>{order.deliveryInfo?.address}</td>
                                <td className={`py-2 px-4 border-b ${darkMode ? 'text-gray-300' : 'text-black'}`}>{order.paymentMethod}</td>
                                <td className={`py-2 px-4 border-b ${darkMode ? 'text-gray-300' : 'text-black'}`}>₹{order.total?.toFixed(2)}</td>
                                <td className={`py-2 px-4 border-b ${darkMode ? 'text-gray-300' : 'text-black'}`}>{order.deliveryInfo?.phone}</td>
                                <td className={`py-2 px-4 border-b ${darkMode ? 'text-gray-300' : 'text-black'}`}>{new Date(order.createdAt).toLocaleDateString()}</td>
                                <td className={`py-2 px-4 border-b font-semibold ${darkMode ? 'text-green-400' : 'text-green-700'}`}>Done</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
