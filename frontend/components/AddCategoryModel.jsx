"use client";
import { useState } from "react";
import { toast } from "sonner";
import { X } from "lucide-react";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 border border-gray-100 relative">
        {/* Close Button */}
        <button
          onClick={() => setIsCategoryModelOpen(false)}
          className="absolute top-4 right-4 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors duration-300"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Add New Category</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Category Name */}
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-gray-900">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Category name"
                value={newCategory.name}
                onChange={handleChange}
                className="border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
                required
              />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-gray-900">
                Description
              </label>
              <textarea
                name="description"
                placeholder="Category description"
                value={newCategory.description}
                onChange={handleChange}
                rows={3}
                className="border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 resize-none"
              />
            </div>

            {/* Image Upload with Preview */}
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-gray-900">Image</label>
              <input
                type="file"
                name="image"
                onChange={handleChange}
                accept="image/*"
                className="border border-gray-300 px-4 py-2 rounded-lg text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
              />

              {preview && (
                <div className="mt-2 w-full h-48 border-2 border-gray-300 rounded-lg overflow-hidden">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setIsCategoryModelOpen(false)}
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-300 font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-lg hover:from-teal-700 hover:to-emerald-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
              >
                Add Category
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
