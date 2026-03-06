import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  title: String,
  shortDescription: String,
  fullDescription: String,
  price: Number,
  date: String,
  priority: String,
  imageUrl: String,
}, { 
  timestamps: true,
  collection: 'product-collection' 
});

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);
export default Product;