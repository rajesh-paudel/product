"use client";

import { useState } from "react";
import { toast } from "sonner";
import { MessageCircle } from "lucide-react";

export default function InquiryForm({ productId }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("message", form.message);
    formData.append("product", Number(productId));
    try {
      const res = await fetch(`${apiUrl}/inquiries/`, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        toast.success("Inquiry sent successfully!");
        setForm({ name: "", email: "", message: "" });
      } else {
        const error = await res.json();
        console.log(error);
        toast.error("Failed to send inquiry.");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sticky top-24">
      <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6 border border-gray-100">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-teal-100 to-emerald-100 rounded-full flex items-center justify-center">
            <MessageCircle className="w-6 h-6 text-teal-600" />
          </div>
          <div>
            <h2 className="font-bold text-xl text-gray-900">Request a Quote</h2>
            <p className="text-sm text-gray-600">Get detailed pricing & availability</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
          />

          <textarea
            name="message"
            placeholder="Message / Product Inquiry"
            value={form.message}
            onChange={handleChange}
            rows={5}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 resize-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-semibold py-3 rounded-lg hover:from-teal-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Sending..." : "Send Inquiry"}
          </button>
        </form>
      </div>
    </div>
  );
}
