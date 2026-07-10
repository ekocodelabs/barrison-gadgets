import { v2 as cloudinary } from "cloudinary";
//initializations with key and secrets from env files
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Add the uploadImage function
export const uploadImage = async (base64Data: string) => {
  try {
    const result = await cloudinary.uploader.upload(base64Data, {
      folder: "products", // Optional: specify a folder
      resource_type: "image",
    });
    return result;
  } catch (error) {
    throw new Error(`Cloudinary upload failed: ${error}`);
  }
};

export default cloudinary;
