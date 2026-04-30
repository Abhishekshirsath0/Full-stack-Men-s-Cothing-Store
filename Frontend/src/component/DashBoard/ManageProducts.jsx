import React, { useState, useEffect } from "react";
import {
  DeleteProductFromSErver,
  GetProductFromServer,
} from "../../Service";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ManageProducts = () => {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [expanded, setExpanded] = useState({});

  const navigate = useNavigate();

  // ================= FETCH DATA =================
  useEffect(() => {
    const FetchData = async () => {
      try {
        const data = await GetProductFromServer();
        setProducts(data || []);
      } catch (error) {
        toast.error("Failed to fetch products ❌");
      }
    };

    FetchData();
  }, []);

  // ================= TOGGLE DESCRIPTION =================
  const toggleDescription = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // ================= DELETE PRODUCT =================
  const handleDelete = async (id, name) => {
    const confirmDelete = window.confirm("Are you sure to delete?");
    if (!confirmDelete) return;

    try {
      const success = await DeleteProductFromSErver(id);

      if (success) {
        toast.success(`${name} deleted successfully ✅`);
        setProducts((prev) => prev.filter((p) => p._id !== id));
      } else {
        toast.error("Delete failed ❌");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong ❌");
    }
  };

  // ================= EDIT PRODUCT =================
  const handleEdit = (product) => {
    navigate("/dashboard/edit-product", {
      state: product,
    });
  };

  // ================= SEARCH FILTER =================
  const searchText = search.toLowerCase();

  const filteredProducts = products.filter((p) =>
    [p.ProductName, p.Brand, p.Category].some((field) =>
      field?.toLowerCase().includes(searchText)
    )
  );

  // ================= GROUP BY DATE =================
  const groupedByDate = filteredProducts.reduce((acc, product) => {
    const rawDate = product.createdAt;

    const date =
      rawDate && !isNaN(Date.parse(rawDate))
        ? new Date(rawDate).toLocaleDateString()
        : "No Date";

    if (!acc[date]) acc[date] = [];
    acc[date].push(product);

    return acc;
  }, {});

  // SORT DATES (LATEST FIRST)
  const sortedDates = Object.keys(groupedByDate).sort(
    (a, b) => new Date(b) - new Date(a)
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* TITLE */}
      <h1 className="text-3xl font-bold text-center mb-6">
        🛒 Manage Products
      </h1>

      {/* SEARCH */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md p-3 border rounded-xl shadow-sm"
        />
      </div>

      {/* EMPTY STATE */}
      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products found</p>
      ) : (
        <div className="space-y-10">
          {sortedDates.map((date) => (
            <div key={date} className="space-y-4">
              {/* DATE */}
              <h2 className="text-xl font-bold text-gray-700 border-b pb-2">
                📅 {date}
              </h2>

              {/* GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {groupedByDate[date].map((product) => (
                  <div
                    key={product._id}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden"
                  >
                    {/* IMAGE ✅ fixed */}
                    <img
                      src={product.Images?.[0] || "https://placehold.co/300x200?text=No+Image"}
                      alt={product.ProductName}
                      className="w-full h-48 object-cover"
                    />

                    <div className="p-4 space-y-2">
                      <h2 className="text-xl font-bold">
                        {product.ProductName}
                      </h2>

                      <p className="text-gray-600">
                        Brand: {product.Brand}
                      </p>

                      <p className="text-gray-600">
                        Category: {product.Category}
                      </p>

                      <p className="font-semibold">₹{product.Price}</p>

                      <p className="text-green-600">
                        Discount: {product.Discount}%
                      </p>

                      {/* DESCRIPTION */}
                      <p className="text-gray-500 text-sm">
                        {expanded[product._id]
                          ? product.Description
                          : product.Description?.slice(0, 60)}

                        {product.Description?.length > 60 && (
                          <span
                            onClick={() => toggleDescription(product._id)}
                            className="text-blue-500 cursor-pointer ml-1"
                          >
                            {expanded[product._id] ? " Show less" : "...Read more"}
                          </span>
                        )}
                      </p>

                      <p className="text-blue-600 text-sm">
                        Sizes: {product.Size?.join(", ")}
                      </p>

                      {/* ACTIONS */}
                      <div className="flex gap-3 mt-3">
                        <button
                          onClick={() => handleEdit(product)}
                          className="flex-1 bg-blue-500 text-white py-2 rounded-lg"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(product._id, product.ProductName)}
                          className="flex-1 bg-red-500 text-white py-2 rounded-lg"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageProducts;