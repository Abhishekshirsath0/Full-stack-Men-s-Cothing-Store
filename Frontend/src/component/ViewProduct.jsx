import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { GetProductFromServer } from "../Service.js";

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);
  const [product, setProduct] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetProductFromServer();

        const selected = data.find(
          (p) => String(p._id) === String(id)
        );

        setProduct(selected);

        if (selected) {
          const rec = data.filter(
            (p) =>
              p.Category === selected.Category &&
              String(p._id) !== String(id)
          );

          setRecommendations(rec.slice(0, 4));
        }

        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div className="p-10 text-xl">Loading...</div>;
  }

  if (!product) {
    return <div className="p-10 text-xl">Product not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate('/')}
        className="mb-6 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
      >
        ← Back
      </button>

      {/* PRODUCT SECTION */}
      <div className="bg-white rounded-3xl shadow-xl p-6 grid md:grid-cols-2 gap-8">

        <img
          src={product.Images?.[0]}
          className="w-full h-[450px] object-cover rounded-2xl"
          alt={product.ProductName}
        />

        <div className="flex flex-col justify-center">

          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full w-fit">
            {product.Category}
          </span>

          <h2 className="text-4xl font-bold mt-3">
            {product.ProductName}
          </h2>

          <p className="text-gray-600 mt-3">
            {product.Description}
          </p>

          <div className="flex gap-3 mt-5 items-center">
            <span className="text-3xl font-bold text-green-600">
              ₹{product.Price}
            </span>

            {product.originalPrice && (
              <span className="line-through text-gray-400">
                ₹{product.originalPrice}
              </span>
            )}

            {product.Discount > 0 && (
              <span className="bg-red-500 text-white px-2 py-1 rounded text-sm">
                {product.Discount}% OFF
              </span>
            )}
          </div>

          <p className="mt-4 text-gray-700">
            {product.specification}
          </p>

          <div className="flex gap-4 mt-6">
            <button className="bg-yellow-400 px-6 py-3 rounded-xl font-bold">
              Add to Cart
            </button>

            <button className="bg-orange-500 text-white px-6 py-3 rounded-xl font-bold">
              Buy Now
            </button>
          </div>

        </div>
      </div>

      {/* RECOMMENDATIONS */}
 {/* RECOMMENDATIONS */}
<div className="mt-10">
  <h2 className="text-3xl font-bold mb-6">
    Recommended Products
  </h2>

  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

    {(showAll ? recommendations : recommendations.slice(0, 4)).map((item) => (
      <div
        key={item._id}
        className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
      >
        <img
          src={item.Images?.[0]}
          className="h-40 w-full object-cover rounded"
          alt={item.ProductName}
        />

        <h3 className="mt-2 font-semibold">
          {item.ProductName}
        </h3>

        <p className="text-green-600 font-bold">
          ₹{item.Price}
        </p>

        <Link
          to={`/view/${item._id}`}
          className="block mt-3 bg-blue-600 text-white text-center py-2 rounded"
        >
          View Product
        </Link>
      </div>
    ))}

  </div>

  {/* VIEW MORE BUTTON */}
  {recommendations.length > 4 && (
    <div className="flex justify-center mt-6">
      <button
        onClick={() => setShowAll(!showAll)}
        className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
      >
        {showAll ? "Show Less" : "View More Products"}
      </button>
    </div>
  )}
</div>

    </div>
  );
}