"use client";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Trash2, Edit } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AddCategory from "./AddCategoryModel";
export default function AdminPanel() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [deleteModel, setDeleteModel] = useState(null);
  const [isCategoryModelOpen, setIsCategoryModelOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  console.log(products);
  // Fetch products and categories
  const fetchData = async () => {
    try {
      const [prodRes, catRes] = await Promise.all([
        fetch(`${apiUrl}/products/`),
        fetch(`${apiUrl}/categories/`),
      ]);
      const prodData = await prodRes.json();
      const catData = await catRes.json();
      setProducts(prodData);
      setCategories(catData);
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filter products by search
  const filteredProducts = products.filter((p) => {
    const catName = categories.find((c) => c.id === p.category)?.name || "";
    return (
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      catName.toLowerCase().includes(search.toLowerCase())
    );
  });

  // handle delete
  const handleDelete = async (id) => {
    setDeleteModel(false);
    try {
      const res = await fetch(`${apiUrl}/products/${id}/delete/`, {
        method: "DELETE",
      });
      if (res.status === 204) {
        const newProducts = products.filter((product) => product.id !== id);
        setProducts(newProducts);
        toast.success("Product deleted successfully");
      } else {
        toast.error("Failed to delete product");
      }
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <div className="min-h-screen p-8 max-w-6xl mx-auto">
      <div className="flex flex-col gap-4 text-gray-500 font-semibold mb-8">
        <div
          onClick={() => setIsCategoryModelOpen(true)}
          className="rounded-full inline-block w-56  border-2 border-gray-200 shadow-md hover:scale-105 duration-300  p-3 cursor-pointer"
        >
          Add category +{" "}
        </div>
        <Link
          href={"/products/new"}
          className="rounded-full inline-block w-56  border-2 border-gray-200 shadow-md hover:scale-105 duration-300  p-3 cursor-pointer"
        >
          Add product +{" "}
        </Link>
      </div>

      {/* Search Bar */}
      <div className="flex justify-center mb-14">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="border-2 h-16 text-gray-600  border-gray-50 rounded-lg shadow-md shadow-gray-400 px-4 py-2 w-full md:w-1/2  focus:outline-none"
        />
      </div>

      {/* Products Grid */}
      {filteredProducts?.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((p) => (
            <Link
              key={p.id}
              href={`/products/${p.id}`}
              className="bg-white flex flex-col shadow-md rounded-lg overflow-hidden relative group hover:shadow-xl transition"
            >
              {p?.image ? (
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-42 w-full object-cover"
                />
              ) : (
                <div className="h-42 w-full  text-gray-600 bg-gray-200 flex items-center justify-center">
                  No image
                </div>
              )}
              <div className="p-2">
                <h2 className="font-semibold text-lg">{p.name}</h2>
                <p className="inline-block min-w-15  text-center text-gray-100 bg-teal-600 rounded-full  text-sm">
                  {categories.find((c) => c.id === p.category)?.name ||
                    "Uncategorized"}
                </p>
                <p className="mt-1 font-medium">${p.price}</p>
              </div>

              {/* Hover Actions */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 flex gap-2 transition-opacity">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    router.push(`/products/${p.id}/edit`);
                  }}
                  className="w-6 h-6 text-gray-600 hover:text-gray-700 flex items-center justify-center"
                >
                  <Edit className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setDeleteModel(p.id);
                  }}
                  className="w-6 h-6 text-red-600 hover:text-red-700 flex items-center justify-center"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-lg text-gray-500 flex items-center justify-center mt-5">
          No products found
        </div>
      )}

      {/* delete confirmation dialog  */}
      {deleteModel && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Are you sure?</h2>
            <p className="mb-6">
              Do you really want to delete this product? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteModel(false)}
                className="px-4 py-2 rounded border hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteModel)}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* add new category model  */}
      {isCategoryModelOpen && (
        <AddCategory setIsCategoryModelOpen={setIsCategoryModelOpen} />
      )}
    </div>
  );
}
