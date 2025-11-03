"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const myLoader = ({ src }) => src;

export default function CategoryPage() {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`${apiUrl}/categories/`)
      .then((res) => res.json())
      .then((data) => {
        const cat = data.find((c) => c.id === parseInt(id));
        setCategory(cat);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [id]);

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

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Category not found</h2>
          <Link
            href="/categories"
            className="inline-block px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-300"
          >
            Back to Categories
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-gray-500 mb-8 text-sm flex items-center gap-2">
          <Link href="/categories" className="hover:text-teal-600 transition-colors duration-300">
            Categories
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold">{category.name}</span>
        </nav>

        {/* Category Header */}
        <div className="mb-16 text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            {category.name}
          </h1>
          {category.description && (
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {category.description}
            </p>
          )}
        </div>

        {/* Featured Products */}
        <section>
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-teal-600 to-emerald-600"></div>
          </div>

          {category.products && category.products.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {category.products.map((p) => (
                <Link
                  key={p.id}
                  href={`/products/${p.id}`}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 transform hover:-translate-y-2"
                >
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 h-48 w-full flex items-center justify-center overflow-hidden relative">
                    {p?.image ? (
                      <img
                        src={p.image}
                        alt={p.name}
                        className="h-full w-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="text-gray-400">No image</div>
                    )}
                  </div>
                  <div className="p-4 space-y-2">
                    <h3 className="font-bold text-lg text-gray-900 group-hover:text-teal-700 transition-colors duration-300 line-clamp-2">
                      {p.name}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {p.description}
                    </p>
                    <p className="mt-2 font-bold text-teal-600 text-lg">
                      ${p.price}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-100">
              <p className="text-gray-500 text-lg">No products available in this category</p>
              <Link
                href="/categories"
                className="inline-block mt-4 px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-300"
              >
                Browse Other Categories
              </Link>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
