"use client";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function AddCategory({ setIsCategoryModelOpen }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [preview, setPreview] = useState(null);
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    image: null,
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      setNewCategory({ ...newCategory, image: file });
      if (file) {
        setPreview(URL.createObjectURL(file)); // set preview
      } else {
        setPreview(null);
      }
    } else {
      setNewCategory({ ...newCategory, [name]: value });
    }
  };

  // Submit new category
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", newCategory.name);
    formData.append("description", newCategory.description);
    if (newCategory.image) formData.append("image", newCategory.image);

    try {
      const res = await fetch(`${apiUrl}/categories/add/`, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        toast.success("Category added successfully!");
        setIsCategoryModelOpen(false);
        setNewCategory({ name: "", description: "", image: null });
        setPreview(null);
      } else {
        toast.error("Failed to add category.");
      }
    } catch (err) {
      console.log(err);
      toast.error("Error adding category.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-gray-200 rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <h2 className="text-xl font-bold mb-4">Add New Category</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="font-medium">Name *</label>
            <input
              type="text"
              name="name"
              placeholder="Category name"
              value={newCategory.name}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-medium">Description</label>
            <textarea
              name="description"
              placeholder="description"
              value={newCategory.description}
              onChange={handleChange}
              rows={3}
              className="border p-2 rounded"
            />
          </div>

          {/* Image Upload with Preview */}

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4">
              <label className="font-medium">Image</label>
              <input
                type="file"
                name="image"
                onChange={handleChange}
                accept="image/*"
                className="border p-1 rounded cursor-pointer text-sm"
              />
            </div>

            {preview && (
              <div className="mt-2 w-24 h-24 border rounded overflow-hidden">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={() => setIsCategoryModelOpen(false)}
              className="px-4 py-2 rounded border hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-teal-600 text-white hover:bg-teal-700"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
