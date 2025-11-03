"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    fetch(`${apiUrl}/categories/`)
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${apiUrl}/categories/${id}/delete/`, {
        method: "DELETE",
      });
      if (res.status === 204) {
        setCategoryId(null);
        toast.success("Category deleted successfully");
        setCategories(categories.filter((c) => c.id !== id));
      } else {
        toast.error("Failed to delete category.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error deleting category.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Browse Categories
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-600 to-emerald-600 mx-auto rounded-full"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our wide range of building supply categories
          </p>
        </div>

        {categories?.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-8">
            {categories?.map((cat) => (
              <div
                key={cat.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 transform hover:-translate-y-2 relative"
              >
                {/* Trash Icon */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setCategoryId(cat.id);
                  }}
                  className="absolute top-4 right-4 w-10 h-10 bg-red-500/10 rounded-full items-center justify-center text-red-500 hover:bg-red-500 hover:text-white cursor-pointer hidden group-hover:flex transition-all duration-300 z-10"
                >
                  <Trash2 className="w-5 h-5" />
                </button>

                <Link
                  href={`/categories/${cat.id}`}
                  className="flex flex-col h-full"
                >
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 h-64 w-full flex items-center justify-center overflow-hidden relative">
                    {cat.image ? (
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="h-full w-full object-contain p-6 group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <span className="text-gray-400">No image</span>
                    )}
                  </div>
                  <div className="p-6 space-y-2">
                    <h3 className="font-bold text-xl text-gray-900 group-hover:text-teal-700 transition-colors duration-300">
                      {cat.name}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {cat.description}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center text-lg text-gray-500 py-16">
            <span>No category available</span>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {categoryId && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl mx-4 border border-gray-100">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">
                Are you sure?
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Do you really want to delete this category? This action cannot
                be undone.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setCategoryId(null)}
                  className="px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-300 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(categoryId)}
                  className="px-6 py-3 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors duration-300 font-medium shadow-lg hover:shadow-xl"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
