"use client";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { useRouter, useParams } from "next/navigation";

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
      .catch((err) => console.log(err));
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

  return (
    <div className="p-8 my-20 max-w-5xl mx-auto shadow-2xl border border-gray-300 rounded-md">
      <h1 className="text-3xl font-medium mb-4">Update Product</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex gap-8">
          {/* Left Column */}
          <div className="w-1/2 flex-col space-y-5">
            {/* Product Name */}
            <label className="flex flex-col gap-1">
              <span className="font-medium">Product Name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              />
            </label>

            {/* Price */}
            <label className="flex flex-col gap-1">
              <span className="font-medium">Price</span>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              />
            </label>

            {/* Availability */}
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="availability"
                checked={form.availability}
                onChange={handleChange}
              />
              <span className="font-medium">Available</span>
            </label>

            {/* Category */}
            <label className="flex flex-col gap-1">
              <span className="font-medium">Category</span>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </label>

            {/* Description */}
            <label className="flex flex-col gap-1">
              <span className="font-medium">Description</span>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className="border p-2 rounded"
                rows={4}
                required
              />
            </label>
          </div>

          {/* Right Column */}
          <div className="flex-1 flex-col space-y-5">
            {/* Meta Title */}
            <label className="flex flex-col gap-1">
              <span className="font-medium">Meta Title (Optional)</span>
              <input
                type="text"
                name="meta_title"
                value={form.meta_title}
                onChange={handleChange}
                className="border p-2 rounded"
              />
            </label>

            {/* Meta Description */}
            <label className="flex flex-col gap-1">
              <span className="font-medium">Meta Description (Optional)</span>
              <textarea
                name="meta_description"
                value={form.meta_description}
                onChange={handleChange}
                className="border p-2 rounded"
                rows={2}
              />
            </label>

            {/* Image */}
            <label className="flex flex-col gap-1">
              <span className="font-medium">Product Image (Optional)</span>
              <input
                type="file"
                name="image"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
                accept="image/*"
              />
              <div
                className="border-dashed border-2 border-gray-400 w-full h-40 rounded cursor-pointer flex items-center justify-center text-gray-500"
                onClick={() => fileInputRef.current.click()}
              >
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <span>Click to browse image</span>
                )}
              </div>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-gray-700 text-white p-2 rounded mt-2 self-end cursor-pointer hover:bg-gray-900"
        >
          Update Product
        </button>
      </form>
    </div>
  );
}
