import React, { useEffect, useState } from "react";
import { PageSkeleton } from "../Skeleton/SkeletonLoader";

const Settings = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 250);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <PageSkeleton />;
  }
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState("en");

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 mx-auto">
      <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
        <h2 className="mb-6 text-xl font-semibold text-gray-800">Settings</h2>

        <div className="space-y-5">
          {/* Dark mode toggle */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-700">Dark Mode</h3>
              <p className="text-xs text-gray-500">Turn on dark appearance</p>
            </div>
            <button
              type="button"
              onClick={() => setDarkMode((prev) => !prev)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                darkMode ? "bg-blue-600" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  darkMode ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {/* Notifications toggle */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-700">
                Notifications
              </h3>
              <p className="text-xs text-gray-500">Enable app notifications</p>
            </div>
            <button
              type="button"
              onClick={() => setNotifications((prev) => !prev)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                notifications ? "bg-blue-600" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  notifications ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {/* Language dropdown */}
          <div>
            <h3 className="mb-2 text-sm font-medium text-gray-700">Language</h3>
            <select
              value={language}
              onChange={handleLanguageChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="es">Spanish</option>
            </select>
          </div>

          {/* Save button */}
          <button className="mt-3 w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
