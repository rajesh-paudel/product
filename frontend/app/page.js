"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
const myLoader = ({ src }) => src;
export default function page() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    fetch(`${apiUrl}/categories/`)
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    fetch(`${apiUrl}/products/`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);
  console.log(products);
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* HERO SECTION */}
      <section className="bg-white py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-6xl font-bold">
            Your All-in-One Building Supply Destination
          </h1>
          <p className="mt-2 text-gray-700 max-w-sm text-lg">
            Everything you need—paint, hardware, tools, plumbing, electrical,
            flooring, and more—all under one roof.
          </p>
          <button className="mt-4 px-6 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 text-lg">
            Explore Categories
          </button>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-10 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Why Choose Global Building Supplies
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="font-bold mb-2 text-xl">Huge Selection</h3>
              <p className="text-gray-600 text-lg">
                From paints to pipes, flooring to fixtures, our extensive
                collection and innovation are top-notch.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="font-bold mb-2 text-xl">Trusted Brands</h3>
              <p className="text-gray-600 text-lg">
                Authorised dealer for top-quality brands and the best products
                for builders and homeowners alike.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="font-bold mb-2 text-xl">Retail & Wholesale</h3>
              <p className="text-gray-600 text-lg">
                Big or small, we serve everyone—whether you're buying for a
                project or completely your business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BROWSE BY CATEGORY */}
      <section className="py-10 px-4" id="category">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-center">
            Browse by Category
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {categories?.map((cat) => {
              return (
                <Link
                  key={cat.id}
                  href={`/categories/${cat.id}`}
                  className="bg-white h-40 rounded-lg shadow p-4 flex items-center justify-center hover:scale-105 transition duration-300"
                >
                  <h3 className=" w-full  font-bold mb-2 text-xl text-center">
                    {cat.name}
                  </h3>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* POPULAR PRODUCTS */}
      <section id="products" className="py-10 px-4 ">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-center">
            Explore Popular Products
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow p-4 flex flex-col"
              >
                <div className="flex-1 mb-3 bg-gray-100 h-28 rounded flex items-center justify-center">
                  {product.image ? (
                    <Image
                      loader={myLoader}
                      src={product.image}
                      alt="img"
                      className=" object-contain rounded-lg"
                      width={400}
                      height={400}
                      unoptimized
                    />
                  ) : (
                    <span className=" text-gray-600 ">No image</span>
                  )}
                </div>
                <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-2">
                  {product.description}
                </p>
                <Link
                  href={`/products/${product.id}`}
                  className="text-teal-600 text-sm mt-auto"
                >
                  View Details &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="py-10 px-4" id="contact">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-6 bg-white rounded-lg shadow p-6">
          {/* Contact Details */}
          <div className="flex-1">
            <h3 className="font-bold mb-2">Contact Details</h3>
            <p>200 Kennedy Rd, Scarborough, ON M1V 1S8</p>
            <p>(416) 123-4567</p>
            <p>Monday – Friday 9 AM – 6 PM</p>
            <div className="mt-4 bg-gray-100 w-full h-32 rounded flex items-center justify-center">
              {/* Simulated map */}
              <span className="text-gray-400 text-xs">Map</span>
            </div>
          </div>
          {/* Contact Form */}
          <div className="flex-1">
            <form className="space-y-3">
              <input
                className="w-full border rounded px-3 py-2"
                placeholder="Your name"
              />
              <input
                className="w-full border rounded px-3 py-2"
                placeholder="Email"
              />
              <textarea
                className="w-full border rounded px-3 py-2"
                placeholder="How can we help you?"
                rows={3}
              />
              <button className="w-full px-6 py-2 bg-teal-600 text-white rounded hover:bg-teal-700">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
