"use client";

import { MapPin, Ruler, Truck, CreditCard } from "lucide-react";
import Image from "next/image";

export default function StoreInfoSection() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            {/* Updated blur effects to be neutral/orange only */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#FF6D1F]/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gray-200/50 rounded-full blur-2xl"></div>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
              <Image
                src="/hero-new.png"
                alt="Store Interior"
                width={800}
                height={600}
                className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-8 leading-tight">
              Your One-Stop Shop for <br />
              <span className="text-[#FF6D1F]">Renovation & Construction</span>
            </h2>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed font-light">
              Located conveniently in Scarborough, we offer a massive selection of
              materials in our expansive facility. We are dedicated to serving
              both professional contractors and homeowners with quality products
              and exceptional service.
            </p>

            <div className="grid sm:grid-cols-2 gap-8">
              <div className="flex items-start gap-4 group">
                <div className="p-3 bg-gray-50 rounded-xl text-[#FF6D1F] group-hover:bg-[#FF6D1F] group-hover:text-white transition-colors duration-300">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">
                    Prime Location
                  </h4>
                  <p className="text-sm text-gray-500">
                    Kennedy & McNicoll, Scarborough
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="p-3 bg-gray-50 rounded-xl text-[#FF6D1F] group-hover:bg-[#FF6D1F] group-hover:text-white transition-colors duration-300">
                  <Ruler className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Massive Space</h4>
                  <p className="text-sm text-gray-500">
                    50,000 sq ft indoor • 3 acres site
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="p-3 bg-gray-50 rounded-xl text-[#FF6D1F] group-hover:bg-[#FF6D1F] group-hover:text-white transition-colors duration-300">
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">
                    Delivery & Returns
                  </h4>
                  <p className="text-sm text-gray-500">
                    Easy returns & reliable delivery
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="p-3 bg-gray-50 rounded-xl text-[#FF6D1F] group-hover:bg-[#FF6D1F] group-hover:text-white transition-colors duration-300">
                  <CreditCard className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">
                    Flexible Payment
                  </h4>
                  <p className="text-sm text-gray-500">
                    Debit, Credit, Cash, E-Transfer
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
