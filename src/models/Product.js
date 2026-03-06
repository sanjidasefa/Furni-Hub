import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({}, { 
  strict: false, 
  collection: 'product-collection', 
  timestamps: true 
});

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);
export default Product;