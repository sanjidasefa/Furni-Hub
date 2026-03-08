import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  title: String,
  price: Number,
  imageUrl: String,
  shortDescription: String,
  priority: String,
}, { 
  collection: 'product-collection' 
});
const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);
export default Product;