import { Schema, model, models, Document } from "mongoose";

// Define the TypeScript interface for your Product document
export interface IProduct extends Document {
  title: string;
  description: string;
  price: number;
  image: string;
  category:
    | "appliances"
    | "electronics"
    | "fashion"
    | "phones & tablets"
    | "computing";
  inStock: boolean;
  createdAt: Date;
}

const productSchema = new Schema({
  // Core Product Descriptive Attributes
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },

  // Financial Tracking Metric
  price: { type: Number, required: true, min: 0 },

  // Public directory path tracking system variable string
  image: { type: String, required: true },

  // Strict E-commerce Taxonomy Categorization Matrix
  category: {
    type: String,
    required: true,
    enum: [
      "appliances",
      "electronics",
      "fashion",
      "phones & tablets",
      "computing",
    ],
  },

  // Operational Inventory Log Modifier Status
  inStock: { type: Boolean, default: true },

  createdAt: { type: Date, default: Date.now },
});

// Senior Dev Check: Ensures we don't re-compile the model on Hot Module Replacement (HMR)
const Product = models.Product || model<IProduct>("Product", productSchema);

export default Product;
