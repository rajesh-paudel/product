"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-white border-b border-gray-200 fixed top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-semibold text-gray-800 cursor-pointer"
        >
          Global Building Supplies
        </Link>

        {/* Nav Links */}
        <div className="flex space-x-6 text-gray-700">
          <Link href="/" className="hover:text-blue-400">
            Home
          </Link>
          <Link href="#products" className="hover:text-blue-400">
            Products
          </Link>
          <Link href="/categories" className="hover:text-blue-400">
            Category
          </Link>
          <Link href="#contact" className="hover:text-blue-400">
            Contact
          </Link>
          <Link href="/admin" className="hover:text-blue-400">
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
}
