import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  AddProductToServer,
  UpdateProductToServer,
  UploadImagesToServer, // 👈 new
} from "../../Service";

const AddProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const editProduct = location.state;
  const isEdit = location.pathname === "/dashboard/edit-product";

  const ProductName = useRef();
  const Brand = useRef();
  const Price = useRef();
  const Discount = useRef();
  const Category = useRef();
  const Description = useRef();

  const [form, setForm] = useState({ sizes: [] });
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [uploading, setUploading] = useState(false);

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
      setForm({ sizes: editProduct.Size || [] });

      if (editProduct.Images?.length > 0) {
        setImagePreviews(editProduct.Images); // show existing images
      }
    }
  }, [editProduct]);

  // ================= SIZE TOGGLE =================
  const toggleSize = (size) => {
    setForm((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  // ================= IMAGE HANDLERS =================
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    const newPreviews = files.map((f) => URL.createObjectURL(f));
    setImageFiles((prev) => [...prev, ...files]);
    setImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // ================= SUBMIT =================
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setUploading(true);

    // 1️⃣ Upload images
    const imageUrls =
      imageFiles.length > 0
        ? await UploadImagesToServer(imageFiles)
        : editProduct?.Images || [];

    // 2️⃣ Create product object
    const productData = {
      ProductName: ProductName.current.value,
      Brand: Brand.current.value,
      Price: Price.current.value,
      Discount: Discount.current.value,
      Category: Category.current.value,
      Description: Description.current.value,
      Size: form.sizes,
      Images: imageUrls, // ✅ FIXED
    };

    // 3️⃣ Save
    if (isEdit) {
      await UpdateProductToServer(editProduct._id, productData);
      alert("Product Updated Successfully");
    } else {
      await AddProductToServer(productData);
      alert("Product Added Successfully");
    }

    // 4️⃣ Reset form
    ProductName.current.value = "";
    Brand.current.value = "";
    Price.current.value = "";
    Discount.current.value = "";
    Category.current.value = "";
    Description.current.value = "";

    setForm({ sizes: [] }); // ✅ FIXED
    setImageFiles([]); // ✅ FIXED
    setImagePreviews([]); // ✅ FIXED

  } catch (err) {
    alert("Something went wrong. Please try again.");
    console.error(err);
  } finally {
    setUploading(false);
  }
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
              <option key={cat} value={cat}>{cat.toUpperCase()}</option>
            ))}
          </select>

          {/* DESCRIPTION */}
          <textarea ref={Description} placeholder="Product Description"
            rows={4} className="border p-3 rounded-lg w-full" />

          {/* IMAGE UPLOAD */}
          <div>
            <label htmlFor="file-upload"
              className="border p-3 rounded-lg w-full bg-gray-100 cursor-pointer hover:bg-gray-200 transition block text-center py-2">
              + Add Product Images
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleImageChange}
            />

            {/* PREVIEW GRID */}
            {imagePreviews.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-4">
                {imagePreviews.map((src, index) => (
                  <div key={index} className="relative group">
                    <img src={src} alt={`Preview ${index + 1}`}
                      className="h-24 w-full object-cover rounded-lg border" />
                    <button type="button" onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* SIZES */}
          <div>
            <p className="mb-2 font-medium">Select Sizes</p>
            <div className="flex flex-wrap gap-2">
              {availableSizes.map((size) => (
                <button type="button" key={size} onClick={() => toggleSize(size)}
                  className={`px-4 py-2 border rounded-lg ${
                    form.sizes.includes(size) ? "bg-black text-white" : "bg-white"
                  }`}>
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* SUBMIT */}
          <button type="submit" disabled={uploading}
            className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed">
            {uploading ? "Uploading..." : isEdit ? "Update Product" : "Add Product"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddProduct;