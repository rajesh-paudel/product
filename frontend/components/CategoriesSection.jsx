"use client";

import Link from "next/link";

export default function CategoriesSection({ categories }) {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white" id="category">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
            Browse by Category
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-600 to-emerald-600 mx-auto rounded-full"></div>
        </div>

        {categories?.length > 0 ? (
          <>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {categories?.slice(0, 3).map((cat) => (
                <Link
                  key={cat.id}
                  href={`/categories/${cat.id}`}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 transform hover:-translate-y-2"
                >
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 h-64 w-full flex items-center justify-center overflow-hidden relative">
                    {cat.image ? (
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="h-full w-full object-contain p-6 group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <span className="text-gray-400 text-lg">No image</span>
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
              ))}
            </div>

            {/* View All Categories Link */}
            {categories?.length > 3 && (
              <div className="text-center">
                <Link
                  href="/categories"
                  className="inline-block px-8 py-4 bg-white border-2 border-teal-600 text-teal-600 font-semibold rounded-full hover:bg-teal-600 hover:text-white transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                >
                  View All Categories
                </Link>
              </div>
            )}
          </>
        ) : (
          <div className="flex items-center justify-center text-lg text-gray-500 py-16">
            <span>No category available</span>
          </div>
        )}
      </div>
    </section>
  );
}

