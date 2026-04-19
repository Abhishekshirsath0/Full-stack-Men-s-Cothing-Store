import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  AddProductToServer,
  UpdateProductToServer, // 👈 make this API in service
} from "../../Service";

const AddProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const editProduct = location.state; // 👈 edit data
  const isEdit = location.pathname === "/dashboard/edit-product";

  const ProductName = useRef();
  const Brand = useRef();
  const Price = useRef();
  const Discount = useRef();
  const Category = useRef();
  const Description = useRef();

  const [form, setForm] = useState({
    sizes: [],
  });

  const categories = ["tshirt", "shirts", "jeans", "nightpants"];
  const availableSizes = ["S", "M", "L", "XL", "30", "32", "34", "36"];

  // ================= FILL DATA IN EDIT =================
  useEffect(() => {
    if (editProduct) {
      ProductName.current.value = editProduct.ProductName || "";
      Brand.current.value = editProduct.Brand || "";
      Price.current.value = editProduct.Price || "";
      Discount.current.value = editProduct.Discount || "";
      Category.current.value = editProduct.Category || "";
      Description.current.value = editProduct.Description || "";

      setForm({
        sizes: editProduct.Size || [],
      });
    }
  }, [editProduct]);

  // ================= SIZE TOGGLE =================
  const toggleSize = (size) => {
    setForm((prev) => {
      const exists = prev.sizes.includes(size);
      return {
        ...prev,
        sizes: exists
          ? prev.sizes.filter((s) => s !== size)
          : [...prev.sizes, size],
      };
    });
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      ProductName: ProductName.current.value,
      Brand: Brand.current.value,
      Price: Price.current.value,
      Discount: Discount.current.value,
      Category: Category.current.value,
      Description: Description.current.value,
      Size: form.sizes,
    };

    if (isEdit) {
      // 🔥 UPDATE MODE
      await UpdateProductToServer(editProduct._id, productData);
      alert("Product Updated Successfully");
    } else {
      // 🔥 ADD MODE
      await AddProductToServer(productData);
      alert("Product Added Successfully");
    }

    // RESET
    ProductName.current.value = "";
    Brand.current.value = "";
    Price.current.value = "";
    Discount.current.value = "";
    Category.current.value = "";
    Description.current.value = "";

    setForm({ sizes: [] });

    
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-6 sm:p-10">

        <h2 className="text-2xl font-bold text-center mb-8">
          {isEdit ? "✏️ Edit Product" : "➕ Add Product"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* PRODUCT INFO */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <input ref={ProductName} type="text" placeholder="Product Name"
              className="border p-3 rounded-lg w-full" required />

            <input ref={Brand} type="text" placeholder="Brand"
              className="border p-3 rounded-lg w-full" required />

            <input ref={Price} type="number" placeholder="Price"
              className="border p-3 rounded-lg w-full" required />

            <input ref={Discount} type="number" placeholder="Discount %"
              className="border p-3 rounded-lg w-full" />
          </div>

          {/* CATEGORY */}
          <select ref={Category} className="border p-3 rounded-lg w-full">
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.toUpperCase()}
              </option>
            ))}
          </select>

          {/* DESCRIPTION */}
          <textarea
            ref={Description}
            placeholder="Product Description"
            rows={4}
            className="border p-3 rounded-lg w-full"
          />

          {/* SIZES */}
          <div>
            <p className="mb-2 font-medium">Select Sizes</p>
            <div className="flex flex-wrap gap-2">
              {availableSizes.map((size) => (
                <button
                  type="button"
                  key={size}
                  onClick={() => toggleSize(size)}
                  className={`px-4 py-2 border rounded-lg ${
                    form.sizes.includes(size)
                      ? "bg-black text-white"
                      : "bg-white"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800"
          >
            {isEdit ? "Update Product" : "Add Product"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddProduct;