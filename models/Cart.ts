import { Schema, model, models, Document } from "mongoose";

// Define the TypeScript interface for your Cart document
export interface ICart extends Document {
  userEmail: string; // Reference to the User model
  items: {
    productId: Schema.Types.ObjectId; // Reference to the Product model
    quantity: number;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const cartSchema = new Schema(
  {
    // the link to the user
    userEmail: {
      type: String,
      required: true,
      unique: true, // Ensure one cart per user
    },

    //the array of products in the cart
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
  },
  { timestamps: true },
);

// Senior Dev Check: Ensures we don't re-compile the model on Hot Module Replacement (HMR)
const Cart = models.Cart || model<ICart>("Cart", cartSchema);

export default Cart;
