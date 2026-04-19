import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const MyCart = () => {
  const [loading, setLoading] = useState(true);

  const cartItems = [
    { id: 1, name: "Velvet Sneaker", size: "MD", price: 20, qty: 2, img: "https://readymadeui.com/images/product14.webp" },
    { id: 2, name: "Smart Watch Timex", size: "SM", price: 60, qty: 1, img: "https://readymadeui.com/images/watch5.webp" },
    { id: 3, name: "French Connection", size: "LG", price: 40, qty: 1, img: "https://readymadeui.com/images/watch4.webp" },
    { id: 4, name: "Smart Watch", size: "LG", price: 60, qty: 1, img: "https://readymadeui.com/images/watch7.webp" },
  ];

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <>
      <Navbar />

      <div className="max-w-5xl mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-6">
          {loading ? <Skeleton width={200} /> : "Shopping Cart"}
        </h2>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-4">
            {loading
              ? Array(4).fill(0).map((_, i) => (
                  <Skeleton key={i} height={120} />
                ))
              : cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 border-b pb-4">
                    
                    {/* Image */}
                    <div className="w-24 h-24">
                      {loading ? (
                        <Skeleton height={100} />
                      ) : (
                        <img src={item.img} className="w-full h-full object-contain" />
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex flex-col flex-1">
                      <h3>
                        {loading ? <Skeleton width={120} /> : item.name}
                      </h3>

                      <p>
                        {loading ? <Skeleton width={80} /> : `Size: ${item.size}`}
                      </p>
                    </div>

                    {/* Price */}
                    <div>
                      {loading ? <Skeleton width={60} /> : `$${item.price}`}
                    </div>
                  </div>
                ))}
          </div>

          {/* RIGHT */}
          <div className="bg-gray-100 p-4 rounded">
            <h3>
              {loading ? <Skeleton width={150} /> : "Summary"}
            </h3>

            <p className="mt-4">
              {loading ? <Skeleton /> : `Subtotal: $${subtotal}`}
            </p>

            <button className="mt-4 w-full bg-black text-white py-2">
              {loading ? <Skeleton height={30} /> : "Checkout"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyCart;