import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AddDataToServer } from "../Service";
import { FormSkeleton } from "./Skeleton/SkeletonLoader";
import { toast } from "react-hot-toast";

const Register = () => {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const firstnameRef = useRef();
  const lastnameRef = useRef();
  const addressRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 250);
    return () => clearTimeout(timer);
  }, []);

  //  handleSubmit defined BEFORE the early return so it's always in scope
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      setError("Passwords do not match.");
      return;
    }

    setSubmitting(true);
    try {
      await AddDataToServer({
        Firstname: firstnameRef.current.value,
        Lastname: lastnameRef.current.value,
        Address: addressRef.current.value,
        Email: emailRef.current.value,
        Phone: phoneRef.current.value,
        Password: passwordRef.current.value,
      });
      toast.success("Account created! Please log in.");
      navigate("/login");
    } catch (err) {
      const msg = err.message || "Registration failed. Please try again.";
      setError(msg);
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <FormSkeleton />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="mb-4 text-xl font-semibold text-gray-800">Create an account</h1>

        {/* FIX: error now displayed in the UI */}
        {error && (
          <div className="mb-4 rounded-md bg-red-50 px-4 py-2 text-sm text-red-600 border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">First Name</label>
              <input
                ref={firstnameRef}
                type="text"
                placeholder="John"
                required
                autoComplete="given-name"
                className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Last Name</label>
              <input
                ref={lastnameRef}
                type="text"
                placeholder="Doe"
                required
                autoComplete="family-name"
                className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Address</label>
            <input
              ref={addressRef}
              type="text"
              placeholder="123 Main St"
              required
              autoComplete="street-address"
              className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
            <input
              ref={emailRef}
              type="email"
              placeholder="you@example.com"
              required
              autoComplete="email"
              className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Phone</label>
            <input
              ref={phoneRef}
              type="tel"
              placeholder="+91 99999 99999"
              required
              autoComplete="tel"
              className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Password</label>
            <input
              ref={passwordRef}
              type="password"
              placeholder="••••••••"
              required
              autoComplete="new-password"
              className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              ref={confirmPasswordRef}
              type="password"
              placeholder="••••••••"
              required
              autoComplete="new-password"
              className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <input id="terms" type="checkbox" required className="h-4 w-4 rounded border-gray-300" />
            <label htmlFor="terms" className="text-sm text-gray-700">
              I agree to the{" "}
              <a href="#" className="text-blue-600 hover:underline">Terms & Conditions</a>
            </label>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-600 text-white py-2 rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {submitting ? "Creating account…" : "Sign Up"}
          </button>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;