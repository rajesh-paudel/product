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
  if (!category?.products || category?.products?.length == 0)
    return <div className="p-8 text-center">No products</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-gray-500 mb-4 text-sm">
        Categories /{" "}
        <span className="text-gray-900 font-semibold">{category.name}</span>
      </nav>

      {/* Title and Description */}
      <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
      <p className="text-gray-600 mb-6">Description</p>

      {/* Featured Products */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Featured Products</h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {category.products?.map((prod, idx) => (
            <Link
              key={idx}
              href={`/products/${prod.id}`}
              className="flex flex-col cursor-pointer border border-gray-200 p-2 gap-2 hover:bg-gray-100"
            >
              {prod.image ? (
                <img
                  src={prod.image}
                  alt="img"
                  className="w-full h-36 rounded-md object-cover mb-2"
                />
              ) : (
                <span className="bg-gray-300">No image</span>
              )}
              <span className="text-sm font-medium">{prod.name}</span>
              <span className="text-gray-500 text-xs">{prod.price}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
