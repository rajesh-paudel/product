"use client";

import InquiryForm from "@/components/inquiryForm";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import ProductDetails from "@/components/ProductDetailsCard";
import Link from "next/link";

export default function ProductPage() {
  const params = useParams();
  const id = params.id;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // Fetch product details
  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`${apiUrl}/products/${id}/`)
      .then((res) => {
        if (!res.ok) {
          setProduct(null);
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data) setProduct(data);
      })
      .catch((err) => {
        console.log(err);
        setProduct(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Product not found</h2>
          <Link
            href="/categories"
            className="inline-block px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-300"
          >
            Back to Categories
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Product Details */}
          <div className="order-2 lg:order-1">
            <ProductDetails product={product} />
          </div>

          {/* Inquiry Form */}
          <div className="order-1 lg:order-2">
            <InquiryForm productId={product.id} />
          </div>
        </div>
      </div>
    </div>
  );
}

