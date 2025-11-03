"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";

const myLoader = ({ src }) => src;

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    fetch(`${apiUrl}/products/`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch(`${apiUrl}/categories/`)
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.log(err));
  }, []);

  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category === parseInt(selectedCategory))
    : products;

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
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 space-y-6">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
              All Products
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-teal-600 to-emerald-600 mx-auto rounded-full"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Browse our complete selection of building supplies
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => setSelectedCategory("")}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === ""
                  ? "bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-lg"
                  : "bg-white border-2 border-gray-200 text-gray-700 hover:border-teal-600 hover:text-teal-600"
              }`}
            >
              All Products
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id.toString())}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === cat.id.toString()
                    ? "bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-lg"
                    : "bg-white border-2 border-gray-200 text-gray-700 hover:border-teal-600 hover:text-teal-600"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts?.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 transform hover:-translate-y-2"
              >
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 h-48 w-full flex items-center justify-center overflow-hidden relative">
                  {product.image ? (
                    <Image
                      loader={myLoader}
                      src={product.image}
                      alt={product.name}
                      className="object-contain rounded-lg group-hover:scale-110 transition-transform duration-500"
                      width={400}
                      height={400}
                      unoptimized
                    />
                  ) : (
                    <span className="text-gray-400">No image</span>
                  )}
                </div>
                <div className="p-6 flex flex-col space-y-3">
                  <h3 className="font-bold text-xl text-gray-900 group-hover:text-teal-700 transition-colors duration-300 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2 flex-1">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <span className="font-bold text-teal-600 text-xl">
                      ${product.price}
                    </span>
                    {product.availability ? (
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                        In Stock
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
                        Out of Stock
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl shadow-lg border border-gray-100">
            <p className="text-lg text-gray-500">
              {selectedCategory
                ? "No products found in this category"
                : "No products available"}
            </p>
            <Link
              href="/categories"
              className="inline-block mt-4 px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-300"
            >
              Browse Categories
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

