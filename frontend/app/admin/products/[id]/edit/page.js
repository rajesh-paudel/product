"use client";

import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function EditProductPage() {
  const router = useRouter();
  const { id } = useParams();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    availability: true,
    meta_title: "",
    meta_description: "",
    description: "",
  });
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef(null);

  // Fetch categories
  useEffect(() => {
    fetch(`${apiUrl}/categories/`)
      .then((res) => res.json())
      .then(setCategories)
      .catch((err) => console.log(err));
  }, []);

  // Fetch product details
  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`${apiUrl}/products/${id}/`)
      .then((res) => res.json())
      .then((data) => {
        setForm({
          name: data.name,
          price: data.price,
          category: data.category,
          availability: data.availability,
          meta_title: data.meta_title || "",
          meta_description: data.meta_description || "",
          description: data.description,
        });
        if (data.image) setPreview(data.image);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("price", parseFloat(form.price));
    formData.append("category", Number(form.category));
    formData.append("availability", form.availability);
    formData.append("description", form.description);

    if (form.meta_title) formData.append("meta_title", form.meta_title);
    if (form.meta_description)
      formData.append("meta_description", form.meta_description);
    if (selectedFile) formData.append("image", selectedFile);

    try {
      const res = await fetch(`${apiUrl}/products/${id}/update/`, {
        method: "PATCH",
        body: formData,
      });
      if (res.ok) {
        toast.success("Product updated successfully!");
        router.push("/admin");
      } else {
        toast.error("Failed to update product.");
      }
    } catch (err) {
      console.log(err);
      toast.error("Error updating product.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <Link
            href="/admin"
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-300"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Update Product
            </h1>
            <p className="text-gray-600 mt-1">Edit product information</p>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Product Name */}
                <div className="flex flex-col gap-2">
                  <label className="font-semibold text-gray-900">
                    Product Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
                    required
                  />
                </div>

                {/* Price */}
                <div className="flex flex-col gap-2">
                  <label className="font-semibold text-gray-900">
                    Price <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    className="border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
                    required
                  />
                </div>

                {/* Availability */}
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <input
                    type="checkbox"
                    name="availability"
                    checked={form.availability}
                    onChange={handleChange}
                    className="w-5 h-5 text-teal-600 focus:ring-teal-500 rounded cursor-pointer"
                  />
                  <label className="font-semibold text-gray-900 cursor-pointer">
                    Product Available
                  </label>
                </div>

                {/* Category */}
                <div className="flex flex-col gap-2">
                  <label className="font-semibold text-gray-900">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 bg-white"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Description */}
                <div className="flex flex-col gap-2">
                  <label className="font-semibold text-gray-900">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    className="border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 resize-none"
                    rows={5}
                    required
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Meta Title */}
                <div className="flex flex-col gap-2">
                  <label className="font-semibold text-gray-900">
                    Meta Title <span className="text-gray-500">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    name="meta_title"
                    value={form.meta_title}
                    onChange={handleChange}
                    className="border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
                  />
                </div>

                {/* Meta Description */}
                <div className="flex flex-col gap-2">
                  <label className="font-semibold text-gray-900">
                    Meta Description <span className="text-gray-500">(Optional)</span>
                  </label>
                  <textarea
                    name="meta_description"
                    value={form.meta_description}
                    onChange={handleChange}
                    className="border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 resize-none"
                    rows={3}
                  />
                </div>

                {/* Image */}
                <div className="flex flex-col gap-2">
                  <label className="font-semibold text-gray-900">
                    Product Image <span className="text-gray-500">(Optional)</span>
                  </label>
                  <input
                    type="file"
                    name="image"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    className="hidden"
                    accept="image/*"
                  />
                  <div
                    className="border-2 border-dashed border-gray-300 w-full h-48 rounded-lg cursor-pointer flex items-center justify-center text-gray-500 hover:border-teal-500 hover:bg-teal-50 transition-all duration-300"
                    onClick={() => fileInputRef.current.click()}
                  >
                    {preview ? (
                      <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-full object-contain rounded-lg"
                      />
                    ) : (
                      <div className="text-center">
                        <p className="text-sm">Click to browse image</p>
                        <p className="text-xs text-gray-400 mt-1">Recommended: 800x800px</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => router.push("/admin")}
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-300 font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-lg hover:from-teal-700 hover:to-emerald-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
              >
                Update Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

