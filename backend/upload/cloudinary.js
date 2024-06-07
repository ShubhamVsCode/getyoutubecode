const { v2: cloudinary } = require("cloudinary");

cloudinary.config({
  cloud_name: "shubhamvscode",
  api_key: "937822155529692",
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = async (imagePath) => {
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };

  try {
    const result = await cloudinary.uploader.upload(imagePath, options);
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { uploadImage };
