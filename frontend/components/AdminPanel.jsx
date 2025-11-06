"use client";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Trash2, Edit, Plus, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import AddCategory from "./AddCategoryModel";
import AddSubCategory from "./AddSubCategoryModel";

export default function AdminPanel() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [deleteModel, setDeleteModel] = useState(null);
  const [isCategoryModelOpen, setIsCategoryModelOpen] = useState(false);
  const [isSubCategoryModelOpen, setIsSubCategoryModelOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");

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

  const allCategories = categories.flatMap((c) => [
    { id: c.id, name: c.name },
    ...(c.subcategories?.map((sub) => ({ id: sub.id, name: sub.name })) || []),
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 space-y-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Admin Panel</h1>
            <p className="text-gray-600 mt-1">
              Manage your products and categories
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setIsCategoryModelOpen(true)}
              className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 rounded-full hover:border-teal-600 hover:bg-teal-50 text-gray-700 hover:text-teal-700 font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" />
              Add Category
            </button>
            <button
              onClick={() => setIsSubCategoryModelOpen(true)}
              className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 rounded-full hover:border-teal-600 hover:bg-teal-50 text-gray-700 hover:text-teal-700 font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" />
              Add Subcategory
            </button>
            <button
              onClick={() => router.push("/admin/products/new")}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-full hover:from-teal-700 hover:to-emerald-700 font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" />
              Add Product
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-12">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products or categories..."
            className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 shadow-lg text-gray-600"
          />
        </div>

        {/* Products List */}
        {filteredProducts?.length > 0 ? (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-900 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredProducts.map((p) => (
                    <tr
                      key={p.id}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                            {p?.image ? (
                              <img
                                src={p.image}
                                alt={p.name}
                                className="w-full h-full object-contain"
                              />
                            ) : (
                              <span className="text-gray-400 text-xs">
                                No image
                              </span>
                            )}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">
                              {p.name}
                            </div>
                            <div className="text-sm text-gray-500 line-clamp-1">
                              {p.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-block px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-semibold">
                          {allCategories.find((c) => c.id === p.category)
                            ?.name || "Uncategorized"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-bold text-teal-600">
                          ${p.price}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {p.availability ? (
                          <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                            In Stock
                          </span>
                        ) : (
                          <span className="inline-block px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
                            Out of Stock
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() =>
                              router.push(`/admin/products/${p.id}/edit`)
                            }
                            className="p-2 text-gray-600 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors duration-300"
                            title="Edit"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => setDeleteModel(p.id)}
                            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-300"
                            title="Delete"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl shadow-lg border border-gray-100">
            <p className="text-lg text-gray-500">
              {search
                ? "No products found matching your search"
                : "No products available"}
            </p>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteModel && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl mx-4 border border-gray-100">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">
                Are you sure?
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Do you really want to delete this product? This action cannot be
                undone.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setDeleteModel(false)}
                  className="px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-300 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteModel)}
                  className="px-6 py-3 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors duration-300 font-medium shadow-lg hover:shadow-xl"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Category Modal */}
        {isCategoryModelOpen && (
          <AddCategory setIsCategoryModelOpen={setIsCategoryModelOpen} />
        )}
        {/* Add subCategory Modal */}
        {isSubCategoryModelOpen && (
          <AddSubCategory
            setIsSubCategoryModelOpen={setIsSubCategoryModelOpen}
          />
        )}
      </div>
    </div>
  );
}
