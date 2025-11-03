"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-white/80 backdrop-blur-md border-b border-gray-200 fixed top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between py-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold text-gray-900 cursor-pointer hover:text-teal-600 transition-colors duration-300"
        >
          Global Building Supplies
        </Link>

        {/* Nav Links */}
        <div className="flex space-x-8 text-gray-700">
          <Link
            href="/"
            className="hover:text-teal-600 transition-colors duration-300 font-medium"
          >
            Home
          </Link>
          <Link
            href="/products"
            className="hover:text-teal-600 transition-colors duration-300 font-medium"
          >
            Products
          </Link>
          <Link
            href="/categories"
            className="hover:text-teal-600 transition-colors duration-300 font-medium"
          >
            Category
          </Link>
          <Link
            href="#contact"
            className="hover:text-teal-600 transition-colors duration-300 font-medium"
          >
            Contact
          </Link>
          <Link
            href="/admin"
            className="hover:text-teal-600 transition-colors duration-300 font-medium"
          >
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
}
