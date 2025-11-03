"use client";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
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

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("message", form.message);

    try {
      const res = await fetch(`${apiUrl}/inquiries/`, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        toast.success("Inquiry sent successfully!");
        setForm({ name: "", email: "", message: "" });
      } else {
        const error = await res.json();
        console.log(error);
        toast.error("Failed to send inquiry.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* HERO SECTION */}
      <section className="bg-white py-10 px-4">
        <div className="max-w-5xl mx-auto flex items-center justify-center gap-5">
          <div className="">
            <h1 className="text-3xl md:text-5xl font-bold">
              Your All-in-One Building Supply Destination
            </h1>
            <p className="mt-2 text-gray-700 max-w-sm text-lg">
              Everything you need—paint, hardware, tools, plumbing, electrical,
              flooring, and more—all under one roof.
            </p>
            <Link
              href="/categories"
              className="mt-4 px-6 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 text-lg"
            >
              Explore Categories
            </Link>
          </div>
          <div>
            <Image
              src="/hero.png"
              alt="hero-img"
              className="object-contain"
              width={800}
              height={800}
            ></Image>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-10 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Why Choose Global Building Supplies
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow p-4 hover:scale-105 transition-all duration-300">
              <h3 className="font-bold mb-2 text-xl">Huge Selection</h3>
              <p className="text-gray-600 text-lg">
                From paints to pipes, flooring to fixtures, our extensive
                collection and innovation are top-notch.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-4 hover:scale-105 transition-all duration-300">
              <h3 className="font-bold mb-2 text-xl">Trusted Brands</h3>
              <p className="text-gray-600 text-lg">
                Authorised dealer for top-quality brands and the best products
                for builders and homeowners alike.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-4 hover:scale-105 transition-all duration-300">
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

          {categories?.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-4">
              {categories?.slice(0, 3).map((cat) => (
                <Link
                  key={cat.id}
                  href={`/categories/${cat.id}`}
                  className="bg-white h-80 rounded-lg shadow-md hover:shadow-xl transition p-4 flex flex-col gap-1"
                >
                  <div className="bg-gray-100 h-60 w-full rounded flex items-center justify-center overflow-hidden">
                    {cat.image ? (
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="h-full w-auto object-contain"
                      />
                    ) : (
                      <span className="text-gray-500">No image</span>
                    )}
                  </div>
                  <h3 className="font-bold text-lg">{cat.name}</h3>
                  <p className="text-gray-600 text-sm mb-2 truncate">
                    {cat.description}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center text-md text-gray-500">
              <span>No category available</span>
            </div>
          )}

          {/* View All Categories Link */}
          {categories?.length > 3 && (
            <div className="text-center mt-6">
              <Link
                href="/categories"
                className="inline-block bg-teal-600 text-white px-6 py-2 rounded-full hover:bg-teal-700 transition"
              >
                View All Categories
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* POPULAR PRODUCTS */}
      <section id="products" className="py-10 px-4 ">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-center">
            Explore Popular Products
          </h2>
          {products?.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-4">
              {products?.slice(0, 3).map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg  p-4 flex flex-col shadow-md hover:shadow-xl transition"
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
                  <p className="text-gray-600 text-sm mb-2 truncate">
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
          ) : (
            <div className="flex items-center justify-center text-md text-gray-500">
              <span>No products available</span>
            </div>
          )}
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="py-10 px-4" id="contact">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-6 bg-white rounded-lg shadow p-6">
          {/* Contact Details */}
          <div className="flex-1">
            <h3 className="font-bold mb-2">Contact Details</h3>
            <p>200 tokha road, baniyatar KTM</p>
            <p>(977) 98432215</p>
            <p>Monday – Friday 9 AM – 6 PM</p>
            <div className="mt-4 bg-gray-100 w-full h-32 rounded flex items-center justify-center">
              {/* Simulated map */}
              <span className="text-gray-400 text-xs">Map</span>
            </div>
          </div>
          {/* Contact Form */}
          <div className="flex-1">
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                className="w-full border rounded px-3 py-2"
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
              />
              <input
                className="w-full border rounded px-3 py-2"
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
              />
              <textarea
                className="w-full border rounded px-3 py-2"
                name="message"
                placeholder="Message / Product Inquiry"
                value={form.message}
                onChange={handleChange}
                rows={5}
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
              >
                {loading ? "Sending" : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
