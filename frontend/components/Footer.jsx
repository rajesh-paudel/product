import Link from "next/link";

// components/Footer.js
export default function Footer() {
  return (
    <footer className="bg-[#181e29] text-gray-300 py-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between px-4 gap-10">
        {/* Left: Company Info */}
        <div>
          <h2 className="text-xl font-semibold mb-3">
            Global Building Supplies
          </h2>
          <p className="max-w-xs">
            Your trusted partner for all construction, hardware, and renovation
            materials in the GTA.
          </p>
        </div>
        {/* Middle: Quick Links */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Quick Links</h2>
          <ul>
            <li className="mb-2">
              <Link href="#category" className="hover:underline">
                Categories
              </Link>
            </li>
            <li className="mb-2">
              <Link href="#products" className="hover:underline">
                Products
              </Link>
            </li>
            <li>
              <Link href="#contact" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        {/* Right: Social Links */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Follow Us</h2>
          <ul className="flex space-x-4">
            <li>
              <a href="https://www.facebook.com" className="hover:underline">
                Facebook
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com" className="hover:underline">
                Instagram
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com" className="hover:underline">
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center text-gray-300 mt-10 opacity-60 text-sm">
        © 2025 Global Building Supplies. All rights reserved.
      </div>
    </footer>
  );
}
