import mongoose from "mongoose";
import { Schema } from "mongoose";

const ProductSchema = new Schema({
  ProductName: {
    type: String,
    required: [true, "Product Name is required"],
  },
  Brand: {
    type: String,
    required: [true, "Brand Name is required"],
  },
  Price: {
    type: Number,
    required: [true, "Price is required"],
  },
  Discount: {
    type: Number,
  },
  Category: {
    type: String,
    enum: ["tshirt", "shirts", "jeans", "nightpants"],
    required: [true, "Category is required"],
  },
  Description: {
    type: String,
    required: [true, "Description is required"],
  },
  Size: {
    type: [String],
    enum: ["S", "M", "L", "XL", "30", "32", "34", "36"],
  },
  Images: [String],
},
{
  timestamps: true,
});

export default mongoose.model("Product", ProductSchema);