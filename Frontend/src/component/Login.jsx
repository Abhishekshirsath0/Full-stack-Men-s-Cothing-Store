import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { FormSkeleton } from "./Skeleton/SkeletonLoader";
import { AuthenticateUser } from "../Service";
import { toast } from "react-hot-toast";

const Login = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const outletContext = useOutletContext();
  const onLogin = outletContext?.onLogin;

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 250);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const result = await AuthenticateUser({
        Email: emailRef.current.value,
        Password: passwordRef.current.value,
      });

      if (result?.success) {
        onLogin?.(result.user);
        toast.success("Login successful!");

        navigate(
          result.user.Usertype === "admin" ? "/dashboard" : "/"
        );
      } else {
        const msg = result?.message || "Invalid email or password.";
        setError(msg);
        toast.error(msg);
      }
    } catch {
      const msg = "Something went wrong. Please try again.";
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

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
      >
        ← Back
      </button>

      <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-8 shadow-sm">

        <h1 className="mb-4 text-xl font-semibold text-gray-800">
          Sign in to your account
        </h1>

        {error && (
          <div className="mb-4 rounded-md bg-red-50 px-4 py-2 text-sm text-red-600 border border-red-200">
            {error}
          </div>
        )}

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              ref={emailRef}
              type="email"
              placeholder="Enter your email (example: user@gmail.com)"
              required
              className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              ref={passwordRef}
              type="password"
              placeholder="Enter your password"
              required
              className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-600 text-white py-2 rounded-md disabled:opacity-50 hover:bg-blue-700 transition"
          >
            {submitting ? "Signing in…" : "Sign in"}
          </button>

          <p className="text-center text-sm mt-4">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600">
              Create account
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
};

export default Login;