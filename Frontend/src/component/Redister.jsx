import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AddDataToServer } from "../Service";
import { FormSkeleton } from "./Skeleton/SkeletonLoader";

const Register = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const Firstname = useRef();
  const Lastname = useRef();
  const Address = useRef();
  const Email = useRef();
  const Phone = useRef();
  const Password = useRef();
  const ConfirmPassword = useRef();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 250);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <FormSkeleton />
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Password.current.value !== ConfirmPassword.current.value) {
      alert("Passwords do not match");
      return;
    }

    try {
      const userData = {
        Firstname: Firstname.current.value,
        Lastname: Lastname.current.value,
        Address: Address.current.value,
        Email: Email.current.value,
        Phone: Phone.current.value,
        Password: Password.current.value,
      };

      await AddDataToServer(userData);
      console.log("step 0");
      navigate("/login");
    } catch (err) {
      console.error("Registration failed:", err);
      alert(err.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="mb-4 text-xl font-semibold text-gray-800">
          Create an account
        </h1>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* First + Last Name */}
          <div className="grid grid-cols-2 gap-4">
            <input
              ref={Firstname}
              type="text"
              placeholder="First Name"
              required
              className="w-full border px-3 py-2 rounded"
            />
            <input
              ref={Lastname}
              type="text"
              placeholder="Last Name"
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          {/* Address */}
          <input
            ref={Address}
            type="text"
            placeholder="Address"
            required
            className="w-full border px-3 py-2 rounded"
          />

          {/* Email */}
          <input
            ref={Email}
            type="email"
            placeholder="Email"
            required
            className="w-full border px-3 py-2 rounded"
          />

          {/* Phone */}
          <input
            ref={Phone}
            type="tel"
            placeholder="Phone Number"
            required
            className="w-full border px-3 py-2 rounded"
          />

          {/* Password */}
          <input
            ref={Password}
            type="password"
            placeholder="Password"
            required
            className="w-full border px-3 py-2 rounded"
          />

          {/* Confirm Password */}
          <input
            ref={ConfirmPassword}
            type="password"
            placeholder="Confirm Password"
            required
            className="w-full border px-3 py-2 rounded"
          />

          {/* Remember Me */}
          <div className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <label>Remember me</label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
