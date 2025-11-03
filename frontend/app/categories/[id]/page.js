"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
const myLoader = ({ src }) => src;
export default function CategoryPage() {
  const { id } = useParams();
  const [category, setCategory] = useState(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (!id) return;
    fetch(`${apiUrl}/categories/`)
      .then((res) => res.json())
      .then((data) => {
        const cat = data.find((c) => c.id === parseInt(id));
        setCategory(cat);
      })
      .catch((err) => console.log(err));
  }, [id]);
  if (!category) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen p-6 max-w-6xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-gray-500 mb-4 text-sm">
        Categories /{" "}
        <span className="text-gray-900 font-semibold">{category.name}</span>
      </nav>

      {/* Title and Description */}
      <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
      <p className="text-gray-600 mb-6">{category.description}</p>

      {/* Featured Products */}
      <section>
        <h2 className="text-xl font-semibold mb-8">Featured Products</h2>
        {category.products.length > 0 ? (
          <div className=" w-full  mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4">
            {category.products?.map((p) => (
              <Link
                key={p.id}
                href={`/products/${p.id}`}
                className="bg-white flex flex-col shadow-md rounded-lg overflow-hidden group hover:shadow-xl transition"
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
                  <p className=" text-ellipsis  truncate">{p.description}</p>
                  <p className="mt-1 font-medium">${p.price}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-gray-500 text-lg flex items-center justify-center">
            <span>No prodcuts available</span>
          </div>
        )}
      </section>
    </div>
  );
}
