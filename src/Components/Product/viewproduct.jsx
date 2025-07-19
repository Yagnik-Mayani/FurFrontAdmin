import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProductList({ darkMode }) {
    const [products, setProducts] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editedProduct, setEditedProduct] = useState({
        productName: "",
        productPrice: "",
        productQty: "",
        productImage: "",
        category: "",
        productOffer: "",
    });
    const [searchTerm, setSearchTerm] = useState("");

    const fetchProducts = async () => {
        try {
            const res = await fetch("https://furbackadmin.onrender.com/api/products");
            const data = await res.json();
            setProducts(data);
        } catch (err) {
            console.error("Error fetching products:", err);
            toast.error("Failed to fetch products.");
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                const res = await fetch(`https://furbackadmin.onrender.com/api/product/${id}`, {
                    method: "DELETE",
                });
                if (res.ok) {
                    toast.success("Product deleted successfully!");
                    fetchProducts();
                } else {
                    toast.error("Failed to delete product.");
                }
            } catch (err) {
                console.error("Error deleting product:", err);
                toast.error("Error deleting product.");
            }
        }
    };

    const handleEdit = (product) => {
        setEditingId(product._id);
        setEditedProduct({ ...product });
    };

    const handleUpdate = async () => {
        const updatedProduct = { ...editedProduct };

        if (!editedProduct.productImage || editedProduct.productImage === "") {
            const currentProduct = products.find((p) => p._id === editingId);
            if (currentProduct && currentProduct.productImage) {
                updatedProduct.productImage = currentProduct.productImage;
            }
        }

        try {
            const res = await fetch(`https://furbackadmin.onrender.com/api/product/${editingId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedProduct),
            });

            if (res.ok) {
                const updatedProductData = await res.json();
                setProducts((prevProducts) =>
                    prevProducts.map((product) =>
                        product._id === updatedProductData._id ? updatedProductData : product
                    )
                );
                setEditingId(null);
                setEditedProduct({
                    productName: "",
                    productPrice: "",
                    productQty: "",
                    productImage: "",
                    category: "",
                    productOffer: "",
                });
                toast.success("Product updated successfully!");
            } else {
                toast.error("Failed to update product.");
            }
        } catch (err) {
            console.error("Error updating product:", err);
            toast.error("Error updating product.");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setEditedProduct((prev) => ({ ...prev, productImage: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const filteredProducts = products.filter((product) =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const inputClass = `${darkMode
        ? "bg-gray-800 text-white border-gray-600"
        : "bg-white text-black border-gray-300"} px-2 py-1 border rounded w-full max-w-[200px]`;

    return (
        <div className={`max-w-7xl mx-auto mt-10 p-6 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'} shadow-md rounded-xl border-2`}>
            <ToastContainer />
            <h2 className="text-2xl font-semibold mb-4 text-center">Product List</h2>

            {/* Search Bar */}
            <div className="mb-4 max-w-sm">
                <input
                    type="text"
                    placeholder="Search by product name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={inputClass}
                />
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className={`w-full border ${darkMode ? 'border-gray-600' : 'border-gray-300'} rounded-lg overflow-hidden table-fixed`}>
                    <thead className={darkMode ? 'bg-gray-800' : 'bg-gray-100'}>
                        <tr>
                            <th className="py-2 px-4 border-b text-left">Name</th>
                            <th className="py-2 px-4 border-b text-left">Price</th>
                            <th className="py-2 px-4 border-b text-left">Qty</th>
                            <th className="py-2 px-4 border-b text-left">Category</th>
                            <th className="py-2 px-4 border-b text-left">Offer</th>
                            <th className="py-2 px-4 border-b text-left">Image</th>
                            <th className="py-2 px-4 border-b text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map((product) => (
                            <tr key={product._id}>
                                <td className="py-2 px-4 border-b">
                                    {editingId === product._id ? (
                                        <input
                                            type="text"
                                            name="productName"
                                            value={editedProduct.productName}
                                            onChange={handleChange}
                                            className={inputClass}
                                        />
                                    ) : product.productName}
                                </td>
                                <td className="py-2 px-4 border-b">
                                    {editingId === product._id ? (
                                        <input
                                            type="number"
                                            name="productPrice"
                                            value={editedProduct.productPrice}
                                            onChange={handleChange}
                                            className={inputClass}
                                        />
                                    ) : `₹${product.productPrice}`}
                                </td>
                                <td className="py-2 px-4 border-b">
                                    {editingId === product._id ? (
                                        <input
                                            type="number"
                                            name="productQty"
                                            value={editedProduct.productQty}
                                            onChange={handleChange}
                                            className={inputClass}
                                        />
                                    ) : product.productQty}
                                </td>
                                <td className="py-2 px-4 border-b">
                                    {editingId === product._id ? (
                                        <input
                                            type="text"
                                            name="category"
                                            value={editedProduct.category}
                                            onChange={handleChange}
                                            className={inputClass}
                                        />
                                    ) : product.category || "N/A"}
                                </td>
                                <td className="py-2 px-4 border-b">
                                    {editingId === product._id ? (
                                        <input
                                            type="text"
                                            name="productOffer"
                                            value={editedProduct.productOffer}
                                            onChange={handleChange}
                                            className={inputClass}
                                        />
                                    ) : product.productOffer || "N/A"}
                                </td>
                                <td className="py-2 px-4 border-b">
                                    {editingId === product._id ? (
                                        <div>
                                            <input
                                                type="file"
                                                name="productImage"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className={inputClass}
                                            />
                                        </div>
                                    ) : product.productImage ? (
                                        <img
                                            src={product.productImage}
                                            alt={product.productName}
                                            className="w-16 h-16 object-cover rounded-md"
                                        />
                                    ) : "No Image"}
                                </td>
                                <td className="py-2 px-4 border-b flex items-center justify-start gap-2 pt-8">
                                    {editingId === product._id ? (
                                        <button
                                            onClick={handleUpdate}
                                            className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                                        >
                                            Save
                                        </button>
                                    ) : (
                                        <FaEdit
                                            className="text-blue-600 cursor-pointer hover:text-blue-800"
                                            onClick={() => handleEdit(product)}
                                        />
                                    )}
                                    <FaTrash
                                        className="text-red-600 cursor-pointer hover:text-red-800"
                                        onClick={() => handleDelete(product._id)}
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
