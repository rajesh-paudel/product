import Image from "next/image";
const myLoader = ({ src }) => src;

export default function ProductDetails({ product }) {
  return (
    <div className="max-w-3xl w-full mx-auto">
      {/* Image Container */}
      <div className="bg-white relative  rounded-lg shadow mb-6 flex justify-center items-center overflow-hidden">
        {product.image ? (
          <Image
            loader={myLoader}
            src={product.image}
            alt="img"
            className=" object-contain rounded-lg"
            width={400}
            height={400}
            unoptimized
          />
        ) : (
          <span className=" text-gray-600">No image</span>
        )}
      </div>
      {/* Product Info Container */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
        <p className="text-green-600 text-lg font-semibold mb-1">
          Starting from ${product.price}
        </p>
        <p className="text-sm mb-2">
          <span className="font-medium">Availability:</span>
          {product?.availability ? (
            <span className="text-green-600 ml-1 font-semibold">In Stock</span>
          ) : (
            <span className="text-red-600 ml-1 font-semibold">
              Out Of Stock
            </span>
          )}
        </p>
        <p className="text-gray-700 mb-2">{product.description}</p>
      </div>
    </div>
  );
}
