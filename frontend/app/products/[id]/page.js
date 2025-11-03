"use client";
import InquiryForm from "@/components/inquiryForm";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import ProductDetails from "@/components/ProductDetailsCard";
const myLoader = ({ src }) => src;
export default function ProductPage() {
  const params = useParams();

  const id = params.id;

  const [product, setProduct] = useState(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // Fetch product details
  useEffect(() => {
    if (!id) return;
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
      });
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen p-8 text-center">Product not found</div>
    );
  }

  return (
    <div className=" min-h-screen max-w-7xl w-full  flex flex-col md:flex-row mx-auto  gap-2 py-5">
      <ProductDetails product={product} />

      <InquiryForm productId={product.id} />
    </div>
  );
}
