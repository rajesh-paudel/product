"use client";
import { useState, useEffect } from "react";
import AdminPanel from "@/components/AdminPanel";
import { toast } from "sonner";

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (form.username === "admin" && form.password === "admin") {
      setIsLoggedIn(true);
      localStorage.setItem("admin_login", "true");
      toast.success("Logged in successfully");
    } else {
      toast.error("Invalid username or password");
    }
  };

  useEffect(() => {
    const loggedIn = localStorage.getItem("admin_login") === "true";
    if (loggedIn) setIsLoggedIn(true);
  }, []);

  if (isLoggedIn) return <AdminPanel />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center py-20 px-4">
      <div className="w-full max-w-md">
        {/* Decorative Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-50/50 to-emerald-50/50"></div>

        {/* Login Form Card */}
        <div className="relative bg-white shadow-2xl rounded-2xl p-8 space-y-6 border border-gray-100">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Admin Login
            </h2>
            <p className="text-gray-600">
              Enter your credentials to manage products
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-semibold text-gray-900 mb-2"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={form.username}
                onChange={handleChange}
                placeholder="Enter username"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
                required
                autoFocus
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-900 mb-2"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
                required
              />
            </div>

            {error && (
              <p className="text-red-600 text-sm text-center font-medium bg-red-50 p-3 rounded-lg border border-red-200">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:from-teal-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl mt-4"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
