import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { GetProductFromServer } from "../Service";

// ================= PRODUCT CARD =================
const ProductCard = ({ item }) => (
  <div className="min-w-57.5 bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden">

    <div className="p-3">

      <span className="text-[10px] bg-red-500 text-white px-2 py-1 rounded">
        {item.Discount}%
      </span>

      <p className="text-xs text-gray-500 mt-1">{item.Brand}</p>
      <p className="font-semibold text-sm">{item.ProductName}</p>

      {/* SIZE */}
      <div className="flex gap-1 mt-2 flex-wrap">
        {item.Size?.map((s, i) => (
          <span key={i} className="border text-[10px] px-2 py-0.5 rounded">
            {s}
          </span>
        ))}
      </div>

      {/* PRICE */}
      <div className="flex gap-2 mt-2 items-center">
        <p className="font-bold text-sm">₹{item.Price}</p>
        <p className="text-xs line-through text-gray-400">
          ₹{item.originalPrice || item.Price}
        </p>
      </div>

      <button className="w-full mt-3 bg-black text-white text-xs py-2 rounded">
        View
      </button>

    </div>
  </div>
);

// ================= SECTION =================
const Section = ({ title, category, products, loading }) => {
  const filtered = products.filter(
    (p) => p.Category?.toLowerCase() === category
  );

  return (
    <div className="mb-10">
      <h2 className="text-xl font-bold mb-4">{title}</h2>

      <div className="flex gap-5 overflow-x-auto pb-2">
        {loading
          ? Array(5).fill(0).map((_, i) => (
              <div key={i} className="min-w-57.5">
                <Skeleton height={180} />
              </div>
            ))
          : filtered.map((item) => (
              <ProductCard key={item._id} item={item} />
            ))}
      </div>
    </div>
  );
};

// ================= MAIN COMPONENT =================
const Card = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetProductFromServer();
        console.log("PRODUCTS:", data);
        setProducts(data || []);
      } catch (error) {
        console.log("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 mt-6">

      <Section title="🔥 T-Shirts" category="tshirt" products={products} loading={loading} />
      <Section title="👔 Shirts" category="shirts" products={products} loading={loading} />
      <Section title="👖 Jeans" category="jeans" products={products} loading={loading} />
      <Section title="🛌 Night Pants" category="nightpants" products={products} loading={loading} />

    </div>
  );
};

export default Card;