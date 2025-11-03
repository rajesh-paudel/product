"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function ContactSection() {
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
    <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50" id="contact">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-600 to-emerald-600 mx-auto rounded-full"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have a question or need assistance? We're here to help.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact Details */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">
                Contact Details
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-teal-600 text-xl">📍</span>
                  <div>
                    <p className="font-semibold text-gray-900">Address</p>
                    <p className="text-gray-600">200 Tokha Road, Baniyatar KTM</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-teal-600 text-xl">📞</span>
                  <div>
                    <p className="font-semibold text-gray-900">Phone</p>
                    <p className="text-gray-600">(977) 98432215</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-teal-600 text-xl">🕐</span>
                  <div>
                    <p className="font-semibold text-gray-900">Business Hours</p>
                    <p className="text-gray-600">Monday – Friday 9 AM – 6 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-gray-100 rounded-2xl h-64 flex items-center justify-center overflow-hidden border border-gray-200">
              <span className="text-gray-400 text-sm">Map</span>
            </div>
          </div>

          {/* Contact Form */}
          <div className="relative">
            {/* Decorative Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl transform rotate-1 opacity-50"></div>
            
            {/* Form */}
            <div className="relative transform -rotate-1">
              <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6 border border-gray-100">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Request a Quote
                  </h2>
                  <p className="text-gray-600">
                    Get detailed pricing & availability
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
                  />
                  <textarea
                    name="message"
                    placeholder="Message / Product Inquiry"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 resize-none"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-semibold py-3 rounded-lg hover:from-teal-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
