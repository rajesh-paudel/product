import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-gray-300 py-16">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between px-6 gap-12">
        {/* Left: Company Info */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-4 text-white">
            Global Building Supplies
          </h2>
          <p className="max-w-xs text-gray-400 leading-relaxed">
            Your trusted partner for all construction, hardware, and renovation
            materials in the GTA.
          </p>
        </div>
        
        {/* Middle: Quick Links */}
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-4 text-white">Quick Links</h2>
          <ul className="space-y-3">
            <li>
              <Link href="#category" className="hover:text-teal-400 transition-colors duration-300">
                Categories
              </Link>
            </li>
            <li>
              <Link href="#products" className="hover:text-teal-400 transition-colors duration-300">
                Products
              </Link>
            </li>
            <li>
              <Link href="#contact" className="hover:text-teal-400 transition-colors duration-300">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        
        {/* Right: Social Links */}
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-4 text-white">Follow Us</h2>
          <ul className="flex flex-col space-y-3">
            <li>
              <a href="https://www.facebook.com" className="hover:text-teal-400 transition-colors duration-300">
                Facebook
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com" className="hover:text-teal-400 transition-colors duration-300">
                Instagram
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com" className="hover:text-teal-400 transition-colors duration-300">
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto px-6 mt-12 pt-8 border-t border-gray-700">
        <div className="text-center text-gray-400 text-sm">
          © 2025 Global Building Supplies. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
