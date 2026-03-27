import { Link } from "react-router";
const MyCart = () => {
  const cartItems = [
    { id: 1, name: "Velvet Sneaker", size: "MD", price: 20, qty: 2, img: "https://readymadeui.com/images/product14.webp" },
    { id: 2, name: "Smart Watch Timex", size: "SM", price: 60, qty: 1, img: "https://readymadeui.com/images/watch5.webp" },
    { id: 3, name: "French Connection", size: "LG", price: 40, qty: 1, img: "https://readymadeui.com/images/watch4.webp" },
    { id: 4, name: "Smart Watch", size: "LG", price: 60, qty: 1, img: "https://readymadeui.com/images/watch7.webp" },
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shipping = 2;
  const tax = 4;
  const total = subtotal + shipping + tax;

  return (
    <div className="max-w-5xl max-lg:max-w-2xl mx-auto bg-white p-4">
      <div className="border-b border-gray-300 pb-4">
        <h2 className="text-slate-900 text-2xl font-semibold">Shopping Cart</h2>
        <p className="text-sm text-slate-600 mt-2">
  Review the popular{" "}
  <Link to="/" className="text-blue-600 hover:text-blue-800 underline">
    Go to Home
  </Link>
</p>

      </div>

      <div className="grid lg:grid-cols-3 gap-10 mt-12">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map(item => (
            <div key={item.id}>
              <div className="grid grid-cols-2 sm:grid-cols-3 items-start sm:gap-4 gap-6">
                <div className="col-span-2 flex items-start gap-4">
                  <div className="w-28 h-28 max-sm:w-24 max-sm:h-24 shrink-0 bg-gray-100 p-3 rounded-md">
                    <img src={item.img} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-base font-semibold text-slate-900">{item.name}</h3>
                    <p className="text-sm font-medium text-slate-500 mt-2">Size: {item.size}</p>
                    <button type="button" className="mt-6 font-semibold text-red-500 text-xs flex items-center gap-2 shrink-0 cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 fill-current inline" viewBox="0 0 24 24">
                        <path d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"></path>
                        <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"></path>
                      </svg>
                      REMOVE
                    </button>
                  </div>
                </div>

                <div className="sm:ml-auto max-sm:flex max-sm:justify-between max-sm:gap-4 max-sm:col-span-full">
                  <h4 className="text-base font-semibold text-slate-900">${item.price.toFixed(2)}</h4>
                  <div className="flex items-center px-2.5 py-1.5 border border-gray-300 text-slate-900 text-xs font-medium rounded-md sm:mt-6">
                    <span className="cursor-pointer">-</span>
                    <span className="mx-3">{item.qty}</span>
                    <span className="cursor-pointer">+</span>
                  </div>
                </div>
              </div>
              <hr className="border-gray-300 mt-4" />
            </div>
          ))}
        </div>

        <div className="bg-gray-100 rounded-md p-4 h-max">
          {/* Form Section */}
          <form>
            <h3 className="text-base text-slate-900 font-semibold mb-4">Enter Details</h3>
            <div className="space-y-3">
              <input type="text" placeholder="Full Name" className="px-4 py-2.5 bg-white text-slate-900 rounded-md w-full text-sm border-b border-gray-200 focus:border-gray-800 outline-none" />
              <input type="email" placeholder="Email" className="px-4 py-2.5 bg-white text-slate-900 rounded-md w-full text-sm border-b border-gray-200 focus:border-gray-800 outline-none" />
              <input type="number" placeholder="Phone No." className="px-4 py-2.5 bg-white text-slate-900 rounded-md w-full text-sm border-b border-gray-200 focus:border-gray-800 outline-none" />
            </div>
          </form>

          <ul className="text-slate-500 font-medium mt-6 space-y-4">
            <li className="flex flex-wrap gap-4 text-sm">Subtotal <span className="ml-auto font-semibold text-slate-900">${subtotal.toFixed(2)}</span></li>
            <li className="flex flex-wrap gap-4 text-sm">Shipping <span className="ml-auto font-semibold text-slate-900">${shipping.toFixed(2)}</span></li>
            <li className="flex flex-wrap gap-4 text-sm">Tax <span className="ml-auto font-semibold text-slate-900">${tax.toFixed(2)}</span></li>
            <hr className="border-gray-300" />
            <li className="flex flex-wrap gap-4 text-sm text-slate-900">Total <span className="ml-auto font-semibold">${total.toFixed(2)}</span></li>
          </ul>

          <div className="mt-8 space-y-3">
            <button type="button" className="text-sm px-4 py-2.5 w-full font-medium tracking-wide bg-gray-800 hover:bg-gray-900 text-white rounded-md cursor-pointer">Checkout</button>
            <button type="button" className="text-sm px-4 py-2.5 w-full font-medium tracking-wide bg-transparent text-slate-900 border border-gray-300 rounded-md cursor-pointer">Continue Shopping</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyCart;