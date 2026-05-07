import React, { useEffect, useState } from "react";
import { PageSkeleton } from "../Skeleton/SkeletonLoader";

const ManageAddress = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 250);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <PageSkeleton />;
  }
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "Home",
      line1: "123 Main Street",
      city: "Pune",
      state: "Maharashtra",
      pincode: "411001",
      country: "India",
    },
  ]);

  const [newAddress, setNewAddress] = useState({
    name: "",
    line1: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveAddress = () => {
    const id =
      addresses.length > 0 ? Math.max(...addresses.map((a) => a.id)) + 1 : 1;
    setAddresses((prev) => [...prev, { id, ...newAddress }]);
    setNewAddress({
      name: "",
      line1: "",
      city: "",
      state: "",
      pincode: "",
      country: "India",
    });
  };

  const handleDeleteAddress = (id) => {
    setAddresses((prev) => prev.filter((addr) => addr.id !== id));
  };

  return (
    <div className="mx-auto max-w-3xl p-4">
      {/* Header */}
      <h2 className="mb-6 text-2xl font-semibold text-gray-800">
        Manage Addresses
      </h2>

      {/* Address Form */}
      <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-medium text-gray-700">
          Add New Address
        </h3>

        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-600">
              Name (e.g., Home / Office)
            </label>
            <input
              type="text"
              name="name"
              value={newAddress.name}
              onChange={handleInputChange}
              placeholder="Address name"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-600">
              Address Line 1
            </label>
            <input
              type="text"
              name="line1"
              value={newAddress.line1}
              onChange={handleInputChange}
              placeholder="Street / Building"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-600">
                City
              </label>
              <input
                type="text"
                name="city"
                value={newAddress.city}
                onChange={handleInputChange}
                placeholder="City"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-600">
                State
              </label>
              <input
                type="text"
                name="state"
                value={newAddress.state}
                onChange={handleInputChange}
                placeholder="State"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-600">
                Pincode
              </label>
              <input
                type="text"
                name="pincode"
                value={newAddress.pincode}
                onChange={handleInputChange}
                placeholder="Pincode"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <button
          onClick={handleSaveAddress}
          className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Save Address
        </button>
      </div>

      {/* Saved Addresses List */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-medium text-gray-700">
          Saved Addresses
        </h3>

        {addresses.length === 0 ? (
          <p className="text-sm text-gray-500">No addresses saved.</p>
        ) : (
          <ul className="space-y-4">
            {addresses.map((addr) => (
              <li
                key={addr.id}
                className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="font-medium text-gray-800">{addr.name}</div>
                    <div className="text-gray-700">{addr.line1}</div>
                    <div className="text-gray-700">
                      {addr.city}, {addr.state} - {addr.pincode}
                    </div>
                    <div className="text-gray-600">{addr.country}</div>
                  </div>

                  <button
                    onClick={() => handleDeleteAddress(addr.id)}
                    className="rounded bg-red-500 px-3 py-1 text-xs font-medium text-white hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ManageAddress;