import { Schema, model, models, Document } from "mongoose";

// Define the TypeScript interface for your User document
interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "user" | "admin";
  favoriteProducts: string[]; // Array of product IDs
  cartProducts: number[]; // Array of product IDs
  createdAt: Date;
}

const userSchema = new Schema({
  // Personal Identification
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  // Role Based Access Configuration Node
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user", // Ensures newly registered storefront customers scale safely
  },

  // Barrison Gadgets E-Commerce Datastream Arrays (Stores product _id strings)
  favoriteProducts: { type: [String], default: [] },
  cartProducts: { type: [Number], default: [] },

  createdAt: { type: Date, default: Date.now },
});

// Senior Dev Check: Always recreate the User model during Hot Module Replacement (HMR)
if (models.User) {
  delete models.User;
}
const User = model<IUser>("User", userSchema);

export default User;
