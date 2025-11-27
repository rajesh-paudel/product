"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const CategoryCard = ({ title, description, href }) => (
  <div className="bg-white p-8 rounded-2xl shadow-md border-t-4 border-[#FF6D1F] flex flex-col justify-between h-full hover:shadow-xl transition-shadow duration-300 group">
    <div>
      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#FF6D1F] transition-colors">
        {title}
      </h3>
      <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>
    </div>
    <Link
      href={href}
      className="flex items-center text-[#FF6D1F] font-semibold hover:underline mt-auto group-hover:translate-x-2 transition-transform duration-300"
    >
      Shop Now
      <ArrowRight className="w-5 h-5 ml-2" />
    </Link>
  </div>
);

export default function ProductCategoriesShowcase() {
  const categories = [
    {
      title: "Building Materials",
      description:
        "High-quality lumber, drywall, insulation, and concrete for structurally sound and durable construction projects.",
      href: "/categories",
    },
    {
      title: "Tools & Equipment",
      description:
        "Professional-grade power tools, hand tools, and safety gear to help you get the job done efficiently and safely.",
      href: "/categories",
    },
    {
      title: "Plumbing & Electrical",
      description:
        "Essential pipes, fittings, wiring, switches, and fixtures for all your residential and commercial utility needs.",
      href: "/categories",
    },
    {
      title: "Paint & Finishes",
      description:
        "Premium interior and exterior paints, stains, and applicators to add the perfect finishing touch to your work.",
      href: "/categories",
    },
  ];

  return (
    <section className="py-24 bg-[#F9F7F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Everything You Need for Your Project
          </h2>
          <p className="text-lg text-gray-600">
            From foundation to finish, we provide top-tier supplies for
            contractors and DIY enthusiasts alike.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <CategoryCard key={index} {...category} />
          ))}
        </div>
      </div>
    </section>
  );
}
