import { useState, useEffect, useMemo, memo } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { GetProductFromServer } from "../Service";

// ================= PRODUCT CARD (MEMOIZED) =================
const ProductCard = memo(({ item }) => (
  <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden">

    {/* IMAGE (lazy loading added) */}
    <img
      src={item.Images?.[0] || "https://placehold.co/300x200?text=No+Image"}
      alt={item.ProductName}
      className="w-full h-40 object-cover"
      loading="lazy"
      decoding="async"
    />

    <div className="p-3">
      {item.Discount > 0 && (
        <span className="text-[10px] bg-red-500 text-white px-2 py-1 rounded">
          {item.Discount}% OFF
        </span>
      )}

      <p className="text-xs text-gray-500 mt-1">{item.Brand}</p>
      <p className="font-semibold text-sm">{item.ProductName}</p>

      <div className="flex gap-1 mt-2 flex-wrap">
        {item.Size?.map((s, i) => (
          <span key={i} className="border text-[10px] px-2 py-0.5 rounded">
            {s}
          </span>
        ))}
      </div>

      <div className="flex gap-2 mt-2 items-center">
        <p className="font-bold text-sm">₹{item.Price}</p>
        {item.Discount > 0 && (
          <p className="text-xs line-through text-gray-400">
            ₹{item.originalPrice || item.Price}
          </p>
        )}
      </div>

      <button className="w-full mt-3 bg-black text-white text-xs py-2 rounded hover:bg-gray-800">
        View
      </button>
    </div>
  </div>
));

// ================= SECTION =================
const Section = memo(({ title, category, products, loading }) => {

  // ✅ MEMOIZED FILTER (important optimization)
  const filtered = useMemo(() => {
    return products.filter(
      (p) => p.Category?.toLowerCase() === category
    );
  }, [products, category]);

  return (
    <div className="mb-10">
      <h2 className="text-xl font-bold mb-4">{title}</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {loading
          ? Array(6).fill(0).map((_, i) => (
              <Skeleton key={i} height={200} />
            ))
          : filtered.map((item) => (
              <ProductCard key={item._id} item={item} />
            ))}
      </div>
    </div>
  );
});

// ================= MAIN COMPONENT =================
const Card = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const data = await GetProductFromServer();
        if (isMounted) {
          setProducts(data || []);
        }
      } catch (error) {
        console.log("Error fetching products:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 mt-6">

      <Section title="🔥 T-Shirts" category="tshirt" products={products} loading={loading} />
      <Section title="👔 Shirts" category="shirts" products={products} loading={loading} />
      <Section title="👖 Jeans" category="jeans" products={products} loading={loading} />
      <Section title="🛌 Sleepwear" category="nightpants" products={products} loading={loading} />

    </div>
  );
};

export default Card;