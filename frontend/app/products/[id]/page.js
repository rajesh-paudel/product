"use client";

import InquiryForm from "@/components/inquiryForm";
import Image from "next/image";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Trash2, Edit } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ProductDetails from "@/components/ProductDetailsCard";
const myLoader = ({ src }) => src;
export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;
  const [open, setOpen] = useState(false);
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

  //delete product
  const deleteProduct = async () => {
    setOpen(false);
    try {
      const res = await fetch(`${apiUrl}/products/${id}/delete/`, {
        method: "DELETE",
      });
      if (res.status === 204) {
        router.push("/");
        toast.success("Product deleted successfully");
      } else {
        toast.error("Failed to delete product");
      }
    } catch (err) {
      toast.error(err);
    }
  };

  if (!product) {
    return <div className="p-8 text-center">Product not found</div>;
  }

  return (
    <div className=" max-w-7xl w-full  flex mx-auto  gap-2 py-10">
      <ProductDetails product={product} />
      {/* Inquiry Form */}
      <InquiryForm productId={product.id} />

      {open && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Are you sure?</h2>
            <p className="mb-6">
              Do you really want to delete this product? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 rounded border hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={deleteProduct}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
