import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { PageSkeleton } from "./Skeleton/SkeletonLoader";

export default function FilterSidebar() {
  const { category } = useParams();
  const [loading, setLoading] = useState(true);
  const sections = ["Category", "Brand", "Size", "Color"];
  const [expanded, setExpanded] = useState({
    Category: false,
    Brand: false,
    Size: false,
    Color: false,
  });

  const contentRefs = {
    Category: useRef(null),
    Brand: useRef(null),
    Size: useRef(null),
    Color: useRef(null),
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 200);
    return () => clearTimeout(timer);
  }, []);

  const toggleSection = (section) => {
    setExpanded((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleApply = (e) => {
    e.preventDefault();
    alert("Filters applied!");
    // Here you can handle filter submission logic
  };

  const categoryLabel = category
    ? category
        .split("-")
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(" ")
    : "All Products";

  if (loading) {
    return <PageSkeleton />;
  }

  return (
    <form onSubmit={handleApply}>
      <div className="flex">
        {/* Sidebar */}
        <div className="bg-gray-50 w-full max-w-70 border-r border-gray-100 shrink-0 px-6 sm:px-8 py-6 flex flex-col">
          <div className="flex items-center border-b border-gray-300 pb-2 mb-6">
            <h3 className="text-slate-900 text-lg font-semibold">Filter</h3>
            <button
              type="button"
              className="text-sm text-red-500 font-semibold ml-auto cursor-pointer"
            >
              Clear all
            </button>
          </div>

          <div className="filter-options space-y-6 flex-1 overflow-auto">
            {/* Price Section */}
            <div>
              <div className="flex items-center gap-2 justify-between cursor-pointer">
                <h4 className="text-slate-900 text-base font-semibold">
                  Price
                </h4>
              </div>
              <div className="relative mt-4">
                <div className="h-1.5 bg-gray-300 relative">
                  <div
                    id="activeTrack"
                    className="absolute h-1.5 bg-pink-500 rounded-full w-9/12"
                  ></div>
                </div>
                <input
                  type="range"
                  id="minRange"
                  min="0"
                  max="1000"
                  defaultValue="0"
                  className="absolute top-0 w-full h-1.5 bg-transparent appearance-none cursor-pointer
                    [&::-webkit-slider-thumb]:appearance-none
                    [&::-webkit-slider-thumb]:w-5
                    [&::-webkit-slider-thumb]:h-5
                    [&::-webkit-slider-thumb]:bg-pink-500
                    [&::-webkit-slider-thumb]:rounded-full
                    [&::-webkit-slider-thumb]:border-2
                    [&::-webkit-slider-thumb]:border-white
                    [&::-webkit-slider-thumb]:shadow-md
                    [&::-webkit-slider-thumb]:cursor-pointer"
                />
                <input
                  type="range"
                  id="maxRange"
                  min="0"
                  max="1000"
                  defaultValue="750"
                  className="absolute top-0 w-full h-1.5 bg-transparent appearance-none cursor-pointer
                    [&::-webkit-slider-thumb]:appearance-none
                    [&::-webkit-slider-thumb]:w-5
                    [&::-webkit-slider-thumb]:h-5
                    [&::-webkit-slider-thumb]:bg-pink-500
                    [&::-webkit-slider-thumb]:rounded-full
                    [&::-webkit-slider-thumb]:border-2
                    [&::-webkit-slider-thumb]:border-white
                    [&::-webkit-slider-thumb]:shadow-md
                    [&::-webkit-slider-thumb]:cursor-pointer"
                />
                <div className="flex justify-between text-slate-600 font-medium text-sm mt-4">
                  <span id="minPrice">$0</span>
                  <span id="maxPrice">$1000</span>
                </div>
              </div>
            </div>

            {/* Collapsible Sections */}
            {sections.map((section) => (
              <div key={section}>
                <div
                  className="header flex items-center gap-2 justify-between cursor-pointer"
                  onClick={() => toggleSection(section)}
                >
                  <h4 className="text-slate-900 text-base font-semibold">
                    {section}
                  </h4>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`arrow w-3.5 h-3.5 fill-slate-800 transition-all duration-300 ${
                      expanded[section] ? "rotate-90" : "-rotate-90"
                    }`}
                    viewBox="0 0 492.004 492.004"
                  >
                    <path d="M382.678 226.804 163.73 7.86C158.666 2.792 151.906 0 144.698 0s-13.968 2.792-19.032 7.86l-16.124 16.12c-10.492 10.504-10.492 27.576 0 38.064L293.398 245.9l-184.06 184.06c-5.064 5.068-7.86 11.824-7.86 19.028 0 7.212 2.796 13.968 7.86 19.04l16.124 16.116c5.068 5.068 11.824 7.86 19.032 7.86s13.968-2.792 19.032-7.86L382.678 265c5.076-5.084 7.864-11.872 7.848-19.088.016-7.244-2.772-14.028-7.848-19.108z" />
                  </svg>
                </div>

                <div
                  ref={contentRefs[section]}
                  className="collape-content overflow-hidden transition-all duration-300"
                  style={{
                    height: expanded[section]
                      ? `${contentRefs[section].current?.scrollHeight}px`
                      : 0,
                  }}
                >
                  <div className="mt-4">
                    {section === "Category" && (
                      <div>
                        <div className="flex px-3 py-2 rounded-sm border border-gray-300 bg-gray-50 focus-within:bg-white overflow-hidden">
                          <input
                            type="text"
                            placeholder="Search category"
                            className="w-full bg-transparent outline-none text-gray-900 text-sm"
                          />
                        </div>
                        <ul className="mt-6 space-y-4">
                          {[
                            "T-Shirts",
                            "Jackets",
                            "Sweaters",
                            "Sneakers",
                            "Crossbody Bags",
                            "Hair Tie",
                            "Luxury Timepieces",
                            "Sunglasses",
                          ].map((item) => (
                            <li key={item} className="flex items-center gap-3">
                              <input
                                id={item}
                                type="checkbox"
                                className="w-4 h-4 cursor-pointer"
                              />
                              <label
                                htmlFor={item}
                                className="text-slate-600 font-medium text-sm cursor-pointer"
                              >
                                {item}
                              </label>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {section === "Brand" && (
                      <div>
                        <div className="flex px-3 py-2 rounded-sm border border-gray-300 bg-gray-50 focus-within:bg-white overflow-hidden">
                          <input
                            type="text"
                            placeholder="Search brand"
                            className="w-full bg-transparent outline-none text-gray-900 text-sm"
                          />
                        </div>
                        <ul className="mt-6 space-y-4">
                          {[
                            "Zara",
                            "H&M",
                            "Uniqlo",
                            "Levi’s",
                            "Nike",
                            "Adidas",
                            "Puma",
                            "Tommy Hilfiger",
                          ].map((brand) => (
                            <li key={brand} className="flex items-center gap-3">
                              <input
                                id={brand}
                                type="checkbox"
                                className="w-4 h-4 cursor-pointer"
                              />
                              <label
                                htmlFor={brand}
                                className="text-slate-600 font-medium text-sm cursor-pointer"
                              >
                                {brand}
                              </label>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {section === "Size" && (
                      <div className="flex flex-wrap gap-3">
                        {["XS", "S", "M", "L", "XL", "XXL", "XXXL", "4XL"].map(
                          (size) => (
                            <button
                              key={size}
                              type="button"
                              className="cursor-pointer border border-gray-300 hover:border-blue-600 rounded-md text-[13px] text-slate-600 font-medium py-1 px-1 min-w-14"
                            >
                              {size}
                            </button>
                          ),
                        )}
                      </div>
                    )}

                    {section === "Color" && (
                      <div className="flex flex-wrap gap-3">
                        {[
                          "bg-blue-700",
                          "bg-purple-700",
                          "bg-pink-700",
                          "bg-orange-500",
                          "bg-red-700",
                          "bg-yellow-400",
                          "bg-black",
                          "bg-gray-500",
                          "bg-white border border-gray-300",
                        ].map((color, index) => (
                          <button
                            key={index}
                            type="button"
                            className={`cursor-pointer rounded-full w-8 h-8 hover:scale-[1.05] transition-all ${color}`}
                          ></button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Apply Button */}
            <button
              type="submit"
              className="mt-6 w-full bg-mist-950 hover:bg-mist-800 text-white font-semibold py-2 px-4 rounded-md transition-colors cursor-pointer"
            >
              Apply
            </button>
          </div>
        </div>

        {/* Right Content */}
        <div className="w-full py-6 px-8">
          {/* Example content area */}
          <h3 className="text-slate-900 text-lg font-semibold mb-4">
            {categoryLabel}
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-100 w-full h-48 rounded-md"></div>
            ))}
          </div>
        </div>
      </div>
    </form>
  );
}
