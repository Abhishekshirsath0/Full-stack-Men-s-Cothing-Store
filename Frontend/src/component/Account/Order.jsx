import { useEffect, useState } from "react";
import { PageSkeleton } from "../Skeleton/SkeletonLoader";

const OrderPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 250);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <PageSkeleton />;
  }

  return (
    <center>
      <div className="bg-gray-50 p-4 ">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center flex-wrap gap-2 mb-4">
            <div className="text-slate-900 font-medium text-base">
              Order #54321
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-purple-600 p-6">
              <h2 className="text-[22px] font-semibold text-white">
                Thank you for your order!
              </h2>
              <p className="mt-2 text-slate-200">
                We've received your order and are getting it ready.
              </p>
            </div>

            <div className="p-6">
              <div>
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-indigo-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">
                      Order Confirmed
                    </h3>
                    <p className="text-slate-500 text-sm font-medium mt-1">
                      April 7, 2025 at 10:23 AM
                    </p>
                  </div>
                </div>

                <div className="mt-8">
                  <div className="flex justify-between gap-2 text-xs font-medium text-slate-500 mb-2">
                    <span>Confirmed</span>
                    <span>Processing</span>
                    <span>Shipped</span>
                    <span>Delivered</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div className="h-full w-1/4 bg-indigo-600 rounded-full"></div>
                  </div>
                </div>
              </div>

              <hr className="border-t border-gray-300 my-8" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-[15px] font-semibold text-slate-900 mb-4">
                    Shipping Address
                  </h4>
                  <div className="bg-gray-100 rounded-lg p-4 space-y-2 font-medium">
                    <p className="text-slate-500 text-sm">Emily Johnson</p>
                    <p className="text-slate-500 text-sm">425 Park Avenue</p>
                    <p className="text-slate-500 text-sm">Unit 3C</p>
                    <p className="text-slate-500 text-sm">
                      San Francisco, CA 94107
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-[15px] font-semibold text-slate-900 mb-4">
                    Shipping Method
                  </h3>
                  <div className="bg-gray-100 rounded-lg p-4 font-medium">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                        />
                      </svg>
                    </div>
                    <div className="mt-3">
                      <p className="text-sm font-medium text-slate-900">
                        Express Shipping
                      </p>
                      <p className="text-sm text-slate-500 mt-2">
                        Estimated delivery: April 10-11, 2025
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <hr className="border-t border-gray-300 my-8" />

              <div>
                <h3 className="text-[15px] font-semibold text-slate-900 mb-4">
                  Order Summary
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-4 max-sm:flex-col">
                    <div className="w-[70px] h-[70px] bg-gray-200 rounded-lg flex items-center justify-center shrink-0 overflow-hidden">
                      <img
                        src="https://readymadeui.com/images/watch1.webp"
                        alt="Stylish Golden Watch"
                        className="w-14 h-14 object-contain rounded-sm"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between gap-2 flex-wrap">
                        <div>
                          <h6 className="text-sm font-medium text-slate-900">
                            Stylish Golden Watch
                          </h6>
                          <p className="text-xs text-slate-500 mt-2 font-medium">
                            Golden | Qty: 1
                          </p>
                        </div>
                        <div className="text-slate-900 text-sm font-semibold">
                          $129.99
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 max-sm:flex-col">
                    <div className="w-[70px] h-[70px] bg-gray-200 rounded-lg flex items-center justify-center shrink-0 overflow-hidden">
                      <img
                        src="https://readymadeui.com/images/product14.webp"
                        alt="Velvet Sneaker"
                        className="w-14 h-14 object-contain rounded-sm"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between gap-2 flex-wrap">
                        <div>
                          <h6 className="text-sm font-medium text-slate-900">
                            Velvet Sneaker
                          </h6>
                          <p className="text-xs text-slate-500 mt-2 font-medium">
                            White/Black | Qty: 2
                          </p>
                        </div>
                        <div className="text-slate-900 text-sm font-semibold">
                          $79.98
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <hr className="border-t border-gray-300 my-8" />

              <div className="space-y-4">
                <div className="flex justify-between gap-2 flex-wrap text-slate-500 text-sm font-medium">
                  <span>Subtotal</span>
                  <span>$209.97</span>
                </div>
                <div className="flex justify-between gap-2 flex-wrap text-slate-500 text-sm font-medium">
                  <span>Shipping</span>
                  <span>$14.99</span>
                </div>
                <div className="flex justify-between gap-2 flex-wrap text-slate-500 text-sm font-medium">
                  <span>Tax</span>
                  <span>$18.00</span>
                </div>
                <div className="flex justify-between gap-2 flex-wrap text-slate-500 text-sm font-medium">
                  <span>Discount (SPRING25)</span>
                  <span>-$52.49</span>
                </div>

                <hr className="border-t border-gray-300 my-4" />

                <div className="flex justify-between font-semibold text-[15px] text-slate-900">
                  <span>Total</span>
                  <span>$190.47</span>
                </div>
              </div>

              <div className="mt-8 bg-gray-100 rounded-lg p-4">
                <div className="flex items-center gap-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-9 w-9 text-slate-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                  <div>
                    <h6 className="font-medium text-slate-900 text-sm">
                      Mastercard ending in 5678
                    </h6>
                    <p className="text-xs text-slate-500 font-medium mt-1">
                      Charged on April 7, 2025
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center flex-wrap gap-4">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-lg text-sm font-medium transition ease-in-out cursor-pointer">
              Track Order
            </button>
            <button className="bg-white hover:bg-gray-100 text-slate-900 border border-gray-300 py-3 px-6 rounded-lg text-sm font-medium transition ease-in-out cursor-pointer">
              View Invoice
            </button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-slate-500 text-sm font-medium">
              Questions about your order?{" "}
              <a
                href="javascript:void(0)"
                className="text-indigo-600 hover:text-indigo-800"
              >
                Contact our support team
              </a>
            </p>
          </div>
        </div>
      </div>
    </center>
  );
};

export default OrderPage;