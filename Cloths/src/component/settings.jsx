import { useState, useEffect } from "react";

const Settings = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    notifications: true,
  });

  const [darkMode, setDarkMode] = useState(false);

  // Apply dark mode to body
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Settings Saved:", formData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 flex gap-6">
      
      {/* LEFT SIDE - SETTINGS FORM */}
      <div className="flex-1">
        <h2 className="text-2xl font-semibold mb-6 dark:text-white">
          Account Settings
        </h2>

        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700 space-y-6 transition-all"
        >
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-2 dark:text-gray-200">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white"
              placeholder="Enter your name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-2 dark:text-gray-200">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-2 dark:text-gray-200">
              New Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white"
              placeholder="Enter new password"
            />
          </div>

          {/* Notifications */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium dark:text-gray-200">
              Email Notifications
            </span>
            <input
              type="checkbox"
              name="notifications"
              checked={formData.notifications}
              onChange={handleChange}
              className="w-5 h-5"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Save Changes
            </button>

            <button
              type="button"
              className="border px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      {/* RIGHT SIDE - DARK MODE TOGGLE */}
      <div className="flex flex-col items-center justify-start mt-12">
        
        <p className="mb-3 text-sm font-medium dark:text-white">
          Theme Mode
        </p>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`relative w-16 h-8 flex items-center rounded-full p-1 transition-all duration-500 ${
            darkMode ? "bg-gray-700" : "bg-yellow-400"
          }`}
        >
          {/* Circle */}
          <div
            className={`w-6 h-6 rounded-full shadow-md transform duration-500 flex items-center justify-center text-xs ${
              darkMode
                ? "translate-x-8 bg-black text-white"
                : "translate-x-0 bg-white text-yellow-500"
            }`}
          >
            {darkMode ? "🌙" : "☀️"}
          </div>
        </button>

      </div>
    </div>
  );
};

export default Settings;