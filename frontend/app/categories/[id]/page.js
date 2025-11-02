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
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-10 text-center ">
        {category?.name}
      </h1>

      <h2 className="text-2xl font-semibold mb-2">Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {category?.products?.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="w-full p-1 hover:bg-gray-100 shadow-2xl flex flex-col rounded-xl hover:scale-105 transition duration-300"
          >
            <div className="relative w-full aspect-square mb-4 flex items-center justify-center  bg-gray-200 rounded-lg">
              {product.image ? (
                <Image
                  loader={myLoader}
                  src={product.image}
                  alt={product.name}
                  className="object-cover rounded-lg"
                  fill
                  unoptimized
                />
              ) : (
                <span className="text-gray-500 font-medium">No Image</span>
              )}
            </div>

            <div className=" w-full p-2">
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-gray-700">${product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
