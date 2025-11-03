"use client";

import Link from "next/link";
import Image from "next/image";
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
        toast.success("category deleted successfully");
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
    <div className="min-h-screen max-w-4xl w-full mx-auto p-8">
      <h1 className="text-3xl font-bold mb-10 ">Categories</h1>

      {categories?.length > 0 ? (
        <div className="grid md:grid-cols-3 gap-4">
          {categories?.map((cat) => (
            <div
              key={cat.id}
              className="bg-white h-80 rounded-lg shadow-md hover:shadow-xl transition p-4 flex flex-col gap-1 relative group"
            >
              {/* Trash Icon */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setCategoryId(cat.id);
                }}
                className="absolute top-4 right-4 w-6 h-6  items-center justify-center text-red-400 hover:text-red-500 cursor-pointer hidden group-hover:flex"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <Link
                href={`/categories/${cat.id}`}
                className="flex flex-col gap-1 h-full"
              >
                <div className="bg-gray-100 h-60 w-full rounded flex items-center justify-center overflow-hidden">
                  {cat.image ? (
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="h-full w-auto object-contain"
                    />
                  ) : (
                    <span className="text-gray-500">No image</span>
                  )}
                </div>
                <h3 className="font-bold text-lg">{cat.name}</h3>
                <p className="text-gray-600 text-sm mb-2 truncate">
                  {cat.description}
                </p>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center text-md text-gray-500">
          <span>No category available</span>
        </div>
      )}

      {categoryId && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Are you sure?</h2>
            <p className="mb-6">
              Do you really want to delete this category? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setCategoryId(null)}
                className="px-4 py-2 rounded border hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(categoryId)}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
