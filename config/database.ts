import mongoose from "mongoose";

let connectionPromise: Promise<typeof mongoose> | null = null;

const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (mongoose.connection.readyState === 1) {
    return;
  }

  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error("MONGO_URI is not configured.");
  }

  if (!connectionPromise) {
    connectionPromise = mongoose.connect(uri).catch((error: unknown) => {
      connectionPromise = null;
      throw error;
    });
  }

  await connectionPromise;
};

export default connectToDatabase;
