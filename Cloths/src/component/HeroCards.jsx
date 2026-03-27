import { Link } from "react-router"
const Card = () =>{
    return (
        <div className="max-w-7xl mx-auto px-4 mt-8">
  
  {/* Section Title */}
  <h2 className="text-2xl font-bold mb-6">Trending Products</h2>

  {/* Grid */}
  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    
    {[...Array(8)].map((_, idx) => (
      <div
        key={idx}
        className="bg-white rounded-lg shadow-md hover:shadow-xl transition p-4 cursor-pointer"
      >
        
        {/* Image */}

        <img
          className="rounded-md w-full h-48 object-cover mb-3 hover:scale-101"
          src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"
          alt="product"
        />

        {/* Product Info */}
        <p className="text-gray-900 font-semibold">Men's T-Shirt</p>
        <p className="text-gray-500 text-sm">Comfort Fit</p>

        {/* Price + Button */}
        <div className="flex justify-between items-center mt-3">
          <p className="text-black font-bold">₹499</p>
          <button className="bg-black text-white px-3 py-1 rounded-md text-xs hover:bg-gray-800 w-16  hover:scale-102" >
             <Link to="mycart">Add to Cart</Link>
          </button>
        </div>

      </div>
    ))}
    
  </div>
    
      <div className="flex justify-center mt-8 gap-4">
  <button
    className="bg-gray-950 border rounded-lg w-20 text-white font-bold h-10 cursor-pointer  hover:scale-105"
  >
    Prev
  </button>

  <button
    className="bg-gray-950 border rounded-lg w-20 text-white font-bold h-10 cursor-pointer hover:scale-105"
  >
    Next
  </button>
</div>
    </div>



    )
}
export default Card