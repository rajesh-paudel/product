"use client";

import { useState } from "react";
import { toast } from "sonner";

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
      console.error(err);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="  flex flex-col gap-4 bg-gray-200  rounded-2xl p-6 shadow-sm w-full max-w-4xl mx-auto"
    >
      <h2 className="text-2xl font-semibold text-center text-gray-700">
        Inquiry for this product
      </h2>

      <label className="flex flex-col gap-1">
        <span className="font-medium">Tell us your Name *</span>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 rounded outline-none border-none bg-gray-300 text-gray-600 placeholder:text-gray-600"
          placeholder="Enter you name"
          required
        />
      </label>

      <label className="flex flex-col gap-1">
        <span className="font-medium">Email *</span>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="border p-2 rounded outline-none border-none bg-gray-300 text-gray-600 placeholder:text-gray-600"
          placeholder="Enter you Email"
          required
        />
      </label>

      <label className="flex flex-col gap-1">
        <span className="font-medium">Message *</span>
        <textarea
          placeholder="Your message here..."
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={6}
          className="border p-2 rounded outline-none border-none bg-gray-300 text-gray-600 placeholder:text-gray-600"
          required
        />
      </label>

      <button
        type="submit"
        disabled={loading}
        className="bg-gray-600 text-white p-2 rounded hover:bg-gray-700 transition"
      >
        {loading ? "Sending..." : "Submit"}
      </button>
    </form>
  );
}
