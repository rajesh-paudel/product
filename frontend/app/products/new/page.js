"use client";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
export default function AddProductPage() {
  const router = useRouter();
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  // Fetch categories for dropdown
  useEffect(() => {
    fetch(`${apiUrl}/categories/`)
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setForm({ ...form, [name]: checked });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("price", parseFloat(form.price));
    formData.append("category", Number(form.category));
    formData.append("availability", form.availability ? true : false);
    formData.append("description", form.description);

    if (form.meta_title) formData.append("meta_title", form.meta_title);
    if (form.meta_description)
      formData.append("meta_description", form.meta_description);
    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    try {
      const res = await fetch(`${apiUrl}/products/add/`, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        toast.success("Product added successfully!");
        setForm({
          name: "",
          price: "",
          category: "",
          availability: true,
          meta_title: "",
          meta_description: "",
          description: "",
          image: null,
        });
        setPreview(null);
        router.push("/");
      } else {
        toast.error("Failed to add product.");
      }
    } catch (err) {
      console.log(err);
      toast.error("Error adding product.");
    }
  };

  return (
    <div className="p-8 my-20 max-w-5xl mx-auto shadow-2xl border border-gray-300 rounded-md ">
      <h1 className="text-3xl font-medium mb-4">Add New Product</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex gap-8 ">
          <div className="w-1/2 flex-col  space-y-5 ">
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
          <div className="flex-1 flex-col space-y-5">
            {/* Meta Title */}
            <label className="flex flex-col gap-1">
              <span className="font-medium">Meta Title(Optional)</span>
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
              <span className="font-medium">Meta Description (optional)</span>
              <textarea
                name="meta_description"
                value={form.meta_description}
                onChange={handleChange}
                className="border p-2 rounded"
                rows={2}
              />
            </label>

            {/* image section  */}

            <label className="flex flex-col gap-1">
              <span className="font-medium">Product Image (optional)</span>
              <input
                type="file"
                name="image"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
                accept="image/*"
              />
              <div className="border-dashed border-2 border-gray-400 w-full h-40 rounded cursor-pointer flex items-center justify-center text-gray-500">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-contain
                  "
                  />
                ) : (
                  <span>Click to browse image</span>
                )}
              </div>
            </label>
          </div>
        </div>
        {/* Submit */}
        <button
          type="submit"
          className="bg-gray-700 text-white p-2 rounded mt-2 self-end cursor-pointer hover:bg-gray-900"
        >
          Publish Product
        </button>
      </form>
    </div>
  );
}
