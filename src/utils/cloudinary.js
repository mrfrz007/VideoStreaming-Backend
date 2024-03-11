import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dzaoybifl",
  api_key: "286593198675464",
  api_secret: "3swebEV1dEqpRGShqEgzHwE_eS4",
});
const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    // file has been uploaded successfull
    //console.log("file is uploaded on cloudinary ", response.url);
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the upload operation got failed
    return null;
  }
};
export { uploadOnCloudinary };
