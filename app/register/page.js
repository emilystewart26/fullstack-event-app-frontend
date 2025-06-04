"use client";
import { useState } from "react";
import { ApiClient } from "../../apiClient/apiClient";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LoadingSpin from "react-loading-spin"; // new spinner

export default function UserRegisterPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    if (!form.email || !form.password) {
      setError("Please enter both email and password.");
      return;
    }
    if (form.password !== form.passwordConfirm) {
      setError("Passwords must match");
      return;
    }
    setLoading(true);
    try {
      const apiClient = new ApiClient();
      const response = await apiClient.register(form.email, form.password);
      if (response.data) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/user");
        }, 3000);
      }
    } catch (err) {
      console.error("Register error:", err.response || err);
      setError(err.response?.data?.message || "Invalid credentials or server error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-700 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center">
          Register
        </h1>

        {/* Email */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Enter your e-mail
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="you@example.com"
            autoComplete="email"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="••••••••"
            autoComplete="current-password"
            required
          />
        </div>

        {/* Password Confirm */}
        <div className="mb-6">
          <label
            htmlFor="passwordConfirm"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Re-enter password
          </label>
          <input
            type="password"
            id="passwordConfirm"
            name="passwordConfirm"
            value={form.passwordConfirm}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="••••••••"
            autoComplete="current-password"
            required
          />
        </div>

        {/* Error */}
        {error && (
          <p className="mb-4 text-red-500 text-sm text-center">{error}</p>
        )}

        {/* Success & Spinner */}
        {success && (
          <div className="flex flex-col space-y-2 justify-center">
            <p className="text-green-600 text-center mt-4">
              Account registered!
            </p>
            <p className="text-green-600 text-center mb-4">
              Redirecting to log in page...
            </p>
            <div className="flex justify-center">
              <LoadingSpin size="40px" width="4px" primaryColor="#155dfc" />
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-950 text-white py-2 px-4 rounded-lg font-medium hover:cursor-pointer hover:bg-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-60"
        >
          {loading ? "Registering user..." : "Register"}
        </button>

        {/* Link to Login */}
        <Link href="/user">
          <p className="mt-6 text-center text-sm text-slate-400 hover:underline hover:cursor-pointer hover:text-slate-200">
            Already have an account? Click here to log in.
          </p>
        </Link>
      </form>
    </div>
  );
}