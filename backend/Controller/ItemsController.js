import Product from "../model/Items.js";

export const postAddItems = async (req, res) => {
  try {
    const {
      ProductName,
      Brand,
      Price,
      Discount,
      Category,
      Description,
      Size,
      Images, // 👈 added
    } = req.body;

    const newProduct = new Product({
      ProductName,
      Brand,
      Price,
      Discount,
      Category,
      Description,
      Size,
      Images, // 👈 added
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: "Failed to add product", error: error.message });
  }
};

export const getItems = async (req, res) => {
  const products = await Product.find();
  res.status(200).json(products);
};

export const deleteItem = async (req, res) => {
  try {
    const { _id } = req.params;
    const deleteProduct = await Product.findByIdAndDelete(_id);

    if (!deleteProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    return res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error while deleting product" });
  }
};

export const updateItem = async (req, res) => {
  try {
    const { _id } = req.params;

    const {
      ProductName,
      Brand,
      Price,
      Discount,
      Category,
      Description,
      Size,
      Images, // 👈 added
    } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      _id,
      { ProductName, Brand, Price, Discount, Category, Description, Size, Images }, // 👈 added
      { returnDocument: "after" } // 👈 replaces { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error while updating product" });
  }
};