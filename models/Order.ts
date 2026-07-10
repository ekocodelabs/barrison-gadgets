import { Schema, model, models, Document, Types } from "mongoose";

// Define the TypeScript interface for your Order document
export interface IOrder extends Document {
  customerEmail: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
  };
  orderItems: Array<{
    productId: number; // Storing numeric product ID matching your catalog schema
    title: string;
    quantity: number;
    price: number;
  }>;
  paymentMethod: "online" | "delivery"; //  Differentiates transaction flow
  paystackPaymentDetails?: {
    //  Optional object block
    totalPrice: number;
    paystackReference?: string; //  Optional string
    isPaid: boolean;
    paidAt?: Date;
  };
  totalPrice: number;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  createdAt: Date;
}

const orderSchema = new Schema({
  customerEmail: { type: String, required: true, trim: true },

  // Flattened structural tracking address object
  shippingAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
  },

  // Snapshot array capture preventing data mutations if master catalog details change later
  orderItems: [
    {
      productId: { type: Number, required: true },
      title: { type: String, required: true },
      quantity: { type: Number, required: true, min: 1 },
      price: { type: Number, required: true }, // Snapshotted NGN unit price value
    },
  ],

  // 2. REFACTORED: Global financial balance anchor mapping
  totalPrice: { type: Number, required: true, min: 0 },

  // 1. ADDED: Explicit core discriminator metric field
  paymentMethod: {
    type: String,
    enum: ["online", "delivery"],
    required: true,
    default: "online",
  },

  // 3. REFACTORED: Conditional payload matrix (Removed unique: true here)
  paystackPaymentDetails: {
    paystackReference: { type: String, default: null },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
  },

  // Granular e-commerce terminal lifecycle status state configuration tracking
  status: {
    type: String,
    enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
    default: "Pending",
  },

  createdAt: { type: Date, default: Date.now },
});

// Senior Dev Performance Indexing Matrix optimizations
orderSchema.index({ user: 1 });
orderSchema.index({ "paystackPaymentDetails.paystackReference": 1 });

// Senior Dev Check: Ensures we don't re-compile the model on Hot Module Replacement (HMR)
const Order = models.Order || model<IOrder>("Order", orderSchema);

export default Order;
