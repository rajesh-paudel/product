"use client";

import Image from "next/image";
import Link from "next/link";

const myLoader = ({ src }) => src;

export default function ProductsSection({ products }) {
  return (
    <section className="py-20 px-4 bg-white" id="products">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
            Explore Popular Products
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-600 to-emerald-600 mx-auto rounded-full"></div>
        </div>

        {products?.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-8">
            {products?.slice(0, 3).map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 transform hover:-translate-y-2 flex flex-col"
              >
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 h-40 w-full flex items-center justify-center overflow-hidden relative">
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
                    <span className="text-gray-500">No image</span>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-bold text-xl mb-2 text-gray-900 group-hover:text-teal-700 transition-colors duration-300">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">
                    {product.description}
                  </p>
                  <Link
                    href={`/products/${product.id}`}
                    className="text-teal-600 font-semibold text-sm mt-auto inline-flex items-center gap-2 group-hover:gap-3 transition-all duration-300"
                  >
                    View Details
                    <span className="text-lg">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center text-lg text-gray-500 py-16">
            <span>No products available</span>
          </div>
        )}
      </div>
    </section>
  );
}

