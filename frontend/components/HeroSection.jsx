"use client";

import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-gray-50 to-white py-20 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <div className="flex-1 space-y-6 animate-fade-in-up">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-gray-900">
                Your All-in-One Building Supply Destination
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed">
                Everything you need—paint, hardware, tools, plumbing, electrical,
                flooring, and more—all under one roof.
              </p>
            </div>
            <Link
              href="/categories"
              className="inline-block px-8 py-4 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-semibold rounded-full hover:from-teal-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Explore Categories
            </Link>
          </div>
          {/* Image */}
          <div className="flex-1 flex items-center justify-center animate-fade-in">
            <div className="relative w-full max-w-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-200/20 to-emerald-200/20 rounded-full blur-3xl"></div>
              <Image
                src="/hero.png"
                alt="Building supplies hero"
                className="relative object-contain drop-shadow-2xl"
                width={800}
                height={800}
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

