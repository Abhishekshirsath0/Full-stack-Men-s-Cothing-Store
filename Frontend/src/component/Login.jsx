import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { FormSkeleton } from "./Skeleton/SkeletonLoader";
import { AuthenticateUser } from "../Service";
import { toast } from "react-hot-toast";

const Login = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const navigate = useNavigate();

  // safer context handling
  const outletContext = useOutletContext();
  const onLogin = outletContext?.onLogin || (() => {});

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 250);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const email = emailRef.current?.value?.trim();
    const password = passwordRef.current?.value?.trim();

    if (!email || !password) {
      const msg = "Email and password are required";
      setError(msg);
      toast.error(msg);
      return;
    }

    setSubmitting(true);

    try {
      const result = await AuthenticateUser({
        Email: email,
        Password: password,
      });

      if (result?.success) {
        onLogin(result.user);
        toast.success("Login successful!");

        const role = result?.user?.Usertype;

        navigate(role === "admin" ? "/dashboard" : "/");
      } else {
        const msg = result?.message || "Invalid credentials";
        setError(msg);
        toast.error(msg);
      }
    } catch (err) {
      const msg = "Server error. Try again later.";
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 relative">

      <button
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
      >
        ← Back
      </button>

      <div className="w-full max-w-md rounded-lg border bg-white p-8 shadow-sm">

        <h1 className="mb-4 text-xl font-semibold text-gray-800">
          Sign in
        </h1>

        {error && (
          <div className="mb-4 rounded-md bg-red-50 px-4 py-2 text-sm text-red-600 border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              ref={emailRef}
              type="email"
              placeholder="Enter email"
              className="w-full border px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              ref={passwordRef}
              type="password"
              placeholder="Enter password"
              className="w-full border px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-600 text-white py-2 rounded-md disabled:opacity-50"
          >
            {submitting ? "Signing in..." : "Sign in"}
          </button>

          <p className="text-center text-sm mt-3">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600">
              Register
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
};

export default Login;
