import React, { useState } from "react";

// Sample orders data
const initialOrders = [
  {
    id: 101,
    customerName: "Yash Patil",
    items: ["Shirt", "Jeans"],
    total: 2500,
    paymentStatus: "Paid",
    orderStatus: "Pending",
  },
  {
    id: 102,
    customerName: "Jane Smith",
    items: ["T-Shirt"],
    total: 800,
    paymentStatus: "Pending",
    orderStatus: "Pending",
  },
  {
    id: 103,
    customerName: "Mike Johnson",
    items: ["Jacket", "Shoes"],
    total: 5000,
    paymentStatus: "Paid",
    orderStatus: "Processing",
  },
];

const ManageOrders = () => {
  const [orders, setOrders] = useState(initialOrders);

  const handleStatusChange = (orderId, newStatus) => { 
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, orderStatus: newStatus } : order
      )
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6 mr-35">
      <h2 className="text-3xl font-bold mb-6 text-center">Manage Orders</h2>
      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 bg-white shadow-lg rounded-lg border border-gray-200"
          >
            {/* Order Info */}
            <div className="flex flex-col gap-1 md:flex-1">
              <span className="font-semibold text-lg">Order ID: {order.id}</span>
              <span className="text-gray-700">Customer: {order.customerName}</span>
              <span className="text-gray-700">Items: {order.items.join(", ")}</span>
              <span className="text-gray-700">Total: ₹{order.total}</span>
              <span
                className={`font-semibold ${
                  order.paymentStatus === "Paid" ? "text-green-600" : "text-red-600"
                }`}
              >
                Payment: {order.paymentStatus}
              </span>
              <span
                className={`font-semibold ${
                  order.orderStatus === "Cancelled"
                    ? "text-red-600"
                    : order.orderStatus === "Shipped"
                    ? "text-blue-600"
                    : order.orderStatus === "Delivered"
                    ? "text-green-600"
                    : "text-gray-700"
                }`} 
              >
                Status: {order.orderStatus}
              </span>
            </div>

            {/* Admin Action Buttons */}
            <div className="flex flex-col gap-2 mt-4 md:mt-0 md:items-end">
              {/* Approve Request */}
              {order.orderStatus === "Pending" && (
                <button
                  onClick={() => handleStatusChange(order.id, "Processing")}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  Approve Request
                </button>
              )}

              {/* Cancel */} 
              <button
                onClick={() => handleStatusChange(order.id, "Cancelled")}
                disabled={order.orderStatus === "Delivered" || order.orderStatus === "Cancelled"}
                className={`px-4 py-2 rounded-lg text-white ${
                  order.orderStatus !== "Delivered" && order.orderStatus !== "Cancelled"
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                Cancel
              </button>

              {/* Update Status Dropdown */}
              {order.orderStatus !== "Pending" &&
                order.orderStatus !== "Cancelled" &&
                order.orderStatus !== "Delivered" && (
                  <select
                    value={order.orderStatus}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className="px-4 py-2 border rounded-lg bg-white"
                  >
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageOrders;