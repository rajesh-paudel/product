"use client";

import { DollarSign, RotateCcw, Truck, Clock } from "lucide-react";

const ServiceCard = ({ icon, title, description }) => (
  <div className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 group">
    <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#FF6D1F]/10 text-[#FF6D1F] mb-6 group-hover:bg-[#FF6D1F] group-hover:text-white transition-colors duration-300">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

export default function ServiceCards() {
  const cards = [
    {
      title: "Competitive Pricing",
      description:
        "Get the best value for your building materials. We match competitors' prices to ensure you save more on every project.",
      icon: <DollarSign className="w-7 h-7" />,
    },
    {
      title: "21-Day Return Policy",
      description:
        "Shop with confidence. If you're not satisfied, return unused items within 21 days for a full refund or exchange.",
      icon: <RotateCcw className="w-7 h-7" />,
    },
    {
      title: "Open 7 Days & Delivery",
      description:
        "We're here when you need us. Open all week with reliable delivery services to get materials directly to your job site.",
      icon: <Truck className="w-7 h-7" />,
    },
  ];

  return (
    <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 mb-20">
      <div className="grid md:grid-cols-3 gap-8">
        {cards.map((card, index) => (
          <ServiceCard key={index} {...card} />
        ))}
      </div>
    </section>
  );
}
