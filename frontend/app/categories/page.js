"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    fetch(`${apiUrl}/categories/`)
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="min-h-screen max-w-4xl w-full mx-auto p-8">
      <h1 className="text-3xl font-bold mb-10 text-center">Categories</h1>

      <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/categories/${cat.id}`}
            className="   w-full h-32  rounded-xl shadow-lg cursor-pointer  text-gray-800 hover:shadow-2xl transition-shadow duration-300 bg-gray-100 flex justify-center items-center"
          >
            <div className="p-4 text-center text-xl font-semibold">
              {cat.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
