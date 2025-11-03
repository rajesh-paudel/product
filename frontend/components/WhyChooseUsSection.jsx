"use client";

export default function WhyChooseUsSection() {
  const features = [
    {
      title: "Huge Selection",
      description:
        "From paints to pipes, flooring to fixtures, our extensive collection and innovation are top-notch.",
      icon: "🎯",
    },
    {
      title: "Trusted Brands",
      description:
        "Authorised dealer for top-quality brands and the best products for builders and homeowners alike.",
      icon: "⭐",
    },
    {
      title: "Retail & Wholesale",
      description:
        "Big or small, we serve everyone—whether you're buying for a project or completing your business.",
      icon: "🚀",
    },
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
            Why Choose Global Building Supplies
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-600 to-emerald-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-teal-200 transform hover:-translate-y-2"
            >
              {/* Decorative Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-teal-50/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Content */}
              <div className="relative space-y-4">
                <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-teal-700 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

