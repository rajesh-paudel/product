"use client";

import Link from "next/link";
import { Play } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative bg-white text-gray-900 overflow-hidden pt-20 pb-32 lg:pb-40">
      {/* Background Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      
      {/* Subtle Gradient Overlay for Depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-gray-50/50 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="max-w-2xl">
            <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight mb-6 tracking-tight text-gray-900">
              Building Dreams <br />
              Made <span className="text-[#FF6D1F]">Possible</span>
            </h1>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed max-w-lg font-light">
              Your premier destination for quality construction materials and
              renovation supplies. From foundation to finish, we have everything
              you need.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-[#FF6D1F] rounded-lg hover:bg-[#e55c15] transition-all duration-300 shadow-lg hover:shadow-orange-500/30 transform hover:-translate-y-1"
              >
                Start Shopping &rarr;
              </Link>
              <Link
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-gray-900 border-2 border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 group"
              >
                <Play className="w-5 h-5 mr-2 fill-current text-[#FF6D1F]" />
                <span>Contact Us</span>
              </Link>
            </div>
          </div>

          {/* Hero Image Area */}
          <div className="hidden lg:block relative">
            <div className="absolute -inset-4 bg-[#FF6D1F]/10 rounded-2xl blur-xl transform rotate-3"></div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <div className="aspect-[4/3] bg-gray-100 relative">
                {/* Image Placeholder */}
                <img
                  src="/hero-new.png"
                  alt="Building Supplies Store"
                  className="w-full h-full object-cover"
                />
                {/* Overlay Gradient - Light */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60"></div>
              </div>
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 bg-white text-gray-900 p-5 rounded-xl shadow-2xl animate-bounce-slow border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="text-4xl font-extrabold text-[#FF6D1F]">20+</div>
                <div className="text-sm font-bold leading-tight text-gray-700">
                  Years of <br /> Excellence
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
