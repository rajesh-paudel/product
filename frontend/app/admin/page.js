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
      toast.success("logged in successfully");
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
    <div className="min-h-[calc(100vh-32rem)] h-full flex  items-center justify-center pt-16 ">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm space-y-6 border border-gray-200"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Admin Login
        </h2>
        <p className="text-center text-sm text-gray-500 mb-4">
          Enter your credentials to manage products
        </p>

        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700 mb-1"
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
            className="w-full border border-gray-300 rounded-lg p-2.5  outline-none"
            required
            autoFocus
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
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
            className="w-full border border-gray-300 rounded-lg p-2.5 outline-none"
            required
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm text-center font-medium">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-teal-600 text-white py-2.5 rounded-lg font-semibold hover:bg-teal-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
